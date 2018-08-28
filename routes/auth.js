var jwt = require('express-jwt');
var jsonwebtoken = require('jsonwebtoken')
var secret = require('./auth.config').secret;

function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

function getUser(req){
  return new Promise((resolve, reject) =>{
    jsonwebtoken.verify(getTokenFromHeader(req), secret, function(err, decoded) {
      if (err) { reject(err);}
      resolve(decoded);
   });
  });
}


var auth = {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),
  getUser: getUser,

  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;
