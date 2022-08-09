const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "heyits@yas$h";
// creating user using post /api/auth/createuser
router.post(
  "/createuser",
  [
    body("email", "invalid email").isEmail(),
    body("name", "minimum length 3").isLength({ min: 3 }),
    body("password", "minimum length 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //finding whether user is already existed with this email
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "user already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //creating user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json(authtoken);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
);

// authenticating user using post /api/auth/login
router.post(
  "/login",
  [
    body("email", "invalid email").isEmail(),
    body("password", "password cannot be blank").exists(),
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
        return res
          .status(400)
          .json({ errors: "please try to login with correct details" });
      }
      const passswordCompare = await bcrypt.compare(password, user.password);
      if (!passswordCompare) {
        return res
          .status(400)
          .json({ errors: "please try to login with correct details" });
      }
      data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
);

module.exports = router;
