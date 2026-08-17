import { Link } from "@/i18n/navigation";

// Renders the constrained plain-text format articles are authored in:
// "## " headings, "- " / "1. " list items, blank-line separated paragraphs,
// and [text](/relative-link) links. Deliberately not a full Markdown parser —
// admin-authored content only needs this much structure, and it keeps the
// render path free of dangerouslySetInnerHTML.
export function ArticleBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\n+/);

  return (
    <div className="prose-content space-y-4">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim());

        if (lines[0].startsWith("## ")) {
          return (
            <h2 key={i} className="text-xl font-semibold mt-8 first:mt-0">
              {lines[0].slice(3)}
            </h2>
          );
        }

        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }

        if (lines.every((l) => /^\d+\.\s/.test(l))) {
          return (
            <ol key={i} className="list-decimal space-y-2 pl-5">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(/^\d+\.\s/, ""))}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={i} className="text-black/80 dark:text-white/80">
            {renderInline(lines.join(" "))}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <span key={i}>{part}</span>;

    const [, label, href] = match;
    return (
      <Link
        key={i}
        href={href as "/guide" | "/procedures" | "/laws" | "/fuel-price"}
        className="underline underline-offset-2 hover:no-underline"
      >
        {label}
      </Link>
    );
  });
}
