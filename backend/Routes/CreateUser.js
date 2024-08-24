const express = require('express');
const router = express.Router();
const User = require('../models/Users'); 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "mysecret"; 

router.post(
  "/createuser",
  [
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('location').notEmpty().withMessage('Location is required') 
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // test comment
    try {
      const salt = await bcrypt.genSalt();
      const hashPwd = await bcrypt.hash(req.body.password, salt);

      await User.create({
        name: req.body.name,
        location: req.body.location, 
        password: hashPwd,
        email: req.body.email
      });

      res.json({ success: true });
    } catch (error) {
      console.error('Create User Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.post(
  "/login",
  [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').exists().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Email or Password" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ msg: "Invalid Email or Password" });
      }
      const payload = {
        user: {
          id: user.id
        }
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
