var express = require('express'),
    router  = new express.Router();

// Require controllers.
var petsController = require('../controllers/pets');
var usersController = require('../controllers/users');
var authController = require('../controllers/auth');

//route to get data from Petfinder API
//called by front end using user's search inputs
router.get('/pets', petsController.petSearch)

// users resource paths:
router.post('/users', usersController.create)
router.post('/login', 	 usersController.login);
router.get('/users/:id', authController.isLoggedIn, usersController.show);
router.put('/users/:id',     usersController.update);

module.exports = router;
