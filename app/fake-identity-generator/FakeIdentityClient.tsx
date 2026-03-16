"use client";

import { useState, useEffect, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";
import { IdentityCard } from "@/components/identity/IdentityCard";
import { generateIdentity, type GeneratedIdentity } from "@/lib/generators/identity";
import { countries } from "@/data/countries";

const faqs = [
  {
    question: "Is this data real?",
    answer:
      "Names, emails, phone numbers, and other personal details are randomly generated and fictional. Street addresses and cities are real locations, but combined with fake house numbers to create non-existent addresses.",
  },
  {
    question: "Can I use this for software testing?",
    answer:
      "Yes! This tool is designed specifically for developers and QA testers who need realistic-looking test data for forms, databases, and applications.",
  },
  {
    question: "Are the credit card numbers valid?",
    answer:
      "The credit card numbers pass the Luhn algorithm checksum validation (like real cards), but they are not linked to any real accounts. They use test prefixes and are safe to use in development environments.",
  },
  {
    question: "Which countries are supported?",
    answer:
      "We currently support identity generation for the United States, United Kingdom, Canada, and Germany, with country-specific names, addresses, and phone formats. More countries are being added.",
  },
  {
    question: "Is my data stored or tracked?",
    answer:
      "No. All data is generated entirely in your browser using JavaScript. Nothing is sent to our servers, and we don't store or track any generated identities.",
  },
];

export function FakeIdentityClient({ initialCountry = "us" }: { initialCountry?: string }) {
  const [identity, setIdentity] = useState<GeneratedIdentity | null>(null);
  const [country, setCountry] = useState(initialCountry);
  const [gender, setGender] = useState<"" | "male" | "female">("");
  const [loading, setLoading] = useState(false);

  const generate = useCallback(async () => {
    setLoading(true);
    const result = await generateIdentity(
      country,
      gender ? (gender as "male" | "female") : undefined
    );
    setIdentity(result);
    setLoading(false);
  }, [country, gender]);

  useEffect(() => {
    generate();
  }, [generate]);

  return (
    <ToolPageLayout
      title="Fake Identity Generator"
      description="Generate complete fake identities with real addresses for software testing and development. All data is generated in your browser."
      slug="fake-identity-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>What is a Fake Identity Generator?</h2>
          <p>
            A fake identity generator creates realistic but fictional personal data including
            names, addresses, email addresses, phone numbers, and more. This tool is essential
            for software developers, QA testers, and anyone who needs realistic test data
            without using real personal information.
          </p>
          <h3>How Does It Work?</h3>
          <p>
            Our generator combines real street addresses and cities with randomly generated
            names and personal details. Credit card numbers are generated using the Luhn
            algorithm to pass format validation. All data is created entirely in your browser
            — nothing is sent to any server.
          </p>
          <h3>Common Use Cases</h3>
          <ul>
            <li>Populating test databases with realistic data</li>
            <li>Testing form validation and user registration flows</li>
            <li>Creating demo accounts for presentations</li>
            <li>QA testing with various international formats</li>
            <li>Generating sample data for prototypes</li>
          </ul>
        </>
      }
    >
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "" | "male" | "female")}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex items-end">
          <button onClick={generate} disabled={loading} className="btn-primary flex items-center gap-2">
            {loading ? "Generating..." : "🔄 Generate New"}
          </button>
        </div>
      </div>

      {/* Identity card */}
      {identity && <IdentityCard identity={identity} />}
    </ToolPageLayout>
  );
}
