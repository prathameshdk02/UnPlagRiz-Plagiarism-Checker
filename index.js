const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
const copyleaksContro = require('./controllers/copyleaks');

app.use(bodyParser.urlencoded({extended:false}));

app.get('/gettoken',(req,res)=>{
    copyleaksContro.fetchToken().then((token)=>{
        res.send(token);
    });
});

app.get('/scannow',(req,res)=>{
    // Fetch the token.
    var id = Math.random() * (99999 - 10000) + 10000;
    let toCheck = `This is also useful when the base64 encoding is non-standard; in my case the "/" character wasn't used, and the "?" character was used instead, meaning even in Chrome`;
    let encodedString = Buffer.from(toCheck).toString('base64');

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
                res.send("Scan was Created!");
                console.log("Scan created!");
            }else if(rRes.statusCode==400){
                console.log("Bad request!");
            }else{
                console.log("Some Error Occured!");
                res.send(rRes);
            }
        });
    });
});

app.post('/webhook/completed/:id',(req,res)=>{
    console.log(req);
    console.log(res);
    res.send();
});

app.get('/',(req,res,next)=>{
    res.send("Yo Bakri");
});

app.listen(3000);