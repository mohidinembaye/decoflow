// ─── Validation ───────────────────────────────────────────────────────────────

export function estEmailValide(email) {
  var formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return formatEmail.test(email.trim());
}

export function estMotDePasseValide(motDePasse) {
  var contientChiffre = /\d/.test(motDePasse);
  return motDePasse.length >= 8 && contientChiffre;
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

export function afficherErreurChamp(idErreur, afficher) {
  var el = document.getElementById(idErreur);
  if (!el) return;
  el.classList.toggle('hidden', !afficher);
}

export function afficherAlerte(idMessage, afficher) {
  var el = document.getElementById(idMessage);
  if (!el) return;
  el.classList.toggle('hidden', !afficher);
}

export function changerTexteErreur(idTexte, texte) {
  var el = document.getElementById(idTexte);
  if (el) el.textContent = texte;
}

export function animerTremblement(element) {
  element.classList.add('tremblement');
  element.addEventListener('animationend', function enlever() {
    element.classList.remove('tremblement');
    element.removeEventListener('animationend', enlever);
  });
}

export function toggleChargement(idBouton, idTexte, idSpinner, enChargement) {
  var bouton  = document.getElementById(idBouton);
  var texte   = document.getElementById(idTexte);
  var spinner = document.getElementById(idSpinner);
  if (bouton)  bouton.disabled = enChargement;
  if (enChargement) {
    if (texte)   texte.textContent = 'Chargement…';
    if (spinner) spinner.classList.remove('hidden');
  } else {
    if (spinner) spinner.classList.add('hidden');
  }
}

export function creerBadgeRole(role) {
  var configs = {
    superadmin: { texte: 'Superadmin', classe: 'bg-charcoal text-white' },
    admin:      { texte: 'Admin',      classe: 'bg-terracotta text-white' },
    client:     { texte: 'Client',     classe: 'bg-terra-pale text-terracotta' }
  };
  var config = configs[role] || configs.client;
  var badge = document.createElement('span');
  badge.className = 'inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ' + config.classe;
  badge.textContent = config.texte;
  return badge;
}