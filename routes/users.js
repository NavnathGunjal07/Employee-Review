const express = require('express');
const router = express.Router();
const passport = require('passport');

//routes for user sign in and sign up
const usersController = require('../controllers/usersController');
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
//routes for rendering user update page
router.get('/updatePage/:id',usersController.updatePage);
//routes for rendering add review page
router.get('/addReview/:id',usersController.addReviewPage);
//routes for rendering user update page
router.get('/viewAllReviewsPage/:id',usersController.viewAllReviewsPage);
//routes for rendering user update page
router.get('/assignToReviewPage/:id',usersController.assignToReviewPage);

//Creating new user
router.post('/create', usersController.create);
//deleting user by id
router.get('/destroy/:id',passport.checkAuthentication,usersController.destroy);
//making user admin by id
router.get('/makeAdmin/:id',passport.checkAuthentication,usersController.makeAdmin);

//routes for updating user details
router.post('/update/:id',passport.checkAuthentication,usersController.update);
//routes for adding performance reviews
router.post('/addNewPerformanceReview/:id',passport.checkAuthentication,usersController.addPerformanceReview);
//routes for assigning employee for review
router.get('/assignReview/:id',passport.checkAuthentication,usersController.assignReview);


// used passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);

module.exports = router;