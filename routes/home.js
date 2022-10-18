var express = require('express');
var router = express.Router();
const User = require('../config');

router.post('/create', async (req, res)=>{
    const data=req.body;
    console.log(data);
    await User.add(data)
    res.send({msg:"User added"})
})

/* GET home page. */
router.get('/', async (req, res) => {
    const snapshot = await User.get();
    const ids = snapshot.docs.map((doc)=>doc.id);
    console.log(ids)
    const list = snapshot.docs.map((doc)=>doc.data());
    console.log(list);
    res.render('../views/pages/home', { pageTitle: "Emma's Blog" });
});

module.exports = router;