"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const faqs = [
  {
    question: "What does this JSON formatter do?",
    answer:
      "This tool takes raw JSON data and formats it with proper indentation, making it easy to read. It can also validate JSON syntax, minify JSON by removing whitespace, and highlight errors in malformed JSON.",
  },
  {
    question: "What is the difference between format and minify?",
    answer:
      "Formatting (beautifying) adds indentation and newlines to make JSON human-readable. Minifying removes all unnecessary whitespace to make the JSON as compact as possible, which is useful for reducing data transfer sizes.",
  },
  {
    question: "Why is my JSON invalid?",
    answer:
      "Common causes of invalid JSON include: trailing commas after the last item in arrays or objects, single quotes instead of double quotes, unquoted property names, comments (JSON does not support comments), and missing or extra brackets/braces.",
  },
  {
    question: "Is my JSON data secure?",
    answer:
      "Yes. All processing happens entirely in your browser. Your JSON data is never sent to any server. You can verify this by disconnecting from the internet and using the tool offline.",
  },
  {
    question: "What is the maximum JSON size supported?",
    answer:
      "Since processing happens in your browser, the limit depends on your device's memory. Most modern browsers can handle JSON files up to several megabytes without issues.",
  },
];

export function JsonClient() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setOutput("");
      setError(null);
      setOutput("Valid JSON!");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    const sample = JSON.stringify(
      {
        name: "John Doe",
        age: 30,
        email: "john@example.com",
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
        },
        hobbies: ["reading", "coding", "hiking"],
        isActive: true,
      },
      null,
      2
    );
    setInput(sample);
    setOutput("");
    setError(null);
  };

  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="Format, validate, and beautify JSON data. Minify or pretty-print JSON with instant syntax error detection."
      slug="json-formatter"
      faqs={faqs}
      seoContent={
        <>
          <h2>What is JSON?</h2>
          <p>
            JSON (JavaScript Object Notation) is a lightweight data interchange format that
            is easy for humans to read and write, and easy for machines to parse and
            generate. It has become the de facto standard for data exchange on the web,
            used in REST APIs, configuration files, and data storage.
          </p>
          <h3>Why Format JSON?</h3>
          <p>
            Raw JSON from APIs or logs is often minified (compressed onto a single line),
            making it extremely difficult to read. A JSON formatter adds proper indentation
            and line breaks so you can quickly understand the structure and find specific
            values. This is invaluable during debugging and API development.
          </p>
          <h3>JSON Syntax Rules</h3>
          <ul>
            <li>Data is in name/value pairs, separated by commas</li>
            <li>Objects are enclosed in curly braces and arrays in square brackets</li>
            <li>Strings must use double quotes (not single quotes)</li>
            <li>No trailing commas are allowed after the last element</li>
            <li>Comments are not supported in standard JSON</li>
            <li>Values can be strings, numbers, booleans, null, objects, or arrays</li>
          </ul>
        </>
      }
    >
      {/* Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={formatJson} className="btn-primary">
          Format
        </button>
        <button
          onClick={minifyJson}
          className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
        >
          Minify
        </button>
        <button
          onClick={validateJson}
          className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer"
        >
          Validate
        </button>
        <button
          onClick={loadSample}
          className="px-4 py-2 rounded-lg text-sm font-semibold border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50 transition cursor-pointer ml-auto"
        >
          Load Sample
        </button>
      </div>

      {/* Input / Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Input</label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
            }}
            placeholder="Paste your JSON here..."
            className="w-full h-72 border border-slate-300 rounded-lg px-3 py-2 font-mono text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
            spellCheck={false}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-slate-700">Output</label>
            {output && (
              <button
                onClick={copyOutput}
                className={`copy-btn text-xs ${copied ? "copied" : ""}`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            className="w-full h-72 border border-slate-300 rounded-lg px-3 py-2 font-mono text-sm bg-slate-50 outline-none resize-none"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          <span className="font-semibold">Error: </span>
          {error}
        </div>
      )}

      {/* Valid */}
      {output === "Valid JSON!" && !error && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-700">
          Your JSON is valid!
        </div>
      )}
    </ToolPageLayout>
  );
}
