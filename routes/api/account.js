var router = require('express').Router();
var passport = require('passport');
var auth = require('../auth');

router.post('/', function (req, res, next) {
  if (!req.body.name) {
    return res.status(422).json({ errors: { name: "can't be blank" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) { return next(err); }

    if (user) {
      return res.json({ token: user.generateJWT(user.username, user.permissions) });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.get('/me', auth.required, function (req, res, next) {
  auth.getUser(req).then(x => {
    return res.json(x.user);
  }).catch(x => {
    return res.json({});
  });
});

module.exports = router;