import Link from "next/link";
import { getReports } from "@/lib/reports";
import UserAvatar from "@/components/UserAvatar";

// Force dynamic rendering - homepage should show latest reports
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const reports = await getReports();
  const latestReport = reports[0];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">📊</span>
            <span className="text-xl font-bold text-white">FinReports</span>
          </div>
          <div className="hidden md:flex space-x-8 text-white items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
            <Link href="/reports" className="hover:opacity-80 transition-opacity">
              Reports
            </Link>
            <Link href="/about" className="hover:opacity-80 transition-opacity">
              About
            </Link>
            <UserAvatar />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          {latestReport && (
            <div className="inline-flex items-center bg-blue-950/60 text-white px-6 py-3 rounded-full mb-8 backdrop-blur-sm border border-blue-800/30">
              <span className="bg-blue-700 text-xs font-semibold px-3 py-1 rounded-full mr-3">
                NEW
              </span>
              <span className="text-sm">
                Latest analysis: {latestReport.metadata.company} (
                {latestReport.metadata.ticker}) {latestReport.metadata.date}
              </span>
            </div>
          )}

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            📈 Financial Analysis
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto">
            In-depth financial reports and analysis of public companies.
            Data-driven insights for informed investment decisions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/reports"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 min-w-[200px] justify-center"
            >
              <span>📑</span>
              Browse Reports
            </Link>
            {latestReport && (
              <Link
                href={`/reports/${latestReport.slug}`}
                className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 min-w-[200px] justify-center"
              >
                <span>🔍</span>
                Latest Report
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="text-slate-400 text-sm">
            <span>✨ 5+ Companies Analyzed</span>
          </div>
        </div>

        {/* Featured Reports Section */}
        <div className="mt-32 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Featured Analysis
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Featured Report Cards */}
            {reports.slice(0, 3).map((report, index) => (
              <Link
                key={report.slug}
                href={`/reports/${report.slug}`}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20"
              >
                <div className="text-4xl mb-4">{report.metadata.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {report.metadata.company} ({report.metadata.ticker})
                </h3>
                <p className="text-slate-300 mb-4">
                  {report.metadata.description}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>{report.metadata.date}</span>
                  {index === 0 && (
                    <span className="bg-green-400/20 text-green-300 px-3 py-1 rounded-full">
                      Latest
                    </span>
                  )}
                </div>
              </Link>
            ))}

            {/* Placeholder Cards - only show if less than 3 reports */}
            {reports.length < 3 &&
              Array.from({ length: 3 - reports.length }).map((_, idx) => (
                <div
                  key={`placeholder-${idx}`}
                  className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 opacity-50"
                >
                  <div className="text-4xl mb-4">
                    {idx === 0 ? "🍎" : "📱"}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Coming Soon
                  </h3>
                  <p className="text-slate-300 mb-4">
                    More detailed financial analysis reports coming soon.
                  </p>
                  <div className="text-sm text-slate-400">Stay tuned</div>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-32">
        <div className="text-center text-slate-400 text-sm">
          <p>© 2026 FinReports. Data sourced from SEC EDGAR filings.</p>
        </div>
      </footer>
    </div>
  );
}
