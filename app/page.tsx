'use client';

import { useState, useEffect } from 'react';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { supabase } from '@/lib/supabase';
import { generateReferralCode, getUserByTwitter, createUser } from '@/lib/referral';

export default function Home() {
  const account = useActiveAccount();
  const [referralCode, setReferralCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (account) {
      syncUserWithSupabase();
    }
  }, [account]);

  const syncUserWithSupabase = async () => {
    if (!account) return;

    setLoading(true);
    try {
      // En producción, obtener el handle de Twitter del perfil del usuario
      // Por ahora usamos la dirección de wallet como identificador
      const twitterHandle = `user_${account.address.slice(0, 8)}`;

      let user = await getUserByTwitter(twitterHandle);

      if (!user) {
        const newCode = generateReferralCode(twitterHandle);
        user = await createUser(twitterHandle, newCode);
      }

      setReferralCode(user.referral_code);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error syncing user:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const shareUrl = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnX = () => {
    const shareUrl = `${window.location.origin}?ref=${referralCode}`;
    const text = "¡Únete a este concurso de referidos! Usa mi código para ganar puntos:";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-12 text-center">
        {/* Hero */}
        <div className="space-y-6">
          <div className="inline-block animate-bounce text-6xl mb-4">🎉</div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            X Referral Contest
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Conecta con X, comparte tu código único y escala el leaderboard
          </p>
        </div>

        {!account ? (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl">
              <p className="text-lg text-gray-300 mb-8">
                Inicia sesión con tu cuenta de X para obtener tu código único
              </p>
              <div className="flex justify-center">
                <ConnectButton
                  client={client}
                  appMetadata={{
                    name: "X Referral Contest",
                    url: "https://referral-contest.vercel.app",
                  }}
                />
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="animate-spin text-6xl mb-4">⏳</div>
            <p className="text-xl">Sincronizando tu cuenta...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* User Card */}
            <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-5xl">✨</div>
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Tu dirección</p>
                    <p className="font-mono text-sm text-purple-300">
                      {account.address.slice(0, 6)}...{account.address.slice(-4)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-3">Tu código de referido:</p>
                  <div className="flex items-center justify-center gap-4">
                    <code className="text-4xl font-mono bg-black/30 px-6 py-3 rounded-xl border-2 border-purple-500/50 text-purple-300">
                      {referralCode}
                    </code>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-400">Comparte este enlace:</p>
                  <div className="flex items-center gap-3 bg-black/30 rounded-xl p-4 border border-white/10">
                    <input
                      type="text"
                      readOnly
                      value={`${window.location.origin}?ref=${referralCode}`}
                      className="flex-1 bg-transparent text-sm font-mono text-gray-300 outline-none"
                    />
                    <button
                      onClick={copyToClipboard}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        copied
                          ? 'bg-green-500 text-white'
                          : 'bg-purple-500 hover:bg-purple-600 text-white'
                      }`}
                    >
                      {copied ? '✓ Copiado' : 'Copiar'}
                    </button>
                  </div>

                  <button
                    onClick={shareOnX}
                    className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 border border-white/10"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Compartir en X
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl mb-2">💎</div>
                <p className="text-3xl font-bold text-purple-400">10</p>
                <p className="text-gray-400">Puntos por referido</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl mb-2">👥</div>
                <p className="text-3xl font-bold text-blue-400">∞</p>
                <p className="text-gray-400">Referidos ilimitados</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-3xl font-bold text-yellow-400">TOP</p>
                <p className="text-gray-400">Gana premios</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-xl font-semibold transition-colors"
              >
                Ver rankings 🏆
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500">
            Desarrollado con 💜 por Clawy 🐾 | Powered by ThirdWeb + Supabase
          </p>
        </div>
      </div>
    </main>
  );
}
