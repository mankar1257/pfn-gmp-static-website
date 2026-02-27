/**
 * Access Control – Auth Store
 *
 * Two-layer email whitelist:
 *   1. Static CSV  → public/authorized_emails.csv  (ships with every deploy)
 *   2. localStorage → admin-added emails            (per-browser overrides)
 *
 * The merge: a user is allowed if their email appears in EITHER source.
 * Admin accounts are stored in localStorage with SHA-256 hashed passwords.
 *
 * Initial admin seed (runs once per browser):
 *   vaibhav@null-field.com  /  sarvin99
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AdminUser {
  email: string;
  passwordHash: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const STORAGE_KEYS = {
  localEmails: 'tnpoc_local_emails',   // admin-added emails (localStorage only)
  admins: 'tnpoc_admins',
  userSession: 'tnpoc_user_session',
  adminSession: 'tnpoc_admin_session',
  seeded: 'tnpoc_seeded',
} as const;

// ─── Crypto helpers ─────────────────────────────────────────────────────────

/** SHA-256 hash for password storage (hex string) */
export async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ─── Low-level getters / setters ────────────────────────────────────────────

function getJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setJSON<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Static CSV loader ─────────────────────────────────────────────────────

let _csvEmails: string[] | null = null;

/**
 * Fetch public/authorized_emails.csv once, cache in memory.
 * Each non-empty line is treated as one email (no header row).
 */
export async function loadCsvEmails(): Promise<string[]> {
  if (_csvEmails !== null) return _csvEmails;
  try {
    const res = await fetch('/authorized_emails.csv');
    if (!res.ok) throw new Error(res.statusText);
    const text = await res.text();
    _csvEmails = text
      .split(/\r?\n/)
      .map((l) => l.trim().toLowerCase())
      .filter((l) => l.length > 0 && l.includes('@'));
  } catch {
    _csvEmails = [];
  }
  return _csvEmails;
}

// ─── Seed ───────────────────────────────────────────────────────────────────

export async function seedIfNeeded(): Promise<void> {
  if (localStorage.getItem(STORAGE_KEYS.seeded)) return;

  const hash = await sha256('sarvin99');
  const admins: AdminUser[] = [{ email: 'vaibhav@null-field.com', passwordHash: hash }];

  setJSON(STORAGE_KEYS.admins, admins);
  setJSON(STORAGE_KEYS.localEmails, []);  // start empty; CSV is the baseline
  localStorage.setItem(STORAGE_KEYS.seeded, '1');
}

// ─── Allowed Emails (merged: CSV + localStorage) ───────────────────────────

/** Emails added by an admin via the panel (localStorage only) */
export function getLocalEmails(): string[] {
  return getJSON<string[]>(STORAGE_KEYS.localEmails, []);
}

/** All authorized emails: static CSV ∪ admin-added local emails */
export async function getAllowedEmails(): Promise<string[]> {
  const csv = await loadCsvEmails();
  const local = getLocalEmails();
  // Deduplicated merge
  const set = new Set(csv.map((e) => e.toLowerCase()));
  local.forEach((e) => set.add(e.toLowerCase()));
  return Array.from(set);
}

/** Check if an email appears in CSV or localStorage */
export async function isEmailAllowed(email: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const all = await getAllowedEmails();
  return all.includes(normalized);
}

/** Is this email from the static CSV (non-removable)? */
export async function isCsvEmail(email: string): Promise<boolean> {
  const csv = await loadCsvEmails();
  return csv.includes(email.trim().toLowerCase());
}

export function addAllowedEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;
  const list = getLocalEmails();
  if (list.some((e) => e.toLowerCase() === normalized)) return false;
  list.push(normalized);
  setJSON(STORAGE_KEYS.localEmails, list);
  return true;
}

export function removeAllowedEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const list = getLocalEmails();
  const filtered = list.filter((e) => e.toLowerCase() !== normalized);
  if (filtered.length === list.length) return false;
  setJSON(STORAGE_KEYS.localEmails, filtered);
  return true;
}

// ─── Admin Accounts ─────────────────────────────────────────────────────────

export function getAdmins(): AdminUser[] {
  return getJSON<AdminUser[]>(STORAGE_KEYS.admins, []);
}

export async function adminLogin(email: string, password: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const hash = await sha256(password);
  const admins = getAdmins();
  const match = admins.find(
    (a) => a.email.toLowerCase() === normalized && a.passwordHash === hash,
  );
  if (match) {
    localStorage.setItem(STORAGE_KEYS.adminSession, normalized);
    return true;
  }
  return false;
}

export function getAdminSession(): string | null {
  return localStorage.getItem(STORAGE_KEYS.adminSession);
}

export function clearAdminSession(): void {
  localStorage.removeItem(STORAGE_KEYS.adminSession);
}

export async function addAdmin(email: string, password: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !password) return false;
  const admins = getAdmins();
  if (admins.some((a) => a.email.toLowerCase() === normalized)) return false;
  const hash = await sha256(password);
  admins.push({ email: normalized, passwordHash: hash });
  setJSON(STORAGE_KEYS.admins, admins);
  return true;
}

export function removeAdmin(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const admins = getAdmins();
  if (admins.length <= 1) return false;
  const filtered = admins.filter((a) => a.email.toLowerCase() !== normalized);
  if (filtered.length === admins.length) return false;
  setJSON(STORAGE_KEYS.admins, filtered);
  return true;
}

// ─── User Session ───────────────────────────────────────────────────────────

export function getUserSession(): string | null {
  return localStorage.getItem(STORAGE_KEYS.userSession);
}

export function setUserSession(email: string): void {
  localStorage.setItem(STORAGE_KEYS.userSession, email.trim().toLowerCase());
}

export function clearUserSession(): void {
  localStorage.removeItem(STORAGE_KEYS.userSession);
}
