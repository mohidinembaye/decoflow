import { afficherPageDashboard }  from './dashboard.js';
import { afficherPageProfil }     from './profil.js';
import { afficherPageDevis }      from './devis.js';
import { afficherPageProduits }   from './produits.js';
import { afficherPageCommandes }  from './commandes.js';
import { attacherNavigationNavbar } from './navigation.js';


var donneesCategories = [
  { id: 'mobilier',    icone: 'fa-couch',         nom: 'Mobilier',      articles: 42, statut: 'active'  },
  { id: 'luminaire',   icone: 'fa-lightbulb',      nom: 'Luminaire',     articles: 28, statut: 'active'  },
  { id: 'textile',     icone: 'fa-scissors',       nom: 'Textile',       articles: 15, statut: 'active'  },
  { id: 'accessoires', icone: 'fa-tag',            nom: 'Accessoires',   articles: 56, statut: 'active'  },
  { id: 'rangement',   icone: 'fa-box',            nom: 'Rangement',     articles: 20, statut: 'active'  },
  { id: 'decoration',  icone: 'fa-shapes',         nom: 'Décoration',    articles: 33, statut: 'active'  },
  { id: 'bureau',      icone: 'fa-briefcase',      nom: 'Bureau',        articles: 18, statut: 'active'  },
  { id: 'exterieur',   icone: 'fa-tree',           nom: 'Extérieur',     articles: 12, statut: 'active'  },
  { id: 'cuisine',     icone: 'fa-utensils',       nom: 'Cuisine',       articles: 9,  statut: 'active'  },
  { id: 'salle-bain',  icone: 'fa-bath',           nom: 'Salle de bain', articles: 7,  statut: 'archive' },
  { id: 'chambre',     icone: 'fa-bed',            nom: 'Chambre',       articles: 24, statut: 'archive' },
  { id: 'salon',       icone: 'fa-tv',             nom: 'Salon',         articles: 31, statut: 'archive' },
  { id: 'jardin',      icone: 'fa-seedling',       nom: 'Jardin',        articles: 5,  statut: 'archive' },
];

var filtreActif      = 'toutes';
var recherche        = '';
var categorieActive  = null; 
export function afficherPageCategories(prenomUtilisateur) {
  history.pushState({ page: 'categories', nom: prenomUtilisateur }, '', '#categories');

  var conteneurApp = document.getElementById('app');
  var prenom = prenomUtilisateur || 'Utilisateur';

  filtreActif     = 'toutes';
  recherche       = '';
  categorieActive = null;

  conteneurApp.className = 'w-full';

  document.getElementById('corps-application').className =
    'font-body bg-beige min-h-screen block p-0 transition-all duration-300';

  conteneurApp.innerHTML = `
    <div id="page-categories" class="animer-fond w-full min-h-screen bg-beige flex flex-col">

      <header id="navbar" class="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50">

        <div id="navbar-logo" class="flex items-center gap-2 mr-10">
          <img src="LOGOD.png" alt="DecoFlow" class="h-8" />
          <span class="font-display text-2xl font-semibold text-charcoal tracking-wide">DecoFlow</span>
        </div>

        <nav id="navbar-nav" class="hidden md:flex items-center gap-1 flex-1">
          <a id="nav-dashboard"  href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Dashboard</a>
          <a id="nav-produits"   href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Produits</a>
          <a id="nav-categories" href="#" class="nav-lien px-3 py-1.5 text-sm font-medium text-charcoal border-b-2 border-terracotta">Catégories</a>
          <a id="nav-orders"     href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Commandes</a>
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

      <main id="contenu-categories" class="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">

        <!-- En-tête section -->
        <div class="mb-6 border border-dashed border-gray-200 rounded-xl p-6 bg-white flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 class="font-display text-4xl font-semibold text-charcoal mb-1">Gestion des Catégories</h1>
            <p class="text-sm text-muted max-w-md">Organisez votre catalogue avec une structure raffinée. Créez des collections qui inspirent l'élégance et la curation artisanale.</p>
          </div>
          <button id="bouton-ajouter-categorie" type="button"
            class="flex items-center gap-2 bg-charcoal text-white text-xs uppercase tracking-widest px-5 py-3 hover:bg-terracotta transition-colors duration-200 whitespace-nowrap self-start">
            <i class="fa-solid fa-plus text-xs"></i> Ajouter une catégorie
          </button>
        </div>

        <!-- Vue liste ou vue détail — injectée dynamiquement -->
        <div id="zone-contenu-categories"></div>

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

  rendreVueListe();
  attacherEcouteursCategories(prenom);
  attacherNavigationNavbar(prenom);
}



function rendreVueListe() {
  var zone = document.getElementById('zone-contenu-categories');
  if (!zone) return;

  zone.innerHTML = `
    <!-- Filtres + recherche -->
    <div class="bg-white border border-gray-100 rounded-xl px-5 py-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div id="filtres-categories" class="flex items-center gap-1">
        <button id="filtre-toutes"   type="button" class="btn-filtre px-3 py-1.5 text-xs rounded-md font-medium bg-charcoal text-white transition">Toutes (13)</button>
        <button id="filtre-actives"  type="button" class="btn-filtre px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition">Actives (9)</button>
        <button id="filtre-archives" type="button" class="btn-filtre px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition">Archives (4)</button>
      </div>
      <div class="relative">
        <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
          <i class="fa-solid fa-magnifying-glass text-xs"></i>
        </span>
        <input id="champ-recherche-categories" type="text" placeholder="Rechercher une catégorie…"
          class="border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-xs text-charcoal placeholder-gray-400 bg-beige/40 focus:outline-none focus:border-terracotta transition w-56" />
      </div>
    </div>

    <!-- Grille des catégories -->
    <div id="grille-categories" class="bg-white border border-dashed border-gray-200 rounded-xl p-6 mb-8">
      <div id="liste-categories" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      </div>
    </div>

    <!-- Aperçu visuel -->
    <div class="bg-white border border-gray-100 rounded-xl p-6">
      <h2 class="font-display text-2xl font-semibold text-charcoal mb-5">Aperçu Visuel des Catégories</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2 relative rounded-lg overflow-hidden min-h-[260px] bg-charcoal">
          <img src="canape.jpeg" alt="Collection Mobilier" class="absolute inset-0 w-full h-full object-cover opacity-80" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div class="absolute bottom-5 left-5">
            <p class="text-terra-light text-xs font-semibold uppercase tracking-widest mb-1">Collection Printemps</p>
            <h3 class="font-display text-white text-2xl font-semibold leading-tight mb-3">Curation Mobilier d'Art</h3>
            <button type="button"
              class="border border-white/60 text-white text-xs uppercase tracking-widest px-4 py-2 hover:bg-white hover:text-charcoal transition-colors duration-200">
              Voir plus
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <div class="bg-terra-pale rounded-lg p-5 flex-1 flex flex-col justify-between">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs text-terracotta font-semibold uppercase tracking-widest mb-1">Mises à jour</p>
                <p class="text-sm text-charcoal leading-snug">3 nouvelles catégories créées cette semaine</p>
              </div>
              <i class="fa-regular fa-clock text-terracotta text-sm mt-0.5"></i>
            </div>
          </div>
          <div class="bg-charcoal rounded-lg p-5 flex-1 flex flex-col justify-end relative overflow-hidden">
            <div class="absolute inset-0 opacity-10">
              <div class="absolute top-2 right-2 w-20 h-20 rounded-full border border-white/20"></div>
              <div class="absolute bottom-2 left-2 w-12 h-12 rounded-full border border-white/20"></div>
            </div>
            <p class="text-terra-light text-xs font-semibold uppercase tracking-widest mb-1 relative z-10">Analytics</p>
            <p class="font-display text-white text-xl font-semibold relative z-10">Performance</p>
          </div>
        </div>
      </div>
    </div>
  `;

  rendreGrilleCategories();
  attacherEcouteursFiltres();
}


function rendreVueDetailCategorie(cat) {
  categorieActive = cat.id;
  var zone = document.getElementById('zone-contenu-categories');
  if (!zone) return;

  var badgeStatut = cat.statut === 'active'
    ? '<span class="bg-green-100 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full">Active</span>'
    : '<span class="bg-gray-100 text-muted text-xs font-medium px-2.5 py-1 rounded-full">Archivée</span>';

  zone.innerHTML = `
    <div class="animer-fond">

      <!-- Fil d'Ariane + retour -->
      <div class="flex items-center gap-2 mb-6 text-xs text-muted">
        <button id="bouton-retour-liste" type="button" class="flex items-center gap-1.5 hover:text-terracotta transition">
          <i class="fa-solid fa-arrow-left text-xs"></i> Catégories
        </button>
        <span>/</span>
        <span class="text-charcoal font-medium">${cat.nom}</span>
      </div>

      <!-- En-tête catégorie -->
      <div class="bg-white border border-gray-100 rounded-xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="w-14 h-14 rounded-xl bg-terra-pale flex items-center justify-center flex-shrink-0">
          <i class="fa-solid ${cat.icone} text-2xl text-terracotta"></i>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-1">
            <h2 class="font-display text-3xl font-semibold text-charcoal">${cat.nom}</h2>
            ${badgeStatut}
          </div>
          <p class="text-sm text-muted">${cat.articles} articles répertoriés dans cette catégorie</p>
        </div>
        <div class="flex items-center gap-2 self-start sm:self-center">
          <button type="button" class="border border-gray-200 text-charcoal text-xs uppercase tracking-widest px-4 py-2 hover:bg-beige transition-colors duration-200">
            <i class="fa-regular fa-pen-to-square mr-1.5"></i> Modifier
          </button>
          <button type="button" class="border border-red-200 text-red-400 text-xs uppercase tracking-widest px-4 py-2 hover:bg-red-50 transition-colors duration-200">
            <i class="fa-regular fa-trash-can mr-1.5"></i> Supprimer
          </button>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-xl p-5 border border-gray-100">
          <p class="text-xs text-muted uppercase tracking-wider mb-2">Total articles</p>
          <p class="text-3xl font-semibold text-charcoal font-display">${cat.articles}</p>
        </div>
        <div class="bg-white rounded-xl p-5 border border-gray-100">
          <p class="text-xs text-muted uppercase tracking-wider mb-2">Ventes ce mois</p>
          <p class="text-3xl font-semibold text-charcoal font-display">${Math.floor(cat.articles * 1.8)}</p>
        </div>
        <div class="bg-white rounded-xl p-5 border border-gray-100">
          <p class="text-xs text-muted uppercase tracking-wider mb-2">Chiffre d'affaires</p>
          <p class="text-3xl font-semibold text-charcoal font-display">${(cat.articles * 42500).toLocaleString('fr-FR')} Fcfa</p>
        </div>
      </div>

      <!-- Liste articles placeholder -->
      <div class="bg-white border border-dashed border-gray-200 rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-charcoal uppercase tracking-wider">Articles de la catégorie</h3>
          <button type="button" class="flex items-center gap-1.5 bg-charcoal text-white text-xs uppercase tracking-widest px-4 py-2 hover:bg-terracotta transition-colors duration-200">
            <i class="fa-solid fa-plus text-xs"></i> Ajouter
          </button>
        </div>
        <div class="flex flex-col gap-3">
          ${genererArticlesPlaceholder(cat)}
        </div>
      </div>

    </div>
  `;

  var boutonRetour = document.getElementById('bouton-retour-liste');
  boutonRetour.addEventListener('click', function() {
    categorieActive = null;
    rendreVueListe();
    attacherEcouteursFiltres();
  });
  var lienProduits = document.getElementById('nav-produits');
lienProduits.addEventListener('click', function(evenement) {
  evenement.preventDefault();
  afficherPageProduits(prenom);
});
}


function genererArticlesPlaceholder(cat) {
  var nomsExemples = [
    'Canapé Élite', 'Chaise Lounge', 'Table Basse', 'Armoire Classique',
    'Étagère Moderne', 'Bureau Exécutif', 'Lampe Torchère', 'Miroir Doré'
  ];
  var html = '';
  var nombre = Math.min(cat.articles, 5);
  for (var i = 0; i < nombre; i++) {
    var nom = nomsExemples[i % nomsExemples.length] + ' ' + cat.nom;
    var prix = ((i + 1) * 35000 + Math.floor(Math.random() * 10000)).toLocaleString('fr-FR');
    html += `
      <div class="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-lg hover:border-terracotta transition cursor-pointer">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-md bg-terra-pale flex items-center justify-center flex-shrink-0">
            <i class="fa-solid ${cat.icone} text-sm text-terracotta"></i>
          </div>
          <div>
            <p class="text-sm font-medium text-charcoal">${nom}</p>
            <p class="text-xs text-muted">Réf. DF-${cat.id.substring(0,3).toUpperCase()}-00${i + 1}</p>
          </div>
        </div>
        <p class="text-sm font-semibold text-charcoal">${prix} Fcfa</p>
      </div>
    `;
  }
  if (cat.articles > 5) {
    html += `<p class="text-xs text-muted text-center pt-2">+ ${cat.articles - 5} autres articles…</p>`;
  }
  return html;
}


function rendreGrilleCategories() {
  var liste = document.getElementById('liste-categories');
  if (!liste) return;
  liste.innerHTML = '';

  var categoriesFiltrees = donneesCategories.filter(function(cat) {
    var correspondFiltre =
      filtreActif === 'toutes'   ||
      (filtreActif === 'actives'  && cat.statut === 'active')  ||
      (filtreActif === 'archives' && cat.statut === 'archive');

    var correspondRecherche =
      recherche === '' ||
      cat.nom.toLowerCase().includes(recherche.toLowerCase());

    return correspondFiltre && correspondRecherche;
  });

  if (categoriesFiltrees.length === 0) {
    var messageVide = document.createElement('p');
    messageVide.className = 'col-span-4 text-center text-sm text-muted py-8';
    messageVide.textContent = 'Aucune catégorie trouvée.';
    liste.appendChild(messageVide);
    return;
  }

  categoriesFiltrees.forEach(function(cat) {
    var carte = document.createElement('div');
    carte.className = 'flex flex-col items-center justify-center gap-3 p-6 border border-gray-100 rounded-xl hover:border-terracotta hover:shadow-sm transition cursor-pointer group';
    carte.setAttribute('data-id', cat.id);

    var icone = document.createElement('i');
    icone.className = 'fa-solid ' + cat.icone + ' text-2xl text-muted group-hover:text-terracotta transition';

    var nom = document.createElement('p');
    nom.className = 'text-sm font-medium text-charcoal';
    nom.textContent = cat.nom;

    var articles = document.createElement('p');
    articles.className = 'text-xs text-muted';
    articles.textContent = cat.articles + ' Articles répertoriés';

    carte.appendChild(icone);
    carte.appendChild(nom);
    carte.appendChild(articles);

    carte.addEventListener('click', function() {
      rendreVueDetailCategorie(cat);
    });

    liste.appendChild(carte);
  });

}


function attacherEcouteursFiltres() {
  var boutonToutes   = document.getElementById('filtre-toutes');
  var boutonActives  = document.getElementById('filtre-actives');
  var boutonArchives = document.getElementById('filtre-archives');
  var champRecherche = document.getElementById('champ-recherche-categories');

  if (!boutonToutes) return;

  function activerFiltre(filtre) {
    filtreActif = filtre;
    boutonToutes.className   = 'btn-filtre px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition';
    boutonActives.className  = 'btn-filtre px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition';
    boutonArchives.className = 'btn-filtre px-3 py-1.5 text-xs rounded-md font-medium text-muted hover:text-charcoal hover:bg-beige transition';
    if (filtre === 'toutes')   boutonToutes.className   = 'btn-filtre px-3 py-1.5 text-xs rounded-md font-medium bg-charcoal text-white transition';
    if (filtre === 'actives')  boutonActives.className  = 'btn-filtre px-3 py-1.5 text-xs rounded-md font-medium bg-charcoal text-white transition';
    if (filtre === 'archives') boutonArchives.className = 'btn-filtre px-3 py-1.5 text-xs rounded-md font-medium bg-charcoal text-white transition';
    rendreGrilleCategories();
  }

  boutonToutes.addEventListener('click',   function() { activerFiltre('toutes');   });
  boutonActives.addEventListener('click',  function() { activerFiltre('actives');  });
  boutonArchives.addEventListener('click', function() { activerFiltre('archives'); });

  champRecherche.addEventListener('input', function() {
    recherche = champRecherche.value;
    rendreGrilleCategories();
  });
}


function attacherEcouteursCategories(prenom) {
  // Navigation navbar centralisée (voir navigation.js)
  // Ici on garde uniquement la logique spécifique à la page.
  var lienCategories = document.getElementById('nav-categories');
  if (!lienCategories) return;

  // Quand on clique sur « Catégories » depuis la vue détail,
  // on remet la liste et on recharge les filtres.
  lienCategories.addEventListener('click', function(evenement) {
    evenement.preventDefault();
    categorieActive = null;
    rendreVueListe();
    attacherEcouteursFiltres();
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