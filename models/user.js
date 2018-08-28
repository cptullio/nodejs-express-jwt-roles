var secret = require('../routes/auth.config').secret;
var jwt = require('jsonwebtoken');

function isLoginValid(username,password){
    return username === password 
}

function generateJWT(username, permissions) {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign({ user: {
        username : username,
        permissions : permissions
    },
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };

module.exports = {
    username : '',
    permissions : [],
    generateJWT : generateJWT,
    isLoginValid : isLoginValid
};
