var express = require('express');
var router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const User = require('../config');
const Clients = require("../config").Clients;
const Stock = require('../config').Stocks;
const Crypto = require('../config').Crypto;

/* GET clients page. */
router.get('/:username', async (req, res) => {
    const username = req.params.username;
    getClient(username).then(function(client){
        const doc = new PDFDocument;
        let today = new Date().toLocaleDateString()
  
        doc.pipe(fs.createWriteStream('public/report.pdf'));

        doc
            .text('Investify', 110, 50)
            .fontSize(10)

        doc
            .text(today, 110, 75)
            .fontSize(10)

        doc
            .text(`Name: ${client.name}`, 110, 100)
            .fontSize(10)

        doc
            .text(`Stocks: ${client.stocks.toString()}`, 100, 120)
            .font('Times-Roman', 13);
        
        doc
            .text(`Crypto: ${client.crypto.toString()}`, 100, 150)
            .font('Times-Roman', 13);

        doc.end();

        res.render("../views/pages/clients", {
            broker_client: client,
            pageTitle: "Investify",
        });
    });
});

router.get('/predictions/:stocks/:crypto', async (req, res) => {
    let stocks = req.params.stocks;
    stocks = stocks.split(',');
    let crypto = req.params.crypto;
    crypto = crypto.split(',');

    getStocksAndCrypto(stocks, crypto).then(function(stocksCrypto){
        res.render("../views/pages/predictions", {
            stocks: stocksCrypto.stocks,
            crypto: stocksCrypto.crypto,
            pageTitle: "Investify",
        });
    });
});

router.get('/report/:stocks/:crypto', async (req, res) => {
    let stocks = req.params.stocks;
    stocks = stocks.split(',');
    let crypto = req.params.crypto;
    crypto = crypto.split(',');

    getStocksAndCrypto(stocks, crypto).then(function(stocksCrypto){
        res.render("../views/pages/report", {
            stocks: stocksCrypto.stocks,
            crypto: stocksCrypto.crypto,
            pageTitle: "Investify",
        });
    });
});

async function getClient(username) {
    const snapshot = await Clients.get();
	const list = snapshot.docs.map((doc) => doc.data());
    for (const row of list) {
		if(row.username == username){
            return row;
        }
	}
}

async function getStocksAndCrypto(stocks, crypto) {
    let stocksArr = []
    const stockSnapshot = await Stock.get();
	const stockList = stockSnapshot.docs.map((doc) => doc.data());
    for(let code of stocks){
        for (const row of stockList) {
            if(row.assetCode == code){
                stocksArr.push(row);
            }
        }
    }

    let cryptoArr = []
    const cryptoSnapshot = await Crypto.get();
	const cryptoList = cryptoSnapshot.docs.map((doc) => doc.data());
    for(let code of crypto){
        for (const row of cryptoList) {
            if(row.assetCode == code){
                cryptoArr.push(row);
            }
        }
    }

    var stocksCrypto = {
        stocks: stocksArr,
        crypto: cryptoArr
    };
    return stocksCrypto;
}

module.exports = router;