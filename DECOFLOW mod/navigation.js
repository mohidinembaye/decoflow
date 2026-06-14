import { afficherPageAccueil } from './accueil.js';
import { afficherPageConnexion } from './connexion.js';
import { afficherPageDashboard } from './dashboard.js';
import { afficherPageCategories } from './categories.js';
import { afficherPageProfil } from './profil.js';
import { afficherPageDevis } from './devis.js';
import { afficherPageProduits } from './produits.js';
import { afficherPageCommandes } from './commandes.js';
import { afficherPageClients } from './clients.js';

function safePreventDefault(e) {
  if (!e) return;
  if (typeof e.preventDefault === 'function') e.preventDefault();
}

/**
 * Attache les listeners du navbar principal (sidebar admin) sur chaque page.
 * @param {string} prenomUtilisateur
 */
export function attacherNavigationNavbar(prenomUtilisateur) {
  var prenom = prenomUtilisateur || 'Utilisateur';

  var liens = [
    { id: 'nav-dashboard', action: function () { afficherPageDashboard(prenom); } },
    { id: 'nav-produits', action: function () { afficherPageProduits(prenom); } },
    { id: 'nav-categories', action: function () { afficherPageCategories(prenom); } },
    { id: 'nav-orders', action: function () { afficherPageCommandes(prenom); } },
    { id: 'nav-quotes', action: function () { afficherPageDevis(prenom); } },
    { id: 'nav-customers', action: function () { afficherPageClients(prenom); } },
  ];

  liens.forEach(function (lien) {
    var el = document.getElementById(lien.id);
    if (!el) return;
    el.addEventListener('click', function (e) {
      safePreventDefault(e);
      lien.action();
    });
  });

  // Profil (selon les pages: soit profil-utilisateur, soit bouton-profil-navbar)
  var profil1 = document.getElementById('profil-utilisateur');
  if (profil1) {
    profil1.addEventListener('click', function (e) {
      safePreventDefault(e);
      afficherPageProfil(prenom);
    });
  }

  var profil2 = document.getElementById('bouton-profil-navbar');
  if (profil2) {
    profil2.addEventListener('click', function (e) {
      safePreventDefault(e);
      afficherPageProfil(prenom);
    });
  }

  // (optionnel) si tu as d'autres liens communs, on peut les ajouter ici
}

export function attacherNavigationAccueil() {
  // Placeholder au cas où tu veux unifier aussi la navigation “accueil”
  // Pour l’instant on ne fait rien.
  return;
}

