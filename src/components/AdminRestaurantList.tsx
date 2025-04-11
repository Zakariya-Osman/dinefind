"use client";

type Restaurant = {
  _id: string;
  name: string;
  costTier: number;
  kidFriendly: boolean;
  dietary: string[];
};

export default function AdminRestaurantList({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  return (
    <div className="space-y-3">
      {restaurants.map((r) => (
        <div
          key={r._id}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded shadow border dark:border-gray-700"
        >
          <div>
            <h2 className="font-semibold text-lg">{r.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {"$".repeat(r.costTier)} •{" "}
              {r.kidFriendly ? "Kid Friendly" : "Not Kid Friendly"} •{" "}
              {r.dietary.join(", ") || "No dietary info"}
            </p>
          </div>
          <button
            onClick={async () => {
              const confirmed = confirm(
                "Are you sure you want to delete this?"
              );
              if (!confirmed) return;

              const res = await fetch(`/api/admin/restaurants?id=${r._id}`, {
                method: "DELETE",
              });

              if (res.ok) location.reload();
              else alert("❌ Failed to delete.");
            }}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
