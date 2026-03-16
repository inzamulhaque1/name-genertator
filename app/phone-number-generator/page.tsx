import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PhoneClient } from "./PhoneClient";

export const metadata: Metadata = createMetadata({
  title: "Random Phone Number Generator - Generate Fake Phone Numbers",
  description:
    "Generate random phone numbers for any country with proper formatting. Perfect for testing forms, databases, and applications. Supports US, UK, Canada, and more.",
  path: "/phone-number-generator",
  keywords: [
    "random phone number generator",
    "fake phone number generator",
    "test phone number",
    "phone number for testing",
    "random mobile number",
  ],
});

export default function PhoneNumberPage() {
  return <PhoneClient />;
}
