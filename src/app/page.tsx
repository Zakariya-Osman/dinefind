"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import RestaurantList from "@/components/RestaurantList";
import Footer from "@/components/Footer";

type Restaurant = {
  _id: string;
  name: string;
  costTier: number;
  kidFriendly: boolean;
  dietary: string[];
};

export default function HomePage() {
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
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full px-4 pt-10 pb-6">
        <Header
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        <FilterBar
          selectedTiers={selectedTiers}
          handleTierChange={handleTierChange}
        />
        <RestaurantList restaurants={restaurants} loading={loading} />
      </div>
      <Footer />
    </main>
  );
}
