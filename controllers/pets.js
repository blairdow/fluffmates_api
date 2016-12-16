var request = require('request')

var petSearch = function(req, res, next) {
    console.log('query', req.query)
    var rootUrl = 'http://api.petfinder.com/'
    var key = process.env.PET_KEY
    var method = `pet.find`
    var animal = req.query.animal
    var zipCode = req.query.zipCode
    var url

    if(!req.query.animal && !req.query.zipCode){
      url = `${rootUrl}${method}?format=json&key=${key}`
    }
    else if(!req.query.animal) {
        url = `${rootUrl}${method}?format=json&key=${key}&location=${zipCode}`
    }
    else url = `${rootUrl}${method}?format=json&key=${key}&animal=${animal}&location=${zipCode}`

    console.log('url', url)

    request(url, function(err, response, body) {
        try {
          var pets = JSON.parse(body).petfinder.pets.pet
          res.json(pets)}
        catch (err) {
          res.status(500).json({error: err})
          console.log(err)
        }
    })
};

module.exports = {
  petSearch: petSearch
};
