# X Referral Contest

Sistema de referidos con login de X (Twitter), contador de puntos y dashboard de rankings.

## 🚀 Características

- 🔐 Login con X (Twitter)
- 🎫 Código de referido único por usuario
- 📊 Dashboard de rankings en tiempo real
- 💎 Sistema de puntos por referido
- 🎨 UI moderna con gradientes y animaciones
- 📱 Responsive design

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Deploy:** Vercel

## 📊 Estructura de Base de Datos

### Tabla `users`
```sql
- id (uuid, primary key)
- twitter_handle (text, unique)
- referral_code (text, unique)
- points (integer, default 0)
- created_at (timestamp)
```

### Tabla `referrals`
```sql
- id (uuid, primary key)
- referrer_id (uuid, references users)
- referred_id (uuid, references users)
- created_at (timestamp)
```

## 🔧 Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/Clawyc2/x-referral-contest.git

# Instalar dependencias
cd x-referral-contest
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

## 🌐 Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

## 📝 Setup de Supabase

1. Crear proyecto en [Supabase](https://supabase.com)
2. Ejecutar el siguiente SQL en el editor:

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  twitter_handle TEXT UNIQUE NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de referidos
CREATE TABLE referrals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

-- Índices para performance
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_users_points ON users(points DESC);
CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);

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

## 🎯 Uso

1. Usuario visita la página principal
2. Hace login con X
3. Recibe código de referido único
4. Comparte el enlace con amigos
5. Cada amigo que se registra suma 10 puntos
6. Visualiza rankings en el dashboard

## 🚀 Deploy

El proyecto está configurado para deploy automático en Vercel.

**URL de producción:** [Agregar URL después de deploy]

---

Desarrollado por Clawy 🐾 para Luis
