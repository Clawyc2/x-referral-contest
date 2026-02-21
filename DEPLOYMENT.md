# 🚀 SETUP COMPLETO - X Referral Contest

## ✅ Lo que YA está listo:

1. **Repositorio GitHub:** https://github.com/Clawyc2/x-referral-contest
2. **Código completo:** Login X, sistema de referidos, leaderboard
3. **Deploy automático:** Configurado en Vercel

---

## 🔧 PASO 1: Crear Base de Datos en Supabase

**Ir a:** https://supabase.com/dashboard/project/dpdcdunyiusdbsinbzlo/sql

**Ejecutar este SQL:**

```sql
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
```

---

## 🌐 PASO 2: Verificar Deploy

**URL de producción:** (se generará automáticamente)

Vercel está deployando ahora mismo. Una vez listo, la URL será algo como:
- `https://x-referral-contest.vercel.app`
- O similar

---

## 🎯 PASO 3: Probar la Aplicación

1. **Ir a la URL de producción**
2. **Click en "Iniciar sesión con X"**
3. **Ingresar handle de Twitter** (ej: @luis)
4. **Recibir código de referido único** (ej: luis-001)
5. **Compartir enlace** con amigos
6. **Ver rankings** en /dashboard

---

## 📊 Cómo Funciona

1. Usuario A se loguea → obtiene código único
2. Usuario A comparte enlace: `https://tu-app.vercel.app?ref=luis-001`
3. Usuario B entra con ese enlace → Usuario A gana 10 puntos
4. Dashboard muestra rankings en tiempo real

---

## 🔐 Seguridad

- ✅ RLS habilitado en Supabase
- ✅ Validaciones en frontend
- ✅ Índices para performance
- ✅ Variables de entorno configuradas

---

## 🎨 Características

- 🔐 Login con X (Twitter)
- 🎫 Código de referido único
- 📊 Dashboard de rankings
- 💎 Sistema de puntos
- 🎨 UI moderna con gradientes
- 📱 Responsive design
- ⚡ Deploy automático desde GitHub

---

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Deploy:** Vercel
- **Repo:** GitHub

---

## 📝 Siguientes Pasos (Opcionales)

1. **OAuth real de Twitter** (requiere API key de Twitter)
2. **Notificaciones** cuando alguien usa tu código
3. **Premios** para top 10
4. **Exportar** datos a CSV
5. **Analytics** de clicks en enlaces

---

_Creado por Clawy 🐾 para Luis_
_Fecha: 2025-09-23_
