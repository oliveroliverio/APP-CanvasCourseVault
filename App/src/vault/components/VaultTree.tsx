import { useState } from "react";
import type { VaultCollection, VaultCollectionId } from "../types";

type VaultTreeProps = {
  rootLabel: string;
  collections: VaultCollection[];
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
};

/**
 * Navigable folder tree derived from the archive's collections. Folder names and
 * item names come from the data, never from this component.
 */
export default function VaultTree({
  rootLabel,
  collections,
  selectedItemId,
  onSelectItem,
}: VaultTreeProps) {
  const [collapsed, setCollapsed] = useState<Set<VaultCollectionId>>(new Set());

  const toggleCollection = (id: VaultCollectionId) => {
    setCollapsed((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <nav aria-label="Course archive contents" className="flex flex-col gap-0.5">
      <div className="px-2 py-1 text-xs font-mono text-muted-foreground">
        {rootLabel}/
      </div>

      {collections.map((collection) => {
        const isOpen = !collapsed.has(collection.id);

        return (
          <div key={collection.id}>
            <button
              type="button"
              onClick={() => toggleCollection(collection.id)}
              aria-expanded={isOpen}
              className="flex items-center gap-1.5 w-full text-left pl-3 pr-2 py-1.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            >
              <span className="shrink-0 text-muted-foreground text-[10px] w-3 text-center">
                {isOpen ? "▾" : "▸"}
              </span>
              <span className="truncate">{collection.folderName}</span>
              <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                {collection.items.length}
              </span>
            </button>

            {isOpen && (
              <ul className="flex flex-col gap-0.5">
                {collection.items.map((item) => {
                  const isSelected = item.id === selectedItemId;

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onSelectItem(item.id)}
                        aria-current={isSelected ? "true" : undefined}
                        className={`flex items-center gap-1.5 w-full text-left pl-8 pr-2 py-1.5 rounded-md text-xs transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className="truncate font-mono">{item.fileName}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
