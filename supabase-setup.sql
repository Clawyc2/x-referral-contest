-- SQL para crear tablas en Supabase
-- Ejecutar en: https://supabase.com/dashboard/project/dpdcdunyiusdbsinbzlo/sql

-- Habilitar extensión uuid-ossp
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  twitter_handle TEXT UNIQUE NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de referidos
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_users_points ON users(points DESC);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede leer usuarios (para leaderboard)
CREATE POLICY "Users are viewable by everyone" ON users
  FOR SELECT USING (true);

-- Política: Solo el usuario puede actualizar su propio registro
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (true);

-- Política: Cualquiera puede insertar usuarios
CREATE POLICY "Anyone can insert users" ON users
  FOR INSERT WITH CHECK (true);

-- Política: Cualquiera puede insertar referidos
CREATE POLICY "Anyone can insert referrals" ON referrals
  FOR INSERT WITH CHECK (true);

-- Política: Cualquiera puede leer referidos
CREATE POLICY "Referrals are viewable by everyone" ON referrals
  FOR SELECT USING (true);

-- Verificar tablas creadas
SELECT * FROM users LIMIT 1;
SELECT * FROM referrals LIMIT 1;
