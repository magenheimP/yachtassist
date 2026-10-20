import { Link } from "@/i18n/navigation";

// Renders the constrained plain-text format articles are authored in:
// "## " headings, "- " / "1. " list items, blank-line separated paragraphs,
// **bold** text, and [text](/relative-link) links. Deliberately not a full
// Markdown parser — admin-authored content only needs this much structure,
// and it keeps the render path free of dangerouslySetInnerHTML.
export function ArticleBody({ body }: { body: string }) {
  // Normalize CRLF so blocks still split on rows saved with Windows line breaks.
  const blocks = body.replace(/\r\n?/g, "\n").trim().split(/\n\n+/);

  return (
    <div className="space-y-5 text-[17px]">
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim());

        if (lines[0].startsWith("## ")) {
          return (
            <h2
              key={i}
              className="mt-10 border-l-2 border-cyan-500 pl-4 text-2xl font-medium tracking-tight text-ink first:mt-0"
            >
              {lines[0].slice(3)}
            </h2>
          );
        }

        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 marker:text-cyan-500">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.slice(2))}</li>
              ))}
            </ul>
          );
        }

        if (lines.every((l) => /^\d+\.\s/.test(l))) {
          return (
            <ol key={i} className="list-decimal space-y-2 pl-5 marker:text-cyan-600 marker:font-semibold">
              {lines.map((l, j) => (
                <li key={j}>{renderInline(l.replace(/^\d+\.\s/, ""))}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={i} className="leading-relaxed text-ink-soft">
            {renderInline(lines.join(" "))}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);

  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const className =
        "font-medium text-cyan-700 underline decoration-cyan-300 underline-offset-2 hover:text-cyan-600";

      // Links to files (e.g. /documents/law-on-yachts.pdf) are static
      // downloads, not locale routes, so skip the i18n Link.
      if (/\.[a-z0-9]+$/i.test(href)) {
        return (
          <a key={i} href={href} download className={className}>
            {label}
          </a>
        );
      }

      return (
        <Link
          key={i}
          href={href as "/procedures" | "/laws" | "/fuel-price"}
          className={className}
        >
          {label}
        </Link>
      );
    }

    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {boldMatch[1]}
        </strong>
      );
    }

    return <span key={i}>{part}</span>;
  });
}
