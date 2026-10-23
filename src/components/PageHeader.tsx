export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b border-border-soft bg-surface-alt">
      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
        <p className="text-xs font-semibold tracking-[0.14em] text-cyan-600 uppercase sm:text-sm sm:tracking-[0.2em]">
          {kicker}
        </p>
        <h1 className="mt-3 text-[2rem]/[1.15] font-normal tracking-tight text-ink sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 text-lg leading-relaxed text-ink-soft sm:mt-5">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
