const express = require('express');
const router = express.Router();
const path = require('path');
module.exports = router;

router.use(express.static(path.join(__dirname, 'public')));
