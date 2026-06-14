import { afficherPageConnexion } from './connexion.js';
import {
  trouverUtilisateurParEmail,
  ajouterUtilisateur
} from './db.js';
import {
  estEmailValide,
  estMotDePasseValide,
  afficherErreurChamp,
  afficherAlerte,
  changerTexteErreur,
  animerTremblement,
  toggleChargement
} from './utils.js';

function naviguerVersConnexion() {
  if (window.decoflowRouter && typeof window.decoflowRouter.naviguerVers === 'function') {
    window.decoflowRouter.naviguerVers('connexion');
    return;
  }
  afficherPageConnexion();
}

// ─── Rendu ────────────────────────────────────────────────────────────────────

export function afficherPageInscription() {
  history.pushState({ page: 'inscription' }, '', '#inscription');

  var conteneurApp = document.getElementById('app');

  document.getElementById('corps-application').className =
    'font-body bg-beige min-h-screen flex items-center justify-center p-4 transition-all duration-300';

  conteneurApp.className = 'w-full max-w-4xl';

  conteneurApp.innerHTML = `
    <div id="page-inscription" class="animer-droite w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex min-h-[560px]">

      <div class="hidden md:flex md:w-1/2 flex-col p-10 relative overflow-hidden bg-beige">
        <div class="mb-6">
          <img src="LOGOD.png" alt="DecoFlow" class="h-8" />
        </div>
        <p class="text-terracotta text-xs font-semibold uppercase tracking-widest mb-2">Gestion de bureau premium</p>
        <h1 class="font-display text-4xl font-semibold text-charcoal leading-tight mb-4">DecoFlow</h1>
        <p class="text-muted text-sm leading-relaxed mb-8">
          Transformez vos espaces de travail avec une plateforme conçue pour l'élégance et la performance opérationnelle.
        </p>
        <div class="relative rounded-xl overflow-hidden flex-1 min-h-[200px]">
          <img src="inscim.png" alt="Espace DecoFlow" class="w-full h-full object-cover" />
          <div class="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
            <span class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <i class="fa-solid fa-check text-green-500 text-xs"></i>
            </span>
            <div>
              <p class="text-charcoal text-sm font-semibold">Confiance & Qualité</p>
              <p class="text-muted text-xs">Plus de 500 entreprises nous font confiance.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/2 p-10 flex flex-col justify-center">
        <h2 class="font-display text-3xl font-semibold text-charcoal mb-1">Rejoindre DecoFlow</h2>
        <p class="text-muted text-sm mb-7">Créez votre compte en quelques instants.</p>

        <div id="message-erreur-inscription" class="hidden mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          <span id="texte-erreur-inscription">Une erreur est survenue.</span>
        </div>
        <div id="message-succes-inscription" class="hidden mb-4 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg px-4 py-3">
          Compte créé avec succès ! Redirection en cours…
        </div>

        <form id="formulaire-inscription" novalidate>

          <div class="mb-4">
            <label for="champ-nom" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Nom complet</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none"><i class="fa-regular fa-user text-sm"></i></span>
              <input id="champ-nom" name="nom" type="text" placeholder="Nom Complet" autocomplete="name"
                class="champ w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-charcoal placeholder-gray-400 bg-beige/40 transition" />
            </div>
            <p id="erreur-nom" class="hidden mt-1 text-xs text-red-500">Veuillez entrer votre nom complet.</p>
          </div>

          <div class="mb-4">
            <label for="champ-entreprise" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Entreprise</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none"><i class="fa-regular fa-building text-sm"></i></span>
              <input id="champ-entreprise" name="entreprise" type="text" placeholder="Nom Entreprise" autocomplete="organization"
                class="champ w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-charcoal placeholder-gray-400 bg-beige/40 transition" />
            </div>
            <p id="erreur-entreprise" class="hidden mt-1 text-xs text-red-500">Veuillez entrer le nom de votre entreprise.</p>
          </div>

          <div class="mb-4">
            <label for="champ-email-inscription" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Email</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none"><i class="fa-regular fa-envelope text-sm"></i></span>
              <input id="champ-email-inscription" name="email" type="email" placeholder="exemple@gmail.com" autocomplete="email"
                class="champ w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-charcoal placeholder-gray-400 bg-beige/40 transition" />
            </div>
            <p id="erreur-email-inscription" class="hidden mt-1 text-xs text-red-500">Veuillez entrer un email valide.</p>
          </div>

          <div class="mb-2">
            <label for="champ-motdepasse-inscription" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Mot de passe</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none"><i class="fa-solid fa-lock text-sm"></i></span>
              <input id="champ-motdepasse-inscription" name="password" type="password" placeholder="Mot De Passe" autocomplete="new-password"
                class="champ w-full border border-gray-200 rounded-lg pl-9 pr-10 py-2.5 text-sm text-charcoal placeholder-gray-400 bg-beige/40 transition" />
              <button id="bouton-voir-motdepasse-inscription" type="button"
                class="absolute inset-y-0 right-3 flex items-center text-muted hover:text-terracotta transition">
                <i id="icone-oeil-inscription" class="fa-regular fa-eye text-sm"></i>
              </button>
            </div>
            <p id="indice-motdepasse" class="mt-1 text-xs text-muted">8 caractères minimum, dont un chiffre.</p>
            <p id="erreur-motdepasse-inscription" class="hidden mt-1 text-xs text-red-500">Mot de passe invalide (8 car. min, dont un chiffre).</p>
          </div>

          <div class="flex items-start gap-2 mb-6 mt-4">
            <input id="case-cgu" name="cgu" type="checkbox" class="w-4 h-4 mt-0.5 rounded border-gray-300 accent-terracotta cursor-pointer flex-shrink-0" />
            <label for="case-cgu" class="text-xs text-muted cursor-pointer leading-relaxed">
              J'accepte les <a href="#" class="text-terracotta hover:underline">Conditions Générales</a>
              et la <a href="#" class="text-terracotta hover:underline">Politique de Confidentialité</a>.
            </label>
          </div>
          <p id="erreur-cgu" class="hidden -mt-4 mb-4 text-xs text-red-500">Vous devez accepter les conditions générales.</p>

          <button id="bouton-inscription" type="submit"
            class="w-full bg-terracotta hover:bg-terra-light text-white font-medium text-sm py-3 rounded-xl mb-4 flex items-center justify-center transition">
            <span id="texte-bouton-inscription">Créer mon compte</span>
            <span id="chargement-bouton-inscription" class="chargement hidden"></span>
          </button>

        </form>

        <p class="text-center text-sm text-muted mt-4">
          Déjà un compte ? <a id="lien-vers-connexion" href="#" class="text-terracotta hover:underline font-medium">Se connecter</a>
        </p>
      </div>

    </div>
  `;

  attacherEcouteursInscription();
}

// ─── Écouteurs ────────────────────────────────────────────────────────────────

function attacherEcouteursInscription() {
  var boutonVoir = document.getElementById('bouton-voir-motdepasse-inscription');
  var champMdp   = document.getElementById('champ-motdepasse-inscription');
  var iconeOeil  = document.getElementById('icone-oeil-inscription');

  boutonVoir.addEventListener('click', function() {
    var visible = champMdp.type === 'password';
    champMdp.type = visible ? 'text' : 'password';
    iconeOeil.className = visible ? 'fa-regular fa-eye-slash text-sm' : 'fa-regular fa-eye text-sm';
  });

  document.getElementById('lien-vers-connexion').addEventListener('click', function(e) {
    e.preventDefault();
    naviguerVersConnexion();
  });

  document.getElementById('formulaire-inscription').addEventListener('submit', async function(e) {
    e.preventDefault();

    var nomSaisi        = document.getElementById('champ-nom').value;
    var entrepriseSaisi = document.getElementById('champ-entreprise').value;
    var emailSaisi      = document.getElementById('champ-email-inscription').value;
    var motDePasse      = document.getElementById('champ-motdepasse-inscription').value;
    var cguAcceptees    = document.getElementById('case-cgu').checked;

    // Réinitialisation
    afficherAlerte('message-erreur-inscription', false);
    afficherAlerte('message-succes-inscription', false);
    afficherErreurChamp('erreur-nom', false);
    afficherErreurChamp('erreur-entreprise', false);
    afficherErreurChamp('erreur-email-inscription', false);
    afficherErreurChamp('erreur-motdepasse-inscription', false);
    afficherErreurChamp('erreur-cgu', false);

    var valide = true;

    if (nomSaisi.trim().length < 2) {
      afficherErreurChamp('erreur-nom', true); valide = false;
    }
    if (entrepriseSaisi.trim().length < 2) {
      afficherErreurChamp('erreur-entreprise', true); valide = false;
    }
    if (!estEmailValide(emailSaisi)) {
      afficherErreurChamp('erreur-email-inscription', true); valide = false;
    }
    if (!estMotDePasseValide(motDePasse)) {
      afficherErreurChamp('erreur-motdepasse-inscription', true); valide = false;
    }
    if (!cguAcceptees) {
      afficherErreurChamp('erreur-cgu', true); valide = false;
    }

    if (!valide) {
      animerTremblement(document.getElementById('formulaire-inscription'));
      return;
    }

    var existant = await trouverUtilisateurParEmail(emailSaisi);
    if (existant) {
      changerTexteErreur('texte-erreur-inscription', 'Cet email est déjà utilisé.');
      afficherAlerte('message-erreur-inscription', true);
      animerTremblement(document.getElementById('formulaire-inscription'));
      return;
    }

    toggleChargement('bouton-inscription', 'texte-bouton-inscription', 'chargement-bouton-inscription', true);

    setTimeout(async function() {
      var nouvelUtilisateur = {
        nom:             nomSaisi.trim(),
        entreprise:      entrepriseSaisi.trim(),
        email:           emailSaisi.toLowerCase().trim(),
        motDePasse:      motDePasse,
        role:            'client',   // ← Tout nouvel inscrit est "client" par défaut
        dateInscription: new Date().toISOString()
      };

      try {
        await ajouterUtilisateur(nouvelUtilisateur);
        toggleChargement('bouton-inscription', 'texte-bouton-inscription', 'chargement-bouton-inscription', false);
        document.getElementById('texte-bouton-inscription').textContent = 'Créer mon compte';
        afficherAlerte('message-succes-inscription', true);
        document.getElementById('formulaire-inscription').reset();
        setTimeout(function() { naviguerVersConnexion(); }, 800);
      } catch (err) {
        toggleChargement('bouton-inscription', 'texte-bouton-inscription', 'chargement-bouton-inscription', false);
        changerTexteErreur('texte-erreur-inscription', 'Impossible de créer le compte pour le moment.');
        afficherAlerte('message-erreur-inscription', true);
      }
    }, 600);
  });
}

tailwind.config = {
  theme: {
    extend: {
      colors: {
        beige: '#F5F0EA', terracotta: '#C97B5A',
        'terra-light': '#E8A882', 'terra-pale': '#F2DDD0',
        charcoal: '#2C2A27', muted: '#9B9589',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['Inter', 'sans-serif'],
      },
    }
  }
};
