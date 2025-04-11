"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white dark:bg-gray-900 border-b px-6 py-4 shadow-sm flex justify-between items-center">
      <Link
        href="/"
        className="text-xl font-bold text-gray-800 dark:text-white"
      >
        🍽️ DineFind
      </Link>
      <div className="flex gap-4 items-center">
        {session?.user ? (
          <>
            {session.role === "admin" && (
              <Link
                href="/admin"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Admin Dashboard
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn(undefined, { callbackUrl: "/" })}
            className="text-sm text-blue-600 hover:underline"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
