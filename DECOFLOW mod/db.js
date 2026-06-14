// ─── Configuration ────────────────────────────────────────────────────────────

const API_URL    = 'http://localhost:3000/utilisateurs';
const CLE_SESSION = 'decoflow_session';

// ─── Utilisateurs ─────────────────────────────────────────────────────────────

export async function trouverUtilisateurParEmail(email) {
  try {
    const reponse = await fetch(
      `${API_URL}?email=${encodeURIComponent(email.toLowerCase().trim())}`
    );
    if (!reponse.ok) throw new Error('Erreur lors de la récupération');
    const utilisateurs = await reponse.json();
    return utilisateurs.length > 0 ? utilisateurs[0] : null;
  } catch (erreur) {
    console.error('Erreur db.js (trouverUtilisateur) :', erreur);
    return null;
  }
}

export async function recupererTousLesUtilisateurs() {
  try {
    const reponse = await fetch(API_URL);
    if (!reponse.ok) throw new Error('Erreur lors de la récupération');
    return await reponse.json();
  } catch (erreur) {
    console.error('Erreur db.js (recupererTousLesUtilisateurs) :', erreur);
    return [];
  }
}

export async function ajouterUtilisateur(nouvelUtilisateur) {
  try {
    const reponse = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouvelUtilisateur)
    });
    if (!reponse.ok) throw new Error("Erreur lors de l'enregistrement");
    return await reponse.json();
  } catch (erreur) {
    console.error('Erreur db.js (ajouterUtilisateur) :', erreur);
    throw erreur;
  }
}

export async function modifierRoleUtilisateur(id, nouveauRole) {
  try {
    const reponse = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: nouveauRole })
    });
    if (!reponse.ok) throw new Error('Erreur lors de la modification du rôle');
    return await reponse.json();
  } catch (erreur) {
    console.error('Erreur db.js (modifierRoleUtilisateur) :', erreur);
    throw erreur;
  }
}

export async function supprimerUtilisateur(id) {
  try {
    const reponse = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!reponse.ok) throw new Error('Erreur lors de la suppression');
    return true;
  } catch (erreur) {
    console.error('Erreur db.js (supprimerUtilisateur) :', erreur);
    throw erreur;
  }
}

// ─── Session ──────────────────────────────────────────────────────────────────

export function lireSession() {
  var donnees = localStorage.getItem(CLE_SESSION);
  if (!donnees) return null;
  try { return JSON.parse(donnees); }
  catch (e) { return null; }
}

export function sauvegarderSession(donneesSession) {
  localStorage.setItem(CLE_SESSION, JSON.stringify(donneesSession));
}

export function supprimerSession() {
  localStorage.removeItem(CLE_SESSION);
}

export function lireRoleSession() {
  var session = lireSession();
  return session ? session.role : null;
}