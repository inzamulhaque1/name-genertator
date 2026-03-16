import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { JsonClient } from "./JsonClient";

export const metadata: Metadata = createMetadata({
  title: "JSON Formatter - Format, Validate & Beautify JSON",
  description:
    "Format, validate, and beautify JSON data online. Minify or pretty-print JSON with syntax error detection. Free JSON formatter and validator for developers.",
  path: "/json-formatter",
  keywords: [
    "json formatter",
    "json beautifier",
    "json validator",
    "json minifier",
    "format json online",
  ],
});

export default function JsonFormatterPage() {
  return <JsonClient />;
}
