-- ============================================================
-- GENESIS Event Website — Supabase Database Migration
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/cjiohqshjchxhxwbpopz/sql/new
-- ============================================================

-- 1. Enable UUID Extension (standard in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id   TEXT UNIQUE NOT NULL,                       -- e.g., GEN-2026-00001
  participant_type  TEXT NOT NULL CHECK (participant_type IN ('guest', 'club_member')),
  member_type       TEXT CHECK (member_type IN ('general', 'board', 'ex_rotaractor')),
  position          TEXT,                                       -- Board position (e.g. Secretary)
  position_custom   TEXT,                                       -- Other position title
  name              TEXT NOT NULL,
  student_id        TEXT NOT NULL,
  department        TEXT,                                       -- Academic Department (e.g. Software Engineering)
  email             TEXT NOT NULL,
  contact_number    TEXT NOT NULL,
  club_name         TEXT,                                       -- Club name for ex-rotaractors
  referral_source   TEXT NOT NULL,                              -- Facebook, WhatsApp, etc.
  referral_other    TEXT,                                       -- Specified if referral is "Other"
  payment_method    TEXT NOT NULL CHECK (payment_method IN ('bkash', 'bank')),
  transaction_id    TEXT,
  registration_fee  INTEGER NOT NULL DEFAULT 0,
  package_selected  BOOLEAN NOT NULL DEFAULT false,
  package_fee       INTEGER NOT NULL DEFAULT 0,
  total_amount      INTEGER NOT NULL DEFAULT 0,
  payment_status    TEXT NOT NULL DEFAULT 'pending'
                    CHECK (payment_status IN ('pending', 'verified', 'rejected')),
  payment_notes     TEXT,
  attendance_status TEXT NOT NULL DEFAULT 'not_marked'
                    CHECK (attendance_status IN ('not_marked', 'attended', 'absent')),
  verified_by       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verified_at       TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- If the table already existed previously without the department column:
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS department TEXT;

-- 3. High-Performance Indexes for Admin Search & Verification
CREATE INDEX IF NOT EXISTS idx_registrations_reg_id ON registrations(registration_id);
CREATE INDEX IF NOT EXISTS idx_registrations_student_id ON registrations(student_id);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_transaction_id ON registrations(transaction_id);
CREATE INDEX IF NOT EXISTS idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX IF NOT EXISTS idx_registrations_attendance ON registrations(attendance_status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- 4. Payment Audit Log (Tracks every payment status modification)
CREATE TABLE IF NOT EXISTS payment_audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  changed_by      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  previous_status TEXT,
  new_status      TEXT,
  reason          TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Event Configuration Table
CREATE TABLE IF NOT EXISTS event_settings (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Initial Confirmed Event Settings
INSERT INTO event_settings (key, value) VALUES
  ('event_name', 'GENESIS'),
  ('event_tagline', 'The Beginning of a New Era'),
  ('event_theme', 'A Day of Ideas & Inspiration'),
  ('event_date', '03 November 2026'),
  ('venue', 'ICH, Ab4 3rd floor, Daffodil International University'),
  ('registration_open', 'true'),
  ('registration_open_date', '2026-10-25'),
  ('registration_close_date', '2026-11-01'),
  ('bkash_number', '01877162078'),
  ('bank_name', 'PRIME BANK PLC'),
  ('bank_account', '2188213015190'),
  ('fee_guest', '0'),
  ('fee_optional_package', '100'),
  ('fee_general_member', '100'),
  ('fee_board_ipp', '1000'),
  ('fee_board_president', '500'),
  ('fee_board_vice_president', '500'),
  ('fee_board_secretary', '500'),
  ('fee_board_joint_secretary', '500'),
  ('fee_board_treasurer', '300'),
  ('fee_board_directors', '300'),
  ('fee_board_other', '300'),
  ('fee_ex_rotaractor', '1000')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 6. Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to event_settings
CREATE POLICY "Public can view event settings" 
  ON event_settings FOR SELECT 
  USING (true);

-- Authenticated administrators can read/update registrations
CREATE POLICY "Authenticated admins can manage registrations" 
  ON registrations FOR ALL 
  USING (auth.role() = 'authenticated');

-- Note: Next.js API routes use the SUPABASE_SERVICE_ROLE_KEY server-side,
-- which automatically bypasses RLS to safely insert and query registrations.
