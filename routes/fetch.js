const express = require('express');
const fs = require('fs');
const path = require('path');

const copyleaksContro = require('../controllers/copyleaks');
const util = require('../controllers/utility');

const router = express.Router();

router.get('/results/:id',(req,res) => {
    let id = req.params.id;
    console.log(`Looking for Reponse with id:${id}...`);
    try{
        let resp = copyleaksContro.responses.find(obj => obj.id === id);
        if(resp != undefined){
            console.log("Response Found! Sending...");
            res.send(resp);
            copyleaksContro.responses.pop();
        }else{
            let resObj = {
                message: "Response hasn't arrived"
            }
            res.send(resObj);
            throw new Error();
        }
    }catch(err){
        console.log("Response hasn't arrived yet.");   
    }
});

module.exports = router;
