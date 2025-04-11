"use client";

type Restaurant = {
  _id: string;
  name: string;
  costTier: number;
  kidFriendly: boolean;
  dietary: string[];
};

export default function RestaurantList({
  restaurants,
  loading,
}: {
  restaurants: Restaurant[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading restaurants...</p>
    );
  }

  if (restaurants.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">No restaurants found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((r) => (
        <div
          key={r._id}
          className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">{r.name}</h2>
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
  );
}
