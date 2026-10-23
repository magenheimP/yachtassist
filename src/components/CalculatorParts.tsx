import { Dropdown } from "@/components/Dropdown";

// Building blocks shared by the vignette and tourist tax calculators.

export const fieldLabel = "block text-sm font-medium text-ink";
export const control =
  "w-full rounded-xl border border-transparent bg-surface-alt px-4 py-3 text-base text-ink transition placeholder:text-ink-soft/60 hover:border-border-soft focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 focus:outline-none";

export function CalculatorCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: (props: { className?: string }) => React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col rounded-3xl border border-border-soft/70 bg-white p-5 shadow-[0_1px_2px_rgb(10_34_51/0.04),0_20px_48px_-20px_rgb(10_34_51/0.18)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-cyan-600 text-white shadow-md shadow-cyan-600/25">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

// Pill toggle backed by real radio inputs, so it keeps keyboard and
// screen reader behaviour.
export function SegmentedControl<T extends string>({
  name,
  legend,
  value,
  onChange,
  options,
}: {
  name: string;
  legend: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <fieldset>
      <legend className={fieldLabel}>{legend}</legend>
      <div className="mt-2.5 grid auto-cols-fr grid-flow-col gap-1 rounded-xl bg-surface-alt p-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center justify-center rounded-lg px-3 py-2.5 text-sm font-semibold whitespace-nowrap text-ink-soft transition hover:text-ink has-[:checked]:bg-white has-[:checked]:text-cyan-700 has-[:checked]:shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cyan-500/40"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function SelectField<T extends string>({
  id,
  label,
  placeholder,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: T | "";
  onChange: (value: T) => void;
  options: { value: T; label: string; disabled?: boolean }[];
}) {
  return (
    <div>
      <span id={`${id}-label`} className={fieldLabel}>
        {label}
      </span>
      <Dropdown
        id={id}
        labelledBy={`${id}-label`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        options={options}
        className="mt-2.5"
        buttonClassName={control}
      />
    </div>
  );
}

// The price under each calculator's form. `amount` is null until the inputs
// are complete and valid; `message` explains why, `note` sits under a price.
export function PriceBox({
  label,
  amount,
  message,
  note,
}: {
  label: string;
  amount: string | null;
  message: string;
  note: string;
}) {
  return (
    <div
      aria-live="polite"
      className="relative mt-7 min-h-44 overflow-hidden rounded-2xl bg-linear-to-br from-navy-900 via-navy-900 to-navy-700 p-6 text-white ring-1 ring-white/10"
    >
      <div className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-cyan-500/30 blur-3xl" />
      <div className="relative">
        <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase">
          {label}
        </p>
        {/* Keyed on the amount so each new price fades in. */}
        <p
          key={amount ?? "empty"}
          className={`mt-3 text-4xl font-normal tracking-tight tabular-nums motion-safe:animate-pop sm:text-5xl ${amount ? "" : "text-white/30"}`}
        >
          {amount ?? "—"}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          {amount ? note : message}
        </p>
      </div>
    </div>
  );
}
