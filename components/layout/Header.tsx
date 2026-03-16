"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { tools, TOOL_CATEGORIES } from "@/lib/tools";
import { SITE_NAME } from "@/lib/constants";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          🔧 {SITE_NAME}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
            >
              Tools <span className="text-xs">▼</span>
            </button>
            {toolsOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto"
                onMouseLeave={() => setToolsOpen(false)}
              >
                {(Object.keys(TOOL_CATEGORIES) as Array<keyof typeof TOOL_CATEGORIES>).map(
                  (cat) => (
                    <div key={cat} className="mb-4 last:mb-0">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase mb-2">
                        {TOOL_CATEGORIES[cat].icon} {TOOL_CATEGORIES[cat].label}
                      </h3>
                      <div className="space-y-1">
                        {tools
                          .filter((t) => t.category === cat)
                          .map((tool) => (
                            <Link
                              key={tool.slug}
                              href={`/${tool.slug}`}
                              className="block px-2 py-1.5 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded"
                              onClick={() => setToolsOpen(false)}
                            >
                              {tool.icon} {tool.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-slate-600 hover:text-slate-900 font-medium"
              >
                Saved
              </Link>
              <div className="flex items-center gap-2">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <button
                  onClick={() => signOut()}
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="btn-primary text-sm !py-2 !px-4"
            >
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          {session ? (
            <div className="flex items-center gap-2 px-3 py-2 mb-2 border-b border-slate-100 pb-3">
              {session.user?.image && (
                <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
              )}
              <span className="text-sm text-slate-700">{session.user?.name}</span>
            </div>
          ) : (
            <Link
              href="/login"
              className="block px-3 py-2 text-sm font-medium text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
          {session && (
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-sm text-indigo-600 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              ⭐ Saved Identities
            </Link>
          )}
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="block px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 rounded"
              onClick={() => setMenuOpen(false)}
            >
              {tool.icon} {tool.name}
            </Link>
          ))}
          {session && (
            <button
              onClick={() => { signOut(); setMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm text-red-500"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
