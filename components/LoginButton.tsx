'use client';

import { supabase } from '@/lib/supabase';
import { createUser, getUserByTwitter, generateReferralCode } from '@/lib/referral';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // En producción, usar OAuth de Twitter
      // Por ahora, simulamos con prompt
      const twitterHandle = prompt('Ingresa tu handle de Twitter (ej: @usuario)');

      if (!twitterHandle) return;

      // Verificar si usuario ya existe
      let user = await getUserByTwitter(twitterHandle);

      if (!user) {
        // Crear nuevo usuario
        const referralCode = generateReferralCode(twitterHandle);
        user = await createUser(twitterHandle, referralCode);
      }

      // Guardar en localStorage (en producción usar sessions)
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir a dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Iniciar sesión con X
    </button>
  );
}
