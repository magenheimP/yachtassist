// Two-line uppercase wordmark, used in the header and the footer. Colours
// come from the caller: `className` for the main line, `accentClassName` for
// "Montenegro".
export function SiteLogo({
  className = "",
  accentClassName = "text-cyan-600",
}: {
  className?: string;
  accentClassName?: string;
}) {
  return (
    <span className={`block leading-none ${className}`}>
      <span className="block text-[13px] font-semibold tracking-[0.2em] uppercase max-[359px]:tracking-[0.12em] sm:text-base sm:tracking-[0.24em]">
        Yacht Assist
      </span>
      <span
        className={`mt-1.5 block text-[9px] font-medium tracking-[0.46em] uppercase sm:text-[10px] sm:tracking-[0.5em] ${accentClassName}`}
      >
        Montenegro
      </span>
    </span>
  );
}
