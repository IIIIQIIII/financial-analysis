'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import UserAvatar from '@/components/UserAvatar';
import Logo from '@/components/Logo';

function UploadPageContent() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [preview, setPreview] = useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage(null);

      // Read file content for preview
      const content = await selectedFile.text();
      setPreview(content);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a file' });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `File uploaded successfully: ${data.filename}`,
        });
        setFile(null);
        setPreview('');
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
    } finally {
      setUploading(false);
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
                className="text-blue-600 font-semibold"
              >
                Upload
              </Link>
              <Link
                href="/admin/manage"
                className="text-gray-600 hover:text-gray-900"
              >
                Manage
              </Link>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Site
              </Link>
              <UserAvatar />
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Upload Financial Report
          </h1>
          <p className="text-gray-600 mb-8">
            Upload an MDX (.mdx) file to publish as a new report. Regular Markdown files (.md) should be renamed to .mdx
          </p>

          {/* Upload Form */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select File
              </label>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".mdx"
                onChange={handleFileChange}
                className="hidden"
              />
              {/* Custom button to trigger file input */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full text-left text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2.5 transition-colors"
              >
                {file ? file.name : 'Choose file...'}
              </button>
              <p className="mt-2 text-sm text-gray-500">
                Only .mdx files are supported. If you have a .md file, simply rename it to .mdx
              </p>
            </div>

            {file && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Selected:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </p>
              </div>
            )}

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

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                !file || uploading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload Report'}
            </button>
          </div>

          {/* Preview */}
          {preview && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                File Preview
              </h2>
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-auto">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {preview.slice(0, 2000)}
                  {preview.length > 2000 && '\n\n... (preview truncated)'}
                </pre>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📝 File Format Guidelines
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>1. Metadata:</strong> Add metadata at the top of your file:
              </p>
              <pre className="bg-white p-4 rounded border text-sm overflow-x-auto">
{`export const metadata = {
  title: "Company Name (TICKER) Financial Analysis",
  company: "Company Name",
  ticker: "TICKER",
  period: "FY 2020 - FY 2024",
  date: "December 2024",
  icon: "🔤"
}`}
              </pre>

              <p className="mt-4">
                <strong>2. Content:</strong> Use standard Markdown syntax
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Headings: # H1, ## H2, ### H3</li>
                <li>Lists: - bullet or 1. numbered</li>
                <li>Tables: | Header | Header | with proper formatting</li>
                <li>Bold: **text** or __text__</li>
                <li>Italic: *text* or _text_</li>
              </ul>

              <p className="mt-4">
                <strong>3. File naming:</strong> Use lowercase with hyphens (e.g., alphabet-googl-2024.mdx)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <AuthGuard>
      <UploadPageContent />
    </AuthGuard>
  );
}
