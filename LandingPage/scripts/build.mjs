import { spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const completionMarker = fileURLToPath(
  new URL("../dist/.anima-ssg-complete", import.meta.url),
);
const configuredTimeout = Number(process.env.ANIMA_SSG_TIMEOUT_MS);
const ssgTimeoutMs =
  Number.isFinite(configuredTimeout) && configuredTimeout > 0
    ? configuredTimeout
    : 5 * 60 * 1000;

function signalProcessTree(child, signal) {
  if (!child.pid) {
    return;
  }

  try {
    if (process.platform === "win32") {
      const killer = spawn(
        "taskkill",
        ["/pid", String(child.pid), "/T", "/F"],
        {
          stdio: "ignore",
        },
      );
      killer.unref();
    } else {
      process.kill(-child.pid, signal);
    }
  } catch {
    child.kill(signal);
  }
}

function runPackageScript(script, timeoutMs) {
  const npmExecutable = process.platform === "win32" ? "npm.cmd" : "npm";
  const command = process.env.npm_execpath ? process.execPath : npmExecutable;
  const args = process.env.npm_execpath
    ? [process.env.npm_execpath, "run", script]
    : ["run", script];

  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      detached: process.platform !== "win32",
      stdio: "inherit",
    });
    let finished = false;
    let timedOut = false;
    let forceKillTimer;

    const finish = (code, error) => {
      if (finished) {
        return;
      }
      finished = true;
      clearTimeout(timeoutTimer);
      clearTimeout(forceKillTimer);
      resolve({ code, error, timedOut });
    };

    const timeoutTimer = timeoutMs
      ? setTimeout(() => {
          timedOut = true;
          signalProcessTree(child, "SIGTERM");
          forceKillTimer = setTimeout(
            () => signalProcessTree(child, "SIGKILL"),
            2_000,
          );
          forceKillTimer.unref();
        }, timeoutMs)
      : undefined;
    timeoutTimer?.unref();

    child.once("error", (error) => finish(null, error));
    child.once("close", (code) => {
      // npm can exit on SIGTERM while one of its descendants ignores it. Kill the
      // detached process group before moving on to the fallback build.
      if (timedOut && process.platform !== "win32") {
        signalProcessTree(child, "SIGKILL");
      }
      finish(code);
    });
  });
}

rmSync(completionMarker, { force: true });
const ssgResult = await runPackageScript("build:ssg", ssgTimeoutMs);
const ssgCompleted = ssgResult.code === 0 && existsSync(completionMarker);

if (ssgCompleted) {
  rmSync(completionMarker, { force: true });
} else {
  const reason = ssgResult.timedOut
    ? "SSG timed out"
    : ssgResult.error
      ? "SSG could not start: " + ssgResult.error.message
      : ssgResult.code === 0
        ? "SSG exited without completing every route"
        : "SSG exited with code " + ssgResult.code;
  console.warn("[anima-build] " + reason + "; rebuilding as a clean CSR app.");

  rmSync(distDirectory, { recursive: true, force: true });
  const csrResult = await runPackageScript("build:csr");
  if (csrResult.error) {
    console.error("[anima-build] CSR build could not start:", csrResult.error);
    process.exitCode = 1;
  } else if (csrResult.code !== 0) {
    process.exitCode = csrResult.code ?? 1;
  }
}
