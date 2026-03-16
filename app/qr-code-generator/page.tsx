import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { QrClient } from "./QrClient";

export const metadata: Metadata = createMetadata({
  title: "QR Code Generator - Create QR Codes Online",
  description:
    "Generate QR codes from any text or URL. Free online QR code generator with instant preview. Perfect for sharing links, contact info, and more.",
  path: "/qr-code-generator",
  keywords: [
    "qr code generator",
    "create qr code",
    "qr code maker",
    "free qr code generator",
    "url to qr code",
  ],
});

export default function QrCodePage() {
  return <QrClient />;
}
