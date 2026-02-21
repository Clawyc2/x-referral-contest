# X Referral Contest 🚀

Sistema de referidos con login real de X (Twitter) usando ThirdWeb, contador de puntos y dashboard de rankings.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![ThirdWeb](https://img.shields.io/badge/ThirdWeb-5.0-purple)
![Supabase](https://img.shields.io/badge/Supabase-2.0-green)

## 🎯 Demo

**URL de producción:** https://referral-contest.vercel.app

## ✨ Características

- 🔐 **Login real con X** usando ThirdWeb In-App Wallet
- 🎫 **Código de referido único** por usuario
- 📊 **Leaderboard en tiempo real** con rankings
- 💎 **Sistema de puntos** (10 pts por referido)
- 🎨 **UI moderna** con gradientes y animaciones
- 📱 **100% Responsive** (mobile-first)
- ⚡ **Deploy automático** desde GitHub
- 🔄 **Sincronización en tiempo real** con Supabase

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Next.js 15** | Framework React con App Router |
| **ThirdWeb 5.0** | Login con X, wallet management |
| **Supabase** | Database + Auth + Real-time |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |

## 🚀 Quick Start

### 1. Clonar repositorio

```bash
git clone https://github.com/Clawyc2/x-referral-contest.git
cd x-referral-contest
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear archivo `.env.local`:

```env
# ThirdWeb
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=tu_client_id

# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 4. Configurar Supabase

Ejecutar el SQL del archivo `supabase-setup.sql` en tu proyecto de Supabase.

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 📊 Estructura de Base de Datos

### Tabla `users`

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  twitter_handle TEXT UNIQUE,
  referral_code TEXT UNIQUE,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP
);
```

### Tabla `referrals`

```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY,
  referrer_id UUID REFERENCES users(id),
  referred_id UUID REFERENCES users(id),
  created_at TIMESTAMP
);
```

## 🔐 Autenticación con ThirdWeb

Este proyecto usa **ThirdWeb In-App Wallet** para login con X:

```typescript
import { ConnectButton } from "thirdweb/react";

<ConnectButton
  client={client}
  appMetadata={{
    name: "X Referral Contest",
    url: "https://referral-contest.vercel.app",
  }}
/>
```

El usuario puede conectarse con:
- X (Twitter)
- Google
- Discord
- Email
- Y más...

## 🎨 Características de UI

- **Gradientes dinámicos** con animaciones
- **Glassmorphism** (frosted glass effect)
- **Micro-interacciones** en hover/click
- **Animaciones suaves** con CSS transitions
- **Responsive design** optimizado para móvil
- **Dark mode** por defecto

## 📈 Flujo de Usuario

1. Usuario visita la web
2. Click en "Connect" → ThirdWeb muestra opciones de login
3. Selecciona "X" → Autoriza con Twitter
4. Recibe código único de referido
5. Comparte enlace en redes sociales
6. Cada nuevo registro suma 10 puntos
7. Visualiza su posición en el leaderboard

## 🔧 Configuración de ThirdWeb

1. Crear cuenta en [thirdweb.com](https://thirdweb.com)
2. Crear nuevo proyecto
3. Obtener Client ID
4. Configurar en `.env.local`

**Permisos necesarios:**
- ✅ In-App Wallet
- ✅ Social Login (X)
- ✅ Read/Write contracts

## 🗄️ Configuración de Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ejecutar SQL del archivo `supabase-setup.sql`
3. Habilitar Row Level Security (RLS)
4. Obtener URL y ANON_KEY
5. Configurar en `.env.local`

## 📱 Responsive Design

| Dispositivo | Breakpoint |
|-------------|------------|
| Mobile | < 768px |
| Tablet | 768px - 1024px |
| Desktop | > 1024px |

## 🚀 Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Clawyc2/x-referral-contest)

1. Fork este repositorio
2. Importar en Vercel
3. Configurar variables de entorno
4. Deploy automático ✅

## 📝 Variables de Entorno Requeridas

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` | Client ID de ThirdWeb |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública de Supabase |

## 🎯 Roadmap

- [ ] Notificaciones en tiempo real
- [ ] Sistema de premios automáticos
- [ ] Analytics de clicks
- [ ] Exportar datos a CSV
- [ ] Integración con más redes sociales
- [ ] Sistema de logros/badges

## 🤝 Contribuir

1. Fork del repositorio
2. Crear rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Clawy 🐾** - *Desarrollo completo*
- **Luis** - *Idea y requisitos*

## 🙏 Agradecimientos

- [ThirdWeb](https://thirdweb.com) - Por el excelente SDK de Web3
- [Supabase](https://supabase.com) - Por la infraestructura de backend
- [Vercel](https://vercel.com) - Por el hosting y deploy continuo

---

**Hecho con 💜 por Clawy 🐾 para Luis**

**Deploy:** https://referral-contest.vercel.app
**Repo:** https://github.com/Clawyc2/x-referral-contest
