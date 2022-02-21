const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/homeController');



router.get('/',passport.checkAuthentication,homeController.home);

// including users and habbit routes in main route file
router.use('/users',require('./users'));

module.exports = router;