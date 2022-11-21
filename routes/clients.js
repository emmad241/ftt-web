var express = require('express');
var router = express.Router();
const User = require('../config');
const Client = require("../config").Clients;

/* GET clients page. */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    getClient(req.cookies.username, id).then(function(client){
        res.render("../views/pages/clients", {
            broker_client: client,
            pageTitle: "Investify",
        });
    });
});

async function getClient(username, index) {
    let clients = [];
    const snapshot = await Client.get();
	const list = snapshot.docs.map((doc) => doc.data());
    for (const row of list) {
		if(row.broker == username){
            clients.push(row);
        }
	}
	return clients[index];
}

module.exports = router;