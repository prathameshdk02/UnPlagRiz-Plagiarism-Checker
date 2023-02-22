const express = require('express');
const router = express.Router();


router.get("/check",(req,res) => {
    res.render("check",{pageTitle:'Check Plagiarism.'});
});

router.get("/signup",(req,res)=>{
    res.render("signup",{pageTitle: 'SignUp - UnPlagRiz'});
});

router.get("/login",(req,res)=>{
    res.render("login",{pageTitle: 'Login - UnPlagRiz'});
});

router.get("/", (req, res) => {
    res.render("check", { pageTitle: "Check Plagiarism - UnPlagRiz" });
});

module.exports = router;

