const express = require('express');
const request = require('request');

const app = express();
let authToken = "NULL";

app.get('/',(req,res,next)=>{
    res.send("Yo Bakri");
});

const fetchToken = () => new Promise((resolve,reject) => {
    const reqHeader = {
        'Content-Type': 'application/json'
    };
    let reqBody = `{
        "email": "prathameshdk02@gmail.com",
        "key": "9888c037-8fb1-44df-a969-ac4561b2d872"
    }`;

    let options = {
        url:'https://id.copyleaks.com/v3/account/login/api',
        method:'POST',
        headers: reqHeader,
        body: reqBody
    };

    request(options,(rErr,rRes,rBody)=>{
        if(rRes.statusCode == 200){
            let token = rRes.body.slice(rRes.body.indexOf(':')+2,rRes.body.indexOf(',')-1);
            authToken = token;
            console.log(token);
        }else{
            console.log("Some error occurred retrieving the token.");
        }
        resolve();
    });
});

app.get('/gettoken',(req,res)=>{
    fetchToken();
});

function scanReq(){
    let toCheck = `This is also useful when the base64 encoding is non-standard; in my case the "/" character wasn't used, and the "?" character was used instead, meaning even in Chrome`;

    let encodedString = Buffer.from(toCheck).toString('base64');

    const headers = {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${authToken}`
    };

    var dataString = `{
        "base64": "${encodedString}",
        "filename": "file.txt",
        "properties": {
          "webhooks": {
            "status": "https://copyleakstest.cyclic.app//webhook/{STATUS}/my-custom-id"
          }
        }
      }`;

    var options = {
        url: 'https://api.copyleaks.com/v3/scans/submit/file/my-custom-id',
        method: 'PUT',
        headers: headers,
        body: dataString
    };
    
    request(options,(rErr,rRes,body)=>{
        if(rRes.statusCode==201){
            rRes.send(body);
            console.log("Scan created!");
        }else if(rRes.statusCode==400){
            console.log("Bad request!");
        }else{
            console.log("Some Error Occured!");
            console.log(body);
        }
    });
}

app.get('/scannow',(req,res)=>{
    if(authToken=="NULL"){
        fetchToken().then(scanReq);
        return;
    }
    scanReq();
});

app.post('/webhook/completed/my-custom-id',(req,res)=>{
    console.log(req.body);
})

app.listen(3000);