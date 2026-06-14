import { afficherPageDashboard }  from './dashboard.js';
import { afficherPageCategories } from './categories.js';
import { afficherPageProfil }     from './profil.js';
import { afficherPageDevis }      from './devis.js';
import { afficherPageCommandes }  from './commandes.js';
import { attacherNavigationNavbar } from './navigation.js';

// ─── Déclarations

var donneesProduits = [
  { id: 'p001', nom: 'Canapé Velours Taupe',     categorie: 'mobilier',    prix: 185000, image: 'canape.jpeg',   vedette: true  },
  { id: 'p002', nom: 'Lampe Torchère Dorée',     categorie: 'luminaire',   prix: 62000,  image: 'bureau.png',    vedette: false },
  { id: 'p003', nom: 'Chaise Lounge Naturel',    categorie: 'mobilier',    prix: 94000,  image: 'inscim.png',    vedette: true  },
  { id: 'p004', nom: 'Suspension Rattan',         categorie: 'luminaire',   prix: 47500,  image: 'CONIM.png',     vedette: false },
  { id: 'p005', nom: 'Vase Céramique Trio',       categorie: 'decoration',  prix: 28000,  image: 'bureau.png',    vedette: false },
  { id: 'p006', nom: 'Lit Plateforme Chêne',      categorie: 'mobilier',    prix: 320000, image: 'CONIM.png',     vedette: true  },
  { id: 'p007', nom: 'Table Basse Marbre',        categorie: 'mobilier',    prix: 148000, image: 'canape.jpeg',   vedette: false },
  { id: 'p008', nom: 'Miroir Arche Laiton',       categorie: 'decoration',  prix: 76000,  image: 'inscim.png',    vedette: false },
  { id: 'p009', nom: 'Coussin Lin Ivoire',        categorie: 'textile',     prix: 14500,  image: 'bureau.png',    vedette: false },
  { id: 'p010', nom: 'Bureau Exécutif Noyer',     categorie: 'bureau',      prix: 265000, image: 'CONIM.png',     vedette: true  },
  { id: 'p011', nom: 'Étagère Modulaire',         categorie: 'rangement',   prix: 112000, image: 'canape.jpeg',   vedette: false },
  { id: 'p012', nom: 'Plaid Cachemire Sable',     categorie: 'textile',     prix: 39000,  image: 'inscim.png',    vedette: false },
];

var categoriesDisponibles = [
  { id: 'toutes',     nom: 'Toutes les catégories' },
  { id: 'mobilier',   nom: 'Mobilier'   },
  { id: 'luminaire',  nom: 'Luminaire'  },
  { id: 'decoration', nom: 'Décoration' },
  { id: 'textile',    nom: 'Textile'    },
  { id: 'rangement',  nom: 'Rangement'  },
  { id: 'bureau',     nom: 'Bureau'     },
];

var filtreCategorie = 'toutes';
var filtreRecherche = '';
var filtreTri       = 'nom';
var vueActive       = 'grille'; // 'grille' | 'liste'


// ─── Fonctions ────────────────────────────────────────────────────────────────

export function afficherPageProduits(prenomUtilisateur) {
  history.pushState({ page: 'produits', nom: prenomUtilisateur }, '', '#produits');

  var conteneurApp = document.getElementById('app');
  var prenom = prenomUtilisateur || 'Utilisateur';

  filtreCategorie = 'toutes';
  filtreRecherche = '';
  filtreTri       = 'nom';
  vueActive       = 'grille';

  conteneurApp.className = 'w-full';

  document.getElementById('corps-application').className =
    'font-body bg-beige min-h-screen block p-0 transition-all duration-300';

  conteneurApp.innerHTML = `
    <div id="page-produits" class="animer-fond w-full min-h-screen bg-beige flex flex-col">

      <header id="navbar" class="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50">

        <div id="navbar-logo" class="flex items-center gap-2 mr-10">
          <img src="LOGOD.png" alt="DecoFlow" class="h-8" />
          <span class="font-display text-2xl font-semibold text-charcoal tracking-wide">DecoFlow</span>
        </div>

        <nav id="navbar-nav" class="hidden md:flex items-center gap-1 flex-1">
          <a id="nav-dashboard"  href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Dashboard</a>
          <a id="nav-produits"   href="#" class="nav-lien px-3 py-1.5 text-sm font-medium text-charcoal border-b-2 border-terracotta">Produits</a>
          <a id="nav-categories" href="#" class="nav-lien px-3 py-1.5 text-sm text-muted hover:text-charcoal border-b-2 border-transparent hover:border-terra-light transition">Catégories</a>
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

      <main id="contenu-produits" class="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">

        <!-- En-tête section -->
        <div class="mb-6 border border-dashed border-gray-200 rounded-xl p-6 bg-white flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 class="font-display text-4xl font-semibold text-charcoal mb-1">Catalogue Produits</h1>
            <p class="text-sm text-muted max-w-md">Parcourez et gérez l'ensemble de votre collection. Filtrez par catégorie, recherchez par nom ou triez selon vos besoins.</p>
          </div>
          <button id="bouton-ajouter-produit" type="button"
            class="flex items-center gap-2 bg-charcoal text-white text-xs uppercase tracking-widest px-5 py-3 hover:bg-terracotta transition-colors duration-200 whitespace-nowrap self-start">
            <i class="fa-solid fa-plus text-xs"></i> Ajouter un produit
          </button>
        </div>

        <!-- Corps : sidebar + grille -->
        <div class="flex gap-6 items-start">

          <!-- Sidebar filtres -->
          <aside id="sidebar-filtres" class="hidden lg:flex flex-col gap-4 w-52 flex-shrink-0">

            <div class="bg-white border border-gray-100 rounded-xl p-5">
              <p class="text-xs font-semibold text-charcoal uppercase tracking-widest mb-3">Catégories</p>
              <ul id="liste-filtres-categorie" class="flex flex-col gap-1"></ul>
            </div>

            <div class="bg-white border border-gray-100 rounded-xl p-5">
              <p class="text-xs font-semibold text-charcoal uppercase tracking-widest mb-3">Prix</p>
              <div class="flex flex-col gap-2">
                <label class="flex items-center gap-2 text-sm text-muted cursor-pointer">
                  <input type="radio" name="filtre-prix" value="tous" checked class="accent-terracotta" /> Tous
                </label>
                <label class="flex items-center gap-2 text-sm text-muted cursor-pointer">
                  <input type="radio" name="filtre-prix" value="bas" class="accent-terracotta" /> &lt; 50 000 Fcfa
                </label>
                <label class="flex items-center gap-2 text-sm text-muted cursor-pointer">
                  <input type="radio" name="filtre-prix" value="moyen" class="accent-terracotta" /> 50 000 – 150 000
                </label>
                <label class="flex items-center gap-2 text-sm text-muted cursor-pointer">
                  <input type="radio" name="filtre-prix" value="haut" class="accent-terracotta" /> &gt; 150 000 Fcfa
                </label>
              </div>
            </div>

          </aside>

          <!-- Zone principale -->
          <div class="flex-1 flex flex-col gap-4">

            <!-- Barre recherche / tri / vue -->
            <div class="bg-white border border-gray-100 rounded-xl px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div class="relative flex-1 max-w-xs">
                <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
                  <i class="fa-solid fa-magnifying-glass text-xs"></i>
                </span>
                <input id="champ-recherche-produits" type="text" placeholder="Rechercher un produit…"
                  class="w-full border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-xs text-charcoal placeholder-gray-400 bg-beige/40 focus:outline-none focus:border-terracotta transition" />
              </div>

              <div class="flex items-center gap-3">
                <select id="select-tri" class="border border-gray-200 rounded-lg px-3 py-2 text-xs text-charcoal bg-beige/40 focus:outline-none focus:border-terracotta transition cursor-pointer">
                  <option value="nom">Trier : Nom A–Z</option>
                  <option value="prix-asc">Prix croissant</option>
                  <option value="prix-desc">Prix décroissant</option>
                </select>

                <div class="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
                  <button id="bouton-vue-grille" type="button" title="Vue grille"
                    class="px-3 py-2 text-xs bg-charcoal text-white transition">
                    <i class="fa-solid fa-grip"></i>
                  </button>
                  <button id="bouton-vue-liste" type="button" title="Vue liste"
                    class="px-3 py-2 text-xs text-muted hover:text-charcoal hover:bg-beige transition">
                    <i class="fa-solid fa-list"></i>
                  </button>
                </div>
              </div>

            </div>

            <!-- Grille / liste produits -->
            <div id="zone-produits" class="bg-white border border-dashed border-gray-200 rounded-xl p-6">
              <div id="conteneur-produits" class="grid grid-cols-2 sm:grid-cols-3 gap-5"></div>
            </div>

            <!-- Compteur résultats -->
            <p id="compteur-produits" class="text-xs text-muted text-right"></p>

          </div>

        </div>

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

  rendreFiltreSidebar();
  rendreProduits();
  attacherEcouteursProduits(prenom);
  attacherNavigationNavbar(prenom);
}



function rendreFiltreSidebar() {
  var liste = document.getElementById('liste-filtres-categorie');
  if (!liste) return;
  liste.innerHTML = '';

  categoriesDisponibles.forEach(function(cat) {
    var li = document.createElement('li');

    var bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.setAttribute('data-categorie', cat.id);
    bouton.className = cat.id === filtreCategorie
      ? 'w-full text-left text-sm font-medium text-terracotta px-2 py-1 rounded-md bg-terra-pale transition'
      : 'w-full text-left text-sm text-muted px-2 py-1 rounded-md hover:text-charcoal hover:bg-beige transition';
    bouton.textContent = cat.nom;

    li.appendChild(bouton);
    liste.appendChild(li);
  });
}


function obtenirProduitsFiltres() {
  var filtrePrix = document.querySelector('input[name="filtre-prix"]:checked');
  var valeurPrix = filtrePrix ? filtrePrix.value : 'tous';

  return donneesProduits
    .filter(function(p) {
      var correspondCategorie =
        filtreCategorie === 'toutes' || p.categorie === filtreCategorie;

      var correspondRecherche =
        filtreRecherche === '' ||
        p.nom.toLowerCase().includes(filtreRecherche.toLowerCase());

      var correspondPrix =
        valeurPrix === 'tous'  ||
        (valeurPrix === 'bas'   && p.prix < 50000)   ||
        (valeurPrix === 'moyen' && p.prix >= 50000 && p.prix <= 150000) ||
        (valeurPrix === 'haut'  && p.prix > 150000);

      return correspondCategorie && correspondRecherche && correspondPrix;
    })
    .sort(function(a, b) {
      if (filtreTri === 'prix-asc')  return a.prix - b.prix;
      if (filtreTri === 'prix-desc') return b.prix - a.prix;
      return a.nom.localeCompare(b.nom, 'fr');
    });
}


function rendreProduits() {
  var conteneur = document.getElementById('conteneur-produits');
  var compteur  = document.getElementById('compteur-produits');
  if (!conteneur) return;

  conteneur.innerHTML = '';

  var produitsFiltres = obtenirProduitsFiltres();

  if (vueActive === 'grille') {
    conteneur.className = 'grid grid-cols-2 sm:grid-cols-3 gap-5';
  } else {
    conteneur.className = 'flex flex-col gap-3';
  }

  if (produitsFiltres.length === 0) {
    var vide = document.createElement('p');
    vide.className = 'col-span-3 text-center text-sm text-muted py-10';
    vide.textContent = 'Aucun produit trouvé.';
    conteneur.appendChild(vide);
    if (compteur) compteur.textContent = '';
    return;
  }

  produitsFiltres.forEach(function(produit) {
    var carte = vueActive === 'grille'
      ? creerCarteGrille(produit)
      : creerCarteListe(produit);
    conteneur.appendChild(carte);
  });

  if (compteur) {
    compteur.textContent = produitsFiltres.length + ' produit' + (produitsFiltres.length > 1 ? 's' : '') + ' affiché' + (produitsFiltres.length > 1 ? 's' : '');
  }
}


function creerCarteGrille(produit) {
  var carte = document.createElement('div');
  carte.className = 'group flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:border-terracotta hover:shadow-sm transition cursor-pointer';
  carte.setAttribute('data-id', produit.id);

  var imageConteneur = document.createElement('div');
  imageConteneur.className = 'relative aspect-square bg-[#C4A882] overflow-hidden';

  var image = document.createElement('img');
  image.src = produit.image;
  image.alt = produit.nom;
  image.className = 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300';

  if (produit.vedette) {
    var badge = document.createElement('span');
    badge.className = 'absolute top-2 left-2 bg-terracotta text-white text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm';
    badge.textContent = 'Vedette';
    imageConteneur.appendChild(badge);
  }

  var boutonAction = document.createElement('button');
  boutonAction.type = 'button';
  boutonAction.className = 'absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-muted hover:text-terracotta opacity-0 group-hover:opacity-100 transition';
  boutonAction.innerHTML = '<i class="fa-regular fa-heart text-xs"></i>';

  imageConteneur.appendChild(image);
  imageConteneur.appendChild(boutonAction);

  var corps = document.createElement('div');
  corps.className = 'p-4 flex flex-col gap-1 bg-white';

  var nomEl = document.createElement('p');
  nomEl.className = 'text-sm font-medium text-charcoal leading-tight';
  nomEl.textContent = produit.nom;

  var categorieEl = document.createElement('p');
  categorieEl.className = 'text-xs text-muted capitalize';
  categorieEl.textContent = produit.categorie;

  var prixEl = document.createElement('p');
  prixEl.className = 'text-sm font-semibold text-charcoal mt-1';
  prixEl.textContent = produit.prix.toLocaleString('fr-FR') + ' Fcfa';

  corps.appendChild(nomEl);
  corps.appendChild(categorieEl);
  corps.appendChild(prixEl);

  carte.appendChild(imageConteneur);
  carte.appendChild(corps);

  return carte;
}


function creerCarteListe(produit) {
  var ligne = document.createElement('div');
  ligne.className = 'flex items-center gap-4 border border-gray-100 rounded-xl p-3 hover:border-terracotta transition cursor-pointer';
  ligne.setAttribute('data-id', produit.id);

  var imageConteneur = document.createElement('div');
  imageConteneur.className = 'w-14 h-14 rounded-lg overflow-hidden bg-[#C4A882] flex-shrink-0';

  var image = document.createElement('img');
  image.src = produit.image;
  image.alt = produit.nom;
  image.className = 'w-full h-full object-cover';

  imageConteneur.appendChild(image);

  var infos = document.createElement('div');
  infos.className = 'flex-1 min-w-0';

  var nomEl = document.createElement('p');
  nomEl.className = 'text-sm font-medium text-charcoal truncate';
  nomEl.textContent = produit.nom;

  var categorieEl = document.createElement('p');
  categorieEl.className = 'text-xs text-muted capitalize';
  categorieEl.textContent = produit.categorie;

  infos.appendChild(nomEl);
  infos.appendChild(categorieEl);

  var prixEl = document.createElement('p');
  prixEl.className = 'text-sm font-semibold text-charcoal flex-shrink-0';
  prixEl.textContent = produit.prix.toLocaleString('fr-FR') + ' Fcfa';

  if (produit.vedette) {
    var badge = document.createElement('span');
    badge.className = 'text-[10px] uppercase tracking-widest bg-terra-pale text-terracotta px-2 py-0.5 rounded-sm flex-shrink-0';
    badge.textContent = 'Vedette';
    ligne.appendChild(imageConteneur);
    ligne.appendChild(infos);
    ligne.appendChild(badge);
    ligne.appendChild(prixEl);
  } else {
    ligne.appendChild(imageConteneur);
    ligne.appendChild(infos);
    ligne.appendChild(prixEl);
  }

  return ligne;
}


function mettreAJourBoutonsVue() {
  var boutonGrille = document.getElementById('bouton-vue-grille');
  var boutonListe  = document.getElementById('bouton-vue-liste');
  if (!boutonGrille || !boutonListe) return;

  if (vueActive === 'grille') {
    boutonGrille.className = 'px-3 py-2 text-xs bg-charcoal text-white transition';
    boutonListe.className  = 'px-3 py-2 text-xs text-muted hover:text-charcoal hover:bg-beige transition';
  } else {
    boutonGrille.className = 'px-3 py-2 text-xs text-muted hover:text-charcoal hover:bg-beige transition';
    boutonListe.className  = 'px-3 py-2 text-xs bg-charcoal text-white transition';
  }
}


// ─── Écouteurs ────────────────────────────────────────────────────────────────

function attacherEcouteursProduits(prenom) {


  // Recherche
  var champRecherche = document.getElementById('champ-recherche-produits');
  champRecherche.addEventListener('input', function() {
    filtreRecherche = champRecherche.value;
    rendreProduits();
  });

  // Tri
  var selectTri = document.getElementById('select-tri');
  selectTri.addEventListener('change', function() {
    filtreTri = selectTri.value;
    rendreProduits();
  });

  // Bascule vue
  var boutonGrille = document.getElementById('bouton-vue-grille');
  var boutonListe  = document.getElementById('bouton-vue-liste');

  boutonGrille.addEventListener('click', function() {
    vueActive = 'grille';
    mettreAJourBoutonsVue();
    rendreProduits();
  });

  boutonListe.addEventListener('click', function() {
    vueActive = 'liste';
    mettreAJourBoutonsVue();
    rendreProduits();
  });

  // Filtres catégorie (delegation sur la sidebar)
var listeFiltres = document.getElementById('liste-filtres-categorie');
  if (listeFiltres) {
    listeFiltres.addEventListener('click', function(evenement) {
      var bouton = evenement.target.closest('button[data-categorie]');
      if (!bouton) return;
      filtreCategorie = bouton.getAttribute('data-categorie');
      rendreFiltreSidebar();
      rendreProduits();
    });
  }

  var sidebarFiltres = document.getElementById('sidebar-filtres');
  if (sidebarFiltres) {
    sidebarFiltres.addEventListener('change', function(evenement) {
      if (evenement.target.name === 'filtre-prix') {
        rendreProduits();
      }
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