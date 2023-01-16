const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home", { pageTitle: "UnPlagRiz - Home" });
});

router.get("/check",(req,res) => {
    res.render("check",{pageTitle:'Check Plagiarism.'})
});

module.exports = router;

