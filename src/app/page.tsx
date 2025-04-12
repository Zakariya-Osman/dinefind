"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header"; // header component
import FilterBar from "@/components/FilterBar"; // filterBar component
import RestaurantList from "@/components/RestaurantList"; // restaurantList component
import Footer from "@/components/Footer"; // footer component

type Restaurant = {
  _id: string; // identifier for the restaurant
  name: string; // name of place
  costTier: number; // cost category of the restaurant
  kidFriendly: boolean; // kid-friendly
  dietary: string[]; // dietary options
};

export default function HomePage() {
  // state variables
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); 
  const [loading, setLoading] = useState(true);
  const [selectedTiers, setSelectedTiers] = useState<number[]>([]); 
  const [search, setSearch] = useState(""); // search query

  // fetch restaurant data based on filters
  const fetchRestaurants = async () => {
    try {
      const params = new URLSearchParams(); 

      if (selectedTiers.length > 0) {
        const expandedTiers = new Set<number>(); 
        selectedTiers.forEach((tier) => {
          for (let t = 1; t <= tier; t++) {
            expandedTiers.add(t); // add all tiers up to the selected tier
          }
        });
        // set parameter for cost tiers
        params.set("cost", Array.from(expandedTiers).sort().join(","));
      }

      if (search.trim()) {
        params.set("q", search.trim()); 
      }

      const res = await fetch(`/api/restaurants?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch"); // handle error if request fails
      const data = await res.json(); 
      setRestaurants(data); 
    } catch (err) {
      console.error("❌ Error fetching restaurants:", err); // logs error to console
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [selectedTiers]);

  const handleTierChange = (tier: number) => {
    setSelectedTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier] // Add or remove tier from selected tiers
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // stops default form submission behavior
    fetchRestaurants();
  };

  return (
    // layout and styling for the page
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full px-4 pt-10 pb-6">
        {/* header component + search functionality */}
        <Header
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        {/* allow selecting cost tiers */}
        <FilterBar
          selectedTiers={selectedTiers}
          handleTierChange={handleTierChange}
        />
        {/*display the list of restaurants */}
        <RestaurantList restaurants={restaurants} loading={loading} />
      </div>
      {/* footer component */}
      <Footer />
    </main>
  );
}
