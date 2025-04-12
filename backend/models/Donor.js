const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
  donationsToday: { type: Number, default: 0 },
  weeklyPoints: { type: Number, default: 0 },
  favoriteCategory: { type: String, default: 'Mixed' },
  badge: { type: String, enum: ['Gold', 'Silver', 'Bronze', 'None'], default: 'None' },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donor', donorSchema);