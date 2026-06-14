import { attacherNavigationNavbar } from './navigation.js';
import { lireSession } from './db.js';

// ─── Rendu ────────────────────────────────────────────────────────────────────

export function afficherPageAdminPanel(prenomUtilisateur) {
  var session = lireSession();
  var prenom  = prenomUtilisateur || (session && session.nom) || 'Admin';
  var role    = session ? session.role : null;

  // Garde côté rendu (double sécurité)
  if (role !== 'admin' && role !== 'superadmin') {
    import('./dashboard.js').then(function(m) { m.afficherPageDashboard(prenom); });
    return;
  }

  history.pushState({ page: 'admin-panel', nom: prenom }, '', '#admin-panel');

  document.getElementById('corps-application').className =
    'font-body bg-beige min-h-screen block p-0 transition-all duration-300';

  var conteneurApp = document.getElementById('app');
  conteneurApp.className = 'w-full';

  conteneurApp.innerHTML = `
    <div id="page-admin-panel" class="animer-fond w-full min-h-screen bg-beige flex flex-col">

      <header id="navbar" class="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div class="flex items-center gap-2 mr-10">
          <img src="LOGOD.png" alt="DecoFlow" class="h-8" />
          <span class="font-display text-2xl font-semibold text-charcoal tracking-wide">DecoFlow</span>
        </div>
        <nav class="hidden md:flex items-center gap-1 flex-1">
          <a id="nav-dashboard"    href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Dashboard</a>
          <a id="nav-produits"     href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Produits</a>
          <a id="nav-categories"   href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Catégories</a>
          <a id="nav-orders"       href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Commandes</a>
          <a id="nav-quotes"       href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Devis</a>
          <a id="nav-customers"    href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Clients</a>
          <a id="nav-admin-panel"  href="#" class="nav-lien px-3 py-1.5 text-sm font-medium text-charcoal border-b-2 border-terracotta">Admin</a>
          ${role === 'superadmin' ? '<a id="nav-superadmin-panel" href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Superadmin</a>' : ''}
        </nav>
        <div class="flex items-center gap-4">
          <div id="profil-utilisateur" class="flex items-center gap-2 cursor-pointer">
            <span class="text-sm font-medium text-charcoal hidden sm:block">${prenom.split(' ')[0]}</span>
            <div class="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center">
              <i class="fa-solid fa-shield-halved text-white text-sm"></i>
            </div>
          </div>
          <button id="bouton-deconnexion" type="button"
            class="text-xs text-muted hover:text-red-500 transition flex items-center gap-1">
            <i class="fa-solid fa-right-from-bracket text-xs"></i>
          </button>
        </div>
      </header>

      <main class="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">

        <div class="mb-8">
          <p class="text-xs text-terracotta uppercase tracking-widest font-semibold mb-1">Panneau Administrateur</p>
          <h1 class="font-display text-4xl font-semibold text-charcoal">Gestion du Catalogue</h1>
          <p class="text-sm text-muted mt-1">Gérez les produits, les stocks et les commandes clients.</p>
        </div>

        <!-- Actions rapides -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          ${construireCarteAction('fa-plus', 'Ajouter un produit', 'bg-terracotta text-white', 'bouton-ajouter-produit')}
          ${construireCarteAction('fa-boxes-stacked', 'Gérer les stocks', 'bg-white text-charcoal border border-gray-100', 'bouton-gerer-stocks')}
          ${construireCarteAction('fa-file-invoice', 'Traiter les devis', 'bg-white text-charcoal border border-gray-100', 'bouton-traiter-devis')}
          ${construireCarteAction('fa-truck', 'Statuts commandes', 'bg-white text-charcoal border border-gray-100', 'bouton-statuts-commandes')}
        </div>

        <!-- Tableau catalogue -->
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="font-display text-xl font-semibold text-charcoal">Catalogue Mobilier</h2>
            <div class="relative">
              <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
                <i class="fa-solid fa-magnifying-glass text-xs"></i>
              </span>
              <input id="champ-recherche-admin" type="text" placeholder="Rechercher un produit…"
                class="border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-xs text-charcoal placeholder-gray-400 bg-beige/40 focus:outline-none focus:border-terracotta transition w-60" />
            </div>
          </div>

          <div class="grid grid-cols-[2fr_1fr_1fr_1fr_auto] px-6 py-3 border-b border-gray-100">
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Produit</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Catégorie</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Prix</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Stock</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Actions</span>
          </div>

          <div id="liste-produits-admin">
            ${construireLigneProduit('Canapé Dakar Premium', 'Salon', '450 000 Fcfa', 12)}
            ${construireLigneProduit('Bureau Acajou Executive', 'Bureau', '280 000 Fcfa', 0)}
            ${construireLigneProduit('Lit Plateforme Sango', 'Chambre', '620 000 Fcfa', 5)}
            ${construireLigneProduit('Table Basse Wengé', 'Salon', '185 000 Fcfa', 2)}
            ${construireLigneProduit('Fauteuil Rotin XL', 'Salon', '95 000 Fcfa', 1)}
          </div>
        </div>

        <!-- Commandes récentes -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h2 class="font-display text-xl font-semibold text-charcoal mb-4">Commandes Récentes</h2>
          <div class="space-y-3">
            ${construireLigneCommandeAdmin('CMD-2401', 'Aminata Diallo', 'Canapé Dakar Premium', 'En préparation')}
            ${construireLigneCommandeAdmin('CMD-2402', 'Ibrahima Seck', 'Bureau Acajou Executive', 'Expédié')}
            ${construireLigneCommandeAdmin('CMD-2403', 'Fatou Ba', 'Lit Plateforme Sango', 'Livré')}
          </div>
        </div>

      </main>
    </div>
  `;

  // Navbar gérée globalement par navigation.js

  attacherNavigationNavbar(prenom);

}


// ─── Constructeurs ────────────────────────────────────────────────────────────

function construireCarteAction(icone, label, classes, id) {
  return `
    <button id="${id}" type="button"
      class="rounded-xl p-5 flex flex-col items-center gap-3 hover:shadow-md transition ${classes}">
      <i class="fa-solid ${icone} text-xl"></i>
      <span class="text-xs font-semibold uppercase tracking-wider text-center">${label}</span>
    </button>
  `;
}

function construireLigneProduit(nom, categorie, prix, stock) {
  var stockClasse = stock === 0
    ? 'text-red-500 font-semibold'
    : stock <= 2
    ? 'text-orange-400 font-semibold'
    : 'text-charcoal';

  return `
    <div class="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center px-6 py-4 border-b border-gray-50 hover:bg-beige/30 transition">
      <p class="text-sm font-medium text-charcoal">${nom}</p>
      <span class="text-xs text-muted">${categorie}</span>
      <span class="text-sm font-display font-semibold text-terracotta">${prix}</span>
      <span class="text-sm ${stockClasse}">${stock === 0 ? 'Rupture' : stock + ' en stock'}</span>
      <div class="flex gap-2">
        <button type="button" class="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg text-muted hover:text-terracotta hover:border-terracotta transition">
          <i class="fa-regular fa-pen-to-square text-xs"></i>
        </button>
        <button type="button" class="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg text-muted hover:text-red-400 hover:border-red-200 transition">
          <i class="fa-regular fa-trash-can text-xs"></i>
        </button>
      </div>
    </div>
  `;
}

function construireLigneCommandeAdmin(ref, client, produit, statut) {
  var couleurs = {
    'En préparation': 'bg-orange-50 text-orange-500',
    'Expédié':        'bg-blue-50 text-blue-500',
    'Livré':          'bg-green-50 text-green-500'
  };
  return `
    <div class="flex items-center justify-between py-3 border-b border-gray-50">
      <div>
        <p class="text-sm font-medium text-charcoal">${client} — ${produit}</p>
        <p class="text-xs text-muted">${ref}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm ${couleurs[statut] || 'bg-beige text-muted'}">${statut}</span>
        <button type="button" class="text-xs text-muted hover:text-terracotta transition">Modifier →</button>
      </div>
    </div>
  `;
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