"use client";

import { useState } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const faqs = [
  {
    question: "What can I encode in a QR code?",
    answer:
      "QR codes can encode URLs, plain text, email addresses, phone numbers, Wi-Fi credentials, and more. Simply enter the text or URL you want to encode.",
  },
  {
    question: "Is there a character limit for QR codes?",
    answer:
      "Yes, QR codes have a maximum capacity depending on the error correction level. Generally, you can encode up to about 3,000 alphanumeric characters or 7,000 numeric digits.",
  },
  {
    question: "Can I customize the QR code appearance?",
    answer:
      "The full QR code generation feature with customization options is coming soon. Currently, this tool provides a preview of the text that will be encoded.",
  },
  {
    question: "Are QR codes free to use?",
    answer:
      "Yes, QR codes are an open standard and free to generate and use. There are no licensing fees or restrictions on their use.",
  },
];

export function QrClient() {
  const [text, setText] = useState("https://example.com");
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="QR Code Generator"
      description="Generate QR codes from any text or URL. Enter your content below to create a QR code."
      slug="qr-code-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>About QR Code Generation</h2>
          <p>
            QR (Quick Response) codes are two-dimensional barcodes that can store text, URLs,
            and other data. They are widely used for sharing links, contact information,
            Wi-Fi credentials, and payment information.
          </p>
          <h3>Common QR Code Uses</h3>
          <ul>
            <li>Sharing website URLs and deep links</li>
            <li>Encoding contact information (vCards)</li>
            <li>Wi-Fi network credentials for easy connection</li>
            <li>Payment and transaction information</li>
            <li>Event tickets and boarding passes</li>
          </ul>
          <h3>Tips for QR Codes</h3>
          <ul>
            <li>Shorter text produces simpler, more easily scannable codes</li>
            <li>Always test your QR code with multiple scanning apps</li>
            <li>Use URL shorteners for long URLs to improve scan reliability</li>
          </ul>
        </>
      }
    >
      {/* Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Text or URL to encode
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input w-full h-24 resize-y font-mono text-sm"
          placeholder="Enter text or URL..."
        />
      </div>

      {/* QR Code Preview */}
      <div className="flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 mb-6">
        <div className="w-48 h-48 bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center p-4 mb-4">
          {/* Decorative QR-like pattern */}
          <div className="grid grid-cols-7 gap-0.5 mb-3">
            {Array.from({ length: 49 }, (_, i) => {
              const row = Math.floor(i / 7);
              const col = i % 7;
              // Create QR-like corner patterns
              const isCorner =
                (row < 3 && col < 3) ||
                (row < 3 && col > 3) ||
                (row > 3 && col < 3);
              const isFilled = isCorner || Math.random() > 0.5;
              return (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-sm ${isFilled ? "bg-slate-800" : "bg-slate-100"}`}
                />
              );
            })}
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-indigo-600 mb-1">
            QR Code generation coming soon
          </p>
          <p className="text-xs text-slate-500 max-w-xs">
            Full QR code generation with download support will be added in a future update.
          </p>
        </div>
      </div>

      {/* Text Preview */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700">Content to encode:</span>
          <button onClick={copyText} className="copy-btn text-xs">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="font-mono text-sm text-slate-600 break-all">{text || "(empty)"}</p>
        <p className="text-xs text-slate-400 mt-2">{text.length} characters</p>
      </div>
    </ToolPageLayout>
  );
}
