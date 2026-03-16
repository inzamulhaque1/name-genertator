import Link from "next/link";
import { tools } from "@/lib/tools";
import { HomeIdentityGenerator } from "./HomeIdentityGenerator";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Generator - THE core feature */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
          Fake Name Generator
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Generate a random fake identity with real addresses instantly.
          Pick a country and gender, and get a complete profile with name,
          address, email, phone, and more.
        </p>
      </div>

      {/* Identity Generator */}
      <HomeIdentityGenerator />

      {/* Other tools section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          More Free Tools
        </h2>
        <p className="text-slate-500 text-center mb-6">
          Need a specific generator? Try one of our other tools.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {tools
            .filter((t) => t.slug !== "fake-identity-generator")
            .map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="card hover:border-indigo-200 hover:shadow-md transition group p-4!"
              >
                <div className="text-xl mb-1">{tool.icon}</div>
                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tool.description}</p>
              </Link>
            ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="card mt-12 prose prose-slate max-w-none">
        <h2>What is a Fake Name Generator?</h2>
        <p>
          A fake name generator creates realistic but completely fictional personal
          identities. When you generate a name, our tool automatically creates a full
          profile including a real street address, email, phone number, date of birth,
          and more — everything you need for testing and development purposes.
        </p>
        <h3>How Does It Work?</h3>
        <p>
          Simply select a country and gender (or leave it random), then click
          &quot;Generate New Identity.&quot; The tool instantly creates a complete fake
          person with realistic details. Street addresses and cities are real locations,
          while names, emails, phone numbers, and financial data are randomly generated.
        </p>
        <h3>Common Use Cases</h3>
        <ul>
          <li>Filling out test forms during software development</li>
          <li>Populating databases with realistic sample data</li>
          <li>Testing user registration and checkout flows</li>
          <li>Creating demo accounts for presentations</li>
          <li>Privacy protection when signing up for non-essential services</li>
        </ul>
        <h3>100% Private — All Data Generated in Your Browser</h3>
        <p>
          Every identity is generated entirely in your browser using JavaScript.
          No data is sent to our servers. We don&apos;t store, track, or log any
          generated identities. Your privacy is guaranteed.
        </p>
      </section>
    </div>
  );
}
