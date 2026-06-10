// ═══════════════════════════════════════════════════════════════
// INSCRIPTION.JS — Page d'inscription
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════
// 1. INJECTION HTML
// ═══════════════════════════════════════════════

function afficherPageInscription() {
  var conteneurApp = document.getElementById('app');

  document.getElementById('corps-application').className =
    'font-body bg-beige min-h-screen flex items-center justify-center p-4 transition-all duration-300';

  conteneurApp.innerHTML = `
    <div id="page-inscription" class="animer-droite w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex min-h-[560px]">

      <div id="panneau-visuel-inscription" class="hidden md:flex md:w-1/2 flex-col p-10 relative overflow-hidden bg-beige">

        <div id="logo-inscription" class="mb-6">
          <img id="image-logo-inscription" src="LOGOD.png" alt="DecoFlow" class="h-8" />
        </div>

        <p id="accroche" class="text-terracotta text-xs font-semibold uppercase tracking-widest mb-2">Gestion de bureau premium</p>
        <h1 id="titre-visuel-inscription" class="font-display text-4xl font-semibold text-charcoal leading-tight mb-4">DecoFlow</h1>
        <p id="description-visuel-inscription" class="text-muted text-sm leading-relaxed mb-8">
          Transformez vos espaces de travail avec une plateforme conçue pour l'élégance et la performance opérationnelle.
        </p>

        <div id="conteneur-image-inscription" class="relative rounded-xl overflow-hidden flex-1 min-h-[200px]">
          <img id="image-ambiance-inscription" src="inscim.png" alt="Espace DecoFlow" class="w-full h-full object-cover" />
          <div id="badge-confiance" class="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
            <span class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <i class="fa-solid fa-check text-green-500 text-xs"></i>
            </span>
            <div>
              <p id="titre-badge" class="text-charcoal text-sm font-semibold">Confiance &amp; Qualité</p>
              <p id="description-badge" class="text-muted text-xs">Plus de 500 entreprises nous font confiance.</p>
            </div>
          </div>
        </div>

      </div>

      <div id="panneau-formulaire-inscription" class="w-full md:w-1/2 p-10 flex flex-col justify-center">

        <h2 id="titre-formulaire-inscription" class="font-display text-3xl font-semibold text-charcoal mb-1">Rejoindre DecoFlow</h2>
        <p id="sous-titre-formulaire-inscription" class="text-muted text-sm mb-7">
          Créez votre compte en quelques instants pour commencer à gérer vos espaces.
        </p>

        <div id="message-erreur-inscription" class="hidden mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3" role="alert">
          <span id="texte-erreur-inscription">Une erreur est survenue. Veuillez réessayer.</span>
        </div>
        <div id="message-succes-inscription" class="hidden mb-4 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg px-4 py-3" role="alert">
          Compte créé avec succès ! Redirection en cours…
        </div>

        <form id="formulaire-inscription" novalidate>

          <div class="mb-4">
            <label for="champ-nom" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Nom complet</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
                <i class="fa-regular fa-user text-sm"></i>
              </span>
              <input id="champ-nom" name="nom" type="text" placeholder="Nom Complet" autocomplete="name"
                class="champ w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-charcoal placeholder-gray-400 bg-beige/40 transition" />
            </div>
            <p id="erreur-nom" class="hidden mt-1 text-xs text-red-500">Veuillez entrer votre nom complet.</p>
          </div>

          <div class="mb-4">
            <label for="champ-entreprise" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Nom de l'entreprise</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
                <i class="fa-regular fa-building text-sm"></i>
              </span>
              <input id="champ-entreprise" name="entreprise" type="text" placeholder="Nom Entreprise" autocomplete="organization"
                class="champ w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-charcoal placeholder-gray-400 bg-beige/40 transition" />
            </div>
            <p id="erreur-entreprise" class="hidden mt-1 text-xs text-red-500">Veuillez entrer le nom de votre entreprise.</p>
          </div>

          <div class="mb-4">
            <label for="champ-email-inscription" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Adresse e-mail professionnelle</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
                <i class="fa-regular fa-envelope text-sm"></i>
              </span>
              <input id="champ-email-inscription" name="email" type="email" placeholder="exemple@gmail.com" autocomplete="email"
                class="champ w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-charcoal placeholder-gray-400 bg-beige/40 transition" />
            </div>
            <p id="erreur-email-inscription" class="hidden mt-1 text-xs text-red-500">Veuillez entrer un email valide.</p>
          </div>

          <div class="mb-2">
            <label for="champ-motdepasse-inscription" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Mot de passe</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
                <i class="fa-solid fa-lock text-sm"></i>
              </span>
              <input id="champ-motdepasse-inscription" name="password" type="password" placeholder="Mot De Passe" autocomplete="new-password"
                class="champ w-full border border-gray-200 rounded-lg pl-9 pr-10 py-2.5 text-sm text-charcoal placeholder-gray-400 bg-beige/40 transition" />
              <button id="bouton-voir-motdepasse-inscription" type="button" aria-label="Afficher le mot de passe"
                class="absolute inset-y-0 right-3 flex items-center text-muted hover:text-terracotta transition">
                <i id="icone-oeil-inscription" class="fa-regular fa-eye text-sm"></i>
              </button>
            </div>
            <p id="indice-motdepasse" class="mt-1 text-xs text-muted">8 caractères minimum, dont un chiffre.</p>
            <p id="erreur-motdepasse-inscription" class="hidden mt-1 text-xs text-red-500">Mot de passe invalide (8 caractères min, dont un chiffre).</p>
          </div>

          <div class="flex items-start gap-2 mb-6 mt-4">
            <input id="case-cgu" name="cgu" type="checkbox" class="w-4 h-4 mt-0.5 rounded border-gray-300 accent-terracotta cursor-pointer flex-shrink-0" />
            <label for="case-cgu" class="text-xs text-muted cursor-pointer leading-relaxed">
              J'accepte les <a id="lien-cgu" href="#" class="text-terracotta hover:underline">Conditions Générales</a>
              et la <a id="lien-politique" href="#" class="text-terracotta hover:underline">Politique de Confidentialité</a>.
            </label>
          </div>
          <p id="erreur-cgu" class="hidden -mt-4 mb-4 text-xs text-red-500">Vous devez accepter les conditions générales.</p>

          <button id="bouton-inscription" type="submit"
            class="w-full bg-terracotta hover:bg-terra-light text-white font-medium text-sm py-3 rounded-xl mb-4 flex items-center justify-center transition">
            <span id="texte-bouton-inscription">Créer mon compte</span>
            <span id="chargement-bouton-inscription" class="chargement hidden"></span>
          </button>

        </form>

        <div class="flex items-center gap-3 mb-4">
          <div class="flex-1 h-px bg-gray-200"></div>
          <span class="text-xs text-muted uppercase tracking-wider">ou</span>
          <div class="flex-1 h-px bg-gray-200"></div>
        </div>

        <button id="bouton-google-inscription" type="button"
          class="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-2.5 text-sm text-charcoal hover:bg-beige transition">
          <i class="fa-brands fa-google text-base"></i> S'inscrire avec Google
        </button>

        <p id="invite-connexion" class="text-center text-sm text-muted mt-6">
          Déjà un compte ? <a id="lien-vers-connexion" href="#" class="text-terracotta hover:underline font-medium">Se connecter</a>
        </p>

      </div>

    </div>
  `;

  attacherEcouteursInscription();
}

// ═══════════════════════════════════════════════
// 2. LOGIQUE FORMULAIRE INSCRIPTION
// ═══════════════════════════════════════════════

function attacherEcouteursInscription() {

  var boutonVoir = document.getElementById('bouton-voir-motdepasse-inscription');
  var champMdp   = document.getElementById('champ-motdepasse-inscription');
  var iconeOeil  = document.getElementById('icone-oeil-inscription');

  boutonVoir.addEventListener('click', function() {
    var visible = champMdp.type === 'password';
    champMdp.type = visible ? 'text' : 'password';
    iconeOeil.className = visible ? 'fa-regular fa-eye-slash text-sm' : 'fa-regular fa-eye text-sm';
  });

  var lienConnexion = document.getElementById('lien-vers-connexion');
  lienConnexion.addEventListener('click', function(evenement) {
    evenement.preventDefault();
    afficherPageConnexion();
  });

  var formulaire = document.getElementById('formulaire-inscription');
  formulaire.addEventListener('submit', function(evenement) {
    evenement.preventDefault();

    var nomSaisi        = document.getElementById('champ-nom').value;
    var entrepriseSaisi = document.getElementById('champ-entreprise').value;
    var emailSaisi      = document.getElementById('champ-email-inscription').value;
    var motDePasse      = document.getElementById('champ-motdepasse-inscription').value;
    var cguAcceptees    = document.getElementById('case-cgu').checked;

    afficherAlerte('message-erreur-inscription', false);
    afficherAlerte('message-succes-inscription', false);
    afficherErreurChamp('erreur-nom', false);
    afficherErreurChamp('erreur-entreprise', false);
    afficherErreurChamp('erreur-email-inscription', false);
    afficherErreurChamp('erreur-motdepasse-inscription', false);
    afficherErreurChamp('erreur-cgu', false);

    var formulaireValide = true;

    if (nomSaisi.trim().length < 2) {
      afficherErreurChamp('erreur-nom', true);
      formulaireValide = false;
    }

    if (entrepriseSaisi.trim().length < 2) {
      afficherErreurChamp('erreur-entreprise', true);
      formulaireValide = false;
    }

    if (!estEmailValide(emailSaisi)) {
      afficherErreurChamp('erreur-email-inscription', true);
      formulaireValide = false;
    }

    if (!estMotDePasseValide(motDePasse)) {
      afficherErreurChamp('erreur-motdepasse-inscription', true);
      formulaireValide = false;
    }

    if (!cguAcceptees) {
      afficherErreurChamp('erreur-cgu', true);
      formulaireValide = false;
    }

    if (!formulaireValide) {
      animerTremblement(formulaire);
      return;
    }

    var utilisateurExistant = trouverUtilisateurParEmail(emailSaisi);
    if (utilisateurExistant) {
      changerTexteErreur('texte-erreur-inscription', 'Cet email est déjà utilisé. Essayez de vous connecter.');
      afficherAlerte('message-erreur-inscription', true);
      animerTremblement(formulaire);
      return;
    }

    toggleChargement('bouton-inscription', 'texte-bouton-inscription', 'chargement-bouton-inscription', true);

    setTimeout(function() {
      var nouvelUtilisateur = {
        id:              Date.now(),
        nom:             nomSaisi.trim(),
        entreprise:      entrepriseSaisi.trim(),
        email:           emailSaisi.toLowerCase().trim(),
        motDePasse:      motDePasse,
        dateInscription: new Date().toISOString()
      };

      ajouterUtilisateur(nouvelUtilisateur);

      toggleChargement('bouton-inscription', 'texte-bouton-inscription', 'chargement-bouton-inscription', false);
      document.getElementById('texte-bouton-inscription').textContent = 'Créer mon compte';

      afficherAlerte('message-succes-inscription', true);
      formulaire.reset();

      setTimeout(function() {
        afficherPageConnexion();
      }, 800);

    }, 600);
  });
}