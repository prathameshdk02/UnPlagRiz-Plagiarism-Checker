const express = require('express');
const request = require('request');

const app = express();

app.get('/',(req,res,next)=>{
    res.send("Yo Bakri");
});

app.get('/gettoken',(req,res)=>{
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
            res.send(rRes);
            console.log(token);
        }else{
            res.send(rErr);
            console.log("Some error occurred retrieving the token.");
        }
    });
});

app.listen(3000);