"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const faqs = [
  {
    question: "Are these real credit card numbers?",
    answer:
      "No. These are randomly generated numbers that pass the Luhn algorithm check (used for basic validation). They are not connected to any real bank account and cannot be used for purchases.",
  },
  {
    question: "What is the Luhn algorithm?",
    answer:
      "The Luhn algorithm is a checksum formula used to validate credit card numbers. It verifies that the number follows a specific mathematical pattern. Our generator creates numbers that pass this check, making them suitable for testing payment form validation.",
  },
  {
    question: "Can I use these for online purchases?",
    answer:
      "Absolutely not. These numbers are for software testing and development only. Attempting to use fake card numbers for purchases is illegal and will not work as they are not linked to real accounts.",
  },
  {
    question: "What card types are supported?",
    answer:
      "Currently we support Visa (starting with 4) and MasterCard (starting with 5). Both generate 16-digit card numbers with valid Luhn checksums, random expiration dates, and CVV codes.",
  },
];

interface CardInfo {
  number: string;
  formatted: string;
  expiry: string;
  cvv: string;
  type: string;
}

function luhnChecksum(numStr: string): number {
  let sum = 0;
  let alternate = false;
  for (let i = numStr.length - 1; i >= 0; i--) {
    let n = parseInt(numStr[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10;
}

function generateLuhnNumber(prefix: string, length: number): string {
  let number = prefix;
  // Fill with random digits except the last one
  while (number.length < length - 1) {
    number += Math.floor(Math.random() * 10).toString();
  }
  // Calculate check digit
  const checkDigit = (10 - luhnChecksum(number + "0")) % 10;
  return number + checkDigit.toString();
}

function generateCard(type: string): CardInfo {
  const prefix = type === "visa" ? "4" : "5" + (Math.floor(Math.random() * 5) + 1).toString();
  const number = generateLuhnNumber(prefix, 16);
  const formatted = number.replace(/(.{4})/g, "$1 ").trim();

  const now = new Date();
  const futureMonth = Math.floor(Math.random() * 12) + 1;
  const futureYear = now.getFullYear() + Math.floor(Math.random() * 5) + 1;
  const expiry = `${String(futureMonth).padStart(2, "0")}/${String(futureYear).slice(-2)}`;

  const cvv = String(Math.floor(Math.random() * 900) + 100);

  return { number, formatted, expiry, cvv, type };
}

function generateCards(type: string, count: number): CardInfo[] {
  return Array.from({ length: count }, () => generateCard(type));
}

export function CreditCardClient() {
  const [cardType, setCardType] = useState("visa");
  const [count, setCount] = useState(5);
  const [cards, setCards] = useState<CardInfo[]>(() => generateCards("visa", 5));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = useCallback(() => {
    setCards(generateCards(cardType, count));
    setCopiedIndex(null);
  }, [cardType, count]);

  const copyCard = async (card: CardInfo, index: number) => {
    const text = `${card.formatted} | ${card.expiry} | ${card.cvv}`;
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = async () => {
    const text = cards
      .map((c) => `${c.formatted} | ${c.expiry} | ${c.cvv}`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolPageLayout
      title="Credit Card Generator"
      description="Generate Luhn-valid test credit card numbers for development and testing. For testing purposes only."
      slug="credit-card-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>About the Credit Card Generator</h2>
          <p>
            This tool generates credit card numbers that pass the Luhn algorithm validation.
            These numbers are intended exclusively for software testing and development
            purposes, such as testing payment form validation, e-commerce checkout flows,
            and payment processing integrations.
          </p>
          <h3>How Luhn Validation Works</h3>
          <p>
            The Luhn algorithm (also known as the &ldquo;modulus 10&rdquo; algorithm) is a simple
            checksum formula used to validate identification numbers like credit card numbers.
            Our generator creates numbers that satisfy this check, making them pass basic
            client-side validation.
          </p>
          <h3>Disclaimer</h3>
          <p>
            These card numbers are for testing and development only. They are not real credit
            cards, are not linked to any bank account, and cannot be used for purchases.
            Attempting to use generated numbers for fraud is illegal.
          </p>
        </>
      }
    >
      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
        <p className="text-sm text-amber-800 font-medium">
          For testing and development purposes only. These are not real credit card numbers
          and cannot be used for purchases.
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Card Type</label>
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="input w-full"
          >
            <option value="visa">Visa</option>
            <option value="mastercard">MasterCard</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Count ({count})
          </label>
          <input
            type="range"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      </div>

      <button onClick={generate} className="btn-primary w-full mb-6">
        Generate Cards
      </button>

      {/* Results */}
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">{cards.length} cards generated</span>
          <button onClick={copyAll} className="copy-btn text-xs">
            {copiedIndex === -1 ? "Copied!" : "Copy All"}
          </button>
        </div>
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-indigo-600 uppercase">
                    {card.type}
                  </span>
                </div>
                <div className="font-mono text-slate-800 mt-1">{card.formatted}</div>
                <div className="flex gap-4 mt-1 text-sm text-slate-500">
                  <span>Exp: {card.expiry}</span>
                  <span>CVV: {card.cvv}</span>
                </div>
              </div>
              <button
                onClick={() => copyCard(card, i)}
                className="copy-btn text-xs shrink-0 ml-3"
              >
                {copiedIndex === i ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToolPageLayout>
  );
}
