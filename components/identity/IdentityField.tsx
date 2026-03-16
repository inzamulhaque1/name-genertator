"use client";

import { CopyButton } from "@/components/ui/CopyButton";

interface IdentityFieldProps {
  label: string;
  value: string;
}

export function IdentityField({ label, value }: IdentityFieldProps) {
  return (
    <div className="flex items-center justify-between py-2.5 px-4 hover:bg-slate-50 rounded-lg transition">
      <div className="flex items-center gap-4 min-w-0">
        <span className="text-sm text-slate-500 w-24 shrink-0 font-medium">{label}</span>
        <span className="text-slate-900 truncate">{value}</span>
      </div>
      <CopyButton text={value} />
    </div>
  );
}
