import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-button px-6 py-3 text-body-md font-semibold transition-all duration-200 ease-[var(--ease-standard)] active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-void hover:brightness-110 hover:-translate-y-px",
  secondary:
    "border border-[var(--glass-border)] text-text-primary hover:bg-[var(--glass-fill)]",
  ghost: "text-signal-text hover:underline underline-offset-4",
};

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  href?: string;
}

export function Button({ variant = "primary", className, href, children, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
