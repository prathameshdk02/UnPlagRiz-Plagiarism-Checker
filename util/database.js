require('dotenv').config();
// Connecting to MongoDB...
const MongoClient = require('mongodb').MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        process.env.DATABASE_MONGO_URI
    ).then(client => {
        console.log("Connected to MongoDB.");
        _db = client.db('UnPlagRizDB');
        callback();
    })
    .catch(err=>{
        console.log("Error while Connecting...",err);
    });
}

const getDb = () =>{
    if(_db){
        return _db; 
    }
    throw "No DB Found!";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;



