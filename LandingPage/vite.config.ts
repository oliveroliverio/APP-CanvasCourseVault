import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

function addCanonicalPathAliasesToStaticLoaderManifests(distDirectory: string) {
  for (const fileName of readdirSync(distDirectory)) {
    if (
      !fileName.startsWith("static-loader-data-manifest-") ||
      !fileName.endsWith(".json")
    ) {
      continue;
    }

    const manifestPath = path.resolve(distDirectory, fileName);
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    if (
      manifest === null ||
      Array.isArray(manifest) ||
      typeof manifest !== "object"
    ) {
      throw new Error("Static loader data manifest must contain a JSON object");
    }

    let changed = false;
    for (const [routePath, loaderData] of Object.entries(manifest)) {
      // Browser URL.pathname percent-encodes Unicode and spaces. vite-react-ssg 0.8.9
      // stores the raw route instead, so hydrated client navigation cannot find its loader
      // data unless the manifest also carries the browser-normalized key. Published route
      // directories are encoded segment by segment with Python quote(..., safe=""), which
      // additionally escapes literal percent signs and URL-path punctuation. Keep both
      // spellings because either one can become window.location.pathname.
      if (
        !routePath.startsWith("/") ||
        routePath.startsWith("//") ||
        /[?#\\]/.test(routePath)
      ) {
        continue;
      }

      const browserPath = new URL(routePath, "https://anima.invalid").pathname;
      const publishedPath = routePath
        .split("/")
        .map((segment) =>
          encodeURIComponent(segment).replace(
            /[!'()*]/g,
            (character) =>
              `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
          ),
        )
        .join("/");

      for (const aliasPath of [browserPath, publishedPath]) {
        if (
          aliasPath !== routePath &&
          !Object.prototype.hasOwnProperty.call(manifest, aliasPath)
        ) {
          manifest[aliasPath] = loaderData;
          changed = true;
        }
      }
    }

    // React Router matches both trailing-slash spellings, while the static loader lookup
    // is an exact pathname lookup. Add the other spelling after encoding aliases exist,
    // so raw Unicode routes also get the full encoded/slash cross-product.
    for (const [routePath, loaderData] of Object.entries(manifest)) {
      if (
        routePath === "/" ||
        !routePath.startsWith("/") ||
        routePath.startsWith("//") ||
        /[?#\\]/.test(routePath)
      ) {
        continue;
      }

      const alternatePath = routePath.endsWith("/")
        ? routePath.slice(0, -1)
        : routePath + "/";
      if (!Object.prototype.hasOwnProperty.call(manifest, alternatePath)) {
        manifest[alternatePath] = loaderData;
        changed = true;
      }
    }

    if (changed) {
      writeFileSync(manifestPath, JSON.stringify(manifest));
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "./static",
  // Must stay absolute. Prerendered pages live at nested paths (dist/pricing/index.html),
  // and a relative base would make them request /pricing/assets/... which 404s.
  base: "/",
  ssgOptions: {
    // Where the prerendered markup is written. Distinct from the `rootContainer` option
    // in src/index.tsx, which is where the client mounts — BOTH default to "#root" and
    // both must point at this scaffold's #app. Getting this one wrong fails the build;
    // getting the other one wrong renders a silently blank page.
    rootContainerId: "app",
    // Emit dist/pricing/index.html rather than dist/pricing.html, so "/pricing" resolves
    // without a .html suffix — that is the form <Link to="/pricing"> produces.
    dirStyle: "nested",
    // The wrapper accepts SSG output only when this callback proves every route finished.
    // A zero-exit partial render never reaches it and is rebuilt as a clean CSR app.
    onFinished() {
      const distDirectory = path.resolve(__dirname, "dist");
      addCanonicalPathAliasesToStaticLoaderManifests(distDirectory);
      writeFileSync(path.resolve(distDirectory, ".anima-ssg-complete"), "");
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
