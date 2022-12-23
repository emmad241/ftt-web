var express = require('express');
var router = express.Router();
const User = require('../config');
const Brokers = require("../config").Brokers;

/* GET  page. */
router.get('/', (req, res) => {
  res.render('../views/pages/registration', { pageTitle: "Signup" });
});

router.post("/", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

    const data = {
        username: username,
        password: password
    };

    const id = Math.random().toString(36).substring(2,12);

    await Brokers.doc(id).set(data)

    res.cookie(`username`, username, {
        maxAge: 50000*50000,
        secure: false,
        httpOnly: true,
        sameSite: "lax",
    });
    console.log("Username cookie has been saved successfully");

    res.redirect("/loggedin");
});

module.exports = router;