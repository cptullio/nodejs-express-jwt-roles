var router = require('express').Router();
var auth = require('../auth');

router.get('/', auth.required, function (req, res, next) {
  return res.json({ customers: [{ customer_id: 1, customer_name: "Customer 1" }, { customer_id: 2, customer_name: "Customer 2" }] });
});

router.get('/onlyadmin', auth.required, function (req, res, next) {
  auth.getUser(req).then(x => {
    if (x.user.permissions.indexOf("admin") > -1) {
      return res.json({ customers: [{ customer_id: 1, customer_name: "Admin Customer 1" }, { customer_id: 2, customer_name: "Admin Customer 2" }] });
    }
    else {
      return res.json({});
    }
  }
  ).catch(x => {
    return res.json({});
  });


});



module.exports = router;
