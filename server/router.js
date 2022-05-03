const router = require('express').Router();
const controller = require('./controller');

router
  .route('/test')
  .get(controller.test);

module.exports = router;
