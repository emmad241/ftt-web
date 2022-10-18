var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', async (req, res) => {
  res.render('../views/pages/login', { pageTitle: "Login" });
});

module.exports = router;