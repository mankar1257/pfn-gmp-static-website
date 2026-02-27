import React, { useState, useCallback, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  UserPlus,
  Trash2,
  Plus,
  ArrowLeft,
  LogOut,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Mail,
} from 'lucide-react';
import {
  getAllowedEmails,
  addAllowedEmail,
  removeAllowedEmail,
  isCsvEmail,
  getAdmins,
  addAdmin,
  removeAdmin,
  clearAdminSession,
  getAdminSession,
  type AdminUser,
} from '../auth/authStore';

interface AdminPanelProps {
  onLogout: () => void;      // sign out → back to gate
  onGoToDashboard: () => void; // keep session → view PFT tool
}

type Tab = 'users' | 'admins';

// ─── Toast helper ──────────────────────────────────────────────────────────
interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

/** Track which emails came from the CSV (non-removable) */
interface EmailEntry {
  email: string;
  fromCsv: boolean;
}

let toastId = 0;

export function AdminPanel({ onLogout, onGoToDashboard }: AdminPanelProps) {
  const [tab, setTab] = useState<Tab>('users');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // -- Data states ---------------------------------------------------------
  const [emailEntries, setEmailEntries] = useState<EmailEntry[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>(getAdmins);
  const adminEmail = getAdminSession() ?? '';

  // Load merged emails on mount
  useEffect(() => {
    (async () => {
      const all = await getAllowedEmails();
      const entries: EmailEntry[] = [];
      for (const em of all) {
        entries.push({ email: em, fromCsv: await isCsvEmail(em) });
      }
      setEmailEntries(entries);
    })();
  }, []);

  // -- User form -----------------------------------------------------------
  const [newEmail, setNewEmail] = useState('');

  // -- Admin form ----------------------------------------------------------
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminPasswordConfirm, setNewAdminPasswordConfirm] = useState('');

  // -- Toast ---------------------------------------------------------------
  const pushToast = useCallback((type: Toast['type'], message: string) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  // ── User actions ────────────────────────────────────────────────────────

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newEmail.trim().toLowerCase();
    if (!trimmed) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      pushToast('error', 'Invalid email format.');
      return;
    }
    // Check if already in the merged list
    if (emailEntries.some((en) => en.email === trimmed)) {
      pushToast('error', 'Email already authorized.');
      return;
    }
    if (addAllowedEmail(trimmed)) {
      setEmailEntries((prev) => [...prev, { email: trimmed, fromCsv: false }]);
      setNewEmail('');
      pushToast('success', `Added ${trimmed}`);
    } else {
      pushToast('error', 'Email already exists.');
    }
  };

  const handleRemoveEmail = (email: string) => {
    if (removeAllowedEmail(email)) {
      setEmailEntries((prev) => prev.filter((en) => en.email !== email));
      pushToast('success', `Removed ${email}`);
    }
  };

  // ── Admin actions ──────────────────────────────────────────────────────

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newAdminEmail.trim().toLowerCase();
    if (!trimmed || !newAdminPassword) {
      pushToast('error', 'Email and password are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      pushToast('error', 'Invalid email format.');
      return;
    }
    if (newAdminPassword.length < 4) {
      pushToast('error', 'Password must be at least 4 characters.');
      return;
    }
    if (newAdminPassword !== newAdminPasswordConfirm) {
      pushToast('error', 'Passwords do not match.');
      return;
    }
    const ok = await addAdmin(trimmed, newAdminPassword);
    if (ok) {
      setAdmins(getAdmins());
      setNewAdminEmail('');
      setNewAdminPassword('');
      setNewAdminPasswordConfirm('');
      pushToast('success', `Admin ${trimmed} added`);
    } else {
      pushToast('error', 'Admin already exists.');
    }
  };

  const handleRemoveAdmin = (email: string) => {
    if (email.toLowerCase() === adminEmail.toLowerCase()) {
      pushToast('error', "You can't remove yourself.");
      return;
    }
    if (removeAdmin(email)) {
      setAdmins(getAdmins());
      pushToast('success', `Admin ${email} removed`);
    } else {
      pushToast('error', 'Cannot remove — at least one admin is required.');
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    onLogout();
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg animate-fade-in ${
              t.type === 'success'
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {t.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            {t.message}
          </div>
        ))}
      </div>

      {/* Top bar */}
      <header className="border-b border-slate-700/60 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Admin Panel</h1>
            <p className="text-xs text-slate-400">
              Signed in as <span className="text-amber-400">{adminEmail}</span>
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-800/60 p-1 rounded-xl mb-8">
          {(
            [
              { key: 'users' as Tab, label: 'Allowed Users', icon: Users },
              { key: 'admins' as Tab, label: 'Admin Accounts', icon: KeyRound },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer ${
                tab === key
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* ────────── Users Tab ────────── */}
        {tab === 'users' && (
          <div className="space-y-6">
            {/* Add form */}
            <form onSubmit={handleAddEmail} className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  placeholder="Enter user email to grant access..."
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-600 bg-slate-700/60 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Add
              </button>
            </form>

            {/* List */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">
                  Authorized Emails
                </span>
                <span className="text-xs text-slate-500">
                  {emailEntries.length} user{emailEntries.length !== 1 ? 's' : ''}
                </span>
              </div>

              {emailEntries.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-slate-500">
                  No users yet. Add one above.
                </div>
              ) : (
                <ul className="divide-y divide-slate-700/40">
                  {emailEntries.map((en) => (
                    <li
                      key={en.email}
                      className="px-5 py-3 flex items-center justify-between group hover:bg-slate-700/20 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sky-500/15 flex items-center justify-center text-xs font-bold text-sky-400 uppercase">
                          {en.email[0]}
                        </div>
                        <span className="text-sm text-slate-200">{en.email}</span>
                        {en.fromCsv && (
                          <span className="text-[10px] font-semibold tracking-wide uppercase bg-sky-500/15 text-sky-400 px-1.5 py-0.5 rounded">
                            CSV
                          </span>
                        )}
                      </div>
                      {!en.fromCsv && (
                        <button
                          onClick={() => handleRemoveEmail(en.email)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition cursor-pointer"
                          title="Remove access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* ────────── Admins Tab ────────── */}
        {tab === 'admins' && (
          <div className="space-y-6">
            {/* Add form */}
            <form onSubmit={handleAddAdmin} className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="New admin email..."
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-600 bg-slate-700/60 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-600 bg-slate-700/60 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
                  />
                </div>
                <div className="flex-1 relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={newAdminPasswordConfirm}
                    onChange={(e) => setNewAdminPasswordConfirm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-600 bg-slate-700/60 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-900 text-sm font-semibold transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Admin
              </button>
            </form>

            {/* List */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">
                  Admin Accounts
                </span>
                <span className="text-xs text-slate-500">
                  {admins.length} admin{admins.length !== 1 ? 's' : ''}
                </span>
              </div>

              {admins.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-slate-500">
                  No admin accounts.
                </div>
              ) : (
                <ul className="divide-y divide-slate-700/40">
                  {admins.map((a) => {
                    const isSelf = a.email.toLowerCase() === adminEmail.toLowerCase();
                    return (
                      <li
                        key={a.email}
                        className="px-5 py-3 flex items-center justify-between group hover:bg-slate-700/20 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center text-xs font-bold text-amber-400 uppercase">
                            {a.email[0]}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-200">
                              {a.email}
                            </span>
                            {isSelf && (
                              <span className="text-[10px] font-semibold tracking-wide uppercase bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                        {!isSelf && (
                          <button
                            onClick={() => handleRemoveAdmin(a.email)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition cursor-pointer"
                            title="Remove admin"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Info note */}
            <div className="bg-slate-800/30 border border-slate-700/40 rounded-lg px-4 py-3 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-400 leading-relaxed">
                Passwords are hashed with SHA-256 before storage. You cannot
                remove yourself or the last remaining admin. Emails marked
                <span className="text-sky-400 font-semibold"> CSV </span>
                come from the static seed file and persist across all
                deployments. Admin-added emails are stored in the browser's
                localStorage.
              </p>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-10 pt-6 border-t border-slate-700/40 flex items-center justify-center gap-6">
          <button
            onClick={onGoToDashboard}
            className="inline-flex items-center gap-1.5 text-sm text-sky-400 hover:text-sky-300 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to PFT Tool
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-400 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
