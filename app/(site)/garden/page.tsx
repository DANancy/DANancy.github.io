import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { GardenIndexClient } from "@/components/garden/GardenIndexClient";

export const metadata: Metadata = {
  title: "Garden",
  description: "Learning notes on AI, system design, Azure, Databricks, and everything in between — public, messy, and always growing.",
};

export default function GardenPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Knowledge Garden"
        title="Garden"
        lede="Not a blog. Learning notes that grow over time — seedlings, growing, and evergreen."
      />
      <Suspense fallback={null}>
        <GardenIndexClient />
      </Suspense>
    </div>
  );
}
