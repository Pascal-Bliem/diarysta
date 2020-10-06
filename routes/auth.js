const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { body, validationResult, check } = require("express-validator");
const User = require("../models/User");


// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        // find user by ID but do not retrieve password
        const user = await User.findById(req.user.id).select("-password");
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error while getting logged-in user.");
    }
});

// @route   POST api/auth
// @desc    Auth/log-in user and get token
// @access  Public
router.post("/",
    [
        // validate the user input
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please enter a password").exists()
    ],
    async (req, res) => {
        // if there are any validation errors send back a 400
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            //  check if user exists by email, return 400 if not found
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: "Invalid Credentials - Email unknown" })
            }

            // check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid Credentials - Password incorrect" })
            }

            // create and sent a json web token
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get("jwtsecret"), {
                expiresIn: 36000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error while authenticating user.");
        }
    });

module.exports = router;
