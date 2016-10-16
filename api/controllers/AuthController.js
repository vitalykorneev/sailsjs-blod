/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const passport = require('passport');
const jwt = require('jsonwebtoken');

function generateToken(user) {  
  return jwt.sign({
    id: user.id,
  }, 'server secret', {
    expiresIn: "2 days"
  });
}

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  login: function (req, res) {

    passport.authenticate('local', function (err, user, info) {
      if ((err) || (!user)) {
        return res.send({
          message: info.message,
          user: user
        });
      }
      req.logIn(user, function (err) {
        if (err) res.send(err);
        return res.send({
            message: info.message,
            user: user,
            access_token: generateToken(user)
          });
      });

    })(req, res);
  },

  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  }
 };

 // Access-Control-Allow-Origin: http://javascript.ru
// Access-Control-Allow-Credentials: true