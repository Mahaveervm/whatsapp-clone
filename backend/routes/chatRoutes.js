const express = require('express');
const { getMessages, sendMessage } = require('../controllers/chatController');
const router = express.Router();

// Route to get messages between two users
router.get('/:senderId/:receiverId', getMessages);

// Route to send a new message
router.post('/', sendMessage);

module.exports = router;
