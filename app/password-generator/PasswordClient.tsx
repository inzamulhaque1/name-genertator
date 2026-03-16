"use client";

import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/layout/ToolPageLayout";

const faqs = [
  {
    question: "How secure are the generated passwords?",
    answer:
      "Passwords are generated using the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. The passwords are created entirely in your browser and are never sent to any server.",
  },
  {
    question: "What makes a password strong?",
    answer:
      "A strong password is at least 12 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols. Longer passwords with more character variety are exponentially harder to crack.",
  },
  {
    question: "Should I use a different password for each account?",
    answer:
      "Yes, absolutely. Reusing passwords means that if one account is compromised, all your other accounts using the same password are also at risk. Use a password manager to keep track of unique passwords for each account.",
  },
  {
    question: "Is my generated password stored anywhere?",
    answer:
      "No. The password is generated entirely in your browser using JavaScript. Nothing is sent to our servers, and we have no way to see or store your generated passwords.",
  },
  {
    question: "How long should my password be?",
    answer:
      "We recommend at least 16 characters for important accounts. For maximum security, use 20+ characters. Even with a shorter character set, longer passwords are much harder to brute-force.",
  },
];

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generatePassword(
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): string {
  let charset = "";
  const required: string[] = [];

  if (useUppercase) {
    charset += UPPERCASE;
    required.push(UPPERCASE);
  }
  if (useLowercase) {
    charset += LOWERCASE;
    required.push(LOWERCASE);
  }
  if (useNumbers) {
    charset += NUMBERS;
    required.push(NUMBERS);
  }
  if (useSymbols) {
    charset += SYMBOLS;
    required.push(SYMBOLS);
  }

  if (charset.length === 0) {
    charset = LOWERCASE;
    required.push(LOWERCASE);
  }

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  const chars: string[] = [];
  // Ensure at least one character from each required set
  for (let i = 0; i < required.length && i < length; i++) {
    const set = required[i];
    chars.push(set[array[i] % set.length]);
  }
  // Fill the rest randomly from the full charset
  for (let i = required.length; i < length; i++) {
    chars.push(charset[array[i] % charset.length]);
  }

  // Shuffle using Fisher-Yates
  const shuffleArray = new Uint32Array(chars.length);
  crypto.getRandomValues(shuffleArray);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = shuffleArray[i] % (i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

function getStrength(
  password: string,
  length: number,
  charsetSize: number
): { label: string; color: string; percent: number } {
  const entropy = length * Math.log2(charsetSize || 1);
  if (entropy < 28) return { label: "Very Weak", color: "bg-red-500", percent: 15 };
  if (entropy < 36) return { label: "Weak", color: "bg-orange-500", percent: 30 };
  if (entropy < 60) return { label: "Fair", color: "bg-yellow-500", percent: 50 };
  if (entropy < 80) return { label: "Strong", color: "bg-green-500", percent: 75 };
  return { label: "Very Strong", color: "bg-emerald-600", percent: 100 };
}

export function PasswordClient() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState(() =>
    generatePassword(16, true, true, true, true)
  );
  const [copied, setCopied] = useState(false);

  const charsetSize =
    (useUppercase ? 26 : 0) +
    (useLowercase ? 26 : 0) +
    (useNumbers ? 10 : 0) +
    (useSymbols ? SYMBOLS.length : 0) || 26;

  const strength = getStrength(password, length, charsetSize);

  const generate = useCallback(() => {
    const pw = generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols);
    setPassword(pw);
    setCopied(false);
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="Password Generator"
      description="Generate strong, secure random passwords. All passwords are created in your browser using cryptographically secure randomness."
      slug="password-generator"
      faqs={faqs}
      seoContent={
        <>
          <h2>Why Use a Password Generator?</h2>
          <p>
            Humans are notoriously bad at creating random passwords. We tend to use
            predictable patterns, dictionary words, and personal information that attackers
            can easily guess. A password generator creates truly random passwords that are
            much harder to crack through brute force or dictionary attacks.
          </p>
          <h3>How Password Strength Is Calculated</h3>
          <p>
            Password strength is measured in bits of entropy. Entropy depends on two factors:
            the size of the character set and the password length. Each additional character
            multiplies the number of possible combinations, making the password exponentially
            harder to guess. Our strength indicator uses entropy calculations to give you an
            accurate assessment.
          </p>
          <h3>Best Practices for Password Security</h3>
          <ul>
            <li>Use at least 16 characters for important accounts</li>
            <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>Never reuse passwords across different accounts</li>
            <li>Use a password manager to store your passwords securely</li>
            <li>Enable two-factor authentication whenever possible</li>
          </ul>
        </>
      }
    >
      {/* Password Display */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <code className="flex-1 text-lg font-mono break-all select-all">{password}</code>
          <button
            onClick={copyToClipboard}
            className={`copy-btn shrink-0 ${copied ? "copied" : ""}`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {/* Strength bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-500">Strength</span>
            <span className="font-medium">{strength.label}</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.color} rounded-full transition-all duration-300`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Length Slider */}
      <div className="mb-6">
        <label className="flex justify-between text-sm font-medium text-slate-700 mb-2">
          <span>Password Length</span>
          <span className="text-indigo-600 font-bold">{length}</span>
        </label>
        <input
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>8</span>
          <span>64</span>
        </div>
      </div>

      {/* Character Options */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Uppercase (A-Z)", checked: useUppercase, setter: setUseUppercase },
          { label: "Lowercase (a-z)", checked: useLowercase, setter: setUseLowercase },
          { label: "Numbers (0-9)", checked: useNumbers, setter: setUseNumbers },
          { label: "Symbols (!@#$...)", checked: useSymbols, setter: setUseSymbols },
        ].map(({ label, checked, setter }) => (
          <label
            key={label}
            className="flex items-center gap-2 cursor-pointer text-sm text-slate-700"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setter(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            {label}
          </label>
        ))}
      </div>

      {/* Generate Button */}
      <button onClick={generate} className="btn-primary w-full">
        Generate Password
      </button>
    </ToolPageLayout>
  );
}
