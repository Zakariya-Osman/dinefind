"use client";

export default function FilterBar({
  selectedTiers,
  handleTierChange,
}: {
  selectedTiers: number[];
  handleTierChange: (tier: number) => void;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-2">Filter by Cost</h2>
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
  );
}
