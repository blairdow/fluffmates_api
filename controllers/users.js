// Require resource's model(s).
var User = require("../models/user");
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

var login = function (req, res, next) {
  if (!req.body.password || !req.body.email) {
    res.json({ error: "Email and password must be set"})
    return false
  }

  var payload;

  User.findOne({ email: req.body.email })
    .then(function (user) {
      if (user) {
        payload = user;
        console.log(req.body.password)
        console.log(user.password_digest)
        return bcrypt.compareSync(req.body.password, user.password_digest)
      }
      else {
        res.json({ error: "User does not exist" })
      }
    })
    .then(function (match) {
      if (match) {
        return jwt.sign(payload, process.env.JWT_SECRET)
      }
      else {
        res.json({ error: "Passwords don't match" })
      }
    })
    .then(function (token) {
      res.json({ token: token })
    })
    .catch(function (err) {
      console.log(err)
    })

}

var show = function(req, res, next){
    if (req.token._id != req.params.id) {
        res.status(403).json({ error: "Wrong user in token" })
        return false
    }

    User.findById(req.params.id, function(err, user) {
        if (err) {
          res.json({message: 'Could not find user because ' + err});
        } else if (!user) {
          res.json({message: 'No user with this id.'});
        } else {
          res.json(user)
        }
    });
};

var create = function(req, res, next){
    if (!req.body.password || !req.body.email) {
        res.json({ error: "Email and password must be set"})
        return false
      }

      // var payload = { email: req.body.email }

      var newUser = new User(req.body)
      User.findOne({ email: newUser.email })
        .then(function (user) {
          console.log(req.body)
          if (user) {
            res.json({ error: "User exists" })
          }
          else {
            try {
              return bcrypt.hash(req.body.password, 10)
            } catch (err) {
              res.json({ error: err })
            }
          }
        })
        .then(function (hash) {
          newUser.password_digest = hash
          return User.create(newUser)
        }, function (err) {
          res.json({ error: err })
        })
        .then(function (user) {
          return jwt.sign(user, process.env.JWT_SECRET)
        })
        .then(token => res.json({ token: token }))
}

var update = function(req, res) {
  User.findById(req.params.id, function(err, user) {

        if (err) res.send(err);

        // set the new user information if it exists in the request
        if (req.body.name)        user.name        = req.body.name;
        if (req.body.email)       user.email       = req.body.email;
        if (req.body.address)     user.address     = req.body.address;
        if (req.body.city)        user.city        = req.body.city;
        if (req.body.state)       user.state       = req.body.state;
        if (req.body.zip_code)    user.zip_code    = req.body.zip_code;
        if (req.body.chosenPets)  user.chosenPets  = req.body.chosenPets

        // save the user
        user.save(function(err) {
          if (err) res.send(err);

          // return a message
          res.json({ message: 'User updated!' });
        });
  });
}

module.exports = {
    show:  show,
    create: create,
    login: login,
    update: update
};
