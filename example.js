const { sendSMS, addContacts, callNumber } = require('./index');

// Configuration de test (remplacez par vos vraies credentials)
const config = {
  login: "hario1@gmail.com",
  accessKey: "xYGt5Dl9wKvz+#RGGU!PjVB+KfiJAYnh%z4&q7oLL3xHRJ1KiN"
};

(async () => {
  try {
    console.log('=== Test d\'envoi de SMS ===');
    const smsResponse = await sendSMS(config, [
      {
        phone_number: "+21629512239",
        message: "Test depuis le module InSim API",
        url: "",
        priorite: 1,
        date_to_send: "2025-10-06 12:00:00"
      }
    ]);
    console.log("Réponse SMS:", JSON.stringify(smsResponse, null, 2));

    console.log('\n=== Test d\'ajout de contact ===');
    const contactResponse = await addContacts(config, [
      {
        firstname: "Jean",
        lastname: "Dupont",
        phone_number: "+21629512239",
        adress: "",
        email: ""
      }
    ]);
    console.log("Réponse contacts:", JSON.stringify(contactResponse, null, 2));

    console.log('\n=== Test de clic-to-call ===');
    const callResponse = await callNumber(config, "+21629512239");
    console.log("Réponse appel:", JSON.stringify(callResponse, null, 2));

  } catch (err) {
    console.error("Erreur:", err.message);
    console.error("Stack:", err.stack);
  }
})();

