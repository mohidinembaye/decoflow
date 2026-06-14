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
  var elementErreur = document.getElementById(idErreur);
  if (!elementErreur) return;
  if (afficher) {
    elementErreur.classList.remove('hidden');
  } else {
    elementErreur.classList.add('hidden');
  }
}

export function afficherAlerte(idMessage, afficher) {
  var elementMessage = document.getElementById(idMessage);
  if (!elementMessage) return;
  if (afficher) {
    elementMessage.classList.remove('hidden');
  } else {
    elementMessage.classList.add('hidden');
  }
}

export function changerTexteErreur(idTexte, texte) {
  var elementTexte = document.getElementById(idTexte);
  if (elementTexte) elementTexte.textContent = texte;
}

export function animerTremblement(formulaire) {
  formulaire.classList.add('tremblement');
  formulaire.addEventListener('animationend', function enleverAnimation() {
    formulaire.classList.remove('tremblement');
    formulaire.removeEventListener('animationend', enleverAnimation);
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
 tailwind.config = {
      theme: {
        extend: {
          colors: {
            beige:         '#F5F0EA',
            terracotta:    '#C97B5A',
            'terra-light': '#E8A882',
            'terra-pale':  '#F2DDD0',
            charcoal:      '#2C2A27',
            muted:         '#9B9589',
          },
          fontFamily: {
            display: ['Cormorant Garamond', 'serif'],
            body:    ['Inter', 'sans-serif'],
          },
        }
      }
    }