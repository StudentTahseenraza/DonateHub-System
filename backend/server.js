const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cron = require('node-cron'); // For scheduling tasks
const Donor = require('./models/Donor');
const Donation = require('./models/Donation');
const User = require('./models/User'); // Import User model
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Nodemailer setup for OTP and password reset
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to verify JWT token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// User Registration
app.post('/api/v1/user/me/register', async (req, res) => {
  const { name, email, phone, password, verificationMethod } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();

    // Save user to database
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      verificationMethod,
    });
    await user.save();

    // Send OTP via email or phone
    if (verificationMethod === 'email') {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP for WasteWise Registration',
        text: `Your OTP for WasteWise registration is: ${otp}`,
      };
      await transporter.sendMail(mailOptions);
    } else if (verificationMethod === 'phone') {
      // Implement SMS sending logic here (e.g., using Twilio)
    }

    res.status(201).json({ message: 'OTP sent for verification.', email });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// OTP Verification
app.post('/api/v1/user/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = null;
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'OTP verified successfully.', token, user });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ error: 'Server error during OTP verification.' });
  }
});

// User Login
app.post('/api/v1/user/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful.', token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// Forgot Password
app.post('/api/v1/user/password/forgot', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    // Generate reset token
    const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '10m' });

    // Send reset link via email
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Link',
      text: `Click the link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Server error during password reset.' });
  }
});

// Reset Password
app.post('/api/v1/user/password/reset', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ error: 'Invalid token.' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ error: 'Server error during password reset.' });
  }
});

// Protected Donation Endpoint
app.post('/api/donation', authenticate, upload.single('photo'), async (req, res) => {
  try {
    const donorId = req.user.userId;
    const { category, itemName, description, condition, location, type } = req.body;

    // Validate required fields
    if (!category || !itemName || !description || !location) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }
    if (category === "books" && !type) {
      return res.status(400).json({ error: 'Type is required for book donations' });
    }

    // Validate location format (latitude, longitude)
    if (typeof location !== 'string' || !location.includes(',')) {
      return res.status(400).json({ error: 'Invalid location format. Expected "latitude,longitude".' });
    }

    const donation = new Donation({
      donorId,
      category,
      itemName,
      description,
      condition: condition || undefined,
      photo: req.file ? `/uploads/${req.file.filename}` : undefined,
      location,
      type: type || "donate", // Default to "donate" if not provided
    });

    await donation.save();

    // Update donor points (if applicable)
    const donor = await Donor.findById(donorId);
    if (donor) {
      donor.totalPoints += 10;
      donor.weeklyPoints += 10;
      donor.donationsToday += 1;
      donor.favoriteCategory = category;
      if (donor.totalPoints >= 200) donor.badge = "Gold";
      else if (donor.totalPoints >= 150) donor.badge = "Silver";
      else if (donor.totalPoints >= 100) donor.badge = "Bronze";
      else donor.badge = "None";
      await donor.save();
    }

    // Emit real-time updates
    io.emit('newDonation', donation.toObject());

    res.status(201).json(donation.toObject());
  } catch (err) {
    console.error("Donation error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch Donations by Category
app.get('/api/donations', async (req, res) => {
  const { category } = req.query;
  try {
    // Mark expired food items as unavailable
    if (category === "food") {
      await Donation.updateMany(
        { category: "food", expiryDate: { $lt: new Date() }, isAvailable: true },
        { $set: { isAvailable: false } }
      );
    }

    // Fetch donations by category
    const donations = await Donation.find({ category });

    res.status(200).json(donations);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const donors = await Donor.find().sort({ totalPoints: -1 }).limit(10);
    res.json(donors);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Request Item
app.post('/api/request-item/:id', authenticate, async (req, res) => {
  const { id } = req.params; // Donation ID
  const { receiverId, deliveryOption } = req.body; // Receiver's user ID and delivery option

  try {
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found.' });
    }

    if (!donation.isAvailable) {
      return res.status(400).json({ error: 'This item is no longer available.' });
    }

    // Mark the item as unavailable
    donation.isAvailable = false;
    donation.deliveryOption = deliveryOption; // Save the selected delivery option
    await donation.save();

    // Notify the donor, NGO, or delivery partner based on the delivery option
    if (deliveryOption === "self") {
      // Notify the donor and requester to coordinate pickup
      notifyDonorAndRequester(donation);
    } else if (deliveryOption === "NGO") {
      // Notify the NGO to arrange pickup and delivery
      notifyNGO(donation);
    } else if (deliveryOption === "delivery") {
      // Notify the delivery partner to handle logistics
      notifyDeliveryPartner(donation);
    }

    // Emit a real-time update
    io.emit('itemRequested', donation.toObject());

    res.status(200).json({ message: 'Item requested successfully.', donation });
  } catch (err) {
    console.error('Error requesting item:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Notify Donor and Requester for Self Pickup
const notifyDonorAndRequester = (donation) => {
  // Implement email or SMS notification logic here
  console.log(`Notifying donor and requester for self pickup of item: ${donation.itemName}`);
};

// Notify NGO for NGO Pickup
// const notifyNGO = (donation) => {
//   // Implement email or SMS notification logic here
//   console.log(`Notifying NGO for pickup of item: ${donation.itemName}`);
// };

// Notify Delivery Partner for Delivery
const notifyDeliveryPartner = (donation) => {
  // Implement email or SMS notification logic here
  console.log(`Notifying delivery partner for delivery of item: ${donation.itemName}`);
};

// ... (existing imports and setup remain unchanged)

// Mock NGO data (replace with actual database or API in production)
const ngos = [
  { id: "ngo1", name: "Green Earth NGO", location: "28.7041,77.1025", distance: 5 }, // Delhi
  { id: "ngo2", name: "Helping Hands", location: "19.0760,72.8777", distance: 10 }, // Mumbai
  { id: "ngo3", name: "Care Foundation", location: "13.0827,80.2707", distance: 15 }, // Chennai
  // Add more NGOs with realistic coordinates
];

// Helper function to calculate distance (simplified for demo)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// New endpoint to fetch nearby NGOs
app.get('/api/ngos/nearby', authenticate, async (req, res) => {
  const { location } = req.query; // Expecting "lat,lon" format
  if (!location || !location.includes(',')) {
    return res.status(400).json({ error: 'Invalid location format. Expected "latitude,longitude".' });
  }

  const [userLat, userLon] = location.split(',').map(Number);

  try {
    const nearbyNGOs = ngos.map((ngo) => {
      const [ngoLat, ngoLon] = ngo.location.split(',').map(Number);
      const distance = calculateDistance(userLat, userLon, ngoLat, ngoLon);
      return { ...ngo, distance: distance.toFixed(2) };
    }).sort((a, b) => a.distance - b.distance); // Sort by distance

    res.status(200).json(nearbyNGOs);
  } catch (err) {
    console.error('Error fetching NGOs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Updated Request Item endpoint
app.post('/api/request-item/:id', authenticate, async (req, res) => {
  const { id } = req.params; // Donation ID
  const { receiverId, deliveryOption, ngoId } = req.body; // Added ngoId

  try {
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found.' });
    }

    if (!donation.isAvailable) {
      return res.status(400).json({ error: 'This item is no longer available.' });
    }

    // Mark the item as unavailable
    donation.isAvailable = false;
    donation.deliveryOption = deliveryOption;
    if (deliveryOption === "NGO" && ngoId) {
      donation.ngoId = ngoId; // Store the selected NGO ID
    }
    await donation.save();

    // Notify based on delivery option
    if (deliveryOption === "self") {
      notifyDonorAndRequester(donation);
    } else if (deliveryOption === "NGO") {
      notifyNGO(donation, ngoId); // Pass ngoId to notify function
    } else if (deliveryOption === "delivery") {
      notifyDeliveryPartner(donation);
    }

    io.emit('itemRequested', donation.toObject());

    res.status(200).json({ message: 'Item requested successfully.', donation });
  } catch (err) {
    console.error('Error requesting item:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Updated Notify NGO function
const notifyNGO = (donation, ngoId) => {
  const ngo = ngos.find(n => n.id === ngoId);
  console.log(`Notifying ${ngo ? ngo.name : 'NGO'} for pickup of item: ${donation.itemName}`);
  // Add real email/SMS logic here
};

// ... (rest of the server.js remains unchanged)

// Reset donationsToday for all donors at midnight every day
cron.schedule('0 0 * * *', async () => {
  try {
    await Donor.updateMany({}, { $set: { donationsToday: 0 } });
    console.log("Daily donations reset for all donors.");
  } catch (err) {
    console.error("Error resetting daily donations:", err);
  }
});

// Reset weeklyPoints for all donors at midnight every Monday
cron.schedule('0 0 * * 1', async () => {
  try {
    await Donor.updateMany({}, { $set: { weeklyPoints: 0 } });
    console.log("Weekly points reset for all donors.");
  } catch (err) {
    console.error("Error resetting weekly points:", err);
  }
});

// Fetch Weekly Leaderboard
app.get('/api/leaderboard/weekly', async (req, res) => {
  try {
    const donors = await Donor.find().sort({ weeklyPoints: -1 }).limit(10);
    res.json(donors);
  } catch (err) {
    console.error('Error fetching weekly leaderboard:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch user profile
app.get("/api/v1/user/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile
app.put("/api/v1/user/me/update", authenticate, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true }).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: "Failed to update profile" });
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});