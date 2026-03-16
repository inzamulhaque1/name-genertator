"use client";

import { useState, useMemo } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const faqs = [
  {
    question: "What Markdown syntax is supported?",
    answer:
      "This editor supports headings (# to ######), bold (**text**), italic (*text*), inline code (`code`), code blocks (```), links ([text](url)), unordered lists (- item), ordered lists (1. item), blockquotes (> text), horizontal rules (---), and images (![alt](url)).",
  },
  {
    question: "Can I export the HTML output?",
    answer:
      "Currently you can copy the rendered HTML by selecting the preview content. A dedicated export feature may be added in the future.",
  },
  {
    question: "Does it support GitHub Flavored Markdown?",
    answer:
      "This is a simplified Markdown parser that covers the most common syntax. Some advanced GFM features like tables, task lists, and strikethrough are not yet supported.",
  },
  {
    question: "Is my text saved anywhere?",
    answer:
      "No. All text is processed entirely in your browser and is not saved or sent to any server. If you refresh the page, your text will be reset to the default example.",
  },
];

const DEFAULT_MARKDOWN = `# Markdown Preview

## Getting Started

This is a **live preview** of your *Markdown* text. Edit the left panel to see changes instantly.

### Features

- **Bold text** with double asterisks
- *Italic text* with single asterisks
- \`Inline code\` with backticks
- [Links](https://example.com) with brackets

### Code Block

\`\`\`
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists

1. First ordered item
2. Second ordered item
3. Third ordered item

- Unordered item one
- Unordered item two
- Unordered item three

> This is a blockquote. It can span
> multiple lines.

---

That's a horizontal rule above. Happy writing!
`;

function parseMarkdown(md: string): string {
  let html = md;

  // Escape HTML entities
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="bg-slate-800 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm my-3"><code>${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');

  // Headings
  html = html.replace(/^###### (.+)$/gm, '<h6 class="text-sm font-bold text-slate-800 mt-4 mb-2">$1</h6>');
  html = html.replace(/^##### (.+)$/gm, '<h5 class="text-base font-bold text-slate-800 mt-4 mb-2">$1</h5>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="text-lg font-bold text-slate-800 mt-4 mb-2">$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-slate-800 mt-5 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-slate-800 mt-6 mb-3">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-slate-900 mt-6 mb-3">$1</h1>');

  // Horizontal rule
  html = html.replace(/^---+$/gm, '<hr class="border-slate-200 my-4" />');

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-indigo-300 pl-4 text-slate-600 italic my-2">$1</blockquote>');

  // Images (before links to avoid conflict)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded my-2" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-600 underline hover:text-indigo-800" target="_blank" rel="noopener noreferrer">$1</a>');

  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>');

  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-5 list-disc text-slate-700">$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-5 list-decimal text-slate-700">$1</li>');

  // Wrap consecutive <li> elements in <ul> or <ol>
  html = html.replace(/((?:<li class="ml-5 list-disc[^>]*>.*<\/li>\n?)+)/g, '<ul class="my-2">$1</ul>');
  html = html.replace(/((?:<li class="ml-5 list-decimal[^>]*>.*<\/li>\n?)+)/g, '<ol class="my-2">$1</ol>');

  // Paragraphs: wrap lines that are not already wrapped in HTML tags
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p class="text-slate-700 my-2">${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");

  return html;
}

export function MarkdownClient() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const rendered = useMemo(() => parseMarkdown(markdown), [markdown]);

  return (
    <ToolPageLayout
      title="Markdown Preview"
      description="Write Markdown and see a live preview side by side. Supports common Markdown syntax with no external dependencies."
      slug="markdown-preview"
      faqs={faqs}
      seoContent={
        <>
          <h2>About the Markdown Preview</h2>
          <p>
            This Markdown editor provides a real-time side-by-side preview of your Markdown
            text. It uses a lightweight regex-based parser that runs entirely in your browser,
            with no external dependencies or server processing.
          </p>
          <h3>Supported Syntax</h3>
          <ul>
            <li>Headings (# through ######)</li>
            <li>Bold (**text**) and Italic (*text*)</li>
            <li>Inline code and fenced code blocks</li>
            <li>Links and images</li>
            <li>Ordered and unordered lists</li>
            <li>Blockquotes and horizontal rules</li>
          </ul>
          <h3>Use Cases</h3>
          <ul>
            <li>Previewing README files before committing</li>
            <li>Drafting documentation and blog posts</li>
            <li>Learning Markdown syntax interactively</li>
            <li>Quick note-taking with formatted preview</li>
          </ul>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Markdown</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="input w-full h-96 resize-y font-mono text-sm"
            placeholder="Write your Markdown here..."
          />
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preview</label>
          <div
            className="bg-white border border-slate-200 rounded-lg p-4 h-96 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        </div>
      </div>
    </ToolPageLayout>
  );
}
