import { cn } from "@/lib/utils";

interface PillProps {
  children: React.ReactNode;
  dotColor?: string;
  active?: boolean;
  className?: string;
}

export function Pill({ children, dotColor, active, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-caption transition-colors duration-[var(--duration-fast)]",
        active
          ? "border-signal/50 bg-signal/10 text-signal-text"
          : "border-[var(--glass-border)] bg-[var(--glass-fill)] text-text-secondary",
        className
      )}
    >
      {dotColor && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </span>
  );
}
