interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lede?: string;
}

export function PageHero({ eyebrow, title, lede }: PageHeroProps) {
  return (
    <div className="pt-16 pb-12 max-w-[720px]">
      {eyebrow && <div className="text-caption text-signal-text mb-4">{eyebrow}</div>}
      <h1 className="text-heading-lg text-text-primary">{title}</h1>
      {lede && <p className="text-body-lg text-text-secondary mt-4">{lede}</p>}
    </div>
  );
}
