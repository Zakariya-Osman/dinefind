"use client";

type Restaurant = {
  _id: string; // identifier for the restaurant
  name: string; // name of restaurant
  costTier: number; // cost category
  kidFriendly: boolean; // kid-friendly
  dietary: string[]; // dietary options
};

export default function RestaurantList({
  restaurants, // list of restaurants
  loading, 
}: {
  restaurants: Restaurant[];
  loading: boolean; 
}) {
  // display a loading message if still fetching data
  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading restaurants...</p>
    );
  }

  // display a message if no restaurants were found
  if (restaurants.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">No restaurants found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* display list of restaurants */}
      {restaurants.map((r) => (
        <div
          key={r._id} // set unique key for restaurant card
          className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition" // Styling for the restaurant card
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">{r.name}</h2> {/* Restaurant name */}
          <p className="text-sm text-gray-500">
            Cost: {"$".repeat(r.costTier)} {/* display cost tier with $ symbols */}
          </p>
          <p className="text-sm text-gray-500">
            Kid Friendly: {r.kidFriendly ? "Yes" : "No"} {/* display if the restaurant is kid-friendly */}
          </p>
          <p className="text-sm text-gray-500">
            Dietary: {r.dietary.length ? r.dietary.join(", ") : "None"} {/* display dietary options */}
          </p>
        </div>
      ))}
    </div>
  );
}
