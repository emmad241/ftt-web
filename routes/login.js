var express = require("express");
var router = express.Router();
const User = require('../config');

/* GET login page. */
router.get("/", async (req, res) => {
	res.render("../views/pages/login", { pageTitle: "Login" });
});

router.post("/", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

    const snapshot = await User.get();
    const list = snapshot.docs.map((doc)=>doc.data());

    for(const row of list) {
        if(username == row.username && password == row.password){
            res.redirect("/");
        }
    };

});

module.exports = router;
