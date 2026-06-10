// ═══════════════════════════════════════════════
// DECO.JS — Base de données locale + utilitaires partagés
// Chargé en premier, disponible pour tous les modules
// ═══════════════════════════════════════════════

// ═══════════════════════════════════════════════
// 1. GESTION DE LA BASE DE DONNÉES LOCALE
// ═══════════════════════════════════════════════

function lireBaseDeDonnees() {
  var contenuBrut = localStorage.getItem('decoflow_db');
  if (contenuBrut === null) {
    var basevide = { utilisateurs: [] };
    localStorage.setItem('decoflow_db', JSON.stringify(basevide));
    return basevide;
  }
  return JSON.parse(contenuBrut);
}

function sauvegarderBaseDeDonnees(base) {
  localStorage.setItem('decoflow_db', JSON.stringify(base));
}

function trouverUtilisateurParEmail(email) {
  var base = lireBaseDeDonnees();
  return base.utilisateurs.find(function(utilisateur) {
    return utilisateur.email === email.toLowerCase().trim();
  });
}

function ajouterUtilisateur(nouveauUtilisateur) {
  var base = lireBaseDeDonnees();
  base.utilisateurs.push(nouveauUtilisateur);
  sauvegarderBaseDeDonnees(base);
}

// ═══════════════════════════════════════════════
// 2. FONCTIONS DE VALIDATION
// ═══════════════════════════════════════════════

function estEmailValide(email) {
  var formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return formatEmail.test(email.trim());
}

function estMotDePasseValide(motDePasse) {
  var contientChiffre = /\d/.test(motDePasse);
  return motDePasse.length >= 8 && contientChiffre;
}

// ═══════════════════════════════════════════════
// 3. UTILITAIRES VISUELS PARTAGÉS
// ═══════════════════════════════════════════════

function afficherErreurChamp(idErreur, afficher) {
  var elementErreur = document.getElementById(idErreur);
  if (elementErreur) {
    if (afficher) {
      elementErreur.classList.remove('hidden');
    } else {
      elementErreur.classList.add('hidden');
    }
  }
}

function afficherAlerte(idMessage, afficher) {
  var elementMessage = document.getElementById(idMessage);
  if (elementMessage) {
    if (afficher) {
      elementMessage.classList.remove('hidden');
    } else {
      elementMessage.classList.add('hidden');
    }
  }
}

function changerTexteErreur(idTexte, texte) {
  var elementTexte = document.getElementById(idTexte);
  if (elementTexte) elementTexte.textContent = texte;
}

function animerTremblement(formulaire) {
  formulaire.classList.add('tremblement');
  formulaire.addEventListener('animationend', function enleverAnimation() {
    formulaire.classList.remove('tremblement');
    formulaire.removeEventListener('animationend', enleverAnimation);
  });
}

function toggleChargement(idBouton, idTexte, idSpinner, enChargement) {
  var bouton  = document.getElementById(idBouton);
  var texte   = document.getElementById(idTexte);
  var spinner = document.getElementById(idSpinner);

  if (bouton) bouton.disabled = enChargement;
  if (enChargement) {
    if (texte) texte.textContent = 'Chargement…';
    if (spinner) spinner.classList.remove('hidden');
  } else {
    if (spinner) spinner.classList.add('hidden');
  }
}