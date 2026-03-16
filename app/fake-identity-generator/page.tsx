import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { FakeIdentityClient } from "./FakeIdentityClient";

export const metadata: Metadata = createMetadata({
  title: "Fake Identity Generator - Generate Realistic Test Data",
  description:
    "Generate complete fake identities with real addresses, names, emails, phone numbers, credit cards, and more. Perfect for software testing and development.",
  path: "/fake-identity-generator",
  keywords: [
    "fake identity generator",
    "fake person generator",
    "random identity generator",
    "test data generator",
    "fake name and address",
  ],
});

export default function FakeIdentityGeneratorPage() {
  return <FakeIdentityClient />;
}
