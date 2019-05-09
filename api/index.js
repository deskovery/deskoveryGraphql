const express = require('express');
const router = express.Router();
const path = require('path');
module.exports = router;

router.use('/videos', require('./api'));
router.use('/gifs', require('./gifs'));

router.use(express.static(path.join(__dirname, 'public')));

router.use((req, res, next) => {
  console.log('Inside 404');
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
