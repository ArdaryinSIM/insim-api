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

## 📚 API

### `sendSMS(config, messages)`

Envoie un ou plusieurs SMS.

**Paramètres:**
- `config` (Object): Configuration avec `login` et `accessKey`
- `messages` (Array): Tableau de messages à envoyer

**Retourne:** Promise avec la réponse de l'API

### `addContacts(config, contacts)`

Ajoute un ou plusieurs contacts.

**Paramètres:**
- `config` (Object): Configuration avec `login` et `accessKey`
- `contacts` (Array): Tableau de contacts à ajouter

**Retourne:** Promise avec la réponse de l'API

### `callNumber(config, phoneNumber)`

Initie un appel via clic-to-call.

**Paramètres:**
- `config` (Object): Configuration avec `login` et `accessKey`
- `phoneNumber` (String): Numéro de téléphone à appeler

**Retourne:** Promise avec la réponse de l'API

## 🔗 Liens

- [GitHub Repository](https://github.com/ArdaryinSIM/insim-node)
- [InSim Website](https://ardary-insim.com/)

## 📄 Licence

MIT

## 👤 Auteur

ArdaryinSIM
