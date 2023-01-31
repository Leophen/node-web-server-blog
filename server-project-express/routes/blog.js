var express = require('express');
var router = express.Router();

router.get('/count', function (req, res, next) {
  res.json({
    errno: 0,
    data: 123
  })
});

module.exports = router;
