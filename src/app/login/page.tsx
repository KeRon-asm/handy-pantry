'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectTo = params.get('redirectedFrom') || '/dashboard';

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    }

    router.push(redirectTo);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-2 text-gray-900">
          {mode === 'signin' ? 'Sign in' : 'Create an account'}
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          {mode === 'signin' ? 'Welcome back to HandyPantry' : 'Start your HandyPantry account'}
        </p>

  <label className="block text-sm mb-1 text-gray-900">Email</label>
        <input
          type="email"
          className="w-full border rounded-md p-2 mb-3 text-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

  <label className="block text-sm mb-1 text-gray-900">Password</label>
        <input
          type="password"
          className="w-full border rounded-md p-2 mb-4 text-gray-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md mb-3 disabled:opacity-60"
        >
          {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Sign up'}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="text-sm text-blue-600 underline"
        >
          {mode === 'signin'
            ? "Don't have an account? Create one"
            : 'Already have an account? Sign in'}
        </button>
      </form>
    </div>
  );
}
