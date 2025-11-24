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

## 🔗 Links

- [GitHub Repository](https://github.com/ArdaryinSIM/insim-api)
- [InSim Website](https://ardary-insim.com/)

## 📄 License

MIT

## 👤 Author

ArdaryinSIM
