// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Counselor = require('../models/Counselor');

const router = express.Router();

// REGISTER Route
router.post('/register', async (req, res) => {
  const { name, email, password, role, rollNo } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    let user;

    if (role === 'student') {
      // Use rollNo as _id
      user = new Student({ _id: rollNo, name, email, password: hashedPassword });
    } else if (role === 'counselor') {
      user = new Counselor({ name, email, password: hashedPassword });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    await user.save();
    res.status(201).json({ message: 'Registered successfully' });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN Route
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === 'student') {
      user = await Student.findOne({ email });
    } else if (role === 'counselor') {
      user = await Counselor.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        user_id: user._id,  // rollNo if student
        name: user.name,
        role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/test', (req, res) => {
  res.send("AUTH ROUTES WORK ✅");
});

module.exports = router;
