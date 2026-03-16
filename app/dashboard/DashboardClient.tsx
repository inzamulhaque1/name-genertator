"use client";

import { useState } from "react";
import Link from "next/link";

interface SavedItem {
  id: string;
  label: string | null;
  country: string;
  data: Record<string, string>;
  createdAt: string;
}

export function DashboardClient({
  identities: initialIdentities,
  userName,
}: {
  identities: SavedItem[];
  userName: string;
}) {
  const [identities, setIdentities] = useState(initialIdentities);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this saved identity?")) return;
    setDeleting(id);
    const res = await fetch(`/api/identities/${id}`, { method: "DELETE" });
    if (res.ok) {
      setIdentities((prev) => prev.filter((i) => i.id !== id));
    }
    setDeleting(null);
  };

  const handleCopy = async (data: Record<string, string>, id: string) => {
    const text = Object.entries(data)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(identities.map((i) => i.data), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "saved-identities.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    if (identities.length === 0) return;
    const headers = Object.keys(identities[0].data);
    const rows = identities.map((i) =>
      headers.map((h) => `"${(i.data[h] || "").replace(/"/g, '""')}"`).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "saved-identities.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Saved Identities</h1>
          <p className="text-slate-500">
            Welcome, {userName}. You have {identities.length}/50 saved.
          </p>
        </div>
        <div className="flex gap-2">
          {identities.length > 0 && (
            <>
              <button onClick={handleExportJSON} className="copy-btn text-xs px-3 py-2">
                Export JSON
              </button>
              <button onClick={handleExportCSV} className="copy-btn text-xs px-3 py-2">
                Export CSV
              </button>
            </>
          )}
        </div>
      </div>

      {identities.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-slate-500 text-lg mb-4">No saved identities yet</p>
          <Link href="/" className="btn-primary">
            Generate Your First Identity
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {identities.map((item) => (
            <div
              key={item.id}
              className="card flex items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">
                    {item.data.fullName || "Unnamed"}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                    {item.country.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-slate-500 truncate">
                  {item.data.email} · {item.data.city}, {item.data.state}
                </p>
                <p className="text-xs text-slate-400">
                  Saved {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(item.data, item.id)}
                  className="copy-btn text-xs"
                >
                  {copiedId === item.id ? "✓ Copied" : "Copy"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="text-xs px-2 py-1 text-red-500 hover:bg-red-50 rounded transition"
                >
                  {deleting === item.id ? "..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
