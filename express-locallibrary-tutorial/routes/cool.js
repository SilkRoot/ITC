var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users/cool', function(req, res) {
  res.send('You are so cool');
});

module.exports = router;
