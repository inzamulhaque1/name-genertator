"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { IdentityCard } from "@/components/identity/IdentityCard";
import { generateIdentity, type GeneratedIdentity } from "@/lib/generators/identity";
import { countries } from "@/data/countries";

export function HomeIdentityGenerator() {
  const [identity, setIdentity] = useState<GeneratedIdentity | null>(null);
  const [country, setCountry] = useState("us");
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
    <div className="max-w-4xl mx-auto">
      {/* Controls bar */}
      <div className="card mb-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[140px]">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[120px]">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as "" | "male" | "female")}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">Random</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="btn-primary flex items-center gap-2 text-base py-2.5 px-6"
          >
            {loading ? (
              "Generating..."
            ) : (
              <>🔄 Generate New Identity</>
            )}
          </button>
        </div>
      </div>

      {/* Generated identity */}
      {identity && <IdentityCard identity={identity} />}

      {/* Country quick links for SEO */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {countries.map((c) => (
          <Link
            key={c.code}
            href={`/fake-identity-generator/${c.code}`}
            className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition"
          >
            {c.flag} {c.name} Generator
          </Link>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 text-center mt-4">
        All names, emails, phone numbers, and financial data are randomly generated and fictional.
        Street addresses use real locations. For testing purposes only.
      </p>
    </div>
  );
}
