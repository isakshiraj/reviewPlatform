const express = require('express');
const router = express.Router();
const { updateProfile, getUserProfile, getAllUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.put('/profile', protect, updateProfile);
router.get('/:id', protect, getUserProfile);
router.get('/', protect, admin, getAllUsers);

module.exports = router;
