import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { AddressClient } from "./AddressClient";

export const metadata: Metadata = createMetadata({
  title: "Random Address Generator - Generate Realistic Addresses",
  description:
    "Generate random realistic addresses from the US, UK, Canada, and Germany. Random house numbers with real streets, cities, states, and zip codes for testing.",
  path: "/random-address-generator",
  keywords: [
    "random address generator",
    "fake address generator",
    "random street address",
    "test address generator",
    "random US address",
  ],
});

export default function RandomAddressPage() {
  return <AddressClient />;
}
