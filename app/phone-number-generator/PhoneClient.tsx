"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { countries } from "@/data/countries";

const faqs = [
  {
    question: "Are these real phone numbers?",
    answer:
      "No. These are randomly generated phone numbers that follow the formatting patterns for the selected country. They are not connected to real phone lines.",
  },
  {
    question: "Can I call or text these numbers?",
    answer:
      "These numbers are randomly generated and should not be called or texted. They may or may not correspond to real phone numbers, and calling them could disturb someone.",
  },
  {
    question: "What countries are supported?",
    answer:
      "We support phone number formats for the United States, United Kingdom, Canada, Australia, Germany, France, Spain, Brazil, India, and Japan.",
  },
  {
    question: "Do the numbers include country codes?",
    answer:
      "Yes, each generated phone number includes both the local formatted number and the international prefix (country code) for the selected country.",
  },
];

function generatePhoneFromFormat(format: string): string {
  return format.replace(/N/g, () => String(Math.floor(Math.random() * 10)));
}

function generatePhones(countryCode: string, count: number): { local: string; full: string }[] {
  const country = countries.find((c) => c.code === countryCode);
  if (!country) return [];
  const results: { local: string; full: string }[] = [];
  for (let i = 0; i < count; i++) {
    const local = generatePhoneFromFormat(country.phoneFormat);
    results.push({
      local,
      full: `${country.phonePrefix} ${local}`,
    });
  }
  return results;
}

export function PhoneClient() {
  const [countryCode, setCountryCode] = useState("us");
  const [count, setCount] = useState(5);
  const [phones, setPhones] = useState(() => generatePhones("us", 5));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = useCallback(() => {
    setPhones(generatePhones(countryCode, count));
    setCopiedIndex(null);
  }, [countryCode, count]);

  const copyPhone = async (phone: string, index: number) => {
    await navigator.clipboard.writeText(phone);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(phones.map((p) => p.full).join("\n"));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const selectedCountry = countries.find((c) => c.code === countryCode);

  return (
    <ToolPageLayout
      title="Phone Number Generator"
      description="Generate random phone numbers with proper formatting for any supported country. For testing and development only."
      slug="phone-number-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>About the Phone Number Generator</h2>
          <p>
            Generate properly formatted random phone numbers for testing and development.
            Each number follows the formatting conventions of the selected country, including
            area codes and proper digit grouping.
          </p>
          <h3>Supported Formats</h3>
          <p>
            Our generator supports phone number formats for 10 countries including the US,
            UK, Canada, Australia, Germany, France, Spain, Brazil, India, and Japan. Each
            country uses its authentic phone number format and country code.
          </p>
          <h3>Important Notice</h3>
          <p>
            These phone numbers are randomly generated for testing purposes only. Do not use
            them to make calls or send messages, as they may correspond to real phone numbers.
          </p>
        </>
      }
    >
      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="input w-full"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name} ({c.phonePrefix})
              </option>
            ))}
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
        Generate Phone Numbers
      </button>

      {/* Results */}
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">
            {phones.length} numbers generated {selectedCountry && `(${selectedCountry.name})`}
          </span>
          <button onClick={copyAll} className="copy-btn text-xs">
            {copiedIndex === -1 ? "Copied!" : "Copy All"}
          </button>
        </div>
        {phones.map((phone, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-2"
          >
            <div>
              <span className="font-mono text-slate-800">{phone.full}</span>
              <span className="text-xs text-slate-400 ml-2">({phone.local})</span>
            </div>
            <button
              onClick={() => copyPhone(phone.full, i)}
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
