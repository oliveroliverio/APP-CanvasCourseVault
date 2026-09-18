import type { VaultCollection, VaultItem } from "../types";

type Block =
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "paragraph"; text: string };

/**
 * Minimal deterministic parser for the markdown subset the fixtures use:
 * `## ` headings, `- ` bullet lists, and blank-line-separated paragraphs.
 */
function parseBlocks(markdown: string): Block[] {
  const blocks: Block[] = [];
  let listItems: string[] = [];
  let paragraphLines: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ kind: "list", items: listItems });
      listItems = [];
    }
  };

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({ kind: "paragraph", text: paragraphLines.join(" ") });
      paragraphLines = [];
    }
  };

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();

    if (line === "") {
      flushList();
      flushParagraph();
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      flushParagraph();
      blocks.push({ kind: "heading", text: line.slice(3) });
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listItems.push(line.slice(2));
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushList();
  flushParagraph();

  return blocks;
}

type VaultItemViewProps = {
  collection: VaultCollection;
  item: VaultItem;
  archivePath: string;
};

/** Preview pane for the selected archive item. */
export default function VaultItemView({
  collection,
  item,
  archivePath,
}: VaultItemViewProps) {
  const blocks = parseBlocks(item.body);

  return (
    <article className="flex flex-col h-full overflow-hidden">
      <header className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted">
        <span className="text-xs font-mono text-foreground truncate">
          {archivePath}/{collection.folderName}/{item.fileName}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-5 md:p-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-muted-foreground bg-muted border border-border">
              {collection.label}
            </span>
            <span className="text-xs text-muted-foreground">
              Updated {item.updatedAt}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <h2 className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-foreground">
              {item.title}
            </h2>
            <p className="text-sm text-muted-foreground max-w-prose leading-relaxed">
              {item.summary}
            </p>
          </div>

          {item.details && item.details.length > 0 && (
            <dl className="flex flex-wrap gap-x-6 gap-y-2 rounded-lg border border-border bg-background px-4 py-3">
              {item.details.map((detail) => (
                <div key={detail.label} className="flex flex-col">
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                    {detail.label}
                  </dt>
                  <dd className="text-sm text-foreground">{detail.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="my-5 h-px w-full bg-border" />

        <div className="flex flex-col gap-2 max-w-prose">
          {blocks.map((block, index) => {
            if (block.kind === "heading") {
              return (
                <h3
                  key={index}
                  className="font-heading text-sm font-semibold tracking-tight text-foreground mt-3 first:mt-0"
                >
                  {block.text}
                </h3>
              );
            }

            if (block.kind === "list") {
              return (
                <ul key={index} className="flex flex-col gap-1 pl-5">
                  {block.items.map((listItem) => (
                    <li
                      key={listItem}
                      className="list-disc text-sm text-muted-foreground leading-relaxed"
                    >
                      {listItem}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <p
                key={index}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {block.text}
              </p>
            );
          })}
        </div>
      </div>
    </article>
  );
}
