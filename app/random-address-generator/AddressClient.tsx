"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { addresses as usAddresses } from "@/data/addresses/us";
import { addresses as ukAddresses } from "@/data/addresses/uk";
import { addresses as caAddresses } from "@/data/addresses/ca";
import { addresses as deAddresses } from "@/data/addresses/de";
import { addresses as frAddresses } from "@/data/addresses/fr";
import { addresses as esAddresses } from "@/data/addresses/es";
import { addresses as brAddresses } from "@/data/addresses/br";
import { addresses as inAddresses } from "@/data/addresses/in";
import { addresses as jpAddresses } from "@/data/addresses/jp";
import { addresses as auAddresses } from "@/data/addresses/au";

const addressData: Record<string, typeof usAddresses> = {
  us: usAddresses,
  uk: ukAddresses,
  ca: caAddresses,
  de: deAddresses,
  fr: frAddresses,
  es: esAddresses,
  br: brAddresses,
  in: inAddresses,
  jp: jpAddresses,
  au: auAddresses,
};

const countryOptions = [
  { code: "us", label: "🇺🇸 United States" },
  { code: "uk", label: "🇬🇧 United Kingdom" },
  { code: "ca", label: "🇨🇦 Canada" },
  { code: "de", label: "🇩🇪 Germany" },
  { code: "fr", label: "🇫🇷 France" },
  { code: "es", label: "🇪🇸 Spain" },
  { code: "br", label: "🇧🇷 Brazil" },
  { code: "in", label: "🇮🇳 India" },
  { code: "jp", label: "🇯🇵 Japan" },
  { code: "au", label: "🇦🇺 Australia" },
];

interface GeneratedAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  full: string;
}

const faqs = [
  {
    question: "Are these real addresses?",
    answer:
      "The addresses use real street names matched to their correct cities, with real postal codes. House numbers are randomly generated, so the exact address may not exist.",
  },
  {
    question: "Can I use these for shipping?",
    answer:
      "No. These addresses are generated for testing purposes only. The house numbers are random, so the full address may not correspond to an actual location.",
  },
  {
    question: "What countries are supported?",
    answer:
      "We support 10 countries: United States, United Kingdom, Canada, Germany, France, Spain, Brazil, India, Japan, and Australia. Each uses real local street names and postal codes.",
  },
  {
    question: "How are the addresses generated?",
    answer:
      "We pick a real city, then select a real street from that specific city, and add a random house number. This ensures the street actually exists in the selected city.",
  },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateAddresses(country: string, count: number): GeneratedAddress[] {
  const data = addressData[country] || usAddresses;
  const results: GeneratedAddress[] = [];
  for (let i = 0; i < count; i++) {
    const houseNum = Math.floor(Math.random() * 9900) + 100;
    const cityData = pickRandom(data.cities);
    const street = pickRandom(cityData.streets);
    const full =
      country === "de"
        ? `${street} ${houseNum}, ${cityData.zip} ${cityData.name}, ${cityData.state}`
        : `${houseNum} ${street}, ${cityData.name}, ${cityData.state} ${cityData.zip}`;
    results.push({
      street: country === "de" ? `${street} ${houseNum}` : `${houseNum} ${street}`,
      city: cityData.name,
      state: cityData.state,
      zip: cityData.zip,
      full,
    });
  }
  return results;
}

export function AddressClient() {
  const [country, setCountry] = useState("us");
  const [count, setCount] = useState(5);
  const [addresses, setAddresses] = useState<GeneratedAddress[]>(() =>
    generateAddresses("us", 5)
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = useCallback(() => {
    setAddresses(generateAddresses(country, count));
    setCopiedIndex(null);
  }, [country, count]);

  const copyAddress = async (address: string, index: number) => {
    await navigator.clipboard.writeText(address);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(addresses.map((a) => a.full).join("\n"));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolPageLayout
      title="Random Address Generator"
      description="Generate random realistic addresses from around the world. Uses real street names matched to their correct cities and postal codes."
      slug="random-address-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>About the Random Address Generator</h2>
          <p>
            Our random address generator creates realistic addresses by combining
            random house numbers with real street names that actually exist in the
            selected city, along with correct postal codes.
          </p>
          <h3>How It Works</h3>
          <p>
            Each generated address picks a real city, then selects a street that
            actually exists in that city. House numbers are randomly generated.
            This ensures every street-city combination is geographically accurate.
          </p>
          <h3>Common Use Cases</h3>
          <ul>
            <li>Testing address forms and validation logic</li>
            <li>Populating test databases with realistic address data</li>
            <li>Creating sample data for e-commerce checkout flows</li>
            <li>QA testing for shipping and delivery features</li>
          </ul>
        </>
      }
    >
      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            {countryOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
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
            max={10}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      <button onClick={generate} className="btn-primary w-full mb-6">
        Generate Addresses
      </button>

      {/* Results */}
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">{addresses.length} addresses generated</span>
          <button onClick={copyAll} className="copy-btn text-xs">
            {copiedIndex === -1 ? "Copied!" : "Copy All"}
          </button>
        </div>
        {addresses.map((addr, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
          >
            <div className="min-w-0">
              <div className="font-medium text-slate-800">{addr.street}</div>
              <div className="text-sm text-slate-500">
                {addr.city}, {addr.state} {addr.zip}
              </div>
            </div>
            <button
              onClick={() => copyAddress(addr.full, i)}
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
