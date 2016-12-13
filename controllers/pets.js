var request = require('request')

var petSearch = function(req, res, next) {
    console.log('query', req.query)
    var rootUrl = 'http://api.petfinder.com/'
    var key = process.env.PET_KEY
    var method = `pet.find`
    var animal = req.query.animal
    var zipCode = req.query.zipCode

    var url = `${rootUrl}${method}?format=json&key=${key}&animal=${animal}&location=${zipCode}`

    console.log('url', url)

    request(url, function(err, response, body) {
        if(!err && response.statusCode == 200) {
            console.log('response', JSON.parse(body).petfinder.pets.pet[1])
            var pets = JSON.parse(body).petfinder.pets.pet
            res.json(pets)
        }
        else {
            console.log(err)
        }
    })
};

module.exports = {
  petSearch: petSearch
};

