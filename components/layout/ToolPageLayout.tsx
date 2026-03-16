import Link from "next/link";
import { getRelatedTools } from "@/lib/tools";

interface FAQ {
  question: string;
  answer: string;
}

interface ToolPageLayoutProps {
  title: string;
  description: string;
  slug: string;
  children: React.ReactNode;
  seoContent?: React.ReactNode;
  faqs?: FAQ[];
}

export function ToolPageLayout({
  title,
  description,
  slug,
  children,
  seoContent,
  faqs,
}: ToolPageLayoutProps) {
  const relatedTools = getRelatedTools(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-slate-700">{title}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          <p className="text-slate-600 mb-6">{description}</p>

          {/* Tool interface */}
          <div className="card mb-8">{children}</div>

          {/* Ad placeholder */}
          <div className="bg-slate-100 border border-dashed border-slate-300 rounded-lg h-24 flex items-center justify-center text-slate-400 text-sm mb-8">
            Advertisement
          </div>

          {/* SEO Content */}
          {seoContent && (
            <div className="card prose prose-slate max-w-none mb-8">
              {seoContent}
            </div>
          )}

          {/* FAQ Section */}
          {faqs && faqs.length > 0 && (
            <div className="card mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details key={i} className="group border-b border-slate-100 pb-3 last:border-0">
                    <summary className="cursor-pointer font-medium text-slate-700 hover:text-indigo-600">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-slate-600 text-sm">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Ad placeholder */}
            <div className="bg-slate-100 border border-dashed border-slate-300 rounded-lg h-64 flex items-center justify-center text-slate-400 text-sm">
              Ad Space
            </div>

            {/* Related tools */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Related Tools</h3>
              <div className="space-y-2">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition"
                  >
                    <span>{tool.icon}</span>
                    <span>{tool.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom related tools for mobile */}
      <div className="lg:hidden mt-8">
        <h3 className="font-semibold text-slate-900 mb-3">Related Tools</h3>
        <div className="grid grid-cols-2 gap-3">
          {relatedTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="card flex items-center gap-2 text-sm text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition !p-3"
            >
              <span>{tool.icon}</span>
              <span>{tool.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
