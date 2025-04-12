const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deliveryOption: { type: String, required: true },
  ngoId: { type: String }, // Optional, for NGO option
  requesterLocation: { type: String }, // Latitude,longitude of requester
  status: { type: String, enum: ['pending', 'picked_up', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Request', requestSchema);