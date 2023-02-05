const express = require('express');
const getDb = require('../util/database').getDb;

const router = express.Router();

router.post("/signup",async (req,res)=>{
    res.send();
    let email = req.body.email;
    let pass = req.body.pass;
    console.log(email,pass);
    db = getDb();
    await db.collection('Users').insertOne({
        email: email,
        password: pass
    }).then((res)=>{
        console.log(res);
        console.log("Submit successfull");
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;