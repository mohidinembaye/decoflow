import { afficherPageDashboard }  from './dashboard.js';
import { afficherPageCategories } from './categories.js';
import { afficherPageProfil }     from './profil.js';
import { afficherPageDevis }      from './devis.js';
import { afficherPageProduits }   from './produits.js';
import { afficherPageCommandes }  from './commandes.js';
import { attacherNavigationNavbar } from './navigation.js';




// ─── Données

var donneesClients = [
  { id: 'CL-001', nom: 'Awa Diop',        initiales: 'AD', couleurAvatar: 'bg-[#C4A882]', email: 'awa.diop@gmail.com',       telephone: '+221 77 123 45 67', ville: 'Dakar',       projets: 3, totalDepense: 7450000, statut: 'actif',    dateInscription: '10 Jan. 2024' },
  { id: 'CL-002', nom: 'Moussa Ndiaye',   initiales: 'MN', couleurAvatar: 'bg-[#2C2A27]', email: 'mndiaye@outlook.com',      telephone: '+221 78 234 56 78', ville: 'Plateau',     projets: 5, totalDepense: 18900000, statut: 'actif',   dateInscription: '15 Jan. 2024' },
  { id: 'CL-003', nom: 'Fatou Sy',        initiales: 'FS', couleurAvatar: 'bg-[#C97B5A]', email: 'fatou.sy@yahoo.fr',        telephone: '+221 76 345 67 89', ville: 'Rufisque',    projets: 2, totalDepense: 2100000, statut: 'actif',    dateInscription: '20 Jan. 2024' },
  { id: 'CL-004', nom: 'Ibrahima Bâ',    initiales: 'IB', couleurAvatar: 'bg-[#E8A882]', email: 'i.ba@decoplus.sn',         telephone: '+221 70 456 78 90', ville: 'Saint-Louis', projets: 4, totalDepense: 12300000, statut: 'inactif', dateInscription: '02 Fév. 2024' },
  { id: 'CL-005', nom: 'Khadija Fall',    initiales: 'KF', couleurAvatar: 'bg-[#9B9589]', email: 'khadija.fall@gmail.com',   telephone: '+221 77 567 89 01', ville: 'Ngor',        projets: 1, totalDepense: 850000,  statut: 'actif',    dateInscription: '08 Fév. 2024' },
  { id: 'CL-006', nom: 'Omar Sarr',       initiales: 'OS', couleurAvatar: 'bg-[#C4A882]', email: 'omar.sarr@sarr-archi.com', telephone: '+221 78 678 90 12', ville: 'Médina',      projets: 2, totalDepense: 5600000, statut: 'actif',    dateInscription: '14 Fév. 2024' },
  { id: 'CL-007', nom: 'Aïssatou Diallo', initiales: 'AD', couleurAvatar: 'bg-[#F2DDD0]', email: 'aissatou.d@gmail.com',    telephone: '+221 76 789 01 23', ville: 'Fann',        projets: 1, totalDepense: 920000,  statut: 'prospect', dateInscription: '19 Fév. 2024' },
  { id: 'CL-008', nom: 'Seydou Mbaye',    initiales: 'SM', couleurAvatar: 'bg-[#2C2A27]', email: 's.mbaye@mbayegroup.sn',    telephone: '+221 70 890 12 34', ville: 'Saly',        projets: 6, totalDepense: 22400000, statut: 'actif',   dateInscription: '25 Fév. 2024' },
  { id: 'CL-009', nom: 'Rokhaya Thiam',   initiales: 'RT', couleurAvatar: 'bg-[#C97B5A]', email: 'rokhaya.t@hotmail.fr',    telephone: '+221 77 901 23 45', ville: 'Dakar',       projets: 2, totalDepense: 3200000, statut: 'actif',    dateInscription: '03 Mar. 2024' },
  { id: 'CL-010', nom: 'Cheikh Gaye',     initiales: 'CG', couleurAvatar: 'bg-[#9B9589]', email: 'cheikh.gaye@gmail.com',    telephone: '+221 78 012 34 56', ville: 'Thiès',       projets: 1, totalDepense: 1500000, statut: 'inactif', dateInscription: '10 Mar. 2024' },
  { id: 'CL-011', nom: 'Mariama Cissé',   initiales: 'MC', couleurAvatar: 'bg-[#E8A882]', email: 'm.cisse@cisse-deco.sn',   telephone: '+221 76 123 45 67', ville: 'Dakar',       projets: 3, totalDepense: 8700000, statut: 'actif',    dateInscription: '15 Mar. 2024' },
  { id: 'CL-012', nom: 'Lamine Diouf',    initiales: 'LD', couleurAvatar: 'bg-[#C4A882]', email: 'lamine.diouf@yahoo.fr',   telephone: '+221 70 234 56 78', ville: 'Ziguinchor',  projets: 2, totalDepense: 4100000, statut: 'prospect', dateInscription: '20 Mar. 2024' },
];

var filtreStatutActif   = 'tous';
var filtreRechercheClients = '';
var pageActuelle        = 1;
var clientsParPage      = 6;

// ─── Helpers ──────────────────────────────────────────────────────────────────

var couleursStatutClient = {
  'actif':    { fond: 'bg-[#E8F8EE]', texte: 'text-green-600' },
  'inactif':  { fond: 'bg-gray-100',  texte: 'text-gray-500'  },
  'prospect': { fond: 'bg-[#FFF3E8]', texte: 'text-[#C97B5A]' },
};

var libellesStatutClient = {
  'actif':    'Actif',
  'inactif':  'Inactif',
  'prospect': 'Prospect',
};

function badgeStatutClient(statut) {
  var c = couleursStatutClient[statut] || { fond: 'bg-gray-100', texte: 'text-gray-500' };
  return `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${c.fond} ${c.texte}">${libellesStatutClient[statut] || statut}</span>`;
}

function formaterMontantClient(valeur) {
  return valeur.toLocaleString('fr-FR') + ' FCFA';
}

function filtrerClients() {
  return donneesClients.filter(function(cl) {
    var correspondStatut =
      filtreStatutActif === 'tous' || cl.statut === filtreStatutActif;

    var correspondRecherche =
      filtreRechercheClients === '' ||
      cl.nom.toLowerCase().includes(filtreRechercheClients.toLowerCase()) ||
      cl.email.toLowerCase().includes(filtreRechercheClients.toLowerCase()) ||
      cl.ville.toLowerCase().includes(filtreRechercheClients.toLowerCase());

    return correspondStatut && correspondRecherche;
  });
}

// ─── Affichage principal ──────────────────────────────────────────────────────

export function afficherPageClients(prenomUtilisateur) {
  history.pushState({ page: 'clients', nom: prenomUtilisateur }, '', '#clients');

  var conteneurApp = document.getElementById('app');
  var prenom = prenomUtilisateur || 'Utilisateur';

  filtreStatutActif      = 'tous';
  filtreRechercheClients = '';
  pageActuelle           = 1;

  conteneurApp.className = 'w-full';

  document.getElementById('corps-application').className =
    'font-body bg-beige min-h-screen block p-0 transition-all duration-300';

  conteneurApp.innerHTML = `
    <div id="page-clients" class="animer-fond w-full min-h-screen bg-beige flex flex-col">

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
          <a id="nav-orders"     href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Commandes</a>
          <a id="nav-quotes"     href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Devis</a>
          <a id="nav-customers"  href="#" class="nav-lien px-3 py-1.5 text-sm font-medium text-charcoal border-b-2 border-terracotta">Clients</a>
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
      <main id="contenu-clients" class="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">

        <!-- En-tête section -->
        <div class="mb-6 border border-dashed border-gray-200 rounded-xl p-6 bg-white flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 class="font-display text-4xl font-semibold text-charcoal mb-1">Gestion des Clients</h1>
            <p class="text-sm text-muted">Répertoire & suivi clientèle</p>
          </div>
          <button id="bouton-nouveau-client" type="button"
            class="flex items-center gap-2 bg-charcoal text-white text-xs uppercase tracking-widest px-5 py-3 hover:bg-terracotta transition-colors duration-200 whitespace-nowrap self-start">
            <i class="fa-solid fa-plus text-xs"></i> Nouveau Client
          </button>
        </div>

        <!-- KPI -->
        <div id="section-kpi-clients" class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          <div class="bg-white rounded-xl p-5 border border-gray-100">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-muted uppercase tracking-wider">Total Clients</span>
              <span class="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-semibold">+3 ce mois</span>
            </div>
            <i class="fa-regular fa-user text-muted text-sm mb-2 block"></i>
            <p class="text-3xl font-semibold text-charcoal font-display">12</p>
            <p class="text-xs text-muted mt-1">Clients enregistrés</p>
          </div>

          <div class="bg-white rounded-xl p-5 border border-gray-100">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-muted uppercase tracking-wider">Clients Actifs</span>
              <span class="text-[10px] bg-[#E8F8EE] text-green-600 px-2 py-0.5 rounded-full font-semibold">75%</span>
            </div>
            <i class="fa-regular fa-circle-check text-muted text-sm mb-2 block"></i>
            <p class="text-3xl font-semibold text-charcoal font-display">9</p>
            <p class="text-xs text-muted mt-1">Actifs ce trimestre</p>
          </div>

          <div class="bg-white rounded-xl p-5 border border-gray-100">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs text-muted uppercase tracking-wider">Valeur Cumulée</span>
              <span class="text-[10px] bg-gray-100 text-muted px-2 py-0.5 rounded-full font-semibold">Total</span>
            </div>
            <i class="fa-regular fa-credit-card text-muted text-sm mb-2 block"></i>
            <p class="text-3xl font-semibold text-charcoal font-display">88.020.000</p>
            <p class="text-xs text-muted mt-1">FCFA générés</p>
          </div>

        </div>

        <!-- Barre de recherche + filtres -->
        <div class="bg-white border border-gray-100 rounded-xl px-5 py-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div class="relative flex-1 max-w-xs">
            <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
              <i class="fa-solid fa-magnifying-glass text-xs"></i>
            </span>
            <input id="champ-recherche-clients" type="text" placeholder="Rechercher un client, ville…"
              class="w-full border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-xs text-charcoal placeholder-gray-400 bg-beige/40 focus:outline-none focus:border-terracotta transition" />
          </div>

          <div id="filtres-statut-clients" class="flex items-center gap-1 flex-wrap">
            <button data-statut="tous"     type="button" class="btn-statut-client px-3 py-1.5 text-xs rounded-md font-medium bg-charcoal text-white transition">Tous</button>
            <button data-statut="actif"    type="button" class="btn-statut-client px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition">Actifs</button>
            <button data-statut="inactif"  type="button" class="btn-statut-client px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition">Inactifs</button>
            <button data-statut="prospect" type="button" class="btn-statut-client px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition">Prospects</button>
          </div>

        </div>

        <!-- Tableau des clients -->
        <div class="bg-white border border-dashed border-gray-200 rounded-xl overflow-hidden mb-4">

          <!-- En-tête tableau -->
          <div class="grid grid-cols-[1.5fr_1.8fr_1fr_1fr_1.2fr_1fr_auto] gap-4 px-6 py-3 border-b border-gray-100 text-[10px] font-semibold text-muted uppercase tracking-wider">
            <span>Client</span>
            <span>Email</span>
            <span>Téléphone</span>
            <span>Ville</span>
            <span>Total dépensé</span>
            <span>Statut</span>
            <span>Actions</span>
          </div>

          <!-- Lignes dynamiques -->
          <div id="corps-tableau-clients"></div>

          <!-- Pied tableau -->
          <div id="pied-tableau-clients" class="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
            <p id="compteur-clients" class="text-xs text-muted"></p>
            <div id="pagination-clients" class="flex items-center gap-1"></div>
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

  rendreTableauClients();
  attacherEcouteursClients(prenom);
  attacherNavigationNavbar(prenom);
}



// ─── Rendu tableau ────────────────────────────────────────────────────────────

function rendreTableauClients() {
  var corps      = document.getElementById('corps-tableau-clients');
  var compteur   = document.getElementById('compteur-clients');
  var pagination = document.getElementById('pagination-clients');

  if (!corps) return;

  var clientsFiltres = filtrerClients();
  var total          = clientsFiltres.length;
  var debut          = (pageActuelle - 1) * clientsParPage;
  var fin            = Math.min(debut + clientsParPage, total);
  var clientsPage    = clientsFiltres.slice(debut, fin);
  var totalPages     = Math.max(1, Math.ceil(total / clientsParPage));

  corps.innerHTML = '';

  if (clientsPage.length === 0) {
    var ligneVide = document.createElement('div');
    ligneVide.className = 'px-6 py-12 text-center text-sm text-muted';
    ligneVide.textContent = 'Aucun client trouvé.';
    corps.appendChild(ligneVide);
  } else {
    clientsPage.forEach(function(cl) {
      var ligne = document.createElement('div');
      ligne.className = 'grid grid-cols-[1.5fr_1.8fr_1fr_1fr_1.2fr_1fr_auto] gap-4 px-6 py-4 border-b border-gray-50 hover:bg-beige/30 transition items-center';
      ligne.setAttribute('data-id', cl.id);

      ligne.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full ${cl.couleurAvatar} flex items-center justify-center flex-shrink-0">
            <span class="text-[10px] font-bold text-white">${cl.initiales}</span>
          </div>
          <div class="min-w-0">
            <p class="text-xs font-semibold text-charcoal truncate">${cl.nom}</p>
            <p class="text-[10px] text-muted">${cl.projets} projet${cl.projets > 1 ? 's' : ''}</p>
          </div>
        </div>

        <span class="text-xs text-muted truncate">${cl.email}</span>
        <span class="text-xs text-muted">${cl.telephone}</span>
        <span class="text-xs text-muted">${cl.ville}</span>
        <span class="text-xs font-semibold text-charcoal">${formaterMontantClient(cl.totalDepense)}</span>

        <div>${badgeStatutClient(cl.statut)}</div>

        <div class="flex items-center">
          <button class="btn-actions-client text-muted hover:text-charcoal transition p-1" data-id="${cl.id}" type="button" title="Actions">
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
      : `Affichage de ${debut + 1}–${fin} sur ${total} clients`;
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
      if (pageActuelle > 1) { pageActuelle--; rendreTableauClients(); }
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
          rendreTableauClients();
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
      if (pageActuelle < totalPages) { pageActuelle++; rendreTableauClients(); }
    });
    pagination.appendChild(boutonSuiv);
  }
}

// ─── Écouteurs ────────────────────────────────────────────────────────────────

function mettreAJourBoutonsStatutClient(statut) {
  var boutons = document.querySelectorAll('#filtres-statut-clients .btn-statut-client');
  boutons.forEach(function(btn) {
    if (btn.getAttribute('data-statut') === statut) {
      btn.className = 'btn-statut-client px-3 py-1.5 text-xs rounded-md font-medium bg-charcoal text-white transition';
    } else {
      btn.className = 'btn-statut-client px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition';
    }
  });
}

function attacherEcouteursClients(prenom) {

  // Filtres statut
  var zoneFiltres = document.getElementById('filtres-statut-clients');
  if (zoneFiltres) {
    zoneFiltres.addEventListener('click', function(evenement) {
      var btn = evenement.target.closest('.btn-statut-client');
      if (!btn) return;
      filtreStatutActif = btn.getAttribute('data-statut');
      pageActuelle = 1;
      mettreAJourBoutonsStatutClient(filtreStatutActif);
      rendreTableauClients();
    });
  }

  // Recherche live
  var champRecherche = document.getElementById('champ-recherche-clients');

  if (champRecherche) {
    champRecherche.addEventListener('input', function() {
      filtreRechercheClients = champRecherche.value;
      pageActuelle = 1;
      rendreTableauClients();
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