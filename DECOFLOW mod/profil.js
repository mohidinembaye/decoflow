import { afficherPageDashboard } from './dashboard.js';
import { afficherPageCategories } from './categories.js';
import { afficherPageDevis }     from './devis.js';
import { lireSession, sauvegarderSession } from './db.js';
import { afficherErreurChamp, afficherAlerte, animerTremblement } from './utils.js';
import { afficherPageProduits } from './produits.js';
import { afficherPageCommandes }  from './commandes.js';
import { attacherNavigationNavbar } from './navigation.js';






export function afficherPageProfil(prenomUtilisateur) {
  history.pushState({ page: 'profil', nom: prenomUtilisateur }, '', '#profil');

  var conteneurApp = document.getElementById('app');
  var prenom = prenomUtilisateur || 'Utilisateur';
  var session = lireSession() || {};

  conteneurApp.className = 'w-full';

  document.getElementById('corps-application').className =
    'font-body bg-beige min-h-screen block p-0 transition-all duration-300';

  conteneurApp.innerHTML = `
    <div id="page-profil" class="animer-fond w-full min-h-screen bg-beige flex flex-col">

      <header id="navbar" class="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50">

        <div id="navbar-logo" class="flex items-center gap-2 mr-10">
          <img src="LOGOD.png" alt="DecoFlow" class="h-8" />
          <span class="font-display text-2xl font-semibold text-charcoal tracking-wide">DecoFlow</span>
        </div>

        <nav id="navbar-nav" class="hidden md:flex items-center gap-1 flex-1">
          <a id="nav-dashboard"  href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Dashboard</a>
          <a id="nav-produits"   href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Produits</a>
          <a id="nav-categories" href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Catégories</a>
          <a id="nav-orders"     href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Commandes</a>
          <a id="nav-quotes"     href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Devis</a>
          <a id="nav-customers"  href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Clients</a>
        </nav>

        <div id="navbar-droite" class="flex items-center gap-4">
          <button type="button" aria-label="Rechercher" class="text-muted hover:text-charcoal transition">
            <i class="fa-solid fa-magnifying-glass text-sm"></i>
          </button>
          <div id="bouton-profil-navbar" class="flex items-center gap-2 cursor-pointer">
            <span class="text-sm font-medium text-charcoal hidden sm:block">${prenom}</span>
            <div class="w-8 h-8 rounded-full bg-terra-pale flex items-center justify-center overflow-hidden">
              <i class="fa-solid fa-user text-terracotta text-sm"></i>
            </div>
          </div>
        </div>

      </header>

      <main id="contenu-profil" class="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">

        <div class="mb-6 border border-dashed border-gray-200 rounded-xl p-6 bg-white">
          <h1 class="font-display text-4xl font-semibold text-charcoal mb-1">Profil</h1>
          <p class="text-sm text-muted">Gérez les préférences de votre compte DecoFlow et personnalisez votre expérience de gestion d'intérieur.</p>
        </div>

        <!-- Onglets -->
        <div id="onglets-profil" class="flex items-center gap-1 mb-6 border-b border-gray-200">
          <button id="onglet-profil"        type="button" class="btn-onglet px-4 py-2.5 text-sm font-medium text-charcoal border-b-2 border-terracotta -mb-px transition">Profil</button>
          <button id="onglet-affichage"     type="button" class="btn-onglet px-4 py-2.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent -mb-px transition">Affichage</button>
          <button id="onglet-notifications" type="button" class="btn-onglet px-4 py-2.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent -mb-px transition">Notifications</button>
          <button id="onglet-securite"      type="button" class="btn-onglet px-4 py-2.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent -mb-px transition">Sécurité</button>
          <button id="onglet-equipe"        type="button" class="btn-onglet px-4 py-2.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent -mb-px transition">Équipe</button>
        </div>

        <!-- Contenu onglet actif -->
        <div id="zone-onglet"></div>

      </main>

      <footer id="footer" class="bg-white border-t border-gray-100 mt-auto">
        <div class="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="font-display text-lg font-semibold text-charcoal">DecoFlow</span>
            <span class="text-xs text-muted">© 2024 DecoFlow Interior Management. All rights reserved.</span>
          </div>
          <nav class="flex items-center gap-5">
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">Legal Notice</a>
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">Privacy Policy</a>
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">Contact Us</a>
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">Terms of Service</a>
          </nav>
        </div>
      </footer>

    </div>
  `;

  rendreOngletProfil(session);
  attacherEcouteursProfil(prenom, session);
  attacherNavigationNavbar(prenom);
}



// ─── Onglet Profil ────────────────────────────────────────────────────────────

function rendreOngletProfil(session) {
  var zone = document.getElementById('zone-onglet');
  if (!zone) return;

  zone.innerHTML = `
    <div id="contenu-onglet-profil" class="animer-fond grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div class="lg:col-span-2 flex flex-col gap-6">

        <!-- Carte identité -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">

          <div class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div class="w-16 h-16 rounded-full bg-terra-pale flex items-center justify-center overflow-hidden flex-shrink-0">
              <i class="fa-solid fa-user text-terracotta text-2xl"></i>
            </div>
            <div>
              <p class="font-display text-xl font-semibold text-charcoal">${session.nom || 'Utilisateur'}</p>
              <p class="text-sm text-muted">Administrateur Principal</p>
            </div>
          </div>

          <div id="message-succes-profil" class="hidden mb-4 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg px-4 py-3">
            Modifications enregistrées avec succès.
          </div>
          <div id="message-erreur-profil" class="hidden mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
            <span id="texte-erreur-profil">Une erreur est survenue.</span>
          </div>

          <form id="formulaire-profil" novalidate class="flex flex-col gap-4">

            <div>
              <label for="champ-nom-profil" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Nom complet</label>
              <input id="champ-nom-profil" type="text" value="${session.nom || ''}"
                class="champ w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-charcoal bg-beige/40 transition" />
              <p id="erreur-nom-profil" class="hidden mt-1 text-xs text-red-500">Le nom ne peut pas être vide.</p>
            </div>

            <div>
              <label for="champ-email-profil" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Adresse email</label>
              <input id="champ-email-profil" type="email" value="${session.email || ''}"
                class="champ w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-charcoal bg-beige/40 transition" />
              <p id="erreur-email-profil" class="hidden mt-1 text-xs text-red-500">Veuillez entrer un email valide.</p>
            </div>

            <div>
              <label for="champ-entreprise-profil" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Entreprise</label>
              <input id="champ-entreprise-profil" type="text" value="${session.entreprise || ''}"
                class="champ w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-charcoal bg-beige/40 transition" />
            </div>

            <div>
              <label for="champ-biographie-profil" class="block text-xs font-medium text-charcoal mb-1.5 uppercase tracking-wider">Biographie professionnelle</label>
              <textarea id="champ-biographie-profil" rows="3"
                class="champ w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-charcoal bg-beige/40 transition resize-none"
                placeholder="Décrivez votre activité…">${session.biographie || ''}</textarea>
            </div>

            <div class="pt-2">
              <button id="bouton-enregistrer-profil" type="submit"
                class="bg-charcoal text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-terracotta transition-colors duration-200">
                Enregistrer les modifications
              </button>
            </div>

          </form>
        </div>

      </div>

      <!-- Colonne droite -->
      <div class="flex flex-col gap-6">

        <!-- Stockage -->
        <div class="bg-white rounded-xl border border-gray-100 p-5">
          <h3 class="text-xs font-semibold text-charcoal uppercase tracking-wider mb-4">Stockage DecoFlow</h3>
          <div class="flex justify-between text-xs text-muted mb-2">
            <span>12,4 Go utilisés</span>
            <span>20 Go total</span>
          </div>
          <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div class="h-full bg-terracotta rounded-full" style="width: 62%"></div>
          </div>
          <button type="button"
            class="w-full border border-gray-200 text-charcoal text-xs uppercase tracking-widest px-4 py-2.5 hover:bg-beige transition-colors duration-200">
            Libérer de l'espace
          </button>
        </div>

        <!-- Plan premium -->
        <div class="bg-[#F5F0EA] rounded-xl border border-terra-pale p-5">
          <p class="text-terracotta text-xs font-semibold uppercase tracking-widest mb-1">Plan Premium</p>
          <p class="text-sm text-charcoal font-medium mb-1">Débloquez les galeries 4K et les exports illimités.</p>
          <p class="text-xs text-muted mb-4">Accédez à toutes les fonctionnalités avancées de DecoFlow.</p>
          <button type="button"
            class="w-full bg-charcoal text-white text-xs uppercase tracking-widest px-4 py-2.5 hover:bg-terracotta transition-colors duration-200">
            Passer à l'offre Pro
          </button>
        </div>

      </div>

    </div>
  `;

  attacherEcouteursFormulaireProfi(session);
}


// ─── Onglets placeholder ──────────────────────────────────────────────────────

function rendreOngletSimple(titre, description) {
  var zone = document.getElementById('zone-onglet');
  if (!zone) return;
  zone.innerHTML = `
    <div class="animer-fond bg-white rounded-xl border border-gray-100 p-10 text-center">
      <i class="fa-regular fa-clock text-3xl text-muted mb-4"></i>
      <h2 class="font-display text-2xl font-semibold text-charcoal mb-2">${titre}</h2>
      <p class="text-sm text-muted max-w-sm mx-auto">${description}</p>
    </div>
  `;
}


// ─── Écouteurs formulaire profil ──────────────────────────────────────────────

function attacherEcouteursFormulaireProfi(session) {
  var formulaire = document.getElementById('formulaire-profil');
  if (!formulaire) return;

  formulaire.addEventListener('submit', function(evenement) {
    evenement.preventDefault();

    var nomSaisi        = document.getElementById('champ-nom-profil').value;
    var emailSaisi      = document.getElementById('champ-email-profil').value;
    var entrepriseSaisi = document.getElementById('champ-entreprise-profil').value;
    var biographieSaisi = document.getElementById('champ-biographie-profil').value;

    afficherAlerte('message-succes-profil', false);
    afficherAlerte('message-erreur-profil', false);
    afficherErreurChamp('erreur-nom-profil', false);
    afficherErreurChamp('erreur-email-profil', false);

    var formulaireValide = true;

    if (nomSaisi.trim().length < 2) {
      afficherErreurChamp('erreur-nom-profil', true);
      formulaireValide = false;
    }

    var formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatEmail.test(emailSaisi.trim())) {
      afficherErreurChamp('erreur-email-profil', true);
      formulaireValide = false;
    }

    if (!formulaireValide) {
      animerTremblement(formulaire);
      return;
    }

    var sessionMiseAJour = {
      nom:        nomSaisi.trim(),
      email:      emailSaisi.toLowerCase().trim(),
      entreprise: entrepriseSaisi.trim(),
      biographie: biographieSaisi.trim()
    };

    sauvegarderSession(sessionMiseAJour);
    afficherAlerte('message-succes-profil', true);
  });
}


// ─── Écouteurs page ───────────────────────────────────────────────────────────

function attacherEcouteursProfil(prenom, session) {

  // Navigation navbar centralisée (voir navigation.js)


  // ── Onglets ──
  var onglets = [
    { id: 'onglet-profil',        rendu: function() { rendreOngletProfil(session); attacherEcouteursFormulaireProfi(session); } },
    { id: 'onglet-affichage',     rendu: function() { rendreOngletSimple('Affichage', "Personnalisez l'apparence de votre espace DecoFlow."); } },
    { id: 'onglet-notifications', rendu: function() { rendreOngletSimple('Notifications', "Gérez vos alertes et rappels d'activité."); } },
    { id: 'onglet-securite',      rendu: function() { rendreOngletSimple('Sécurité', "Modifiez votre mot de passe et gérez vos sessions actives."); } },
    { id: 'onglet-equipe',        rendu: function() { rendreOngletSimple('Équipe', "Invitez des collaborateurs et gérez les accès."); } },
  ];

  onglets.forEach(function(onglet) {
    var bouton = document.getElementById(onglet.id);
    if (!bouton) return;

    bouton.addEventListener('click', function() {
      onglets.forEach(function(o) {
        var b = document.getElementById(o.id);
        if (!b) return;
        b.className = 'btn-onglet px-4 py-2.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent -mb-px transition';
      });
      bouton.className = 'btn-onglet px-4 py-2.5 text-sm font-medium text-charcoal border-b-2 border-terracotta -mb-px transition';
      onglet.rendu();
    });
  });
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