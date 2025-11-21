import axios from "axios";

const INSIM_CONTACT_URL = "https://www.insim.app/api/v1/contact.php";

/**
 * Ajoute un ou plusieurs contacts via InSim API.
 * @param {string} login - Email du compte InSim.
 * @param {string} accessKey - Clé d'accès API.
 * @param {Array<Object>} contacts - Liste des contacts à ajouter.
 * @returns {Promise<Object>} Résultat de l'API.
 */
export async function addContacts(login, accessKey, contacts) {
  const payload = { header: { login, accessKey }, contacts };

  try {
    const response = await axios.post(INSIM_CONTACT_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Erreur d'ajout de contact : " +
        (error.response?.data?.message || error.message)
    );
  }
}
