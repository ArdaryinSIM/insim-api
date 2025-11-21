const https = require("https");
const API_URLS = require("./config"); // import des URLs

function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const options = {
      hostname: "www.insim.app",
      path: url.replace("https://www.insim.app", ""),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, res => {
      let response = "";
      res.on("data", chunk => (response += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(response)); }
        catch { resolve(response); }
      });
    });

    req.on("error", err => reject(err));
    req.write(postData);
    req.end();
  });
}

// Envoi SMS
function sendSMS(config, messages) {
  return postRequest(API_URLS.sendSMS, {
    header: { login: config.login, accessKey: config.accessKey },
    messages
  });
}

// Ajout de contacts
function addContacts(config, contacts) {
  return postRequest(API_URLS.addContacts, {
    header: { login: config.login, accessKey: config.accessKey },
    contacts
  });
}

// Clic to Call
function callNumber(config, phoneNumber) {
  return postRequest(API_URLS.clicToCall, {
    header: { login: config.login, accessKey: config.accessKey, type: "clicToCall", phone_number: phoneNumber }
  });
}

module.exports = { sendSMS, addContacts, callNumber, API_URLS };
