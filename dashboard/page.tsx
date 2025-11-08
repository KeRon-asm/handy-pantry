"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.getUser();

        if (!isMounted) return;

        if (error || !data?.user) {
          router.push("/login");
          return;
        }

        setUser(data.user);
      } catch (err) {
        console.error("Error loading user:", err);
        router.push("/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadUser();
    return () => {
      isMounted = false;
    };
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading dashboard…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {`Welcome${user?.email ? `, ${user.email}` : ""}`}
            </h1>
            <p className="text-gray-600">
              Here&apos;s your HandyPantry dashboard.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/users"
              className="text-sm text-gray-700 underline hover:text-gray-900"
            >
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Sign out
            </button>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/users"
              className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
              <p className="text-gray-600 mt-1">
                View and edit your profile information.
              </p>
            </Link>

            <Link
              href="/"
              className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-900">Pantry</h2>
              <p className="text-gray-600 mt-1">
                Manage pantry items and inventory.
              </p>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
