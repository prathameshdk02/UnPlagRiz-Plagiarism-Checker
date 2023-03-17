const fs = require("fs");
const request = require("request");
const path = require("path");

// Auth Configurations
const webDomain = "https://copyleakstest.cyclic.app";
// const webDomain = "https://854a-114-79-188-176.in.ngrok.io";
const adminEmail = process.env.COPYLEAKS_USER_EMAIL;
const adminApiKey = process.env.COPYLEAKS_USER_API_KEY;

const responses = [];

// To be executed to fetch API token.
const fetchToken = () =>
  new Promise((resolve) => {
    // Requesting CopyLeaks API for obtaining token!
    const reqHeader = {
      "Content-Type": "application/json",
    };

    let reqBody = `{
        "email": "${adminEmail}",
        "key": "${adminApiKey}"
    }`;

    let options = {
      url: "https://id.copyleaks.com/v3/account/login/api",
      method: "POST",
      headers: reqHeader,
      body: reqBody,
    };

    request(options, (rErr, rRes, rBody) => {
      let token;
      if (rRes.statusCode == 200) {
        token = rRes.body.slice(
          rRes.body.indexOf(":") + 2,
          rRes.body.indexOf(",") - 1
        );
      } else {
        token = "NULL";
        console.log("Some error occurred retrieving the token.");
      }
      resolve(token);
    });
  });

// To be executed when data to be checked is submitted.
const scanNowHandler = (req, res) => {
  // Storing data from the POST request from check.js file.
  let id = req.body.reqId;
  let toCheck = req.body.toCheck;

  if (toCheck == "") {
    res.redirect("/check");
    return;
  }

  // Converting Input data to base64
  let encodedString = Buffer.from(toCheck).toString("base64");

  // Fetch the token.
  fetchToken().then((token) => {
    // Requesting Copyleaks API for creating a scan!
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
      method: "PUT",
      headers: headers,
      body: dataString,
    };

    request(options, (rErr, rRes, body) => {
      if (rRes.statusCode == 201) {
        console.log("Scan was successfully created!");
      } else if (rRes.statusCode == 400) {
        console.log("Bad request was made!");
      } else {
        console.log("Some error occurred during Scan creation!");
      }
      res.redirect("/");
    });
  });
};

// To be executed on Completion Webhook...
const webhookCompleteHandler = (req, res) => {
  res.send();
  console.log("Webhook was successfully completed!");
  // let resString = JSON.stringify(req.body);
  console.log();

  responses.push({
    id: req.params.id,
    ...req.body,
  });
};

exports.fetchToken = fetchToken;
exports.scanNowHandler = scanNowHandler;
exports.webhookCompleteHandler = webhookCompleteHandler;
exports.responses = responses;
