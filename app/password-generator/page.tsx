import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PasswordClient } from "./PasswordClient";

export const metadata: Metadata = createMetadata({
  title: "Password Generator - Create Strong Random Passwords",
  description:
    "Generate strong, secure random passwords with customizable length, uppercase, lowercase, numbers, and symbols. Free online password generator with strength indicator.",
  path: "/password-generator",
  keywords: [
    "password generator",
    "strong password generator",
    "random password generator",
    "secure password generator",
    "password creator",
  ],
});

export default function PasswordGeneratorPage() {
  return <PasswordClient />;
}
