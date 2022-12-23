var express = require('express');
var router = express.Router();

const Brokers = require('../config').Brokers;
const Clients = require("../config").Clients;

const Stock = require('../config').Stocks;
const Crypto = require('../config').Crypto;

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
    getBrokerClientsAndLargeChanges(req.cookies.username).then(function(data){
        res.render("../views/pages/home_loggedin", {
            clients: data.clients,
            stocks: data.stocks,
            crypto: data.crypto,
            pageTitle: "Investify",
        });
    });
});

router.get('/profile', async (req, res) => {
    getBroker(req.cookies.username).then(function(broker){
        res.render("../views/pages/profile", {
            broker:broker,
            pageTitle: "Investify",
        });
    });
});

async function getBrokerClientsAndLargeChanges(username) {
    let clients = [];
    const brokerSnapshot = await Brokers.get();
	const brokerList = brokerSnapshot.docs.map((doc) => doc.data());
    const clientSnapshot = await Clients.get();
	const clientList = clientSnapshot.docs.map((doc) => doc.data());
    for (const brokerRow of brokerList) {
		if(brokerRow.username == username){
            let brokerClients = brokerRow.clients;
            brokerClients.forEach(client => {
                for (const clientRow of clientList) {
                    if(clientRow.username == client){
                        clients.push(clientRow);
                    }
                }
            });
        }
	}
    
    let stocksArr = []
    const stockSnapshot = await Stock.get();
	const stockList = stockSnapshot.docs.map((doc) => doc.data());
    for (const row of stockList) {
        var code = row.assetCode;
        var price = parseInt(row.assetPrice.slice(1));
        var priceSixMonths = parseInt(row.assetPriceSixMonths.slice(1));
        var change = priceSixMonths - price;
        if(Math.abs(change) > 100){
            stocksArr.push([code, change])
        }
    }
    

    let cryptoArr = []
    const cryptoSnapshot = await Crypto.get();
	const cryptoList = cryptoSnapshot.docs.map((doc) => doc.data());
    for (const row of cryptoList) {
        var price = parseInt(row.assetPrice.slice(1));
        var priceSixMonths = parseInt(row.assetPriceSixMonths.slice(1));
        var change = priceSixMonths - price;
        if(Math.abs(change) > 100){
            cryptoArr.push([code, change])
        }
    }

    var data = {
        clients: clients,
        stocks: stocksArr,
        crypto: cryptoArr
    };
	return data;
}

async function getBroker(username){
    const brokerSnapshot = await Brokers.get();
	const brokerList = brokerSnapshot.docs.map((doc) => doc.data());
    for (const brokerRow of brokerList) {
		if(brokerRow.username == username){
            return brokerRow;
        }
    }
}

async function getStocksCryptoLargeChange() {
    let stocksArr = []
    const stockSnapshot = await Stock.get();
	const stockList = stockSnapshot.docs.map((doc) => doc.data());
    for (const row of stockList) {
        console.log(row.assetCode);
    }
    

    let cryptoArr = []
    const cryptoSnapshot = await Crypto.get();
	const cryptoList = cryptoSnapshot.docs.map((doc) => doc.data());
    for (const row of cryptoList) {
        console.log(row.assetCode);
    }

    var stocksCrypto = {
        stocks: stocksArr,
        crypto: cryptoArr
    };
}

module.exports = router;