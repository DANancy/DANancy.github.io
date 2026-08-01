import type { Metadata } from "next";
import { MagicalWorld } from "@/components/world/MagicalWorld";

export const metadata: Metadata = {
  title: "Fly Through My World",
  description: "Explore Yangyang Cai's work across data, AI, projects, and community leadership.",
};

export default function ExplorePage() {
  return <MagicalWorld />;
}
