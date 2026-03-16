import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { NameClient } from "./NameClient";

export const metadata: Metadata = createMetadata({
  title: "Random Name Generator - Generate Realistic Names",
  description:
    "Generate random realistic names from the US, UK, Canada, and Germany. Choose gender, country, and generate multiple names at once for testing and development.",
  path: "/name-generator",
  keywords: [
    "random name generator",
    "fake name generator",
    "name generator online",
    "random person name",
    "test name generator",
  ],
});

export default function NameGeneratorPage() {
  return <NameClient />;
}
