"use client";

import { useState } from "react";

export default function RestaurantForm() {
  const [name, setName] = useState(""); // restaurant name
  const [costTier, setCostTier] = useState(1); // cost tier
  const [kidFriendly, setKidFriendly] = useState(false); // kid-friendly
  const [dietary, setDietary] = useState<string[]>([]); // dietary options

  // dietary options function (checkboxes)
  const handleDietaryChange = (tag: string) => {
    setDietary((prev) =>
      prev.includes(tag) ? prev.filter((d) => d !== tag) : [...prev, tag]
    ); // add or remove dietary tag
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent the default form submission behavior

    // prepare restaurant data to be sent to API
    const newRestaurant = {
      name,
      costTier,
      kidFriendly,
      dietary,
    };

    const res = await fetch("/api/admin/restaurants", {
      method: "POST",
      body: JSON.stringify(newRestaurant), // convert the restaurant object to JSON
      headers: { "Content-Type": "application/json" }, // set the type as JSON
    });

    const result = await res.json(); // Pprse the response from the API
    console.log("📦 API Response:", result); // log the response

    if (res.ok) {
      alert("✅ Restaurant added!");
      setName(""); // clear the name field
      setCostTier(1); // reset cost tier to 1
      setKidFriendly(false); // uncheck kid-friendly checkbox
      setDietary([]); // uncheck dietary options
      location.reload();
    } else {
      alert("❌ Failed to add restaurant."); // request failed alert
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-4 rounded shadow space-y-4 mb-6 text-black dark:text-white border dark:border-gray-700"
    >
      <h2 className="text-xl font-bold">Add Restaurant</h2>

      {/* input field for restaurant name */}
      <input
        type="text"
        placeholder="Restaurant Name"
        value={name}
        onChange={(e) => setName(e.target.value)} // update name state on input change
        required
        className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white dark:border-gray-600"
      />

      {/* cost tier selection */}
      <select
        value={costTier} 
        onChange={(e) => setCostTier(Number(e.target.value))} 
        className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white dark:border-gray-600"
      >
        {[1, 2, 3, 4].map((tier) => (
          <option key={tier} value={tier}>
            {"$".repeat(tier)} {/* display $ symbols based on cost tier */}
          </option>
        ))}
      </select>

      {/* kid-friendly */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={kidFriendly} 
          onChange={(e) => setKidFriendly(e.target.checked)} // update kidFriendly state on change
        />
        Kid Friendly
      </label>

      {/* dietary options checkboxes */}
      <div className="flex gap-3 flex-wrap">
        {["vegan", "halal", "gluten-free", "vegetarian"].map((tag) => (
          <label key={tag} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={dietary.includes(tag)} // check if dietary option is selected
              onChange={() => handleDietaryChange(tag)}
            />
            {tag} {/* display dietary option */}
          </label>
        ))}
      </div>

      {/* submit button */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Add Restaurant
      </button>
    </form>
  );
}
