const express = require('express');

const router = express.Router();

const likeController = require('../controllers/likes_controller');

router.post('/toggle',likeController.toggelLike);

module.exports = router;