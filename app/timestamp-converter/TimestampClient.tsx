"use client";

import { useState, useEffect, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const faqs = [
  {
    question: "What is a Unix timestamp?",
    answer:
      "A Unix timestamp (also called Epoch time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. It is widely used in programming and databases to represent dates and times.",
  },
  {
    question: "Is the timestamp in seconds or milliseconds?",
    answer:
      "Standard Unix timestamps are in seconds. JavaScript uses milliseconds. This tool accepts both: if you enter a number greater than 10 billion, it assumes milliseconds and converts accordingly.",
  },
  {
    question: "What timezone does the converter use?",
    answer:
      "The converter shows dates in both UTC and your local timezone. The timestamp itself is always timezone-independent as it represents seconds since the Unix epoch in UTC.",
  },
  {
    question: "What is the maximum timestamp value?",
    answer:
      "JavaScript can handle dates up to approximately the year 275760. However, most systems use 32-bit timestamps which max out at 2,147,483,647 (January 19, 2038), known as the Year 2038 problem.",
  },
];

export function TimestampClient() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState("");
  const [dateResult, setDateResult] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timestampResult, setTimestampResult] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  // Update current timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTimestampToDate = useCallback(() => {
    const val = Number(timestampInput);
    if (isNaN(val) || !timestampInput.trim()) {
      setDateResult("Please enter a valid timestamp");
      return;
    }
    // Auto-detect milliseconds vs seconds
    const ts = val > 1e12 ? val : val * 1000;
    const date = new Date(ts);
    if (isNaN(date.getTime())) {
      setDateResult("Invalid timestamp");
      return;
    }
    const utc = date.toUTCString();
    const local = date.toLocaleString();
    const iso = date.toISOString();
    setDateResult(`UTC: ${utc}\nLocal: ${local}\nISO: ${iso}`);
  }, [timestampInput]);

  const convertDateToTimestamp = useCallback(() => {
    if (!dateInput.trim()) {
      setTimestampResult("Please enter a valid date");
      return;
    }
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      setTimestampResult("Invalid date format. Try: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS");
      return;
    }
    const seconds = Math.floor(date.getTime() / 1000);
    const ms = date.getTime();
    setTimestampResult(`Seconds: ${seconds}\nMilliseconds: ${ms}`);
  }, [dateInput]);

  const copyValue = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolPageLayout
      title="Timestamp Converter"
      description="Convert between Unix timestamps and human-readable dates. View the current timestamp and convert in either direction."
      slug="timestamp-converter"
      faqs={faqs}
      seoContent={
        <>
          <h2>About the Unix Timestamp Converter</h2>
          <p>
            Unix timestamps are a compact way to represent a point in time as a single number.
            This tool helps you convert between Unix timestamps and human-readable date formats
            in both directions.
          </p>
          <h3>Understanding Unix Time</h3>
          <p>
            The Unix epoch started on January 1, 1970, at 00:00:00 UTC. Every second since that
            moment increments the timestamp by 1. This system is used extensively in programming,
            databases, and APIs because it is timezone-independent and easy to compute with.
          </p>
          <h3>Common Uses</h3>
          <ul>
            <li>Converting API response timestamps to readable dates</li>
            <li>Debugging timestamp-related issues in applications</li>
            <li>Calculating time differences between events</li>
            <li>Converting dates for database queries</li>
          </ul>
        </>
      }
    >
      {/* Current Timestamp */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
        <div className="text-sm text-indigo-600 font-medium mb-1">Current Unix Timestamp</div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-mono font-bold text-indigo-900">{currentTimestamp}</span>
          <button
            onClick={() => copyValue(String(currentTimestamp), "current")}
            className="copy-btn text-xs"
          >
            {copied === "current" ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="text-xs text-indigo-500 mt-1">
          {new Date(currentTimestamp * 1000).toUTCString()}
        </div>
      </div>

      {/* Timestamp to Date */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Timestamp to Date</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && convertTimestampToDate()}
            className="input flex-1 font-mono"
            placeholder="Enter Unix timestamp (e.g., 1700000000)"
          />
          <button onClick={convertTimestampToDate} className="btn-primary shrink-0">
            Convert
          </button>
        </div>
        {dateResult && (
          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <pre className="text-sm text-slate-700 font-mono whitespace-pre-wrap">{dateResult}</pre>
              <button
                onClick={() => copyValue(dateResult, "dateResult")}
                className="copy-btn text-xs shrink-0 ml-2"
              >
                {copied === "dateResult" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Date to Timestamp */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Date to Timestamp</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && convertDateToTimestamp()}
            className="input flex-1 font-mono"
            placeholder="Enter date (e.g., 2024-01-15 or 2024-01-15T12:00:00)"
          />
          <button onClick={convertDateToTimestamp} className="btn-primary shrink-0">
            Convert
          </button>
        </div>
        {timestampResult && (
          <div className="bg-white border border-slate-200 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <pre className="text-sm text-slate-700 font-mono whitespace-pre-wrap">{timestampResult}</pre>
              <button
                onClick={() => copyValue(timestampResult, "tsResult")}
                className="copy-btn text-xs shrink-0 ml-2"
              >
                {copied === "tsResult" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
