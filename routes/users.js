const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult, check } = require("express-validator");
const User = require("../models/User");

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post("/",
    [
        // validate the user input
        check("name", "Please add a name").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please enter a password with at least 6 characters").isLength({ min: 6 })
    ],
    async (req, res) => {
        // if there are any validation errors send back a 400
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // if user email already exists, send a 400
            let user = await User.findOne({ email });
            if (user) {
                res.status(400).json({ message: "User already exists" })
            }
            // else, create a new user from user input
            user = new User({
                name,
                email,
                password
            })
            // hash the password (with salt of length 10)
            user.password = await bcrypt.hash(password, 10, null);
            //  save the new user to the data base
            await user.save();

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
            res.status(500).send("Server error while registering user.");
        }
    }
);

module.exports = router;
