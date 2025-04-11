import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import RestaurantForm from "@/components/RestaurantForm";
import AdminRestaurantList from "@/components/AdminRestaurantList";
import Restaurant from "@/lib/Restaurant";
import { dbConnect } from "@/lib/db";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.role !== "admin") {
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
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>

      <RestaurantForm
        onSubmit={async (data) => {
          "use server";
          const res = await fetch("/api/admin/restaurants", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          if (res.ok) location.reload();
        }}
      />

      <AdminRestaurantList restaurants={restaurants} />
    </main>
  );
}
