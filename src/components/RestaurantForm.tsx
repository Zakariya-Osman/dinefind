"use client";

import { useState } from "react";

type RestaurantFormProps = {
  onSubmit: (formData: any) => void;
  initialData?: {
    name: string;
    costTier: number;
    kidFriendly: boolean;
    dietary: string[];
  };
};

export default function RestaurantForm({
  onSubmit,
  initialData,
}: RestaurantFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [costTier, setCostTier] = useState(initialData?.costTier || 1);
  const [kidFriendly, setKidFriendly] = useState(
    initialData?.kidFriendly || false
  );
  const [dietary, setDietary] = useState<string[]>(initialData?.dietary || []);

  const handleDietaryChange = (tag: string) => {
    setDietary((prev) =>
      prev.includes(tag) ? prev.filter((d) => d !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, costTier, kidFriendly, dietary });
    setName("");
    setCostTier(1);
    setKidFriendly(false);
    setDietary([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-4 rounded shadow space-y-4 mb-6 text-black dark:text-white border dark:border-gray-700"
    >
      <h2 className="text-xl font-bold">Add / Edit Restaurant</h2>

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
        {initialData ? "Update" : "Add"} Restaurant
      </button>
    </form>
  );
}
