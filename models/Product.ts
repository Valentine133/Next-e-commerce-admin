import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, require: true },
  category: {type: mongoose.Types.ObjectId, ref: "Category"},
  sku: String,
  description: String,
  price: { type: Number, require: true },
  images: [{type: String}],
});

export const Product = models.Product || model('Product', ProductSchema);