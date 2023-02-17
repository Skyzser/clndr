const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getData } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(registerUser).get(protect, getData);
router.post('/login', loginUser);

module.exports = router;