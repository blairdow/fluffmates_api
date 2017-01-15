var request = require('request')

//function to get pets using user search inputs from Petfinder API
var petSearch = function(req, res, next) {
    
    var rootUrl = 'http://api.petfinder.com/'
    var key = process.env.PET_KEY
    var method = `pet.find`
    
    //animal and zip code info comes from user search on front end
    var animal = req.query.animal
    var zipCode = req.query.zipCode
    var url
    
    //this conditional block builds url to call petfinder API
    if(!req.query.animal && !req.query.zipCode){
      url = `${rootUrl}${method}?format=json&key=${key}`
    }
    else if(!req.query.animal) {
        url = `${rootUrl}${method}?format=json&key=${key}&location=${zipCode}`
    }
    else url = `${rootUrl}${method}?format=json&key=${key}&animal=${animal}&location=${zipCode}`

    //return pets JSON object to front end
    request(url, function(err, response, body) {
        try {
          var pets = JSON.parse(body).petfinder.pets.pet
          res.json(pets)
        }
        catch (err) {
          res.status(500).json({error: err})
          console.log(err)
        }
    })
};

module.exports = {
  petSearch: petSearch
};
