import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { countries } from "@/data/countries";
import { FakeIdentityClient } from "../FakeIdentityClient";

type Props = { params: Promise<{ country: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: code } = await params;
  const country = countries.find((c) => c.code === code);
  const name = country?.name || "Unknown";

  return createMetadata({
    title: `Fake ${name} Identity Generator - Generate ${name} Test Data`,
    description: `Generate realistic fake ${name} identities with real ${name} addresses, names, phone numbers, and more. Perfect for testing and development.`,
    path: `/fake-identity-generator/${code}`,
    keywords: [
      `fake ${name.toLowerCase()} identity`,
      `${name.toLowerCase()} name generator`,
      `${name.toLowerCase()} address generator`,
      `fake ${name.toLowerCase()} person`,
    ],
  });
}

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.code }));
}

export default async function CountryIdentityPage({ params }: Props) {
  const { country } = await params;
  return <FakeIdentityClient initialCountry={country} />;
}
