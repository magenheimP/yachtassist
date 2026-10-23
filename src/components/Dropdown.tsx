"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

export type DropdownOption<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: (props: { className?: string }) => React.ReactNode;
};

function enabledOptions(list: HTMLElement | null) {
  return Array.from(
    list?.querySelectorAll<HTMLButtonElement>("[role=option]:not(:disabled)") ??
      [],
  );
}

// A select that takes the choice on the first tap. A native select opens the
// phone's own picker, which on iPhones only applies the choice after "Done",
// so this draws its own list under a button instead. Arrow keys move through
// the options (they're out of the tab order) and Enter or Space picks one;
// Escape, tapping outside, or tabbing away closes it. Name it with
// `labelledBy` (a visible label's id) or `label` (read by screen readers only).
export function Dropdown<T extends string>({
  id,
  labelledBy,
  label,
  value,
  placeholder,
  onChange,
  options,
  className,
  buttonClassName,
}: {
  id?: string;
  labelledBy?: string;
  label?: string;
  value: T | "";
  placeholder?: string;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  className?: string;
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const ownId = useId();
  const buttonId = id ?? ownId;
  const labelId = labelledBy ?? `${buttonId}-label`;
  const listId = `${buttonId}-list`;
  const selected = options.find((option) => option.value === value);
  const SelectedIcon = selected?.icon;

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    // Start on the current choice, with the whole list on screen.
    const items = enabledOptions(listRef.current);
    (
      items.find((item) => item.getAttribute("aria-selected") === "true") ??
      items[0]
    )?.focus();
    listRef.current?.scrollIntoView({ block: "nearest" });
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  return (
    <div
      ref={rootRef}
      className={`relative ${className ?? ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) close();
      }}
      // Only when focus lands somewhere else (tabbing away). Safari doesn't
      // focus tapped buttons, so tapping an option blurs with no target, and
      // closing then would swallow the tap; outside taps close it instead.
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setOpen(false);
      }}
    >
      {label && (
        <span id={labelId} className="sr-only">
          {label}
        </span>
      )}
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${buttonId}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(event) => {
          if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={`flex w-full items-center gap-3 text-left ${buttonClassName ?? ""}`}
      >
        {SelectedIcon && (
          <SelectedIcon className="h-5 w-5 shrink-0 text-cyan-600" />
        )}
        <span
          className={`min-w-0 flex-1 truncate ${selected ? "" : "text-ink-soft"}`}
        >
          {selected?.label ?? placeholder}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        hidden={!open}
        onKeyDown={(event) => {
          const items = enabledOptions(listRef.current);
          const index = items.indexOf(document.activeElement as HTMLButtonElement);
          const targets: Record<string, number> = {
            ArrowDown: index + 1,
            ArrowUp: index - 1,
            Home: 0,
            End: items.length - 1,
          };
          const next = targets[event.key];
          if (next === undefined) return;
          event.preventDefault();
          items[Math.min(Math.max(next, 0), items.length - 1)]?.focus();
        }}
        className="absolute inset-x-0 top-full z-20 mt-2 max-h-96 overflow-y-auto overscroll-contain rounded-2xl border border-border-soft bg-white p-1.5 shadow-xl shadow-navy-900/10"
      >
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={isSelected}
              tabIndex={-1}
              disabled={option.disabled}
              onClick={() => {
                onChange(option.value);
                close();
              }}
              className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[15px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-inset disabled:cursor-not-allowed disabled:text-ink-soft/50 ${
                isSelected
                  ? "bg-surface-alt font-semibold text-cyan-700"
                  : "font-medium text-ink enabled:hover:bg-surface-alt"
              }`}
            >
              {option.icon && (
                <option.icon className="h-5 w-5 shrink-0 text-cyan-600" />
              )}
              <span className="min-w-0">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
