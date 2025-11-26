# InSim API (Node.js)

A simple and lightweight module to interact with the **InSim** API:
- 📱 Send SMS
- 👥 Add contacts
- 📞 Click-to-Call

## 📦 Installation

```bash
npm install insim-api
```

## 🚀 Usage

### Send SMS

```javascript
const { sendSMS } = require('insim-api');

const config = {
  login: "your-email@example.com",
  accessKey: "your-access-key"
};

const messages = [
  {
    phone_number: "+33612345678",
    message: "Hello from InSim API",
    url: "",
    priorite: 1,
    date_to_send: "2025-10-06 12:00:00"
  }
];

sendSMS(config, messages)
  .then(response => console.log('SMS sent:', response))
  .catch(error => console.error('Error:', error));
```

**Response:**
```json
[
  {
    "id_sms_api": "FI5O7apqaaqcUmQ",
    "sms_per_message": 1,
    "user": "insim5@ardary.com",
    "sent_time": "2023-12-13T13:41:10.541Z",
    "phone_number": "+33612345678",
    "message": "bonjour%20from%20api%20 https://arsms.co/oloe00en5QPi \n \nSent for free from PC via arsms.co/free",
    "sent": 1
  }
]
```

### Add Contacts

```javascript
const { addContacts } = require('insim-api');

const config = {
  login: "your-email@example.com",
  accessKey: "your-access-key"
};

const contacts = [
  {
    firstname: "John",
    lastname: "Doe",
    phone_number: "+33612345678",
    adress: "",
    email: ""
  }
];

addContacts(config, contacts)
  .then(response => console.log('Contact added:', response))
  .catch(error => console.error('Error:', error));
```

**Response (success):**
```json
{
  "data": {
    "contact": [
      {
        "firstname": "John",
        "lastname": "Doe",
        "phonenumber": "+33612345678",
        "adress": "",
        "email": "",
        "result": "success"
      }
    ]
  }
}
```

**Response (error):**
```json
{
  "data": {
    "contact": [
      {
        "first_name": "XXXXX",
        "last_name": "XXXXXXX",
        "phone_number": "+XXXXXXXXX",
        "adress": "",
        "email": "",
        "result": "failed",
        "errors": [
          "#001",
          "#002"
        ]
      }
    ]
  }
}
```

**Error codes for contacts:**
- `#001`: Invalid phone number
- `#002`: Empty phone number
- `#003`: No phone number variable found
- `#004`: Invalid E-mail (Warning, does not stop creating or updating contact)

### Click-to-Call

```javascript
const { callNumber } = require('insim-api');

const config = {
  login: "your-email@example.com",
  accessKey: "your-access-key"
};

callNumber(config, "+33612345678")
  .then(response => console.log('Call initiated:', response))
  .catch(error => console.error('Error:', error));
```

**Response:**
```json
[
  {
    "info": "please make sure the phone is connected and inSIM is running",
    "result": "success",
    "errors": []
  }
]
```

**Error codes for click-to-call:**
- `#001`: Our servers are down
- `#002`: Phone not connected, inSIM not running on the phone

**Result values:**
- `"success"`: Information successfully arrived to our servers
- `"failed"`: Request failed

## 📚 API

### `sendSMS(config, messages)`

Sends one or more SMS.

**Parameters:**
- `config` (Object): Configuration with `login` and `accessKey`
- `messages` (Array): Array of messages to send
  - `phone_number` (String): Phone number in international format
  - `message` (String): Message content
  - `url` (String): Optional URL to include in the message
  - `priorite` (Number): Message priority
  - `date_to_send` (String): Send date in format "YYYY-MM-DD HH:mm:ss"

**Returns:** Promise with an array containing the information of sent SMS

### `addContacts(config, contacts)`

Adds one or more contacts.

**Parameters:**
- `config` (Object): Configuration with `login` and `accessKey`
- `contacts` (Array): Array of contacts to add
  - `firstname` (String): Contact first name
  - `lastname` (String): Contact last name
  - `phone_number` (String): Phone number in international format
  - `adress` (String): Contact address (optional)
  - `email` (String): Contact email (optional)

**Returns:** Promise with the API response containing the result for each contact

### `callNumber(config, phoneNumber)`

Initiates a call via click-to-call.

**Parameters:**
- `config` (Object): Configuration with `login` and `accessKey`
- `phoneNumber` (String): Phone number to call in international format

**Returns:** Promise with the API response containing the call status

## 📋 Response Structures

### Response Structure - `sendSMS`

The `sendSMS` function returns an array of objects containing the information of each sent SMS:

```json
[
  {
    "id_sms_api": "FI5O7apqaaqcUmQ",
    "sms_per_message": 1,
    "user": "insim5@ardary.com",
    "sent_time": "2023-12-13T13:41:10.541Z",
    "phone_number": "+33612345678",
    "message": "bonjour%20from%20api%20 https://arsms.co/oloe00en5QPi \n \nSent for free from PC via arsms.co/free",
    "sent": 1
  }
]
```

**Response fields:**
- `id_sms_api` (String): Unique SMS identifier
- `sms_per_message` (Number): Number of SMS needed to send the message
- `user` (String): Email of the user who sent the SMS
- `sent_time` (String): Send date and time in ISO 8601 format
- `phone_number` (String): Recipient phone number
- `message` (String): Sent message content (with URL if provided)
- `sent` (Number): Send status (1 = sent, 0 = not sent)

### Response Structure - `addContacts`

#### Success Response

```json
{
  "data": {
    "contact": [
      {
        "firstname": "John",
        "lastname": "Doe",
        "phonenumber": "+33612345678",
        "adress": "",
        "email": "",
        "result": "success"
      }
    ]
  }
}
```

#### Error Response

```json
{
  "data": {
    "contact": [
      {
        "first_name": "XXXXX",
        "last_name": "XXXXXXX",
        "phone_number": "+XXXXXXXXX",
        "adress": "",
        "email": "",
        "result": "failed",
        "errors": [
          "#001",
          "#002"
        ]
      }
    ]
  }
}
```

**Response fields:**
- `data.contact` (Array): Array containing the results for each contact
  - `firstname` / `first_name` (String): Contact first name
  - `lastname` / `last_name` (String): Contact last name
  - `phonenumber` / `phone_number` (String): Phone number
  - `adress` (String): Contact address
  - `email` (String): Contact email
  - `result` (String): Operation result (`"success"` or `"failed"`)
  - `errors` (Array, optional): Array of error codes if `result` is `"failed"`

**Error codes for contacts:**
- `#001`: Invalid phone number
- `#002`: Empty phone number
- `#003`: No phone number variable found
- `#004`: Invalid E-mail (Warning, does not block contact creation or update)

### Response Structure - `callNumber`

```json
[
  {
    "info": "please make sure the phone is connected and inSIM is running",
    "result": "success",
    "errors": []
  }
]
```

**Response fields:**
- `info` (String): Informative message
- `result` (String): Operation result (`"success"` or `"failed"`)
- `errors` (Array): Array of error codes (empty if success)

**Error codes for click-to-call:**
- `#001`: Our servers are down
- `#002`: Phone not connected, inSIM not running on the phone

**Result values:**
- `"success"`: Information successfully arrived at our servers
- `"failed"`: Request failed

## 🔔 Webhooks / Callbacks

InSim API can send webhooks to your callback URLs to notify you about various events in real-time. You don't need to install this module to receive webhooks - you just need to configure your callback URLs in your InSim account settings.

### Overview

- **HTTP Method**: All webhooks are sent using **GET** requests
- **Data Encoding**: All data is encoded using **encodeURIComponent()** before being sent
- **Real-time Notifications**: Receive instant notifications about SMS, calls, link clicks, and more

### Available Webhooks

| Webhook Event | GET Parameter | Description |
|---------------|---------------|-------------|
| Incoming SMS | `message` | Notifications when SMS is received |
| Call Events | `calls` | Notifications about incoming/outgoing/missed calls |
| Link Click Tracking | `clics` | Notifications when tracking links are clicked |
| Call Qualification | `qualification` | Notifications when call qualifications are submitted |
| Delivery Status (DLR) | `status` | SMS delivery status updates (sent/received) |

### Example: Handling Webhooks with Express

```javascript
const express = require('express');
const app = express();

// Handle incoming SMS webhook
app.get('/webhook', (req, res) => {
  if (req.query.message) {
    const message = JSON.parse(decodeURIComponent(req.query.message));
    console.log('Incoming SMS from:', message.from);
    console.log('Message:', message.message);
    // Process the SMS...
    res.status(200).send('OK');
  }
  
  // Handle delivery status webhook
  if (req.query.status) {
    const status = JSON.parse(decodeURIComponent(req.query.status));
    console.log('SMS Status:', status.status);
    console.log('SMS ID:', status.id_sms_api);
    // Update delivery status...
    res.status(200).send('OK');
  }
  
  // Handle call events webhook
  if (req.query.calls) {
    const call = JSON.parse(decodeURIComponent(req.query.calls));
    console.log('Call Type:', call.title);
    console.log('Phone:', call.phone_number);
    // Process call event...
    res.status(200).send('OK');
  }
  
  // Handle link click webhook
  if (req.query.clics) {
    const click = JSON.parse(decodeURIComponent(req.query.clics));
    console.log('Link clicked by:', click.phone_number);
    console.log('Link:', click.link);
    // Track click...
    res.status(200).send('OK');
  }
  
  // Handle call qualification webhook
  if (req.query.qualification) {
    const qualification = JSON.parse(decodeURIComponent(req.query.qualification));
    console.log('Qualification:', qualification.qualification);
    // Process qualification...
    res.status(200).send('OK');
  }
});

app.listen(3000, () => {
  console.log('Webhook server listening on port 3000');
});
```

### Example: Handling Webhooks with PHP

```php
<?php
// Handle incoming SMS webhook
if (isset($_GET["message"])) {
    $message = json_decode($_GET["message"], true);
    
    echo "Incoming SMS from: " . $message["from"] . "\n";
    echo "Message: " . $message["message"] . "\n";
    echo "Date: " . $message["date"] . "\n";
    
    // Process the SMS (save to database, trigger actions, etc.)
    // ...
    
    http_response_code(200);
    echo "OK";
    exit;
}

// Handle delivery status webhook
if (isset($_GET["status"])) {
    $status = json_decode($_GET["status"], true);
    
    echo "SMS Status: " . $status["status"] . "\n";
    echo "SMS ID: " . $status["id_sms_api"] . "\n";
    echo "Phone: " . $status["phone_number"] . "\n";
    
    // Update delivery status in database
    // ...
    
    http_response_code(200);
    echo "OK";
    exit;
}

// Handle call events webhook
if (isset($_GET["calls"])) {
    $call = json_decode($_GET["calls"], true);
    
    echo "Call Type: " . $call["title"] . "\n";
    echo "Phone: " . $call["phone_number"] . "\n";
    echo "Duration: " . $call["duration"] . "\n";
    
    // Process call event (update CRM, log call, etc.)
    // ...
    
    http_response_code(200);
    echo "OK";
    exit;
}

// Handle link click webhook
if (isset($_GET["clics"])) {
    $click = json_decode($_GET["clics"], true);
    
    echo "Link clicked by: " . $click["phone_number"] . "\n";
    echo "Link: " . $click["link"] . "\n";
    echo "SMS ID: " . $click["id_sms_api"] . "\n";
    
    // Track click (update analytics, trigger conversions, etc.)
    // ...
    
    http_response_code(200);
    echo "OK";
    exit;
}

// Handle call qualification webhook
if (isset($_GET["qualification"])) {
    $qualification = json_decode($_GET["qualification"], true);
    
    echo "Qualification: " . $qualification["qualification"] . "\n";
    echo "Source: " . $qualification["title"] . "\n";
    echo "Phone: " . $qualification["from"] . "\n";
    
    // Process qualification (update CRM, trigger workflows, etc.)
    // ...
    
    http_response_code(200);
    echo "OK";
    exit;
}

// If no webhook parameter is found
http_response_code(400);
echo "No webhook data";
?>
```

### Webhook Payload Examples

#### Incoming SMS
```json
{
  "device_identification": "user@email.com",
  "title": "incoming_sms",
  "from": "+33612345678",
  "message": "Hello, this is a test message",
  "date": "2023-12-17T20:15:30.565Z"
}
```

#### Delivery Status (DLR)
```json
{
  "user": "SENDER_LOGIN",
  "phone_number": "+33612345678",
  "status": "received",
  "date_status": "2019-08-09T12:50:54.211Z",
  "id_sms_api": "YOUR_ID_SMS"
}
```

#### Call Event
```json
{
  "device_identification": "user@email.com",
  "title": "outgoing_call",
  "phone_number": "+33612345678",
  "call_time": "2023-12-17 20:32:51",
  "duration": "15:11:04"
}
```

**Status values for calls:**
- `"incoming_call"`: Incoming call received
- `"outgoing_call"`: Outgoing call made
- `"missed_call"`: Call was missed

**Status values for DLR:**
- `"sent"`: SMS has been sent from the system
- `"received"`: SMS has been received by the recipient's device

### Important Notes

- All webhooks use **GET** requests
- All JSON payloads are encoded with **encodeURIComponent()**
- Your server must decode using `decodeURIComponent()` or equivalent
- Always return `200 OK` to acknowledge receipt
- Use **HTTPS** for your callback URLs

### Complete Documentation

For complete webhook documentation including all payload structures, field descriptions, and implementation examples in PHP, Node.js, and Python, see:

**[📖 Complete Webhooks Documentation](https://github.com/ArdaryinSIM/insim-http-api#-webhooks--callbacks)**

## 🔗 Links

- [GitHub Repository](https://github.com/ArdaryinSIM/insim-api)
- [InSim Website](https://ardary-insim.com/)

## 📄 License

MIT

## 👤 Author

ArdaryinSIM
