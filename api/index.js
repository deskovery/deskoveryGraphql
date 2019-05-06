const router = require('express').Router();
module.exports = router;

router.use('/videos', require('./api'));

router.use((req, res, next) => {
  console.log('Inside 404');
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
