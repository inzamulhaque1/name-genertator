"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const faqs = [
  {
    question: "What is URL encoding?",
    answer:
      "URL encoding (also called percent-encoding) converts special characters in a URL to a format that can be transmitted over the internet. Characters like spaces, ampersands, and question marks are replaced with a percent sign followed by their hexadecimal code.",
  },
  {
    question: "When should I URL encode?",
    answer:
      "You should URL encode any data that will be included in a URL query string, form submission, or API request. This includes spaces, special characters, and non-ASCII characters.",
  },
  {
    question: "What is the difference between encodeURI and encodeURIComponent?",
    answer:
      "encodeURI encodes a complete URI and preserves characters like ://?#@. encodeURIComponent encodes individual components and converts all special characters. This tool uses encodeURIComponent for maximum encoding.",
  },
  {
    question: "Is URL encoding the same as HTML encoding?",
    answer:
      "No. URL encoding uses percent signs (e.g., %20 for space) while HTML encoding uses ampersand-based entities (e.g., &amp; for &). They serve different purposes and are not interchangeable.",
  },
];

export function UrlClient() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const process = useCallback(() => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setError("Invalid input. Could not " + (mode === "encode" ? "encode" : "decode") + " the text.");
      setOutput("");
    }
  }, [mode, input]);

  const handleInputChange = (value: string) => {
    setInput(value);
    setError("");
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(value));
      } else {
        setOutput(decodeURIComponent(value));
      }
    } catch {
      setOutput("");
    }
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swap = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInput(output);
    setOutput(input);
    setError("");
  };

  return (
    <ToolPageLayout
      title="URL Encoder/Decoder"
      description="Encode and decode URL strings instantly. Convert special characters to and from percent-encoded format."
      slug="url-encoder-decoder"
      faqs={faqs}
      seoContent={
        <>
          <h2>About URL Encoding and Decoding</h2>
          <p>
            URL encoding is a mechanism for converting characters into a format that can be
            safely transmitted in a URL. Characters such as spaces, ampersands, and non-ASCII
            characters are replaced with percent-encoded equivalents (e.g., space becomes %20).
          </p>
          <h3>Common URL Encoded Characters</h3>
          <ul>
            <li>Space: %20 (or + in form data)</li>
            <li>Ampersand (&amp;): %26</li>
            <li>Equals (=): %3D</li>
            <li>Question mark (?): %3F</li>
            <li>Slash (/): %2F</li>
          </ul>
          <h3>When to Use URL Encoding</h3>
          <ul>
            <li>Passing data in URL query parameters</li>
            <li>Constructing API requests with special characters</li>
            <li>Encoding file paths in URLs</li>
            <li>Handling user input in web applications</li>
          </ul>
        </>
      }
    >
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setMode("encode"); setOutput(""); setError(""); }}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
            mode === "encode"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => { setMode("decode"); setOutput(""); setError(""); }}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
            mode === "decode"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Decode
        </button>
      </div>

      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {mode === "encode" ? "Text to Encode" : "URL-Encoded Text to Decode"}
        </label>
        <textarea
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          className="input w-full h-32 resize-y font-mono text-sm"
          placeholder={
            mode === "encode"
              ? "Enter text to encode (e.g., hello world & foo=bar)"
              : "Enter URL-encoded text (e.g., hello%20world%26foo%3Dbar)"
          }
        />
      </div>

      {/* Swap button */}
      <div className="flex justify-center mb-4">
        <button onClick={swap} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          Swap Input/Output
        </button>
      </div>

      {/* Output */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-slate-700">
            {mode === "encode" ? "Encoded Result" : "Decoded Result"}
          </label>
          {output && (
            <button onClick={copyOutput} className="copy-btn text-xs">
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        <textarea
          value={output}
          readOnly
          className="input w-full h-32 resize-y font-mono text-sm bg-slate-50"
          placeholder="Result will appear here..."
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button onClick={process} className="btn-primary w-full mt-4">
        {mode === "encode" ? "Encode" : "Decode"}
      </button>
    </ToolPageLayout>
  );
}
