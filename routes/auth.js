const express = require('express');

const User = require('../models/User');
const getDb = require('../util/database').getDb;

const router = express.Router();

router.post("/login",(req,res) => {
    let user = new User(req.body.email,req.body.pass);
    
    // Setting a cookie for Fun!
    // res.setHeader('Set-Cookie','loggedIn=true');
    
    user.login().then((results) => {
        if(results){
            // For handling Sessions...
            req.session.loggedIn = true;
            return res.redirect('/check')
        }
        return res.render('login',{email: `${req.body.email}`,authErr:true});
    });
})

router.post("/signup",(req,res)=>{
    let newUser = new User(req.body.email,req.body.pass);
    newUser.signUp().then(() => {
        res.redirect(`/login?email=${req.body.email}`);
    });
});

module.exports = router;