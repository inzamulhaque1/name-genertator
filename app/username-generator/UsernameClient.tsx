"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const faqs = [
  {
    question: "What username styles are available?",
    answer:
      "We offer three styles: 'first.last' (e.g., john.smith42), 'random' (e.g., bluefox_spark), and 'gaming' (e.g., ShadowKnight_99). Each style is suited for different platforms and purposes.",
  },
  {
    question: "Are the generated usernames guaranteed to be available?",
    answer:
      "No. The usernames are randomly generated, but availability depends on the specific platform. You will need to check if the username is taken on the website or service you want to use it on.",
  },
  {
    question: "Can I customize the generated usernames?",
    answer:
      "You can choose the style and number of usernames to generate. Each generation creates fresh random combinations, so you can keep generating until you find one you like.",
  },
  {
    question: "Are these usernames safe to use?",
    answer:
      "Yes, the usernames are generated from curated word lists that avoid offensive or inappropriate content. They are safe for use on any platform.",
  },
];

const adjectives = [
  "swift", "bold", "cool", "dark", "fast", "blue", "red", "gold", "iron", "wild",
  "cold", "hot", "deep", "keen", "true", "pure", "rare", "wise", "calm", "free",
  "bright", "silent", "hidden", "frozen", "cosmic", "noble", "rapid", "fierce",
  "mighty", "ancient", "mystic", "primal", "savage", "clever", "gentle", "stellar",
];

const nouns = [
  "wolf", "hawk", "bear", "fox", "lion", "star", "fire", "sage", "blade", "storm",
  "moon", "sun", "wind", "wave", "rock", "peak", "vale", "dusk", "dawn", "edge",
  "shadow", "knight", "dragon", "phoenix", "falcon", "tiger", "viper", "raven",
  "hunter", "ranger", "wizard", "spark", "flame", "frost", "thunder", "crystal",
];

const firstNames = [
  "alex", "sam", "max", "jordan", "taylor", "casey", "riley", "morgan", "jamie", "drew",
  "chris", "pat", "blake", "avery", "quinn", "kai", "eden", "sage", "river", "sky",
];

const lastNames = [
  "smith", "jones", "lee", "chen", "park", "kim", "garcia", "miller", "wilson", "moore",
  "clark", "hall", "king", "young", "wright", "green", "baker", "adams", "hill", "scott",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUsername(style: string): string {
  const num = Math.floor(Math.random() * 999);

  switch (style) {
    case "first.last": {
      const sep = pickRandom([".", "_", ""]);
      const first = pickRandom(firstNames);
      const last = pickRandom(lastNames);
      return Math.random() > 0.5 ? `${first}${sep}${last}${num}` : `${first}${sep}${last}`;
    }
    case "gaming": {
      const adj = pickRandom(adjectives);
      const noun = pickRandom(nouns);
      const capAdj = adj.charAt(0).toUpperCase() + adj.slice(1);
      const capNoun = noun.charAt(0).toUpperCase() + noun.slice(1);
      const sep = pickRandom(["_", "", "x", "X"]);
      return Math.random() > 0.4 ? `${capAdj}${capNoun}${sep}${num}` : `${capAdj}${sep}${capNoun}`;
    }
    case "random":
    default: {
      const adj = pickRandom(adjectives);
      const noun = pickRandom(nouns);
      const sep = pickRandom(["_", "-", ""]);
      return Math.random() > 0.5 ? `${adj}${sep}${noun}${num}` : `${adj}${sep}${noun}`;
    }
  }
}

function generateUsernames(style: string, count: number): string[] {
  return Array.from({ length: count }, () => generateUsername(style));
}

export function UsernameClient() {
  const [style, setStyle] = useState("random");
  const [count, setCount] = useState(10);
  const [usernames, setUsernames] = useState<string[]>(() => generateUsernames("random", 10));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = useCallback(() => {
    setUsernames(generateUsernames(style, count));
    setCopiedIndex(null);
  }, [style, count]);

  const copyUsername = async (username: string, index: number) => {
    await navigator.clipboard.writeText(username);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(usernames.join("\n"));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolPageLayout
      title="Username Generator"
      description="Generate unique usernames in various styles. Choose from professional, random, or gaming-style usernames."
      slug="username-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>About the Username Generator</h2>
          <p>
            Finding the perfect username can be challenging. Our username generator creates
            unique, creative usernames in multiple styles to suit different platforms and
            purposes.
          </p>
          <h3>Username Styles</h3>
          <ul>
            <li><strong>First.Last</strong> - Professional-style usernames like john.smith42, ideal for work or social platforms</li>
            <li><strong>Random</strong> - Creative combinations like blue_storm or swift-hawk, great for forums and social media</li>
            <li><strong>Gaming</strong> - Epic gaming tags like ShadowKnight_99 or MightyDragon, perfect for gaming platforms</li>
          </ul>
          <h3>Tips for Choosing a Username</h3>
          <ul>
            <li>Keep it memorable and easy to type</li>
            <li>Avoid using personal information like birth dates</li>
            <li>Consider the platform where you will use it</li>
            <li>Check availability before committing to a username</li>
          </ul>
        </>
      }
    >
      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="input w-full"
          >
            <option value="first.last">First.Last (Professional)</option>
            <option value="random">Random (Creative)</option>
            <option value="gaming">Gaming</option>
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
        Generate Usernames
      </button>

      {/* Results */}
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">{usernames.length} usernames generated</span>
          <button onClick={copyAll} className="copy-btn text-xs">
            {copiedIndex === -1 ? "Copied!" : "Copy All"}
          </button>
        </div>
        {usernames.map((username, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-2"
          >
            <span className="font-mono text-slate-800">{username}</span>
            <button
              onClick={() => copyUsername(username, i)}
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
