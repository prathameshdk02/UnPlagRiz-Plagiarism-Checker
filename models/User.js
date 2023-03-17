const {getDb} = require('../util/database');

module.exports = class User {
  constructor(name,pass) {
    this.name = name;
    this.pass = pass;
  }

  signUp(){
    let client = getDb();
    return client.collection("Users").insertOne(this);
  }

  login(){
    let client = getDb();
    return client.collection("Users").find(this).next();
  }

  delete(){

  }

};
