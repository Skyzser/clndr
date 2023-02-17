const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const check = require('../middleware/checkConstraints');

/*
    @desc - Register a new user
    @route - POST /api/users
    @access - Public
*/
const userConstraints = {
    username: {
        test: (s) => s && s.length > 0 && s.length < 20,
        error: "Username must be between 1 and 20 characters"
    },
    email: {
        test: (s) => s.includes('@'),
        error: "Invalid email"
    },
    password: {
        test: (s) => s && s.length > 5 && s.length < 20,
        error: "Password must be between 6 and 20 characters"
    }
}
const registerUser = asyncHandler(async (req, res) => {
    // Error handling
    let checkResult = check(req.body, userConstraints);
    if(checkResult !== '') {
        res.status(400);
        throw new Error(checkResult);
    }

    const { username, email, password } = req.body;
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if(userExists) {
        if(userExists.username === username) {
            res.status(400);
            throw new Error('Username already exists');
        } if(userExists.email === email) {
            res.status(400);
            throw new Error('Email already exists');
        } else {
            res.status(400);
            throw new Error('User already exists');
        }
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if(user) {  // If user is created
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

/*
    @desc - Authenticate (login) a user
    @route - POST /api/users/login
    @access - Public
*/
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

/*
    @desc - Get user data
    @route - GET /api/users/
    @access - Private
*/
const getData = asyncHandler(async (req, res) => {
    const { _id, username, email } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        username,
        email
    });
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

module.exports = { registerUser, loginUser, getData };