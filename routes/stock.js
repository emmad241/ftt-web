var express = require('express');
var router = express.Router();
const Stock = require('../config').Stocks;
const Crypto = require('../config').Crypto;

router.get('/stock/:code', async (req, res) => {
    const code = req.params.code;
    getStock(code).then(function(stock){
        res.render("../views/pages/stock", {
            stock: stock,
            pageTitle: "Investify",
        });
    });
});

router.get('/crypto/:code', async (req, res) => {
    const code = req.params.code;
    getCrypto(code).then(function(crypto){
        res.render("../views/pages/crypto", {
            crypto: crypto,
            pageTitle: "Investify",
        });
    });
});

async function getStock(code) {
    let stock;
    const snapshot = await Stock.get();
	const list = snapshot.docs.map((doc) => doc.data());
    for (const row of list) {
		if(row.assetCode == code){
            stock = row;
            break;
        }
	}
	return stock;
}

async function getCrypto(code) {
    let crypto;
    const snapshot = await Crypto.get();
	const list = snapshot.docs.map((doc) => doc.data());
    for (const row of list) {
		if(row.assetCode == code){
            crypto = row;
            break;
        }
	}
	return crypto;
}

module.exports = router;