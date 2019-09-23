const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
    res.send('Get logged in user');
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', [
    check('email', 'Please enter a valid email')
        .isEmail(),
    check('password', 'Password required')
        .exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        // so, below we compare the passoword that's incoming from the req.body with the user password. So, find a user with the matching email and check if the password that corresponds with this user-email matches the password submitted.
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: 'invalid Credentials' })

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
                expiresIn: 360000
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;