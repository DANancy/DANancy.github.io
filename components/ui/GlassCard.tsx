import { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlassCardProps extends ComponentProps<"div"> {
  href?: string;
  interactive?: boolean;
}

export function GlassCard({ href, interactive = Boolean(href), className, children, ...props }: GlassCardProps) {
  const classes = cn(
    "glass p-6 transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)]",
    interactive &&
      "hover:-translate-y-1 hover:glass-elevated hover:border-signal/30 cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
