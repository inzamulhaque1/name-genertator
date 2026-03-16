import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {SITE_NAME}. All tools are free to use.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/about" className="text-slate-500 hover:text-slate-700">
              About
            </Link>
            <Link href="/privacy" className="text-slate-500 hover:text-slate-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-700">
              Terms of Use
            </Link>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4 text-center">
          Disclaimer: All generated identity data (names, emails, phones, etc.) is fictional
          and for testing purposes only. Addresses are real locations. Do not use generated
          data for illegal or fraudulent purposes.
        </p>
      </div>
    </footer>
  );
}
