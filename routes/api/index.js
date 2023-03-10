// importing express
const express= require('express');

// creating new router variable
const router = express.Router();

router.use('/v1',require('./v1'));

module.exports = router;