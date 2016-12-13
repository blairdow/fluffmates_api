var express = require('express'),
    router  = new express.Router();

// Require controllers.
var petsController = require('../controllers/pets');
var usersController = require('../controllers/users');

router.get('/pets', petsController.petSearch)

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

module.exports = router;
