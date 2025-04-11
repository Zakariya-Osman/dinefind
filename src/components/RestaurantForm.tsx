"use client";

import { useState } from "react";

export default function RestaurantForm() {
  const [name, setName] = useState("");
  const [costTier, setCostTier] = useState(1);
  const [kidFriendly, setKidFriendly] = useState(false);
  const [dietary, setDietary] = useState<string[]>([]);

  const handleDietaryChange = (tag: string) => {
    setDietary((prev) =>
      prev.includes(tag) ? prev.filter((d) => d !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRestaurant = {
      name,
      costTier,
      kidFriendly,
      dietary,
    };

    const res = await fetch("/api/admin/restaurants", {
      method: "POST",
      body: JSON.stringify(newRestaurant),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    console.log("📦 API Response:", result);

    if (res.ok) {
      alert("✅ Restaurant added!");
      setName("");
      setCostTier(1);
      setKidFriendly(false);
      setDietary([]);
      location.reload();
    } else {
      alert("❌ Failed to add restaurant.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-4 rounded shadow space-y-4 mb-6 text-black dark:text-white border dark:border-gray-700"
    >
      <h2 className="text-xl font-bold">Add Restaurant</h2>

      <input
        type="text"
        placeholder="Restaurant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white dark:border-gray-600"
      />

      <select
        value={costTier}
        onChange={(e) => setCostTier(Number(e.target.value))}
        className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white dark:border-gray-600"
      >
        {[1, 2, 3, 4].map((tier) => (
          <option key={tier} value={tier}>
            {"$".repeat(tier)}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={kidFriendly}
          onChange={(e) => setKidFriendly(e.target.checked)}
        />
        Kid Friendly
      </label>

      <div className="flex gap-3 flex-wrap">
        {["vegan", "halal", "gluten-free", "vegetarian"].map((tag) => (
          <label key={tag} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={dietary.includes(tag)}
              onChange={() => handleDietaryChange(tag)}
            />
            {tag}
          </label>
        ))}
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Add Restaurant
      </button>
    </form>
  );
}
