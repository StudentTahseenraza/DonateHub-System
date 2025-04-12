const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  condition: { type: String },
  photo: { type: String },
  location: { type: String, required: true },
  type: { type: String, default: "donate" },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);