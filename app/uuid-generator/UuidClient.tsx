"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const faqs = [
  {
    question: "What is a UUID?",
    answer:
      "A UUID (Universally Unique Identifier) is a 128-bit identifier that is guaranteed to be unique across space and time. UUIDs are commonly used in software development as database primary keys, session identifiers, and distributed system identifiers.",
  },
  {
    question: "What is UUID v4?",
    answer:
      "UUID v4 is a version of UUID that is generated using random or pseudo-random numbers. It has 122 bits of randomness, making collisions extremely unlikely. The format is xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, where 4 indicates the version and y is one of 8, 9, a, or b.",
  },
  {
    question: "Are UUIDs truly unique?",
    answer:
      "While not mathematically impossible to have a collision, the probability is astronomically small. With 122 random bits, you would need to generate about 2.71 quintillion UUIDs to have a 50% chance of a single collision.",
  },
  {
    question: "What is the difference between UUID and GUID?",
    answer:
      "UUID (Universally Unique Identifier) and GUID (Globally Unique Identifier) refer to the same concept. GUID is the term used primarily by Microsoft, while UUID is the term used in the broader industry and defined by RFC 4122.",
  },
  {
    question: "Can I use these UUIDs in production?",
    answer:
      "Yes. The UUIDs are generated using crypto.randomUUID() which provides cryptographically secure random values. They are suitable for use as database keys, API identifiers, and any other purpose requiring unique identifiers.",
  },
];

function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function UuidClient() {
  const [uuids, setUuids] = useState<string[]>(() => [generateUUID()]);
  const [count, setCount] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = useCallback(() => {
    const newUuids: string[] = [];
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID());
    }
    setUuids(newUuids);
    setCopiedIndex(null);
    setCopiedAll(false);
  }, [count]);

  const copyOne = async (uuid: string, index: number) => {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <ToolPageLayout
      title="UUID Generator"
      description="Generate random UUID v4 values instantly. Bulk generate up to 100 UUIDs at once for your development needs."
      slug="uuid-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>What is a UUID Generator?</h2>
          <p>
            A UUID generator creates universally unique identifiers following the RFC 4122
            standard. UUIDs are 128-bit values typically represented as 32 hexadecimal
            characters separated by hyphens in the format
            xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
          </p>
          <h3>UUID Versions</h3>
          <p>
            There are several versions of UUIDs. This tool generates Version 4 (random)
            UUIDs, which are the most commonly used in modern software development. V4 UUIDs
            derive their uniqueness from 122 bits of cryptographically secure random data.
          </p>
          <h3>Common Use Cases</h3>
          <ul>
            <li>Database primary keys in distributed systems</li>
            <li>Session and transaction identifiers</li>
            <li>Unique filenames and resource identifiers</li>
            <li>API request tracking and correlation IDs</li>
            <li>Message queue deduplication keys</li>
          </ul>
        </>
      }
    >
      {/* Controls */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Number of UUIDs
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) =>
              setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))
            }
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm w-24 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
        <button onClick={generate} className="btn-primary">
          Generate
        </button>
        {uuids.length > 1 && (
          <button
            onClick={copyAll}
            className={`copy-btn border border-slate-300 px-3 py-2 text-sm rounded-lg ${copiedAll ? "copied" : ""}`}
          >
            {copiedAll ? "Copied All!" : "Copy All"}
          </button>
        )}
      </div>

      {/* UUID List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {uuids.map((uuid, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2"
          >
            <code className="flex-1 font-mono text-sm select-all">{uuid}</code>
            <button
              onClick={() => copyOne(uuid, i)}
              className={`copy-btn shrink-0 text-xs ${copiedIndex === i ? "copied" : ""}`}
            >
              {copiedIndex === i ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </ToolPageLayout>
  );
}
