import React, { useState, useEffect } from 'react';
import { Shield, Mail, ArrowRight, AlertCircle, ExternalLink, Lock } from 'lucide-react';
import {
  seedIfNeeded,
  isEmailAllowed,
  getUserSession,
  setUserSession,
  getAdminSession,
} from '../auth/authStore';

interface AccessGateProps {
  children: React.ReactNode;
  onAdminClick: () => void;
}

export function AccessGate({ children, onAdminClick }: AccessGateProps) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Seed defaults, load CSV, check existing session
  useEffect(() => {
    (async () => {
      await seedIfNeeded();

      // Admin session also grants dashboard access
      const adminSess = getAdminSession();
      if (adminSess) {
        setAuthenticated(true);
        setReady(true);
        return;
      }

      const session = getUserSession();
      if (session && (await isEmailAllowed(session))) {
        setAuthenticated(true);
      }
      setReady(true);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim().toLowerCase();

    if (!trimmed) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    if (await isEmailAllowed(trimmed)) {
      setUserSession(trimmed);
      setAuthenticated(true);
    } else {
      setError('ACCESS_DENIED');
    }
    setLoading(false);
  };

  // ── Loading state ──────────────────────────────────────────────────────
  if (!ready) {
    return (
      <div className="min-h-full h-full bg-slate-100 flex items-center justify-center">
        <div className="animate-pulse text-slate-400 text-sm tracking-wide">
          Initializing…
        </div>
      </div>
    );
  }

  // ── Authenticated → render dashboard ───────────────────────────────────
  if (authenticated) return <>{children}</>;

  // ── Gate UI ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-full h-full bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-700 px-8 pt-10 pb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-5">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              TN 2026 PFT Tool
            </h1>
            <p className="mt-2 text-sky-100 text-sm leading-relaxed">
              Access restricted — enter your authorized email below
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="gate-email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
                  <input
                    id="gate-email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold text-sm transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  <>
                    Verify Access
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Error: generic */}
            {error && error !== 'ACCESS_DENIED' && (
              <div className="mt-4 flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Error: access denied */}
            {error === 'ACCESS_DENIED' && (
              <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-5 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-sm font-semibold text-amber-800">
                  Access Restricted
                </p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  This email does not have access to this tool. To request
                  authorization, please contact:
                </p>
                <a
                  href="mailto:contact@null-field.com?subject=TN%202026%20PFT%20Tool%20Access%20Request"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800 transition"
                >
                  contact@null-field.com
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Admin link */}
        <div className="mt-5 text-center">
          <button
            onClick={onAdminClick}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <Lock className="w-3 h-3" />
            Admin Access
          </button>
        </div>
      </div>
    </div>
  );
}
