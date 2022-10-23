var express = require('express');
var router = express.Router();
const User = require('../config');

/* GET clients page. */
router.get('/', async (req, res) => {
    res.render('../views/pages/clients', { pageTitle: "Investify" });
});

module.exports = router;