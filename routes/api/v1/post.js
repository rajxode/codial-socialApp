const express = require('express');

const router = express.Router();

const passport = require('passport');

// importing post api controller
const postApi = require('../../../controllers/api/v1/post_api');

router.get('/',postApi.index);

// to delete a post using api also authenticate user using passport and prevent from creating session cookies
router.delete('/:id',passport.authenticate('jwt',{session:false}),postApi.destroy);

module.exports = router;