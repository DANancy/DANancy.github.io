import Link from "next/link";
import "@/components/world/world.css";

export default function NotFound() {
  return (
    <main className="simple-portfolio grid min-h-[100dvh] place-items-center px-6 text-center">
      <section>
        <p className="world-eyebrow">Lost in the mist</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl">This path has drifted away.</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg">Return to the floating world and keep exploring.</p>
        <Link className="world-primary-button mt-8" href="/">Fly home →</Link>
      </section>
    </main>
  );
}
