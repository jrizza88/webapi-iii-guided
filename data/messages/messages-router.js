
const express = require('express');

const router = express.Router();

// pretned these are actually db files!
const messageModel = {};
const hubModel = {};

router.post('/api/messages', async (req, res) => {
    const newMessage = req.body;

    if (newPost.text && newPost.hub_id) {
        try {
            const hub = await hubModel.findById(newMessage.hub_id) 
            if (hub) {
            const savedMessage = await messageModel.insert(newMessage);
            res.status(201).json({savedMessage})
                            
             } else {
                 res.status(400).json({err: 'hub_id is invalid'})
             }
        } catch (e) {
            res.status(500).json({ err: 'failed to save message'});
        }
    } else {
        res.status(400).json({ err: 'message missing text or hub_id'});
    }
});

module.exports = router;