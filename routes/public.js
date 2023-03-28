const express = require("express");
const router = express.Router();

router.get("/check", (req, res) => {
  if (req.session.loggedIn == true) {
    return res.render("check", { pageTitle: "Check Plagiarism." });
  }
  res.redirect('/login');
});

router.get("/signup", (req, res) => {
  res.render("signup", { pageTitle: "SignUp - UnPlagRiz" });
});

router.get("/login", (req, res) => {
  let emailParam = "";
  if (req.query.email) {
    emailParam = req.query.email;
  }
  res.render("login", {
    pageTitle: "Login - UnPlagRiz",
    email: `${emailParam}`,
    authErr: false,
  });
});

router.get("/", (req, res) => {
  res.render("signup", { pageTitle: "SignUp with UnPlagRiz..." });
});

module.exports = router;
