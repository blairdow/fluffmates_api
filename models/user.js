var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var chosenPetsSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    pet_id: String,
    chosen: Boolean
})

var userSchema = new mongoose.Schema({
    name:   String,
    email: String,
    password_digest: String,
    address: String,
    city: String,
    state: String,
    zip_code: String,
    chosenPets: [chosenPetsSchema]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
