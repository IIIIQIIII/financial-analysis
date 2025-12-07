import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";

export default function AboutPage() {
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
            <Link href="/reports" className="hover:opacity-80 transition-opacity">
              Reports
            </Link>
            <Link
              href="/about"
              className="hover:opacity-80 transition-opacity font-semibold"
            >
              About
            </Link>
            <UserAvatar />
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About FinReports
            </h1>
            <p className="text-xl text-slate-300">
              Data-driven financial analysis for informed investment decisions
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              FinReports is dedicated to providing in-depth, data-driven
              financial analysis of publicly traded companies. We believe that
              thorough financial analysis should be accessible to all investors,
              from individual retail investors to institutional professionals.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Our reports are based on official SEC filings (10-K, 10-Q) and
              audited financial statements, ensuring accuracy and reliability in
              every analysis we publish.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              What We Cover
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1">📊</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Quantitative Analysis
                  </h3>
                  <p className="text-slate-300">
                    Revenue trends, profitability metrics, cash flow analysis,
                    and balance sheet health assessment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1">🎯</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Qualitative Insights
                  </h3>
                  <p className="text-slate-300">
                    Strategic positioning, competitive landscape analysis, and
                    management commentary evaluation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1">⚠️</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Risk Assessment
                  </h3>
                  <p className="text-slate-300">
                    Comprehensive risk factor analysis including regulatory,
                    competitive, and operational risks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1">💡</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Investment Perspective
                  </h3>
                  <p className="text-slate-300">
                    Valuation analysis and investment considerations for
                    long-term investors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Data Sources
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              All financial data and information used in our reports are sourced
              from:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>SEC EDGAR Database:</strong> Official 10-K annual
                  reports and 10-Q quarterly reports
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Company Filings:</strong> Investor presentations,
                  earnings calls, and shareholder letters
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Public Disclosures:</strong> Press releases and
                  regulatory announcements
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Disclaimer</h2>
            <p className="text-slate-300 leading-relaxed italic">
              All reports and analysis published on FinReports are for
              informational and educational purposes only. They do not constitute
              investment advice, recommendations, or solicitations to buy or sell
              securities. Investors should conduct their own due diligence and
              consult with qualified financial advisors before making investment
              decisions. Past performance does not guarantee future results.
            </p>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/reports"
              className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="mr-2">📑</span>
              Browse Reports
            </Link>
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
