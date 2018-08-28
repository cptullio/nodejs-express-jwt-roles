var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password'
}, function(username, password, done) {
  let user = User;
  user.username = username;
  user.permissions = username === 'admin'? ['admin']:['user'];
  if (user.isLoginValid(username,password)){
    return done(null, user);
  }else{
    return done(null, false, {errors: {'username or password': 'is invalid'}});
  }
  
}));

