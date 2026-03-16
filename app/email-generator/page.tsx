import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { EmailClient } from "./EmailClient";

export const metadata: Metadata = createMetadata({
  title: "Random Email Generator - Generate Fake Email Addresses",
  description:
    "Generate random fake email addresses for testing. Choose between common email domains or custom domains. Generate multiple emails at once.",
  path: "/email-generator",
  keywords: [
    "random email generator",
    "fake email generator",
    "test email address",
    "disposable email generator",
    "bulk email generator",
  ],
});

export default function EmailGeneratorPage() {
  return <EmailClient />;
}
