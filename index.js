const express = require("express");
const path = require("path");
const app = express();

const request = require("request");
const bodyParser = require("body-parser");
const hbs = require("hbs");

const copyleaksContro = require("./controllers/copyleaks");

const viewsPath = path.join(__dirname, "views");
const staticPath = path.join(__dirname, "public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("/gettoken", (req, res) => {
  copyleaksContro.fetchToken().then((token) => {
    res.send(token);
});
});

app.post("/webhook/completed/:id", (req, res) => {
    let resJson = req.body;
    console.log('\n');
    console.log(typeof resJson);
    console.log(resJson);
  res.send();
});

app.post("/scannow", (req, res) => {
    var id = Math.random() * (99999 - 10000) + 10000;
    let toCheck = req.body.toCheck;
    let encodedString = Buffer.from(toCheck).toString("base64");
    // Fetch the token.
    console.log("Your String --> ",toCheck);
    copyleaksContro.fetchToken().then((token) => {
        console.log(token);
        const headers = {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        };
        
        var dataString = `{
            "base64": "${encodedString}",
            "filename": "file.txt",
            "properties": {
                "webhooks": {
                    "status": "https://copyleakstest.cyclic.app//webhook/{STATUS}/${id}"
                }
            }
        }`;
        
        var options = {
            url: `https://api.copyleaks.com/v3/scans/submit/file/${id}`,
            method: 'PUT',
            headers: headers,
            body: dataString
        };
        
        request(options,(rErr,rRes,body)=>{
            if(rRes.statusCode==201){
                console.log("Scan created!");
            }else if(rRes.statusCode==400){
                console.log("Bad request!");
            }else{
                console.log("Some Error Occured!");
            }
        });
    });
  res.redirect("/");
});

app.get("/", (req, res, next) => {
  res.render("home", { pageTitle: "UnPlagRiz - Checker" });
});

app.listen(3000);
