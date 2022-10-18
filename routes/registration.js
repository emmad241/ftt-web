var express = require('express');
var router = express.Router();

/* GET  page. */
router.get('/', (req, res) => {
  res.render('../views/pages/registration', { pageTitle: "Registration" });
});

module.exports = router;