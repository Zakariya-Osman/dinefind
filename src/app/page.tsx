"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Search } from "lucide-react";

type Restaurant = {
  _id: string;
  name: string;
  costTier: number;
  kidFriendly: boolean;
  dietary: string[];
};

export default function HomePage() {
  const { data: session } = useSession();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTiers, setSelectedTiers] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  const fetchRestaurants = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedTiers.length > 0) {
        params.set("cost", selectedTiers.join(","));
      }
      if (search.trim()) {
        params.set("q", search.trim());
      }

      const res = await fetch(`/api/restaurants?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setRestaurants(data);
    } catch (err) {
      console.error("❌ Error fetching restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [selectedTiers]);

  const handleTierChange = (tier: number) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRestaurants();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Sign In/Out */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              🍽️ DineFind
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

        {/* Filter bar */}
        <section className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Filter by Cost
          </h2>
          <div className="flex gap-3 flex-wrap">
            {[1, 2, 3, 4].map((tier) => {
              const active = selectedTiers.includes(tier);
              return (
                <button
                  key={tier}
                  onClick={() => handleTierChange(tier)}
                  className={`px-3 py-1 rounded-full border ${
                    active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300"
                  } hover:shadow-sm transition`}
                >
                  {"$".repeat(tier)}
                </button>
              );
            })}
          </div>
        </section>

        {/* Restaurant Results */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">
            Loading restaurants...
          </p>
        ) : restaurants.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No restaurants found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <div
                key={r._id}
                className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {r.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Cost: {"$".repeat(r.costTier)}
                </p>
                <p className="text-sm text-gray-500">
                  Kid Friendly: {r.kidFriendly ? "Yes" : "No"}
                </p>
                <p className="text-sm text-gray-500">
                  Dietary: {r.dietary.length ? r.dietary.join(", ") : "None"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
