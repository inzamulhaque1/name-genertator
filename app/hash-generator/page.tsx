import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { HashClient } from "./HashClient";

export const metadata: Metadata = createMetadata({
  title: "Hash Generator - Generate MD5, SHA-1, SHA-256, SHA-512 Hashes",
  description:
    "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any text. Free online hash generator using the Web Crypto API for secure hashing.",
  path: "/hash-generator",
  keywords: [
    "hash generator",
    "md5 hash generator",
    "sha256 generator",
    "sha1 hash",
    "sha512 generator",
  ],
});

export default function HashGeneratorPage() {
  return <HashClient />;
}
