import { afficherPageDashboard } from "./dashboard.js";
import { afficherPageCategories } from "./categories.js";
import { afficherPageProfil } from "./profil.js";
import { afficherPageProduits } from "./produits.js";
import { afficherPageCommandes } from "./commandes.js";
import { attacherNavigationNavbar } from "./navigation.js";

var donneesDevis = [
  {
    id: "DF-Q001",
    initiales: "AB",
    couleur: "bg-[#C4A882]",
    client: "Atelier Bourgeois",
    ville: "Paris, France",
    projet: "Rénovation Loft Saint-Germain",
    badge: "CURATION MOBILIER",
    badgeCouleur: "bg-terra-pale text-terracotta",
    expiration: "15 Déc. 2024",
    depasse: false,
    montant: "24 500,00",
  },
  {
    id: "DF-Q002",
    initiales: "ML",
    couleur: "bg-[#2C2A27]",
    client: "Mme. Laurent",
    ville: "Cannes, France",
    projet: "Villa Azur — Salon d'été",
    badge: "ESPACE EXTÉRIEUR",
    badgeCouleur: "bg-beige text-charcoal",
    expiration: "28 Nov. 2024",
    depasse: true,
    montant: "8 200,00",
  },
  {
    id: "DF-Q003",
    initiales: "RH",
    couleur: "bg-terracotta",
    client: "Résidence Haussmann",
    ville: "Bordeaux, France",
    projet: "Concept Déco — Hall d'entrée",
    badge: "CONSEIL",
    badgeCouleur: "bg-terra-pale text-terracotta",
    expiration: "05 Janv. 2025",
    depasse: false,
    montant: "4 750,00",
  },
];

var devisAffiches = 3;

export function afficherPageDevis(prenomUtilisateur) {
  history.pushState({ page: "devis", nom: prenomUtilisateur }, "", "#devis");

  var conteneurApp = document.getElementById("app");
  var prenom = prenomUtilisateur || "Utilisateur";

  conteneurApp.className = "w-full";

  document.getElementById("corps-application").className =
    "font-body bg-beige min-h-screen block p-0 transition-all duration-300";

  conteneurApp.innerHTML = `
    <div id="page-devis" class="animer-fond w-full min-h-screen bg-beige flex flex-col">

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
          <a id="nav-quotes"     href="#" class="nav-lien px-3 py-1.5 text-sm font-medium text-charcoal border-b-2 border-terracotta">Devis</a>
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

      <main id="contenu-devis" class="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">

        <div class="mb-6 border border-dashed border-gray-200 rounded-xl p-6 bg-white flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 class="font-display text-4xl font-semibold text-charcoal mb-1">Gestion des Devis</h1>
            <p class="text-sm text-muted max-w-md">Visualisez et gérez vos propositions commerciales en cours. Un environnement serein pour orchestrer vos futurs projets d'exception.</p>
          </div>
          <button id="bouton-nouveau-devis" type="button"
            class="flex items-center gap-2 bg-charcoal text-white text-xs uppercase tracking-widest px-5 py-3 hover:bg-terracotta transition-colors duration-200 whitespace-nowrap self-start">
            <i class="fa-solid fa-plus text-xs"></i> Nouveau Devis
          </button>
        </div>

        <!-- Barre recherche + filtre -->
        <div class="bg-white border border-gray-100 rounded-xl px-5 py-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div class="relative">
            <span class="absolute inset-y-0 left-3 flex items-center text-muted pointer-events-none">
              <i class="fa-solid fa-magnifying-glass text-xs"></i>
            </span>
            <input id="champ-recherche-devis" type="text" placeholder="Rechercher un devis ou un client…"
              class="border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-xs text-charcoal placeholder-gray-400 bg-beige/40 focus:outline-none focus:border-terracotta transition w-72" />
          </div>
          <button id="bouton-filtrer" type="button"
            class="flex items-center gap-2 border border-gray-200 text-charcoal text-xs uppercase tracking-widest px-4 py-2 hover:bg-beige transition-colors duration-200 self-start">
            <i class="fa-solid fa-sliders text-xs"></i> Filtrer
          </button>
        </div>

        <!-- Tableau -->
        <div class="bg-white border border-gray-100 rounded-xl overflow-hidden mb-6">

          <!-- En-têtes -->
          <div class="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_auto] px-6 py-3 border-b border-gray-100">
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Client</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Projet</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Date d'expiration</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Montant estimé</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Actions</span>
          </div>

          <!-- Lignes -->
          <div id="liste-devis"></div>

        </div>

        <!-- Voir plus -->
        <div class="flex justify-center">
          <button id="bouton-voir-plus" type="button"
            class="flex items-center gap-2 border border-gray-200 bg-white text-charcoal text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-beige transition-colors duration-200">
            Voir plus de devis <i class="fa-solid fa-chevron-down text-xs"></i>
          </button>
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

  rendreListeDevis(donneesDevis.slice(0, devisAffiches));
  attacherEcouteursDevis(prenom);
  attacherNavigationNavbar(prenom);
}

// ─── Rendu liste ──────────────────────────────────────────────────────────────

function rendreListeDevis(liste) {
  var conteneur = document.getElementById("liste-devis");
  if (!conteneur) return;

  conteneur.innerHTML = "";

  if (liste.length === 0) {
    var vide = document.createElement("p");
    vide.className = "text-center text-sm text-muted py-10";
    vide.textContent = "Aucun devis trouvé.";
    conteneur.appendChild(vide);
    return;
  }

  liste.forEach(function (devis) {
    var ligne = document.createElement("div");
    ligne.className =
      "grid grid-cols-[2fr_2fr_1.5fr_1.5fr_auto] items-center px-6 py-4 border-b border-gray-50 hover:bg-beige/30 transition";
    ligne.setAttribute("data-id", devis.id);

    // Colonne client
    var colonneClient = document.createElement("div");
    colonneClient.className = "flex items-center gap-3";

    var avatar = document.createElement("div");
    avatar.className =
      "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-white " +
      devis.couleur;
    avatar.textContent = devis.initiales;

    var infoClient = document.createElement("div");
    var nomClient = document.createElement("p");
    nomClient.className = "text-sm font-medium text-charcoal leading-snug";
    nomClient.textContent = devis.client;
    var villeClient = document.createElement("p");
    villeClient.className = "text-xs text-muted";
    villeClient.textContent = devis.ville;
    infoClient.appendChild(nomClient);
    infoClient.appendChild(villeClient);

    colonneClient.appendChild(avatar);
    colonneClient.appendChild(infoClient);

    // Colonne projet
    var colonneProjet = document.createElement("div");
    var nomProjet = document.createElement("p");
    nomProjet.className = "text-sm text-charcoal leading-snug mb-1";
    nomProjet.textContent = devis.projet;
    var badgeProjet = document.createElement("span");
    badgeProjet.className =
      "inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm " +
      devis.badgeCouleur;
    badgeProjet.textContent = devis.badge;
    colonneProjet.appendChild(nomProjet);
    colonneProjet.appendChild(badgeProjet);

    // Colonne expiration
    var colonneExpiration = document.createElement("div");
    colonneExpiration.className = "flex items-center gap-1.5";
    var iconeDate = document.createElement("i");
    iconeDate.className = devis.depasse
      ? "fa-solid fa-triangle-exclamation text-xs text-red-400"
      : "fa-regular fa-calendar text-xs text-muted";
    var texteDate = document.createElement("span");
    texteDate.className = devis.depasse
      ? "text-sm text-red-400 font-medium"
      : "text-sm text-charcoal";
    texteDate.textContent = devis.expiration;
    colonneExpiration.appendChild(iconeDate);
    colonneExpiration.appendChild(texteDate);

    // Colonne montant
    var colonneMontant = document.createElement("div");
    colonneMontant.className = "flex items-center gap-2";
    var texteMontant = document.createElement("p");
    texteMontant.className = "text-sm font-semibold text-charcoal font-display";
    texteMontant.textContent = devis.montant + " Fcfa";
    var iconeChariot = document.createElement("i");
    iconeChariot.className = "fa-solid fa-cart-shopping text-xs text-muted";
    colonneMontant.appendChild(texteMontant);
    colonneMontant.appendChild(iconeChariot);

    // Colonne actions
    var colonneActions = document.createElement("div");
    colonneActions.className = "flex items-center gap-2";

    var boutonEnvoyer = document.createElement("button");
    boutonEnvoyer.type = "button";
    boutonEnvoyer.className =
      "w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-muted hover:text-terracotta hover:border-terracotta transition";
    boutonEnvoyer.setAttribute("data-id", devis.id);
    var iconeEnvoyer = document.createElement("i");
    iconeEnvoyer.className = "fa-regular fa-envelope text-xs";
    boutonEnvoyer.appendChild(iconeEnvoyer);

    var boutonMenu = document.createElement("button");
    boutonMenu.type = "button";
    boutonMenu.className =
      "w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-muted hover:text-charcoal hover:border-charcoal transition";
    boutonMenu.setAttribute("data-id", devis.id);
    var iconeMenu = document.createElement("i");
    iconeMenu.className = "fa-solid fa-ellipsis-vertical text-xs";
    boutonMenu.appendChild(iconeMenu);

    colonneActions.appendChild(boutonEnvoyer);
    colonneActions.appendChild(boutonMenu);

    ligne.appendChild(colonneClient);
    ligne.appendChild(colonneProjet);
    ligne.appendChild(colonneExpiration);
    ligne.appendChild(colonneMontant);
    ligne.appendChild(colonneActions);

    conteneur.appendChild(ligne);
  });
}

// ─── Écouteurs ────────────────────────────────────────────────────────────────

function attacherEcouteursDevis(prenom) {
  // ── Recherche ──
  var champRecherche = document.getElementById("champ-recherche-devis");
  if (!champRecherche) return;

  champRecherche.addEventListener("input", function () {
    var terme = champRecherche.value.toLowerCase().trim();
    var filtrés = donneesDevis.filter(function (devis) {
      return (
        devis.client.toLowerCase().includes(terme) ||
        devis.projet.toLowerCase().includes(terme) ||
        devis.ville.toLowerCase().includes(terme)
      );
    });
    rendreListeDevis(filtrés);
  });

  // ── Voir plus ──
  var boutonVoirPlus = document.getElementById("bouton-voir-plus");
  if (!boutonVoirPlus) return;
  boutonVoirPlus.addEventListener("click", function () {
    devisAffiches = donneesDevis.length;
    rendreListeDevis(donneesDevis);
    boutonVoirPlus.style.display = "none";
  });
}

tailwind.config = {
  theme: {
    extend: {
      colors: {
        beige: "#F5F0EA",
        terracotta: "#C97B5A",
        "terra-light": "#E8A882",
        "terra-pale": "#F2DDD0",
        charcoal: "#2C2A27",
        muted: "#9B9589",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
};
