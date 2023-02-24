const express = require('express');
const router = express.Router();

const { registerUser, loginUser, editProfile } = require('../controller/user');
const { addFriend, viewFriend, deleteFriend } = require('../controller/friend');
const { sendMessage, viewMessage } = require('../controller/message');

router.post('/user', registerUser);
router.post('/login', loginUser);
router.put('/user/:username', editProfile);
router.post('/friend', addFriend);
router.get('/friend/:username', viewFriend);
router.delete('/friend', deleteFriend);
router.post('/message', sendMessage);
router.get('/message/:username', viewMessage);

module.exports = router;
