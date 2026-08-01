import Link from "next/link";
import { simpleSections, worldLandmarks } from "@/content/world";

export function SimplePortfolio({ onExplore }: { onExplore: () => void }) {
  return <main className="simple-portfolio" id="main-content">
    <nav className="simple-nav" aria-label="Portfolio navigation"><Link href="/">YC</Link><div><a href="#about">About</a><a href="#projects">Projects</a><a href="#community">Community</a><Link href="/contact">Contact</Link></div></nav>
    <section className="simple-hero" id="about"><p className="world-eyebrow">Yangyang Cai</p><h1>AI-Powered Data Engineer</h1><h2>Board Member at Make AI Practical</h2><p>I build practical data and AI solutions across cloud platforms, enterprise data systems, analytics, automation, and community learning.</p><div className="simple-actions"><button className="world-primary-button" onClick={onExplore}>Explore my world</button><Link className="world-secondary-button" href="/projects">View projects</Link></div></section>
    <section className="simple-grid" aria-label="Profile themes">{simpleSections.map((section) => <article key={section.title}><h2>{section.title}</h2><p>{section.body}</p><ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</section>
    <section className="simple-projects" id="projects"><p className="world-eyebrow">Selected work & impact</p><h2>Ideas turned into systems</h2><div>{worldLandmarks.slice(1).map((item) => <article key={item.id} id={item.id === "map-board" ? "community" : undefined}><span>{item.symbol}</span><div><h3>{item.title}</h3><p>{item.summary}</p>{item.href && <Link href={item.href}>View details →</Link>}</div></article>)}</div></section>
    <footer className="simple-footer"><p>Data · AI · Energy · Creativity</p><Link href="/contact">Start a conversation →</Link></footer>
  </main>;
}
