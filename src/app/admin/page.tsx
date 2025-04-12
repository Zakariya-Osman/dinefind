import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import RestaurantForm from "@/components/RestaurantForm";
import AdminRestaurantList from "@/components/AdminRestaurantList";
import Restaurant from "@/lib/Restaurant";
import { dbConnect } from "@/lib/db";

export default async function AdminPage() {
  const session = (await getServerSession(authOptions)) as any;

  console.log(" SESSION on /admin:", session);

  if (!session || session.role !== "admin") {
    console.log("🔒 Blocked access. Session:", session);

    return (
      <main className="p-8 text-black dark:text-white">
        <h1 className="text-xl font-bold">Access Denied</h1>
        <p>You must be an admin to view this page.</p>
      </main>
    );
  }

  await dbConnect();

  const rawRestaurants = await Restaurant.find().lean();
  const restaurants = rawRestaurants.map((r: any) => ({
    _id: r._id.toString(),
    name: r.name,
    costTier: r.costTier,
    kidFriendly: r.kidFriendly,
    dietary: r.dietary,
  }));

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6 text-black dark:text-white">
      {/* Header with "Back to Home" */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <a
          href="/"
          className="inline-block bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition text-sm"
        >
          ← Back to Home
        </a>
      </div>

      {/* Add Restaurant Form */}
      <RestaurantForm />

      {/* List of Restaurants */}
      <AdminRestaurantList restaurants={restaurants} />
    </main>
  );
}
