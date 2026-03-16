import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { UrlClient } from "./UrlClient";

export const metadata: Metadata = createMetadata({
  title: "URL Encoder/Decoder - Encode and Decode URLs Online",
  description:
    "Encode and decode URL strings instantly. Convert special characters to percent-encoded format or decode them back. Free online URL encoder and decoder.",
  path: "/url-encoder-decoder",
  keywords: [
    "url encoder",
    "url decoder",
    "url encode online",
    "url decode online",
    "percent encoding",
    "urlencode",
  ],
});

export default function UrlEncoderDecoderPage() {
  return <UrlClient />;
}
