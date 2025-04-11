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
    {
      name: "The Veggie Patch",
      costTier: 2,
      kidFriendly: false,
      dietary: ["vegetarian"],
    },
    {
      name: "Tandoori Town",
      costTier: 3,
      kidFriendly: true,
      dietary: ["halal"],
    },
    {
      name: "Pasta Paradise",
      costTier: 2,
      kidFriendly: true,
      dietary: [],
    },
    {
      name: "Burger Barn",
      costTier: 1,
      kidFriendly: true,
      dietary: [],
    },
    {
      name: "Ocean Catch",
      costTier: 3,
      kidFriendly: false,
      dietary: ["gluten-free"],
    },
    {
      name: "Curry Kingdom",
      costTier: 2,
      kidFriendly: true,
      dietary: ["halal", "vegan"],
    },
    {
      name: "Sweet & Salty Café",
      costTier: 2,
      kidFriendly: true,
      dietary: [],
    },
    {
      name: "Grill Master",
      costTier: 3,
      kidFriendly: false,
      dietary: [],
    },
    {
      name: "Sunrise Smoothies",
      costTier: 1,
      kidFriendly: true,
      dietary: ["vegan", "gluten-free"],
    },
  ]);

  console.log("✅ Database seeded with sample restaurants!");
  process.exit();
}

seed();
