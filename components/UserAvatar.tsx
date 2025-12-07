'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAvatarColor, getInitials } from '@/lib/avatar';

interface User {
  email: string;
  username: string;
}

export default function UserAvatar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      if (data.authenticated) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setShowDropdown(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/admin/login"
        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-full transition-all"
      >
        Log in
      </Link>
    );
  }

  const avatarColor = getAvatarColor(user.email);
  const initials = getInitials(user.username);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-all hover:ring-2 hover:ring-white/50"
        style={{ backgroundColor: avatarColor }}
        title={user.username}
      >
        {initials}
      </button>

      {showDropdown && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div
            className="fixed inset-0"
            style={{ zIndex: 10, pointerEvents: 'auto' }}
            onClick={() => setShowDropdown(false)}
          ></div>

          {/* Dropdown Menu */}
          <div
            className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
            style={{ zIndex: 20 }}
          >
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900">
                {user.username}
              </p>
              <p className="text-xs text-gray-600 truncate">{user.email}</p>
            </div>

            <div className="py-2">
              <Link
                href="/admin/upload"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                📤 Upload Report
              </Link>
              <Link
                href="/admin/manage"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                🗂️ Manage Reports
              </Link>
            </div>

            <div className="border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                🚪 Log out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
