const router = require('express').Router();
const controller = require('./controller');

router
  .route('/test')
  .get(controller.test);

router
  .route('/Rx/submit')
  .post(controller.submit);

module.exports = router;
