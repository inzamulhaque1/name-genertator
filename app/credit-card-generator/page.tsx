import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { CreditCardClient } from "./CreditCardClient";

export const metadata: Metadata = createMetadata({
  title: "Credit Card Generator - Generate Test Card Numbers",
  description:
    "Generate valid test credit card numbers with Luhn-valid checksums for Visa and MasterCard. Includes expiration dates and CVV. For development and testing only.",
  path: "/credit-card-generator",
  keywords: [
    "test credit card generator",
    "fake credit card number",
    "credit card number for testing",
    "luhn valid card number",
    "visa test card number",
  ],
});

export default function CreditCardPage() {
  return <CreditCardClient />;
}
