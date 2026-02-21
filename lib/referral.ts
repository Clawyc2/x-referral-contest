import { supabase } from './supabase';

// Generar código de referido único
export function generateReferralCode(twitterHandle: string): string {
  const cleanHandle = twitterHandle.replace('@', '').toLowerCase();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${cleanHandle}-${randomNum}`;
}

// Crear o actualizar usuario
export async function createUser(twitterHandle: string, referralCode: string) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        twitter_handle: twitterHandle,
        referral_code: referralCode,
        points: 0,
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Obtener usuario por código de referido
export async function getUserByReferralCode(referralCode: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('referral_code', referralCode)
    .single();

  if (error) return null;
  return data;
}

// Registrar nuevo referido
export async function registerReferral(referrerCode: string, newUserId: string) {
  // Obtener usuario que refiere
  const referrer = await getUserByReferralCode(referrerCode);
  if (!referrer) throw new Error('Invalid referral code');

  // Crear registro de referido
  const { error: referralError } = await supabase
    .from('referrals')
    .insert([
      {
        referrer_id: referrer.id,
        referred_id: newUserId,
      }
    ]);

  if (referralError) throw referralError;

  // Incrementar puntos del referrer
  const { error: updateError } = await supabase
    .from('users')
    .update({ points: referrer.points + 10 })
    .eq('id', referrer.id);

  if (updateError) throw updateError;

  return true;
}

// Obtener rankings
export async function getLeaderboard(limit: number = 50) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('points', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// Obtener usuario por Twitter handle
export async function getUserByTwitter(twitterHandle: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('twitter_handle', twitterHandle)
    .single();

  if (error) return null;
  return data;
}
