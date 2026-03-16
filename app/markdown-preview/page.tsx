import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { MarkdownClient } from "./MarkdownClient";

export const metadata: Metadata = createMetadata({
  title: "Markdown Preview - Write and Preview Markdown Online",
  description:
    "Write Markdown and see a live preview side by side. Supports headings, bold, italic, lists, code blocks, links, and more. No external libraries needed.",
  path: "/markdown-preview",
  keywords: [
    "markdown preview",
    "markdown editor online",
    "markdown live preview",
    "markdown renderer",
    "markdown to html",
  ],
});

export default function MarkdownPreviewPage() {
  return <MarkdownClient />;
}
