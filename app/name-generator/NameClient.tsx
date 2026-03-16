"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { names as usNames } from "@/data/names/us";
import { names as ukNames } from "@/data/names/uk";
import { names as caNames } from "@/data/names/ca";
import { names as deNames } from "@/data/names/de";

const nameData: Record<string, typeof usNames> = {
  us: usNames,
  uk: ukNames,
  ca: caNames,
  de: deNames,
};

const countryOptions = [
  { code: "us", label: "United States", flag: "US" },
  { code: "uk", label: "United Kingdom", flag: "UK" },
  { code: "ca", label: "Canada", flag: "CA" },
  { code: "de", label: "Germany", flag: "DE" },
];

const faqs = [
  {
    question: "Are these real names?",
    answer:
      "The names are drawn from real-world naming data for each country. They are common first and last names combined randomly, so while each part is real, the full name combination is randomly generated.",
  },
  {
    question: "Can I use these names for testing?",
    answer:
      "Yes! These randomly generated names are perfect for populating test databases, creating sample user data, filling out forms during development, and any scenario where you need realistic-looking names.",
  },
  {
    question: "How many unique names can be generated?",
    answer:
      "Each country has over 100 first names per gender and over 100 last names, giving you tens of thousands of unique name combinations per country.",
  },
  {
    question: "Do the names match the country selected?",
    answer:
      "Yes, each country has its own pool of culturally appropriate first and last names. For example, Germany uses German names like Hans, Felix, and Mueller.",
  },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNames(
  country: string,
  gender: "male" | "female" | "any",
  count: number
): string[] {
  const data = nameData[country] || usNames;
  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    const g = gender === "any" ? (Math.random() > 0.5 ? "male" : "female") : gender;
    const first = pickRandom(data[g]);
    const last = pickRandom(data.last);
    results.push(`${first} ${last}`);
  }
  return results;
}

export function NameClient() {
  const [country, setCountry] = useState("us");
  const [gender, setGender] = useState<"male" | "female" | "any">("any");
  const [count, setCount] = useState(5);
  const [names, setNames] = useState<string[]>(() => generateNames("us", "any", 5));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = useCallback(() => {
    setNames(generateNames(country, gender, count));
    setCopiedIndex(null);
  }, [country, gender, count]);

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
      title="Random Name Generator"
      description="Generate random realistic names from multiple countries. Perfect for testing, development, and creative projects."
      slug="name-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>About the Random Name Generator</h2>
          <p>
            Our random name generator creates realistic full names from real-world naming data
            across multiple countries. Whether you need test data for your application, sample
            names for a design mockup, or character names for creative writing, this tool
            provides culturally appropriate names instantly.
          </p>
          <h3>Supported Countries</h3>
          <p>
            Generate names from the United States, United Kingdom, Canada, and Germany. Each
            country has its own pool of first and last names that reflect common naming patterns
            in that region.
          </p>
          <h3>Use Cases</h3>
          <ul>
            <li>Populating test databases with realistic user data</li>
            <li>Creating sample data for UI/UX design mockups</li>
            <li>Generating character names for writing projects</li>
            <li>Filling out forms during software testing</li>
          </ul>
        </>
      }
    >
      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="input w-full"
          >
            {countryOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female" | "any")}
            className="input w-full"
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
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
      </div>

      <button onClick={generate} className="btn-primary w-full mb-6">
        Generate Names
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
              className="copy-btn text-xs"
            >
              {copiedIndex === i ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </ToolPageLayout>
  );
}
