const router = require('express').Router();
const fs = require('fs');
module.exports = router;

router.post('/', async (req, res, next) => {
  const imgData = req.body.imgData.split('base64,').pop();
  try {
    const filePath = `./api/public/gifs/${Date.now()}.gif`;
    fs.writeFile(filePath, imgData, { encoding: 'base64' }, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('File created');
      }
    });
    res.send(filePath);
  } catch (error) {
    next(error);
  }
});
