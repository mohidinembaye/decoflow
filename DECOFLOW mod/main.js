import { afficherPageAccueil }    from './accueil.js';
import { afficherPageConnexion }  from './connexion.js';
import { afficherPageDashboard }  from './dashboard.js';
import { afficherPageCategories } from './categories.js';
import { afficherPageProfil }     from './profil.js';
import { afficherPageDevis }      from './devis.js';
import { afficherPageProduits }   from './produits.js';
import { afficherPageCommandes }  from './commandes.js';
import { afficherPageClients }    from './clients.js';
import { lireSession }            from './db.js';


var session = lireSession();

// Page de départ : si une session existe, on reste sur l'accueil
// (la logique de connexion/déconnexion peut être adaptée plus tard)
if (session) {
  afficherPageAccueil();
} else {
  afficherPageAccueil();
}

// Initialiser le premier état pour que le bouton Retour fonctionne correctement
// (si l'URL contient un hash, on prépare un state cohérent)
var hash = window.location.hash ? window.location.hash.replace('#', '') : '';
if (!window.history.state && hash) {
  var nomSession = session && session.nom ? session.nom : undefined;
  var map = {
    accueil: 'accueil',
    connexion: 'connexion',
    dashboard: 'dashboard',
    categories: 'categories',
    profil: 'profil',
    devis: 'devis',
    produits: 'produits',
    commandes: 'commandes',
    clients: 'clients'
  };
  var pageCible = map[hash];
  if (pageCible) {
    window.history.replaceState({ page: pageCible, nom: nomSession }, '', window.location.hash);
  }
}

// ─── Navigation navigateur ────────────────────────────────────────────────────

window.addEventListener('popstate', function(evenement) {
  // Ne pas casser si l'état est null (ex: refresh / navigation directe)
  if (!evenement.state || !evenement.state.page) {
    afficherPageAccueil();
    return;
  }

  var page = evenement.state.page;
  var nom  = evenement.state.nom;

  if (page === 'accueil')    afficherPageAccueil();
  else if (page === 'connexion')  afficherPageConnexion();
  else if (page === 'dashboard')  afficherPageDashboard(nom);
  else if (page === 'categories') afficherPageCategories(nom);
  else if (page === 'profil')     afficherPageProfil(nom);
  else if (page === 'devis')      afficherPageDevis(nom);
  else if (page === 'produits')   afficherPageProduits(nom);
  else if (page === 'commandes')  afficherPageCommandes(nom);
  else if (page === 'clients')    afficherPageClients(nom);
});
