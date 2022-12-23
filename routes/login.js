var express = require("express");
var router = express.Router();
const Brokers = require("../config").Brokers;
const Client = require("../config").Clients;

/* GET login page. */
router.get("/", async (req, res) => {
	res.render("../views/pages/login", { pageTitle: "Login" });
});

router.post("/", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const snapshot = await Brokers.get();
	const list = snapshot.docs.map((doc) => doc.data());

	var match = false;
	for (const row of list) {
		if (username == row.username && password == row.password) {
			match = true;
		}
	}
	if (match) {
		res.cookie(`username`, username, {
			maxAge: 50000*50000,
			secure: false,
			httpOnly: true,
			sameSite: "lax",
		});
		console.log("Username cookie has been saved successfully");

		res.redirect("/loggedin");
	} else {
		res.render("../views/pages/login", { pageTitle: "Login" });
	}
});

router.get("/logout", async (req, res) => {
	res.clearCookie('username');

	res.redirect("/");
});

module.exports = router;
