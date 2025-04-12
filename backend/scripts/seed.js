const mongoose = require('mongoose');
const Donor = require('../models/Donor');
require('dotenv').config();

const seedData = [
  { name: "Alice", totalPoints: 150, donationsToday: 5, favoriteCategory: "Food", badge: "Gold" },
  { name: "Bob", totalPoints: 120, donationsToday: 3, favoriteCategory: "Clothes", badge: "Silver" },
  { name: "Charlie", totalPoints: 90, donationsToday: 2, favoriteCategory: "Books", badge: "Bronze" },
  { name: "Diana", totalPoints: 80, donationsToday: 1, favoriteCategory: "Furniture", badge: "None" },
  { name: "Eve", totalPoints: 60, donationsToday: 0, favoriteCategory: "Gadgets", badge: "None" },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await Donor.deleteMany({});
    console.log('Cleared existing donors');

    // Insert seed data
    await Donor.insertMany(seedData);
    console.log('Database seeded with initial donors');

    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();