"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const faqs = [
  {
    question: "What is a hash?",
    answer:
      "A hash is a fixed-size string of characters produced by a mathematical function (hash function) from input data of any size. Hash functions are one-way: you cannot reverse a hash to get the original input. They are deterministic, meaning the same input always produces the same hash.",
  },
  {
    question: "What is the difference between MD5, SHA-1, SHA-256, and SHA-512?",
    answer:
      "They differ in output size and security. MD5 produces a 128-bit hash (32 hex chars) but is considered cryptographically broken. SHA-1 produces 160-bit hashes (40 hex chars) and is also deprecated for security use. SHA-256 (256-bit, 64 hex chars) and SHA-512 (512-bit, 128 hex chars) are part of the SHA-2 family and are currently considered secure.",
  },
  {
    question: "Is MD5 still safe to use?",
    answer:
      "MD5 should not be used for security purposes like password hashing or digital signatures, as collision attacks have been demonstrated. However, it is still commonly used for checksums, data integrity verification, and non-security applications where speed is important.",
  },
  {
    question: "Can I reverse a hash to get the original text?",
    answer:
      "No. Hash functions are designed to be one-way. You cannot mathematically reverse a hash. However, short or common inputs can be looked up in precomputed tables (rainbow tables), which is why passwords should be hashed with a salt.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All hashing is performed entirely in your browser using the Web Crypto API. Your data never leaves your device.",
  },
];

interface HashResult {
  algorithm: string;
  hash: string;
}

async function computeSHA(
  algorithm: string,
  text: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Simple MD5 implementation
function md5(input: string): string {
  function safeAdd(x: number, y: number) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num: number, cnt: number) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  // Convert string to array of little-endian 32-bit words
  const bytes = new TextEncoder().encode(input);
  const len = bytes.length;
  const words: number[] = [];
  for (let i = 0; i < len; i++) {
    words[i >> 2] |= bytes[i] << ((i % 4) * 8);
  }
  words[len >> 2] |= 0x80 << ((len % 4) * 8);
  const totalWords = (((len + 8) >>> 6) + 1) * 16;
  for (let i = words.length; i < totalWords; i++) words[i] = 0;
  words[totalWords - 2] = (len * 8) & 0xffffffff;
  words[totalWords - 1] = 0;

  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  for (let i = 0; i < totalWords; i += 16) {
    const oa = a, ob = b, oc = c, od = d;
    a = md5ff(a, b, c, d, words[i], 7, -680876936);
    d = md5ff(d, a, b, c, words[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, words[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, words[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, words[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, words[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, words[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, words[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, words[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, words[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, words[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, words[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, words[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, words[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, words[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, words[i + 15], 22, 1236535329);

    a = md5gg(a, b, c, d, words[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, words[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, words[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, words[i], 20, -373897302);
    a = md5gg(a, b, c, d, words[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, words[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, words[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, words[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, words[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, words[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, words[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, words[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, words[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, words[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, words[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, words[i + 12], 20, -1926607734);

    a = md5hh(a, b, c, d, words[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, words[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, words[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, words[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, words[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, words[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, words[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, words[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, words[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, words[i], 11, -358537222);
    c = md5hh(c, d, a, b, words[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, words[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, words[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, words[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, words[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, words[i + 2], 23, -995338651);

    a = md5ii(a, b, c, d, words[i], 6, -198630844);
    d = md5ii(d, a, b, c, words[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, words[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, words[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, words[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, words[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, words[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, words[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, words[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, words[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, words[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, words[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, words[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, words[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, words[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, words[i + 9], 21, -343485551);

    a = safeAdd(a, oa);
    b = safeAdd(b, ob);
    c = safeAdd(c, oc);
    d = safeAdd(d, od);
  }

  const hex = (n: number) => {
    let s = "";
    for (let i = 0; i < 4; i++) {
      s += ((n >> (i * 8 + 4)) & 0xf).toString(16) + ((n >> (i * 8)) & 0xf).toString(16);
    }
    return s;
  };
  return hex(a) + hex(b) + hex(c) + hex(d);
}

export function HashClient() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<HashResult[]>([]);
  const [computing, setComputing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const computeHashes = useCallback(async () => {
    if (!input) {
      setResults([]);
      return;
    }
    setComputing(true);
    try {
      const [sha1, sha256, sha512] = await Promise.all([
        computeSHA("SHA-1", input),
        computeSHA("SHA-256", input),
        computeSHA("SHA-512", input),
      ]);
      const md5Hash = md5(input);
      setResults([
        { algorithm: "MD5", hash: md5Hash },
        { algorithm: "SHA-1", hash: sha1 },
        { algorithm: "SHA-256", hash: sha256 },
        { algorithm: "SHA-512", hash: sha512 },
      ]);
    } catch {
      setResults([]);
    }
    setComputing(false);
  }, [input]);

  const copyHash = async (hash: string, index: number) => {
    await navigator.clipboard.writeText(hash);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolPageLayout
      title="Hash Generator"
      description="Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text. All hashing is performed in your browser using the Web Crypto API."
      slug="hash-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>What is a Hash Generator?</h2>
          <p>
            A hash generator takes input data (text, files, etc.) and produces a
            fixed-length string of characters called a hash or digest. Hash functions are
            deterministic (same input always yields the same output) and one-way (you
            cannot reverse the hash to recover the original input).
          </p>
          <h3>Hash Algorithms Compared</h3>
          <p>
            <strong>MD5</strong> (128-bit) is fast but cryptographically broken.
            <strong> SHA-1</strong> (160-bit) is deprecated for security use.
            <strong> SHA-256</strong> (256-bit) is widely used and considered secure.
            <strong> SHA-512</strong> (512-bit) offers the highest security margin and is
            faster than SHA-256 on 64-bit processors.
          </p>
          <h3>Common Use Cases</h3>
          <ul>
            <li>Verifying file integrity after downloads</li>
            <li>Storing password hashes (with proper salting)</li>
            <li>Digital signatures and certificates</li>
            <li>Data deduplication and cache keys</li>
            <li>Blockchain and cryptocurrency applications</li>
          </ul>
        </>
      }
    >
      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 border border-slate-300 rounded-lg px-3 py-2 font-mono text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
          spellCheck={false}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={computeHashes}
        disabled={computing || !input}
        className="btn-primary w-full mb-6"
      >
        {computing ? "Computing..." : "Generate Hashes"}
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((result, i) => (
            <div key={result.algorithm} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {result.algorithm}
                </span>
                <button
                  onClick={() => copyHash(result.hash, i)}
                  className={`copy-btn text-xs ${copiedIndex === i ? "copied" : ""}`}
                >
                  {copiedIndex === i ? "Copied!" : "Copy"}
                </button>
              </div>
              <code className="text-sm font-mono text-slate-700 break-all select-all block">
                {result.hash}
              </code>
            </div>
          ))}
        </div>
      )}
    </ToolPageLayout>
  );
}
