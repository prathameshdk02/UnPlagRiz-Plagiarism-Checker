const fs = require('fs');
const request = require('request');

// Auth Configurations
const webDomain = "https://copyleakstest.cyclic.app";
const adminEmail = "prathameshdk20comp@student.mes.ac.in";
const adminApiKey = "5172eb96-4042-47a4-a2e6-561af5276848";

// To be executed to fetch API token.
const fetchToken = () => new Promise((resolve) => {

    // Requesting CopyLeaks API for obtaining token!
    const reqHeader = {
        'Content-Type': 'application/json'
    };

    let reqBody = `{
        "email": "${adminEmail}",
        "key": "${adminApiKey}"
    }`;

    let options = {
        url:'https://id.copyleaks.com/v3/account/login/api',
        method:'POST',
        headers: reqHeader,
        body: reqBody
    };

    request(options,(rErr,rRes,rBody)=>{
        let token;
        if(rRes.statusCode == 200){
            token = rRes.body.slice(rRes.body.indexOf(':')+2,rRes.body.indexOf(',')-1);
        }else{
            token = 'NULL';
            console.log("Some error occurred retrieving the token.");
        }
        resolve(token);
    });
});

// To be executed when data to be checked is submitted.
const scanNowHandler = (req,res) => {
    // Storing data from the POST request from check.js file.
    let id = req.body.reqId;
    let toCheck = req.body.toCheck;

    if(toCheck == ''){
        res.redirect('/check');
        return;
    }
    
    // Converting Input data to base64
    let encodedString = Buffer.from(toCheck).toString("base64");
    
    // Fetch the token.
    fetchToken().then((token) => {

        // Requesting Copyleaks API for creating a scan!
        const headers = {
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        };
        
        var dataString = `{
            "base64": "${encodedString}",
            "filename": "file.txt",
            "properties": {
                "webhooks": {
                    "status": "${webDomain}/webhook/{STATUS}/${id}"
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
                console.log("Scan was successfully created!");
            }else if(rRes.statusCode==400){
                console.log("Bad request was made!");
            }else{
                console.log("Some error occurred during Scan creation!");
            }
            res.redirect("/");
        });
    });
}

// To be executed on Completion Webhook...
const webhookCompleteHandler = (req,res) => {
    console.log("Webhook was successfully completed!");
    const id = req.params.id;
    let resString = JSON.stringify(req.body);
    fs.writeFile(`data/${id}.json`,resString,(err)=>{
        if(err){
            console.log("Couldn't Write the Response File.");
        }
    });
    res.send();
}

exports.fetchToken = fetchToken;
exports.scanNowHandler = scanNowHandler;
exports.webhookCompleteHandler = webhookCompleteHandler;
