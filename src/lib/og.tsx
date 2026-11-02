import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

// Shared 1200×630 social card: character on the left, title copy on the right.
export async function renderOgCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const character = await readFile(join(process.cwd(), "assets/yangyang-character.jpg"), "base64");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#f4f6f3", padding: "60px 72px", gap: 56 }}>
        <div style={{ display: "flex", width: 380, height: 380, borderRadius: 48, background: "#ffffff", border: "6px solid #276f52", overflow: "hidden", flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/jpeg;base64,${character}`} width={380} height={360} alt="" style={{ objectFit: "cover", marginTop: 10 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 28, color: "#276f52", fontWeight: 600, letterSpacing: 1 }}>{eyebrow}</div>
          <div style={{ fontSize: 64, color: "#16211c", fontWeight: 700, lineHeight: 1.08, marginTop: 18 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#4a5a52", lineHeight: 1.35, marginTop: 24 }}>{subtitle}</div>
          <div style={{ fontSize: 26, color: "#276f52", marginTop: 36 }}>yangyangcai.me</div>
        </div>
      </div>
    ),
    ogSize,
  );
}

// Generated at build time by src/app/og/*/route.tsx; served as static .png files.
export const defaultOgImage = { url: "/og/default.png", width: 1200, height: 630, alt: "Yangyang Cai — Senior Data Engineer and practical AI builder in Melbourne" };
export const greenCertificateOgImage = { url: "/og/green-certificate.png", width: 1200, height: 630, alt: "Australian Green Certificate Shortfall Analytics — a data engineering case study by Yangyang Cai" };
