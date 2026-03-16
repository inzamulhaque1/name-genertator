import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { TimestampClient } from "./TimestampClient";

export const metadata: Metadata = createMetadata({
  title: "Unix Timestamp Converter - Convert Dates and Timestamps",
  description:
    "Convert between Unix timestamps and human-readable dates. View the current timestamp, convert timestamps to dates, and dates to timestamps.",
  path: "/timestamp-converter",
  keywords: [
    "unix timestamp converter",
    "epoch converter",
    "timestamp to date",
    "date to timestamp",
    "unix time converter",
  ],
});

export default function TimestampConverterPage() {
  return <TimestampClient />;
}
