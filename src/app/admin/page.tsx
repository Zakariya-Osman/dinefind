import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.role !== "admin") {
    return (
      <main className="p-8">
        <h1 className="text-xl font-bold">Access Denied</h1>
        <p>You must be an admin to view this page.</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, admin! You’re logged in as {session.user?.email}</p>
      {/* You can add more admin tools here */}
    </main>
  );
}
