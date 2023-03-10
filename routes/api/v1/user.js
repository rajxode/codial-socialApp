const express = require('express');

const router= express.Router();

// importing the controller
const userApi = require('../../../controllers/api/v1/user_api');

router.post('/create-session',userApi.creatSession);

module.exports = router;