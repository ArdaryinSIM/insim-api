import axios from "axios";

const INSIM_SMS_URL = "https://www.insim.app/api/v1/sendsms";

/**
 * Envoie un ou plusieurs SMS via InSim API.
 * @param {string} login - Email du compte InSim.
 * @param {string} accessKey - Cl� d'acc�s API.
 * @param {Array<Object>} messages - Liste des messages � envoyer.
 * @returns {Promise<Object>} R�sultat de l'API.
 */
export async function sendSMS(login, accessKey, messages) {
  const payload = { header: { login, accessKey }, messages };

  try {
    const response = await axios.post(INSIM_SMS_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Erreur d'envoi SMS : " +
        (error.response?.data?.message || error.message)
    );
  }
}
