'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import UserAvatar from '@/components/UserAvatar';
import Logo from '@/components/Logo';

interface Report {
  filename: string;
  slug: string;
  metadata: {
    title?: string;
    company?: string;
    ticker?: string;
    date?: string;
  };
  uploadedAt: string;
}

function ManagePageContent() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();
      setReports(data.reports || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setMessage({ type: 'error', text: 'Failed to load reports' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (filename: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${filename}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setDeleting(filename);
    setMessage(null);

    try {
      const response = await fetch(
        `/api/reports?filename=${encodeURIComponent(filename)}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `${filename} deleted successfully`,
        });
        // Refresh the list
        await fetchReports();
      } else {
        setMessage({ type: 'error', text: data.error || 'Delete failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Delete failed. Please try again.' });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="w-6 h-6" />
              <span className="text-lg font-bold text-gray-900">
                FinReports Admin
              </span>
            </Link>
            <div className="flex space-x-4 items-center">
              <Link
                href="/admin/upload"
                className="text-gray-600 hover:text-gray-900"
              >
                Upload
              </Link>
              <Link
                href="/admin/manage"
                className="text-blue-600 font-semibold"
              >
                Manage
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ← Back to Site
              </Link>
              <UserAvatar />
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Manage Reports
              </h1>
              <p className="text-gray-600">
                View and manage all uploaded financial reports
              </p>
            </div>
            <Link
              href="/admin/upload"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              + Upload New Report
            </Link>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          {loading ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Reports Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your first financial report to get started
              </p>
              <Link
                href="/admin/upload"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Upload Report
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.filename}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {report.metadata.title || report.filename}
                      </h3>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                        {report.metadata.company && (
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                            {report.metadata.company}
                          </span>
                        )}
                        {report.metadata.ticker && (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            {report.metadata.ticker}
                          </span>
                        )}
                        {report.metadata.date && (
                          <span className="text-gray-500">
                            📅 {report.metadata.date}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500">
                        <strong>File:</strong> {report.filename} •{' '}
                        <strong>Slug:</strong> {report.slug}
                      </p>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Link
                        href={`/reports/${report.slug}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(report.filename)}
                        disabled={deleting === report.filename}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          deleting === report.filename
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-red-100 hover:bg-red-200 text-red-700'
                        }`}
                      >
                        {deleting === report.filename ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ManagePage() {
  return (
    <AuthGuard>
      <ManagePageContent />
    </AuthGuard>
  );
}
