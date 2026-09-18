import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import VaultTree from "./components/VaultTree";
import VaultItemView from "./components/VaultItemView";
import { asl201Archive } from "./fixtures/asl-201";
import type { CourseArchive, VaultCollection, VaultItem } from "./types";

/** Flattens the archive into an id → { collection, item } lookup. */
function indexArchive(archive: CourseArchive) {
  const index = new Map<string, { collection: VaultCollection; item: VaultItem }>();

  for (const collection of archive.collections) {
    for (const item of collection.items) {
      index.set(item.id, { collection, item });
    }
  }

  return index;
}

export default function VaultPage() {
  // A single fixture archive for now; a course picker arrives with real capture.
  const archive = asl201Archive;
  const itemIndex = useMemo(() => indexArchive(archive), [archive]);
  const firstItemId = archive.collections[0]?.items[0]?.id ?? null;

  const [selectedItemId, setSelectedItemId] = useState<string | null>(firstItemId);

  const selection = selectedItemId ? itemIndex.get(selectedItemId) : undefined;
  const itemCount = itemIndex.size;
  const capturedOn = archive.capturedAt.slice(0, 10);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Workspace header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-lg md:text-xl font-semibold tracking-tight text-foreground">
              {archive.courseCode} — {archive.courseName}
            </h1>
            <p className="text-xs text-muted-foreground">
              {archive.institution} · {archive.term} · {archive.instructor}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-muted-foreground bg-muted border border-border">
              {itemCount} items · captured {capturedOn}
            </span>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              ← Home
            </Link>
          </div>
        </div>
      </header>

      {/* Workspace body: tree + preview */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 lg:px-16 py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:h-[calc(100vh-11rem)]">
          <aside className="lg:w-72 shrink-0 border border-border rounded-xl bg-card overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 border-b border-border bg-muted">
              <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
                Archive
              </span>
            </div>
            <div className="p-2 overflow-y-auto max-h-80 lg:max-h-none">
              <VaultTree
                rootLabel={archive.courseCode}
                collections={archive.collections}
                selectedItemId={selectedItemId}
                onSelectItem={setSelectedItemId}
              />
            </div>
          </aside>

          <section className="flex-1 min-w-0 border border-border rounded-xl bg-card overflow-hidden">
            {selection ? (
              <VaultItemView
                collection={selection.collection}
                item={selection.item}
                archivePath={archive.courseCode}
              />
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <p className="text-sm text-muted-foreground text-center">
                  Select a file in the archive to preview its contents.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
