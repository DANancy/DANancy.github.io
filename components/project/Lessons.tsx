interface Lesson {
  title: string;
  body: string;
}

export function Lessons({ items }: { items: Lesson[] }) {
  return (
    <ol className="flex flex-col gap-6">
      {items.map((l, i) => (
        <li key={i} className="flex gap-4">
          <span className="text-caption text-text-muted normal-case tracking-normal pt-1">{i + 1}</span>
          <div>
            <div className="text-display-md italic text-clay" style={{ fontSize: "1.25rem" }}>
              {l.title}
            </div>
            <p className="text-body-sm text-text-secondary mt-2 max-w-[680px]">{l.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
