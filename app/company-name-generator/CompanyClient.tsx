"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { companyPrefixes, companySuffixes } from "@/data/companies";

const faqs = [
  {
    question: "Are these real company names?",
    answer:
      "These are randomly generated names that combine professional-sounding prefixes and suffixes. While any given name could coincidentally match a real company, they are generated randomly and not based on existing businesses.",
  },
  {
    question: "Can I use these names for my business?",
    answer:
      "These names are meant for inspiration and testing. If you want to use one for a real business, you should check trademark databases and business registries to ensure the name is not already taken.",
  },
  {
    question: "How are the names generated?",
    answer:
      "Each name is created by combining a random prefix (like 'Apex', 'Nova', or 'Quantum') with a random suffix (like 'Solutions', 'Technologies', or 'Labs') to create professional-sounding business names.",
  },
  {
    question: "How many unique names can be generated?",
    answer:
      "With over 50 prefixes and 30 suffixes, there are more than 1,500 unique combinations possible, giving you plenty of options to choose from.",
  },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCompanyNames(count: number): string[] {
  return Array.from({ length: count }, () => {
    const prefix = pickRandom(companyPrefixes);
    const suffix = pickRandom(companySuffixes);
    return `${prefix} ${suffix}`;
  });
}

export function CompanyClient() {
  const [count, setCount] = useState(10);
  const [names, setNames] = useState<string[]>(() => generateCompanyNames(10));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = useCallback(() => {
    setNames(generateCompanyNames(count));
    setCopiedIndex(null);
  }, [count]);

  const copyName = async (name: string, index: number) => {
    await navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(names.join("\n"));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolPageLayout
      title="Company Name Generator"
      description="Generate creative random company and business names. Perfect for brainstorming, testing, and placeholder data."
      slug="company-name-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>About the Company Name Generator</h2>
          <p>
            Our company name generator creates professional-sounding business names by
            combining carefully curated prefixes and suffixes. Whether you need placeholder
            data for testing, inspiration for a new venture, or sample company names for
            a presentation, this tool delivers instantly.
          </p>
          <h3>Name Components</h3>
          <p>
            Each generated name combines a strong prefix word (like Apex, Nova, Quantum, or
            Phoenix) with a professional suffix (like Solutions, Technologies, Labs, or
            Ventures) to create names that sound like real businesses.
          </p>
          <h3>Use Cases</h3>
          <ul>
            <li>Brainstorming business name ideas</li>
            <li>Creating sample data for business applications</li>
            <li>Populating test databases with company records</li>
            <li>Generating placeholder names for mockups and designs</li>
          </ul>
        </>
      }
    >
      {/* Options */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Count ({count})
        </label>
        <input
          type="range"
          min={1}
          max={20}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
      </div>

      <button onClick={generate} className="btn-primary w-full mb-6">
        Generate Company Names
      </button>

      {/* Results */}
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">{names.length} names generated</span>
          <button onClick={copyAll} className="copy-btn text-xs">
            {copiedIndex === -1 ? "Copied!" : "Copy All"}
          </button>
        </div>
        {names.map((name, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-2"
          >
            <span className="font-medium text-slate-800">{name}</span>
            <button
              onClick={() => copyName(name, i)}
              className="copy-btn text-xs shrink-0 ml-3"
            >
              {copiedIndex === i ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </ToolPageLayout>
  );
}
