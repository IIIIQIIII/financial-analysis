import Link from "next/link";
import { notFound } from "next/navigation";
import UserAvatar from "@/components/UserAvatar";
import BackToTop from "@/components/BackToTop";

// Force dynamic rendering - reports can be uploaded at any time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ReportPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { slug } = await params;

  let Report;
  let metadata;

  try {
    // Dynamically import the MDX file
    const module = await import(`@/content/reports/${slug}.mdx`);
    Report = module.default;
    metadata = module.metadata || {};
  } catch (error) {
    console.error(`Report not found: ${slug}`, error);
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">📊</span>
            <span className="text-xl font-bold text-white">FinReports</span>
          </Link>
          <div className="hidden md:flex space-x-8 text-white items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
            <Link
              href="/reports"
              className="hover:opacity-80 transition-opacity font-semibold"
            >
              Reports
            </Link>
            <Link href="/about" className="hover:opacity-80 transition-opacity">
              About
            </Link>
            <UserAvatar />
          </div>
        </div>
      </nav>

      {/* Report Header */}
      <div className="text-white">
        <div className="container mx-auto px-6 py-16">
          <Link
            href="/reports"
            className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <span className="mr-2">←</span> Back to Reports
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{metadata.icon || "📊"}</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {metadata.company} ({metadata.ticker})
                </h1>
                <p className="text-xl text-slate-300">
                  Financial Analysis Report
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              {metadata.date && (
                <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  📅 {metadata.date}
                </span>
              )}
              {metadata.period && (
                <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  📊 {metadata.period}
                </span>
              )}
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                📄 Source: SEC Filings
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* MDX Content */}
          <article className="bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-lg prose-gray max-w-none">
            <Report />
          </article>

          {/* Disclaimer */}
          <div className="mt-8 bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
            <p className="text-sm text-gray-600 italic">
              <strong>Disclaimer:</strong> This report is for reference only and
              does not constitute investment advice. Investors should conduct
              independent research and consult professionals before making
              investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-32">
        <div className="text-center text-slate-400 text-sm">
          <p>© 2026 FinReports. Data sourced from SEC EDGAR filings.</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}
