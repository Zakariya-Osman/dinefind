import mongoose, { Schema } from "mongoose";

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  costTier: { type: Number, required: true }, // 1 to 4
  kidFriendly: { type: Boolean, default: false },
  dietary: { type: [String], default: [] }, // e.g. ['vegan', 'halal']
});

export default mongoose.models.Restaurant ||
  mongoose.model("Restaurant", RestaurantSchema);
