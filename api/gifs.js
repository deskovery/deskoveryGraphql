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
  region: 'us-east-1'
});

const s3 = new aws.S3();

const S3_BUCKET = process.env.BUCKET;
// s3.createBucket({ Bucket: 'deskoveryTest' }, function(err, resp) {
//   if (err) {
//     console.log(err);
//   }
// });
// exports.sign_s3 = (req, res) => {
//   const s3 = new aws.s3();
//   const fileName = req.body.fileName
//   const fileType = req.body.fileType

//   const s3Params = {
//     Bucket: S3_BUCKET,
//     Key: fileName,
//     Expires: 500,
//     ContentType: fileType,
//     ACL: 'public-read'
//   }

//   s3.getSignedUrl('putObject', s3Params, (err, data) => {

//   })
// }

router.post('/', async (req, res, next) => {
  const imgData = req.body.imgData.split('base64,').pop();
  try {
    const buf = new Buffer(
      req.body.imgData.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    // const filePath = `./api/public/gifs/${Date.now()}.gif`;
    // fs.writeFile(filePath, imgData, { encoding: 'base64' }, function(err) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     // console.log('File created');
    //   }
    // });
    // singleUpload(req, res, function(err, some) {
    //   if (err) {
    //     return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    //   }

    //   return res.json({'imageUrl': req.file.location});
    // });
    let gifFileKey = `Gifs/${Date.now()}.gif`;
    s3.putObject(
      {
        Bucket: 'deskoverycapstone',
        Key: gifFileKey,
        ACL: 'public-read',
        // ContentEncoding: 'base64',
        ContentType: 'image/gif',
        Body: buf
      },
      function(err, resp) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(resp);
        const gifs = `https://s3.amazonaws.com/deskoverycapstone/${gifFileKey}`;
        console.log(gifs, ' is gifs!');
        res.send(gifs);
      }
    );
  } catch (error) {
    next(error);
  }
});
