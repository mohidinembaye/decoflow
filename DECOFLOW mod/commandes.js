import { afficherPageDashboard }  from './dashboard.js';
import { afficherPageCategories } from './categories.js';
import { afficherPageProfil }     from './profil.js';
import { afficherPageDevis }      from './devis.js';
import { afficherPageProduits }   from './produits.js';
import { afficherPageClients }    from './clients.js';
import { attacherNavigationNavbar } from './navigation.js';



// ─── Données ──────────────────────────────────────────────────────────────────

var donneesCommandes = [
  { id: 'DF-2024-089', client: 'Awa Diop',      initiales: 'AD', couleurAvatar: 'bg-[#C4A882]', projet: 'Villa Almadies Nord',   date: '14 Mars 2024', montant: 2450000, statut: 'en-preparation' },
  { id: 'DF-2024-088', client: 'Moussa Ndiaye',  initiales: 'MN', couleurAvatar: 'bg-[#2C2A27]', projet: 'Penthouse Plateau',     date: '12 Mars 2024', montant: 8300000, statut: 'en-preparation' },
  { id: 'DF-2024-087', client: 'Fatou Sy',       initiales: 'FS', couleurAvatar: 'bg-[#C97B5A]', projet: 'Boutique Concept Rufisque', date: '10 Mars 2024', montant: 1200000, statut: 'livre' },
  { id: 'DF-2024-086', client: 'Ibrahima Bâ',   initiales: 'IB', couleurAvatar: 'bg-[#E8A882]', projet: 'Résidence Saint-Louis', date: '08 Mars 2024', montant: 5400000, statut: 'retard' },
  { id: 'DF-2024-085', client: 'Khadija Fall',   initiales: 'KF', couleurAvatar: 'bg-[#9B9589]', projet: 'Bureau Ngor',           date: '05 Mars 2024', montant: 850000,  statut: 'en-livraison' },
  { id: 'DF-2024-084', client: 'Omar Sarr',      initiales: 'OS', couleurAvatar: 'bg-[#C4A882]', projet: 'Loft Médina',           date: '03 Mars 2024', montant: 3100000, statut: 'livre' },
  { id: 'DF-2024-083', client: 'Aïssatou Diallo', initiales: 'AD', couleurAvatar: 'bg-[#F2DDD0]', projet: 'Appartement Fann',     date: '01 Mars 2024', montant: 920000,  statut: 'en-preparation' },
  { id: 'DF-2024-082', client: 'Seydou Mbaye',   initiales: 'SM', couleurAvatar: 'bg-[#2C2A27]', projet: 'Villa Saly',           date: '28 Fév. 2024', montant: 6700000, statut: 'en-livraison' },
];

var filtreStatutActif = 'tous';
var filtreRechercheCommandes = '';
var pageActuelle = 1;
var commandesParPage = 5;

// ─── Helpers ──────────────────────────────────────────────────────────────────

var libelles = {
  'tous':           'Tous',
  'en-preparation': 'En préparation',
  'en-livraison':   'En livraison',
  'livre':          'Livré',
  'retard':         'Retard',
};

var couleursStatut = {
  'en-preparation': { fond: 'bg-[#FFF3E8]', texte: 'text-[#C97B5A]' },
  'en-livraison':   { fond: 'bg-[#E8F4FF]', texte: 'text-blue-600'  },
  'livre':          { fond: 'bg-[#E8F8EE]', texte: 'text-green-600' },
  'retard':         { fond: 'bg-[#FFEAEA]', texte: 'text-red-500'   },
};

function badgeStatut(statut) {
  var c = couleursStatut[statut] || { fond: 'bg-gray-100', texte: 'text-gray-500' };
  return `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${c.fond} ${c.texte}">${libelles[statut] || statut}</span>`;
}

function formaterMontant(valeur) {
  return valeur.toLocaleString('fr-FR') + ' FCFA';
}

function filtrerCommandes() {
  return donneesCommandes.filter(function(cmd) {
    var correspondStatut =
      filtreStatutActif === 'tous' || cmd.statut === filtreStatutActif;

    var correspondRecherche =
      filtreRechercheCommandes === '' ||
      cmd.client.toLowerCase().includes(filtreRechercheCommandes.toLowerCase()) ||
      cmd.id.toLowerCase().includes(filtreRechercheCommandes.toLowerCase()) ||
      cmd.projet.toLowerCase().includes(filtreRechercheCommandes.toLowerCase());

    return correspondStatut && correspondRecherche;
  });
}

// ─── Affichage principal ──────────────────────────────────────────────────────

export function afficherPageCommandes(prenomUtilisateur) {
  history.pushState({ page: 'commandes', nom: prenomUtilisateur }, '', '#commandes');

  var conteneurApp = document.getElementById('app');
  var prenom = prenomUtilisateur || 'Utilisateur';

  filtreStatutActif        = 'tous';
  filtreRechercheCommandes = '';
  pageActuelle             = 1;

  conteneurApp.className = 'w-full';

  document.getElementById('corps-application').className =
    'font-body bg-beige min-h-screen block p-0 transition-all duration-300';

  conteneurApp.innerHTML = `
    <div id="page-commandes" class="animer-fond w-full min-h-screen bg-beige flex flex-col">

      <!-- ── Navbar ── -->
      <header id="navbar" class="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50">

        <div id="navbar-logo" class="flex items-center gap-2 mr-10">
          <img src="LOGOD.png" alt="DecoFlow" class="h-8" />
          <span class="font-display text-2xl font-semibold text-charcoal tracking-wide">DecoFlow</span>
        </div>

        <nav id="navbar-nav" class="hidden md:flex items-center gap-1 flex-1">
          <a id="nav-dashboard"  href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Dashboard</a>
          <a id="nav-produits"   href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Produits</a>
          <a id="nav-categories" href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Catégories</a>
          <a id="nav-orders"     href="#" class="nav-lien px-3 py-1.5 text-sm font-medium text-charcoal border-b-2 border-terracotta">Commandes</a>
          <a id="nav-quotes"     href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Devis</a>
          <a id="nav-customers"  href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Clients</a>
        </nav>

        <div id="navbar-droite" class="flex items-center gap-4">
          <button type="button" aria-label="Rechercher" class="text-muted hover:text-charcoal transition">
            <i class="fa-solid fa-magnifying-glass text-sm"></i>
          </button>
          <div id="profil-utilisateur" class="flex items-center gap-2 cursor-pointer">
            <span class="text-sm font-medium text-charcoal hidden sm:block">${prenom}</span>
            <div class="w-8 h-8 rounded-full bg-terra-pale flex items-center justify-center overflow-hidden">
              <i class="fa-solid fa-user text-terracotta text-sm"></i>
            </div>
          </div>
        </div>

      </header>

      <!-- ── Contenu ── -->
      <main id="contenu-commandes" class="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">

        <!-- En-tête section -->
        <div class="mb-6 border border-dashed border-gray-200 rounded-xl p-6 bg-white flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 class="font-display text-4xl font-semibold text-charcoal mb-1">Gestion des Commandes</h1>
            <p class="text-sm text-muted">Atelier de gestion</p>
          </div>
          <button id="bouton-nouvelle-commande" type="button"
            class="flex items-center gap-2 bg-charcoal text-white text-xs uppercase tracking-widest px-5 py-3 hover:bg-terracotta transition-colors duration-200 whitespace-nowrap self-start">
            <i class="fa-solid fa-plus text-xs"></i> Nouvelle Commande
          </button>
        </div>

        <!-- KPI -->
        <div id="section-kpi-commandes" class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          <div class="bg-white rounded-xl p-5 border border-gray-100">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-muted uppercase tracking-wider">Commandes en cours</span>
              <span class="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-semibold">+12% vs hier</span>
            </div>
            <div class="flex items-end gap-1">
              <i class="fa-regular fa-calendar text-muted text-sm mb-1"></i>
            </div>
            <p class="text-3xl font-semibold text-charcoal font-display">24</p>
            <p class="text-xs text-muted mt-1">Commandes en cours</p>
          </div>

          <div class="bg-white rounded-xl p-5 border border-gray-100">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-muted uppercase tracking-wider">Livrées ce mois</span>
              <span class="text-[10px] bg-[#FFF3E8] text-terracotta px-2 py-0.5 rounded-full font-semibold">Objectif 81%</span>
            </div>
            <div class="flex items-end gap-1">
              <i class="fa-regular fa-square-check text-muted text-sm mb-1"></i>
            </div>
            <p class="text-3xl font-semibold text-charcoal font-display">156</p>
            <p class="text-xs text-muted mt-1">Livrées ce mois</p>
          </div>

          <div class="bg-white rounded-xl p-5 border border-gray-100">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-muted uppercase tracking-wider">Valeur Totale</span>
              <span class="text-[10px] bg-gray-100 text-muted px-2 py-0.5 rounded-full font-semibold">Derniers 30 jours</span>
            </div>
            <div class="flex items-end gap-1">
              <i class="fa-regular fa-credit-card text-muted text-sm mb-1"></i>
            </div>
            <p class="text-3xl font-semibold text-charcoal font-display">12.450.000</p>
            <p class="text-xs text-muted mt-1">Valeur Totale (FCFA)</p>
          </div>

        </div>

        <!-- Barre de recherche + filtres statut -->
        <div class="bg-white border border-gray-100 rounded-xl px-5 py-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div class="relative flex-1 max-w-xs">
            <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
              <i class="fa-solid fa-magnifying-glass text-xs"></i>
            </span>
            <input id="champ-recherche-commandes" type="text" placeholder="Rechercher une commande, un client…"
              class="w-full border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-xs text-charcoal placeholder-gray-400 bg-beige/40 focus:outline-none focus:border-terracotta transition" />
          </div>

          <div id="filtres-statut-commandes" class="flex items-center gap-1 flex-wrap">
            <button data-statut="tous"           type="button" class="btn-statut px-3 py-1.5 text-xs rounded-md font-medium bg-charcoal text-white transition">Tous</button>
            <button data-statut="en-preparation" type="button" class="btn-statut px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition">En préparation</button>
            <button data-statut="en-livraison"   type="button" class="btn-statut px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition">En livraison</button>
            <button data-statut="livre"          type="button" class="btn-statut px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition">Livré</button>
          </div>

        </div>

        <!-- Tableau des commandes -->
        <div class="bg-white border border-dashed border-gray-200 rounded-xl overflow-hidden mb-4">

          <!-- En-tête tableau -->
          <div class="grid grid-cols-[1fr_1.2fr_1.4fr_1fr_1.2fr_1fr_auto] gap-4 px-6 py-3 border-b border-gray-100 text-[10px] font-semibold text-muted uppercase tracking-wider">
            <span>N° Commande</span>
            <span>Client</span>
            <span>Projet</span>
            <span>Date</span>
            <span>Montant (FCFA)</span>
            <span>Statut</span>
            <span>Actions</span>
          </div>

          <!-- Lignes dynamiques -->
          <div id="corps-tableau-commandes"></div>

          <!-- Pied tableau -->
          <div id="pied-tableau-commandes" class="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
            <p id="compteur-commandes" class="text-xs text-muted"></p>
            <div id="pagination-commandes" class="flex items-center gap-1"></div>
          </div>

        </div>

      </main>

      <!-- ── Footer ── -->
      <footer id="footer" class="bg-white border-t border-gray-100 mt-auto">
        <div class="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="font-display text-lg font-semibold text-charcoal">DecoFlow</span>
            <span class="text-xs text-muted">© 2024 DecoFlow. L'excellence de design sénégalaise.</span>
          </div>
          <nav class="flex items-center gap-5">
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">Mentions Légales</a>
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">Confidentialité</a>
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">Aide</a>
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">Contact</a>
          </nav>
        </div>
      </footer>

    </div>
  `;

  rendreTableauCommandes();
  attacherEcouteursCommandes(prenom);
  attacherNavigationNavbar(prenom);
}


// ─── Rendu tableau ────────────────────────────────────────────────────────────

function rendreTableauCommandes() {
  var corps       = document.getElementById('corps-tableau-commandes');
  var compteur    = document.getElementById('compteur-commandes');
  var pagination  = document.getElementById('pagination-commandes');

  if (!corps) return;

  var commandesFiltrees = filtrerCommandes();
  var total             = commandesFiltrees.length;
  var debut             = (pageActuelle - 1) * commandesParPage;
  var fin               = Math.min(debut + commandesParPage, total);
  var commandesPage     = commandesFiltrees.slice(debut, fin);
  var totalPages        = Math.max(1, Math.ceil(total / commandesParPage));

  corps.innerHTML = '';

  if (commandesPage.length === 0) {
    var ligneVide = document.createElement('div');
    ligneVide.className = 'px-6 py-12 text-center text-sm text-muted';
    ligneVide.textContent = 'Aucune commande trouvée.';
    corps.appendChild(ligneVide);
  } else {
    commandesPage.forEach(function(cmd) {
      var ligne = document.createElement('div');
      ligne.className = 'grid grid-cols-[1fr_1.2fr_1.4fr_1fr_1.2fr_1fr_auto] gap-4 px-6 py-4 border-b border-gray-50 hover:bg-beige/30 transition items-center';
      ligne.setAttribute('data-id', cmd.id);

      ligne.innerHTML = `
        <span class="text-xs font-semibold text-charcoal">#${cmd.id}</span>

        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full ${cmd.couleurAvatar} flex items-center justify-center flex-shrink-0">
            <span class="text-[10px] font-bold text-white">${cmd.initiales}</span>
          </div>
          <span class="text-xs text-charcoal truncate">${cmd.client}</span>
        </div>

        <span class="text-xs text-muted truncate">${cmd.projet}</span>
        <span class="text-xs text-muted">${cmd.date}</span>
        <span class="text-xs font-semibold text-charcoal">${formaterMontant(cmd.montant)}</span>

        <div>${badgeStatut(cmd.statut)}</div>

        <div class="flex items-center">
          <button class="btn-actions-commande text-muted hover:text-charcoal transition p-1" data-id="${cmd.id}" type="button" title="Actions">
            <i class="fa-solid fa-ellipsis-vertical text-sm"></i>
          </button>
        </div>
      `;

      corps.appendChild(ligne);
    });
  }

  // Compteur
  if (compteur) {
    compteur.textContent = total === 0
      ? 'Aucun résultat'
      : `Affichage de ${debut + 1}–${fin} sur ${total} commandes`;
  }

  // Pagination
  if (pagination) {
    pagination.innerHTML = '';

    var boutonPrev = document.createElement('button');
    boutonPrev.type = 'button';
    boutonPrev.className = 'w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-muted hover:text-charcoal hover:border-charcoal transition text-xs disabled:opacity-40';
    boutonPrev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
    boutonPrev.disabled = pageActuelle <= 1;
    boutonPrev.addEventListener('click', function() {
      if (pageActuelle > 1) { pageActuelle--; rendreTableauCommandes(); }
    });
    pagination.appendChild(boutonPrev);

    for (var p = 1; p <= totalPages; p++) {
      var boutonPage = document.createElement('button');
      boutonPage.type = 'button';
      boutonPage.textContent = p;
      boutonPage.className = p === pageActuelle
        ? 'w-7 h-7 flex items-center justify-center rounded text-xs font-semibold bg-charcoal text-white'
        : 'w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-xs text-muted hover:text-charcoal hover:border-charcoal transition';

      (function(numero) {
        boutonPage.addEventListener('click', function() {
          pageActuelle = numero;
          rendreTableauCommandes();
        });
      })(p);

      pagination.appendChild(boutonPage);
    }

    var boutonSuiv = document.createElement('button');
    boutonSuiv.type = 'button';
    boutonSuiv.className = 'w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-muted hover:text-charcoal hover:border-charcoal transition text-xs disabled:opacity-40';
    boutonSuiv.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
    boutonSuiv.disabled = pageActuelle >= totalPages;
    boutonSuiv.addEventListener('click', function() {
      if (pageActuelle < totalPages) { pageActuelle++; rendreTableauCommandes(); }
    });
    pagination.appendChild(boutonSuiv);
  }
}

// ─── Écouteurs ────────────────────────────────────────────────────────────────

function mettreAJourBoutonsStatut(statut) {
  var boutons = document.querySelectorAll('#filtres-statut-commandes .btn-statut');
  boutons.forEach(function(btn) {
    if (btn.getAttribute('data-statut') === statut) {
      btn.className = 'btn-statut px-3 py-1.5 text-xs rounded-md font-medium bg-charcoal text-white transition';
    } else {
      btn.className = 'btn-statut px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition';
    }
  });
}

function attacherEcouteursCommandes(prenom) {

  // Filtres statut
  var zoneFiltres = document.getElementById('filtres-statut-commandes');
  if (zoneFiltres) {
    zoneFiltres.addEventListener('click', function(evenement) {
      var btn = evenement.target.closest('.btn-statut');
      if (!btn) return;
      filtreStatutActif = btn.getAttribute('data-statut');
      pageActuelle = 1;
      mettreAJourBoutonsStatut(filtreStatutActif);
      rendreTableauCommandes();
    });
  }

  // Recherche
  var champRecherche = document.getElementById('champ-recherche-commandes');
  if (champRecherche) {
    champRecherche.addEventListener('input', function() {
      filtreRechercheCommandes = champRecherche.value;
      pageActuelle = 1;
      rendreTableauCommandes();
    });
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