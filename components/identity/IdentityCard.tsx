"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { GeneratedIdentity } from "@/lib/generators/identity";
import { IdentityField } from "./IdentityField";

interface IdentityCardProps {
  identity: GeneratedIdentity;
}

export function IdentityCard({ identity }: IdentityCardProps) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const allText = [
    `Name: ${identity.fullName}`,
    `Gender: ${identity.gender}`,
    `Date of Birth: ${identity.dateOfBirth} (Age ${identity.age})`,
    `Email: ${identity.email}`,
    `Phone: ${identity.phone}`,
    `Address: ${identity.street}, ${identity.city}, ${identity.state} ${identity.zip}`,
    `Country: ${identity.country}`,
    `${identity.ssnLabel}: ${identity.ssn}`,
    `Credit Card: ${identity.creditCard}`,
    `Exp: ${identity.creditCardExp} CVV: ${identity.creditCardCvv}`,
    `Username: ${identity.username}`,
    `Password: ${identity.password}`,
    `Company: ${identity.company}`,
  ].join("\n");

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleSave = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/identities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: identity.countryCode,
          data: identity,
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save");
      }
    } catch {
      alert("Failed to save");
    }
    setSaving(false);
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-50 px-4 py-3 flex items-center justify-between border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {identity.firstName[0]}
          </div>
          <div>
            <h2 className="font-bold text-slate-900">{identity.fullName}</h2>
            <p className="text-sm text-slate-500">
              {identity.gender} · Age {identity.age} · {identity.city}, {identity.countryCode.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="text-sm py-2 px-3 rounded-lg font-semibold border transition cursor-pointer bg-white border-indigo-300 text-indigo-600 hover:bg-indigo-50 disabled:opacity-60"
          >
            {saved ? "✓ Saved!" : saving ? "Saving..." : "⭐ Save"}
          </button>
          <button
            onClick={handleCopyAll}
            className="btn-primary text-sm py-2! px-3!"
          >
            {copiedAll ? "✓ Copied!" : "Copy All"}
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="divide-y divide-slate-100">
        {/* Personal */}
        <div className="py-1">
          <div className="px-4 pt-3 pb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Personal</span>
          </div>
          <IdentityField label="Full Name" value={identity.fullName} />
          <IdentityField label="Gender" value={identity.gender} />
          <IdentityField label="Birthday" value={`${identity.dateOfBirth} (Age ${identity.age})`} />
          <IdentityField label="Email" value={identity.email} />
          <IdentityField label="Phone" value={identity.phone} />
        </div>

        {/* Address */}
        <div className="py-1">
          <div className="px-4 pt-3 pb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Address</span>
          </div>
          <IdentityField label="Street" value={identity.street} />
          <IdentityField label="City" value={identity.city} />
          <IdentityField label="State" value={identity.state} />
          <IdentityField label="Zip Code" value={identity.zip} />
          <IdentityField label="Country" value={identity.country} />
        </div>

        {/* Financial */}
        <div className="py-1">
          <div className="px-4 pt-3 pb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Financial</span>
          </div>
          <IdentityField label={identity.ssnLabel} value={identity.ssn} />
          <IdentityField label="Credit Card" value={identity.creditCard} />
          <IdentityField label="Exp Date" value={identity.creditCardExp} />
          <IdentityField label="CVV" value={identity.creditCardCvv} />
        </div>

        {/* Online */}
        <div className="py-1">
          <div className="px-4 pt-3 pb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase">Online</span>
          </div>
          <IdentityField label="Username" value={identity.username} />
          <IdentityField label="Password" value={identity.password} />
          <IdentityField label="Company" value={identity.company} />
        </div>
      </div>
    </div>
  );
}
