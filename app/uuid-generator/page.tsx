import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { UuidClient } from "./UuidClient";

export const metadata: Metadata = createMetadata({
  title: "UUID Generator - Generate Random UUID/GUID Values",
  description:
    "Generate random UUID v4 values instantly. Bulk generate up to 100 UUIDs at once. Free online UUID/GUID generator for developers.",
  path: "/uuid-generator",
  keywords: [
    "uuid generator",
    "guid generator",
    "uuid v4 generator",
    "random uuid",
    "bulk uuid generator",
  ],
});

export default function UuidGeneratorPage() {
  return <UuidClient />;
}
