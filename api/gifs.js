const router = require('express').Router();
const fs = require('fs');
const aws = require('aws-sdk');
const multer = require('multer');
// const multerS3 = require('multers3');

require('dotenv').config({ path: 'variables.env' });

module.exports = router;

// const upload = multer({
//   storage: multerS3({
//     s3:s3,
//     bucket: 'medium-test',
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// });

// const singleUpload = upload.single('image');
aws.config = new aws.Config();

aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'us-east-1',
});

const s3 = new aws.S3();

const S3_BUCKET = process.env.BUCKET;

router.post('/', async (req, res, next) => {
  const imgData = req.body.imgData.split('base64,').pop();
  try {
    const buf = new Buffer(
      req.body.imgData.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    let gifFileKey = `Gifs/${Date.now()}.gif`;
    s3.putObject(
      {
        Bucket: 'deskoverycapstone',
        Key: gifFileKey,
        ACL: 'public-read',
        // ContentEncoding: 'base64',
        ContentType: 'image/gif',
        Body: buf,
      },
      function(err, resp) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(resp);
        const gifs = `https://s3.amazonaws.com/deskoverycapstone/${gifFileKey}`;
        res.send(gifs);
      }
    );
  } catch (error) {
    next(error);
  }
});
