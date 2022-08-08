const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
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
      //creating user
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });

      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occurred");
    }
  }
);

module.exports = router;
