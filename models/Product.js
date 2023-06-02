import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, require: true },
  sku: String,
  description: String,
  price: { type: Number, require: true },
});

export const Product = models.Product || model('Product', ProductSchema);