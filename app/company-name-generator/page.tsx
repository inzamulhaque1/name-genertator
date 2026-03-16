import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { CompanyClient } from "./CompanyClient";

export const metadata: Metadata = createMetadata({
  title: "Company Name Generator - Generate Business Names",
  description:
    "Generate creative random company and business names instantly. Combines professional prefixes and suffixes for realistic-sounding business names.",
  path: "/company-name-generator",
  keywords: [
    "company name generator",
    "business name generator",
    "random company name",
    "startup name generator",
    "fake company name",
  ],
});

export default function CompanyNamePage() {
  return <CompanyClient />;
}
