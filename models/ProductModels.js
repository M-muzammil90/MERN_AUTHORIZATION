import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
 
    },

    description: {
      type: String,
      required: true,
     
    },

    price: {
      type: Number,
      required: true,
   
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },
     stock: {
      type: String,
      required: true,
      trim: true,
    },

    images: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
  
    },

    numReviews: {
      type: Number,
      default: 0,
     
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;