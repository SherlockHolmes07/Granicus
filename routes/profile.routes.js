const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { verifyToken } = require('../middleware/verifyToken');

// GET request for fetching a user's profile
router.get('/:userId', verifyToken, profileController.getProfile);

// POST request for creating a user's profile
router.post('/', verifyToken, profileController.createOrUpdateProfile);

module.exports = router;