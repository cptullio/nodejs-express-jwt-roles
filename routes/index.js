var router = require('express').Router();
//var swaggerUi = require('swagger-ui-express');
//var swaggerDocument = require('./../swagger.json');

//var options = {
//  explorer:true,
//  swaggerOptions: {
//    authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
//  }
//};
//router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
router.use('/api', require('./api/index'));
router.use(require('./config'));

module.exports = router;
