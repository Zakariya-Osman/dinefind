import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const bcrypt = await import("bcryptjs");
const { default: User } = await import("../src/lib/User");
const { dbConnect } = await import("../src/lib/db.js");

await dbConnect();

const email = "admin@test.com";
const password = "admin123";

const hashed = bcrypt.hashSync(password, 10);
await User.create({ email, hashedPassword: hashed, role: "admin" });

console.log("✅ Admin user created");
process.exit();
