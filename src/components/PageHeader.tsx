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
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold tracking-[0.2em] text-cyan-600 uppercase">
          {kicker}
        </p>
        <h1 className="mt-3 text-4xl font-normal tracking-tight text-ink sm:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
