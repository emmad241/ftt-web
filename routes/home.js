var express = require('express');
var router = express.Router();

const User = require('../config');
const Client = require("../config").Clients;

/* GET home page. */
router.get('/', async (req, res) => {
    console.log(req.cookies.username);
    if(req.cookies.username != null){
        res.redirect('/loggedin');
    }else{
        res.render('../views/pages/home', { pageTitle: "Investify" });
    }
});

router.get('/loggedin', (req, res) => {
    getClients(req.cookies.username).then(function(clients){
        res.render("../views/pages/home_loggedin", {
            clients: clients,
            pageTitle: "Investify",
        });
    });
});

router.get('/profile', async (req, res) => {
    res.render('../views/pages/profile', { pageTitle: "Investify" });
});

async function getClients(username) {
    let clients = [];
    const snapshot = await Client.get();
	const list = snapshot.docs.map((doc) => doc.data());
    for (const row of list) {
		if(row.broker == username){
            clients.push(row);
        }
	}
	return clients;
}

module.exports = router;