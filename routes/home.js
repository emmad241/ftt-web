var express = require('express');
var router = express.Router();

const User = require('../config');

/* GET home page. */
router.get('/', async (req, res) => {
    if(req.cookies.username != null){
        res.render('../views/pages/home_loggedin', { pageTitle: "Investify" });
    }else{
        res.render('../views/pages/home', { pageTitle: "Investify" });
    }
});

module.exports = router;