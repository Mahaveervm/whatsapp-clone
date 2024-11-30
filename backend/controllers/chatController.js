const db = require('../config/db');

const sendMessage = (req, res) => {
    const { sender_id, receiver_id, content } = req.body;

    if (!sender_id || !receiver_id || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)`;

    db.query(query, [sender_id, receiver_id, content], (err, result) => {
        if (err) {
            console.error('Error inserting message:', err);
            return res.status(500).json({ error: 'Failed to send message' });
        }
        res.status(201).json({ message: 'Message sent successfully' });
    });
};

const getMessages = (req, res) => {
    const { senderId, receiverId } = req.params;

    const query = `
        SELECT * FROM messages 
        WHERE (sender_id = ? AND receiver_id = ?) 
           OR (sender_id = ? AND receiver_id = ?)
        ORDER BY timestamp ASC
    `;

    db.query(query, [senderId, receiverId, receiverId, senderId], (err, results) => {
        if (err) {
            console.error('Error fetching messages:', err);
            return res.status(500).json({ error: 'Failed to fetch messages' });
        }
        res.status(200).json(results);
    });
};

module.exports = { sendMessage, getMessages };
