const router = require('express').Router();
const controller = require('./controller');

router
  .route('/test')
  .get(controller.test);

router
  .route('/Rx/submit')
  .post(controller.submit);

router
  .route('/Rx/deleteAll')
  .delete(controller.deleteAll);

router
  .route('/Rx/delete')
  .delete(controller.deleteOne);

router
  .route('/Rx')
  .get(controller.retrieveAll);

router
  .route('/Rx')
  .put(controller.updateOne);

module.exports = router;
