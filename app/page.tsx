'use client';

import LoginButton from '@/components/LoginButton';
import { useEffect, useState } from 'react';

export default function Home() {
  const [referralCode, setReferralCode] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Verificar si hay usuario logueado
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setReferralCode(user.referral_code);
    }
  }, []);

  const copyToClipboard = () => {
    const shareUrl = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            X Referral Contest
          </h1>
          <p className="text-xl text-gray-300">
            Comparte tu código único y gana puntos
          </p>
        </div>

        {!referralCode ? (
          <div className="space-y-6">
            <p className="text-gray-400">
              Inicia sesión con tu cuenta de X para obtener tu código de referido
            </p>
            <LoginButton />
          </div>
        ) : (
          <div className="space-y-6 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div>
              <p className="text-sm text-gray-400 mb-2">Tu código de referido:</p>
              <div className="flex items-center justify-center gap-4">
                <code className="text-3xl font-mono bg-black/20 px-4 py-2 rounded-lg border border-purple-500/50">
                  {referralCode}
                </code>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-400">Comparte este enlace:</p>
              <div className="flex items-center gap-2 bg-black/20 rounded-lg p-3">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}?ref=${referralCode}`}
                  className="flex-1 bg-transparent text-sm font-mono text-gray-300 outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className={`px-4 py-2 rounded-md transition-all duration-200 ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                >
                  {copied ? '✓ Copiado' : 'Copiar'}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href="/dashboard"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Ver rankings →
              </a>
            </div>
          </div>
        )}

        <div className="mt-8 text-sm text-gray-500">
          <p>Por cada amigo que se registre con tu código, ganas 10 puntos</p>
        </div>
      </div>
    </main>
  );
}
