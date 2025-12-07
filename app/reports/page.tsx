import Link from "next/link";
import { getReports } from "@/lib/reports";
import UserAvatar from "@/components/UserAvatar";

// Force dynamic rendering - reports list should always be fresh
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ReportsPage() {
  const reports = await getReports();
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

      {/* Header */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Financial Reports
          </h1>
          <p className="text-xl text-slate-300">
            In-depth analysis of public companies based on SEC filings and
            financial statements.
          </p>
        </div>

        {/* Reports List */}
        <div className="max-w-5xl mx-auto space-y-6">
          {reports.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                No Reports Yet
              </h3>
              <p className="text-slate-400">
                Check back soon for financial analysis reports.
              </p>
            </div>
          ) : (
            reports.map((report, index) => (
              <Link
                key={report.slug}
                href={`/reports/${report.slug}`}
                className="block bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all transform hover:scale-[1.02] border border-white/20"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
                      {report.metadata.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {report.metadata.company}{" "}
                          <span className="text-green-300">
                            ({report.metadata.ticker})
                          </span>
                        </h2>
                        <p className="text-slate-400">
                          {report.metadata.period} • {report.metadata.date}
                        </p>
                      </div>
                      {index === 0 && (
                        <span className="bg-green-400/20 text-green-300 px-4 py-1 rounded-full text-sm font-semibold">
                          Latest
                        </span>
                      )}
                    </div>

                    <p className="text-slate-300 mb-4">
                      {report.metadata.description}
                    </p>

                    {/* Highlights */}
                    {report.metadata.highlights &&
                      report.metadata.highlights.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-3 mb-4">
                          {report.metadata.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-sm text-blue-100"
                            >
                              <span className="text-green-400 mt-1">✓</span>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}

                    {/* CTA */}
                    <div className="flex items-center text-white font-semibold">
                      Read Full Analysis
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}

          {/* Coming Soon Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 opacity-60">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                More Reports Coming Soon
              </h3>
              <p className="text-slate-400">
                Additional company analysis will be published regularly. Stay
                tuned!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-16">
        <div className="text-center text-slate-400 text-sm">
          <p>© 2026 FinReports. Data sourced from SEC EDGAR filings.</p>
        </div>
      </footer>
    </div>
  );
}
