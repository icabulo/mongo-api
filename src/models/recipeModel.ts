import mongoose, { Schema } from "mongoose";

const RecipeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  price: Number,
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  cartegory: {
    type: String,
    require: true,
    enum: ["Mexicana", "Colombiana", "Vegetariana"],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
