import { Link } from "react-router-dom";

/** Minimal placeholder home screen for the authenticated app shell. */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-md w-full flex flex-col items-center gap-4 text-center">
        <span className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          CourseVault
        </span>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The CourseVault application workspace is still being built. Course
          archives will be managed from here once capture and account
          features exist.
        </p>
        <Link
          to="/vault"
          className="rounded-full px-5 py-2 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View sample vault
        </Link>
      </div>
    </div>
  );
}
