import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function seed() {
  const { dbConnect } = await import("../src/lib/db.js");
  const Restaurant = (await import("../src/lib/Restaurant.js")).default;

  await dbConnect();

  await Restaurant.deleteMany({});
  await Restaurant.insertMany([
    {
      name: "Mama's Diner",
      costTier: 2,
      kidFriendly: true,
      dietary: ["vegan", "halal"],
    },
    {
      name: "Budget Bites",
      costTier: 1,
      kidFriendly: true,
      dietary: [],
    },
    {
      name: "Fancy Feast",
      costTier: 4,
      kidFriendly: false,
      dietary: ["gluten-free"],
    },
  ]);

  console.log("✅ Database seeded!");
  process.exit();
}

seed();
