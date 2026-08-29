import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import Product from "./models/ProductModels.js";
import DBconnection from "./config/index.js";

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await DBconnection();
    console.log("✓ Connected to database");

    // Clear existing data (optional)
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("✓ Cleared existing data");

    // Hash passwords
    const hashedPassword1 = await bcrypt.hash("user123", 10);
    const hashedPassword2 = await bcrypt.hash("admin123", 10);
    const hashedPassword3 = await bcrypt.hash("user456", 10);

    // Seed Users
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword1,
        role: "user",
        verify: true,
      },
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword2,
        role: "admin",
        verify: true,
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword3,
        role: "user",
        verify: true,
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log("✓ Seeded users:", createdUsers.length);

    // Seed Products
    const products = [
      {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 79.99,
        category: "Electronics",
        stock: "15",
        images: [
          "https://via.placeholder.com/300x300?text=Headphones",
        ],
        rating: 4.5,
        numReviews: 12,
      },
      {
        name: "USB-C Cable",
        description: "Durable and fast USB-C charging cable",
        price: 12.99,
        category: "Accessories",
        stock: "50",
        images: [
          "https://via.placeholder.com/300x300?text=USB+Cable",
        ],
        rating: 4.0,
        numReviews: 8,
      },
      {
        name: "Smartphone Stand",
        description: "Adjustable smartphone stand for desk",
        price: 15.99,
        category: "Accessories",
        stock: "30",
        images: [
          "https://via.placeholder.com/300x300?text=Phone+Stand",
        ],
        rating: 4.3,
        numReviews: 15,
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking",
        price: 24.99,
        category: "Electronics",
        stock: "25",
        images: [
          "https://via.placeholder.com/300x300?text=Wireless+Mouse",
        ],
        rating: 4.6,
        numReviews: 20,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB Mechanical keyboard for gaming and typing",
        price: 89.99,
        category: "Electronics",
        stock: "10",
        images: [
          "https://via.placeholder.com/300x300?text=Keyboard",
        ],
        rating: 4.7,
        numReviews: 25,
      },
      {
        name: "USB Hub",
        description: "7-port USB 3.0 hub for multiple device connections",
        price: 34.99,
        category: "Accessories",
        stock: "20",
        images: [
          "https://via.placeholder.com/300x300?text=USB+Hub",
        ],
        rating: 4.2,
        numReviews: 10,
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log("✓ Seeded products:", createdProducts.length);

    console.log("\n✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedData();
