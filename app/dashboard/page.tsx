'use client';

import { useEffect, useState } from 'react';
import { getLeaderboard } from '@/lib/referral';

interface User {
  id: string;
  twitter_handle: string;
  referral_code: string;
  points: number;
  created_at: string;
}

export default function Dashboard() {
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
      const data = await getLeaderboard(50);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Cargando rankings...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">🏆 Leaderboard</h1>
          <a href="/" className="text-purple-400 hover:text-purple-300 underline">
            ← Volver al inicio
          </a>
        </div>

        {currentUser && (
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <h2 className="text-lg font-semibold mb-2">Tu posición</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">@{currentUser.twitter_handle.replace('@', '')}</p>
                <p className="text-gray-400">Código: {currentUser.referral_code}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-purple-400">{currentUser.points}</p>
                <p className="text-gray-400">puntos</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {leaderboard.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              Aún no hay usuarios registrados
            </div>
          ) : (
            leaderboard.map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all duration-200 hover:bg-white/10 ${
                  currentUser?.id === user.id
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                    : 'border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`text-2xl font-bold bg-gradient-to-r ${getRankColor(
                      index
                    )} bg-clip-text text-transparent`}
                  >
                    {getRankBadge(index)}
                  </div>
                  <div>
                    <p className="font-semibold">@{user.twitter_handle.replace('@', '')}</p>
                    <p className="text-sm text-gray-400">{user.referral_code}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{user.points}</p>
                  <p className="text-sm text-gray-400">puntos</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Actualizado en tiempo real</p>
        </div>
      </div>
    </main>
  );
}
