# InSim API (Node.js)

Un module simple et léger pour interagir avec l'API **InSim** :
- 📱 Envoi de SMS
- 👥 Ajout de contacts
- 📞 Clic-to-Call

## 📦 Installation

```bash
npm install insim-api
```

## 🚀 Utilisation

### Envoi de SMS

```javascript
const { sendSMS } = require('insim-api');

const config = {
  login: "votre-email@example.com",
  accessKey: "votre-clé-d'accès"
};

const messages = [
  {
    phone_number: "+33612345678",
    message: "Bonjour depuis InSim API",
    url: "",
    priorite: 1,
    date_to_send: "2025-10-06 12:00:00"
  }
];

sendSMS(config, messages)
  .then(response => console.log('SMS envoyé:', response))
  .catch(error => console.error('Erreur:', error));
```

**Réponse :**
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

### Ajout de contacts

```javascript
const { addContacts } = require('insim-api');

const config = {
  login: "votre-email@example.com",
  accessKey: "votre-clé-d'accès"
};

const contacts = [
  {
    firstname: "Jean",
    lastname: "Dupont",
    phone_number: "+33612345678",
    adress: "",
    email: ""
  }
];

addContacts(config, contacts)
  .then(response => console.log('Contact ajouté:', response))
  .catch(error => console.error('Erreur:', error));
```

**Réponse (succès) :**
```json
{
  "data": {
    "contact": [
      {
        "firstname": "Jean",
        "lastname": "Dupont",
        "phonenumber": "+33612345678",
        "adress": "",
        "email": "",
        "result": "success"
      }
    ]
  }
}
```

**Réponse (erreur) :**
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

**Codes d'erreur pour les contacts :**
- `#001` : Invalid phone number
- `#002` : Empty phone number
- `#003` : No phone number variable found
- `#004` : Invalid E-mail (Warning, do not stop creating or updating contact)

### Clic-to-Call

```javascript
const { callNumber } = require('insim-api');

const config = {
  login: "votre-email@example.com",
  accessKey: "votre-clé-d'accès"
};

callNumber(config, "+33612345678")
  .then(response => console.log('Appel initié:', response))
  .catch(error => console.error('Erreur:', error));
```

**Réponse :**
```json
[
  {
    "info": "please make sure the phone is connected and inSIM is running",
    "result": "success",
    "errors": []
  }
]
```

**Codes d'erreur pour clic-to-call :**
- `#001` : Our servers are down
- `#002` : Phone not connected, inSIM not running on the phone

**Valeurs de résultat :**
- `"success"` : Information successfully arrived to our servers
- `"failed"` : Request failed

## 📚 API

### `sendSMS(config, messages)`

Envoie un ou plusieurs SMS.

**Paramètres:**
- `config` (Object): Configuration avec `login` et `accessKey`
- `messages` (Array): Tableau de messages à envoyer
  - `phone_number` (String): Numéro de téléphone au format international
  - `message` (String): Contenu du message
  - `url` (String): URL optionnelle à inclure dans le message
  - `priorite` (Number): Priorité du message
  - `date_to_send` (String): Date d'envoi au format "YYYY-MM-DD HH:mm:ss"

**Retourne:** Promise avec un tableau contenant les informations des SMS envoyés

### `addContacts(config, contacts)`

Ajoute un ou plusieurs contacts.

**Paramètres:**
- `config` (Object): Configuration avec `login` et `accessKey`
- `contacts` (Array): Tableau de contacts à ajouter
  - `firstname` (String): Prénom du contact
  - `lastname` (String): Nom du contact
  - `phone_number` (String): Numéro de téléphone au format international
  - `adress` (String): Adresse du contact (optionnel)
  - `email` (String): Email du contact (optionnel)

**Retourne:** Promise avec la réponse de l'API contenant le résultat pour chaque contact

### `callNumber(config, phoneNumber)`

Initie un appel via clic-to-call.

**Paramètres:**
- `config` (Object): Configuration avec `login` et `accessKey`
- `phoneNumber` (String): Numéro de téléphone à appeler au format international

**Retourne:** Promise avec la réponse de l'API contenant le statut de l'appel

## 📋 Structures de réponse

### Structure de réponse - `sendSMS`

La fonction `sendSMS` retourne un tableau d'objets contenant les informations de chaque SMS envoyé :

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

**Champs de la réponse :**
- `id_sms_api` (String) : Identifiant unique du SMS
- `sms_per_message` (Number) : Nombre de SMS nécessaires pour envoyer le message
- `user` (String) : Email de l'utilisateur qui a envoyé le SMS
- `sent_time` (String) : Date et heure d'envoi au format ISO 8601
- `phone_number` (String) : Numéro de téléphone du destinataire
- `message` (String) : Contenu du message envoyé (avec URL si fournie)
- `sent` (Number) : Statut d'envoi (1 = envoyé, 0 = non envoyé)

### Structure de réponse - `addContacts`

#### Réponse de succès

```json
{
  "data": {
    "contact": [
      {
        "firstname": "Jean",
        "lastname": "Dupont",
        "phonenumber": "+33612345678",
        "adress": "",
        "email": "",
        "result": "success"
      }
    ]
  }
}
```

#### Réponse d'erreur

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

**Champs de la réponse :**
- `data.contact` (Array) : Tableau contenant les résultats pour chaque contact
  - `firstname` / `first_name` (String) : Prénom du contact
  - `lastname` / `last_name` (String) : Nom du contact
  - `phonenumber` / `phone_number` (String) : Numéro de téléphone
  - `adress` (String) : Adresse du contact
  - `email` (String) : Email du contact
  - `result` (String) : Résultat de l'opération (`"success"` ou `"failed"`)
  - `errors` (Array, optionnel) : Tableau des codes d'erreur si `result` est `"failed"`

**Codes d'erreur pour les contacts :**
- `#001` : Invalid phone number
- `#002` : Empty phone number
- `#003` : No phone number variable found
- `#004` : Invalid E-mail (Warning, ne bloque pas la création ou mise à jour du contact)

### Structure de réponse - `callNumber`

```json
[
  {
    "info": "please make sure the phone is connected and inSIM is running",
    "result": "success",
    "errors": []
  }
]
```

**Champs de la réponse :**
- `info` (String) : Message informatif
- `result` (String) : Résultat de l'opération (`"success"` ou `"failed"`)
- `errors` (Array) : Tableau des codes d'erreur (vide si succès)

**Codes d'erreur pour clic-to-call :**
- `#001` : Our servers are down
- `#002` : Phone not connected, inSIM not running on the phone

**Valeurs de résultat :**
- `"success"` : L'information est arrivée avec succès sur nos serveurs
- `"failed"` : La requête a échoué

## 🔗 Liens

- [GitHub Repository](https://github.com/ArdaryinSIM/insim-api)
- [InSim Website](https://ardary-insim.com/)

## 📄 Licence

MIT

## 👤 Auteur

ArdaryinSIM
