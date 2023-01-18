const express = require('express');
const fs = require('fs');
const path = require('path');

const copyleaksContro = require('../controllers/copyleaks');
const util = require('../controllers/utility');

const router = express.Router();


router.get('/results/:id',async (req,res) => {
    let id = req.params.id;
    let timer = 30000;
    console.log("Waiting for JSON response of",id);
    while(1){
        await util.delay(timer);
        console.log("Looking for Reponse...")
        try{
            // let data = fs.readFileSync(path.join(__dirname,'..','data',`${id}.json`),'utf-8');
            let resp = copyleaksContro.responses.find(obj => obj.id === id);
            if(resp != undefined){
                console.log("Response Found! Sending...");
                res.send(resp);
                copyleaksContro.responses.pop();
                break;
            }else{
                throw new Error("Not Found!");
            }
        }catch(err){
            console.log("Response hasn't arrived yet.");   
        }
    }
    
});

module.exports = router;