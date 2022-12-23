var firebase = require('firebase-admin');

const firebaseConfig = {
  apiKey: "AIzaSyDRrtjVDrT2mmYENEsZorNDTm0Fqo058k0",
  authDomain: "ftt-web-8b4b9.firebaseapp.com",
  projectId: "ftt-web-8b4b9",
  storageBucket: "ftt-web-8b4b9.appspot.com",
  messagingSenderId: "740364239697",
  appId: "1:740364239697:web:b743d9657f6725b124c970",
  measurementId: "G-YRJ3SMRXCM"
};
var app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const Users = db.collection("Users");
const Brokers = db.collection("Brokers");
const Clients = db.collection("UsersNew");
const Stocks = db.collection("StockList");
const Crypto = db.collection("CryptoList");
module.exports = {
  Users: Users, 
  Brokers: Brokers,
  Clients: Clients,
  Stocks: Stocks,
  Crypto: Crypto,
  app: app
};