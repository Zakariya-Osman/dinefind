// src/components/Header.tsx
"use client";

import { Search } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header({
  search,
  setSearch,
  handleSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}) {
  const { data: session } = useSession();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          DineFind
        </h1>

        <div className="flex gap-4 items-center">
          {session?.role === "admin" && (
            <a
              href="/admin"
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm shadow hover:bg-blue-700 transition"
            >
              Admin Dashboard
            </a>
          )}

          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-600 text-white px-4 py-1.5 rounded-md text-sm shadow hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/" })}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm shadow hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex w-full sm:w-auto items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border focus-within:ring-2 ring-blue-200 text-gray-800"
      >
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none bg-transparent flex-1"
        />
        <button type="submit" className="hidden">
          Search
        </button>
      </form>
    </header>
  );
}
