const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const User = require("../../models/User");

// @route   GET api/users
// @desc    Home route
// @access  Public
router.get("/", (req, res) => {
  res.send("Users API!");
});

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    check("firstName", "First Name is required").not().isEmpty(),
    check("lastName", "Last Name is required").not().isEmpty(),
    check("email", "Invalid Email address").isEmail(),
    check("password", "Invalid Password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // Check if there is User with given email address
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists, please try again" }] });
      }

      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };

      // Encrypt Password
      const salt = await bcrypt.genSaltSync(10);
      newUser.password = await bcrypt.hashSync(password, salt);

      // Create User
      user = await new User(newUser);

      // Save User
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Return jsonwebtoken
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
