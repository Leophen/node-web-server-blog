var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  res.json({
    errno: 0,
    data: 123
  })
});

module.exports = router;
