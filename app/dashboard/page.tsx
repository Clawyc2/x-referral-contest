'use client';

import { useEffect, useState } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { getLeaderboard } from '@/lib/referral';

interface User {
  id: string;
  twitter_handle: string;
  referral_code: string;
  points: number;
  created_at: string;
}

export default function Dashboard() {
  const account = useActiveAccount();
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    loadLeaderboard();
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  }, []);

  const loadLeaderboard = async () => {
    try {
      const data = await getLeaderboard(100);
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  const getRankColor = (index: number) => {
    if (index === 0) return 'from-yellow-400 to-yellow-600';
    if (index === 1) return 'from-gray-300 to-gray-500';
    if (index === 2) return 'from-orange-400 to-orange-600';
    return 'from-blue-400 to-purple-500';
  };

  const getRankBg = (index: number) => {
    if (index === 0) return 'bg-yellow-500/20 border-yellow-500/30';
    if (index === 1) return 'bg-gray-400/20 border-gray-400/30';
    if (index === 2) return 'bg-orange-500/20 border-orange-500/30';
    return 'bg-white/5 border-white/10';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <p className="text-2xl">Cargando leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-black">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
              🏆 Leaderboard
            </span>
          </h1>
          <a href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </a>
        </div>

        {/* Current User Card */}
        {currentUser && (
          <div className="bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="text-6xl">👤</div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Tu posición</p>
                  <p className="text-3xl font-bold text-white">@{currentUser.twitter_handle.replace('user_', '')}</p>
                  <p className="text-gray-400 mt-1">Código: {currentUser.referral_code}</p>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-6xl font-black text-purple-300">{currentUser.points}</p>
                <p className="text-gray-400">puntos</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="space-y-4">
          {leaderboard.length === 0 ? (
            <div className="text-center text-gray-400 py-16 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-xl">Aún no hay usuarios registrados</p>
              <p className="mt-2">¡Sé el primero en compartir tu código!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between backdrop-blur-sm rounded-2xl p-5 border transition-all duration-200 hover:scale-[1.02] ${
                    currentUser?.id === user.id
                      ? 'bg-purple-500/30 border-purple-500/50 shadow-lg shadow-purple-500/20'
                      : `${getRankBg(index)} hover:bg-white/10`
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={`text-3xl font-black bg-gradient-to-r ${getRankColor(
                        index
                      )} bg-clip-text text-transparent min-w-[60px]`}
                    >
                      {getRankBadge(index)}
                    </div>
                    <div>
                      <p className="font-bold text-lg">@{user.twitter_handle.replace('user_', '')}</p>
                      <p className="text-sm text-gray-400">{user.referral_code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">{user.points}</p>
                    <p className="text-sm text-gray-400">puntos</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-8 border-t border-white/10">
          <p>Actualizado en tiempo real • {leaderboard.length} participantes</p>
        </div>
      </div>
    </main>
  );
}
