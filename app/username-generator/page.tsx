import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { UsernameClient } from "./UsernameClient";

export const metadata: Metadata = createMetadata({
  title: "Username Generator - Generate Unique Usernames",
  description:
    "Generate unique usernames in various styles: first.last, random, and gaming. Perfect for creating accounts, testing, and finding available usernames.",
  path: "/username-generator",
  keywords: [
    "username generator",
    "random username generator",
    "gaming username generator",
    "unique username ideas",
    "username creator",
  ],
});

export default function UsernameGeneratorPage() {
  return <UsernameClient />;
}
