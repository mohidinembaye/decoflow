import { attacherNavigationNavbar }                        from './navigation.js';
import { lireSession, recupererTousLesUtilisateurs,
         modifierRoleUtilisateur, supprimerUtilisateur }   from './db.js';

// ─── Déclarations ─────────────────────────────────────────────────────────────

var listeUtilisateurs = [];

// ─── Rendu ────────────────────────────────────────────────────────────────────

export async function afficherPageSuperadmin(prenomUtilisateur) {
  var session = lireSession();
  var prenom  = prenomUtilisateur || (session && session.nom) || 'Superadmin';

  // Garde côté rendu
  if (!session || session.role !== 'superadmin') {
    import('./dashboard.js').then(function(m) { m.afficherPageDashboard(prenom); });
    return;
  }

  history.pushState({ page: 'superadmin-panel', nom: prenom }, '', '#superadmin-panel');

  document.getElementById('corps-application').className =
    'font-body bg-beige min-h-screen block p-0 transition-all duration-300';

  var conteneurApp = document.getElementById('app');
  conteneurApp.className = 'w-full';

  conteneurApp.innerHTML = `
    <div id="page-superadmin" class="animer-fond w-full min-h-screen bg-beige flex flex-col">

      <header id="navbar" class="bg-charcoal px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div class="flex items-center gap-2 mr-10">
          <img src="LOGOD.png" alt="DecoFlow" class="h-8 brightness-0 invert" />
          <span class="font-display text-2xl font-semibold text-white tracking-wide">DecoFlow</span>
          <span class="text-[10px] font-semibold uppercase tracking-wider bg-terracotta text-white px-2 py-0.5 rounded-sm ml-2">Superadmin</span>
        </div>
        <nav class="hidden md:flex items-center gap-1 flex-1">
          <a id="nav-dashboard"        href="#" class="nav-lien px-3 py-1.5 text-sm text-white/60 hover:text-white border-b-2 border-transparent hover:border-terra-light transition">Dashboard</a>
          <a id="nav-produits"         href="#" class="nav-lien px-3 py-1.5 text-sm text-white/60 hover:text-white border-b-2 border-transparent hover:border-terra-light transition">Produits</a>
          <a id="nav-categories"       href="#" class="nav-lien px-3 py-1.5 text-sm text-white/60 hover:text-white border-b-2 border-transparent hover:border-terra-light transition">Catégories</a>
          <a id="nav-orders"           href="#" class="nav-lien px-3 py-1.5 text-sm text-white/60 hover:text-white border-b-2 border-transparent hover:border-terra-light transition">Commandes</a>
          <a id="nav-quotes"           href="#" class="nav-lien px-3 py-1.5 text-sm text-white/60 hover:text-white border-b-2 border-transparent hover:border-terra-light transition">Devis</a>
          <a id="nav-admin-panel"      href="#" class="nav-lien px-3 py-1.5 text-sm text-white/60 hover:text-white border-b-2 border-transparent hover:border-terra-light transition">Admin</a>
          <a id="nav-superadmin-panel" href="#" class="nav-lien px-3 py-1.5 text-sm font-medium text-white border-b-2 border-terracotta">Superadmin</a>
        </nav>
        <div class="flex items-center gap-4">
          <div id="profil-utilisateur" class="flex items-center gap-2 cursor-pointer">
            <span class="text-sm font-medium text-white hidden sm:block">${prenom.split(' ')[0]}</span>
            <div class="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center">
              <i class="fa-solid fa-crown text-white text-sm"></i>
            </div>
          </div>
          <button id="bouton-deconnexion" type="button"
            class="text-xs text-white/60 hover:text-red-300 transition flex items-center gap-1">
            <i class="fa-solid fa-right-from-bracket text-xs"></i>
          </button>
        </div>
      </header>

      <main class="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">

        <div class="mb-8">
          <p class="text-xs text-terracotta uppercase tracking-widest font-semibold mb-1">Direction Générale</p>
          <h1 class="font-display text-4xl font-semibold text-charcoal">Panneau Superadmin</h1>
          <p class="text-sm text-muted mt-1">Gestion des rôles utilisateurs, KPIs financiers et configuration système.</p>
        </div>

        <!-- KPIs financiers -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          ${construireKpi('fa-chart-line',    '2 847 500',  'Fcfa CA mensuel',  'text-terracotta')}
          ${construireKpi('fa-users',         '3',          'Utilisateurs',     'text-charcoal')}
          ${construireKpi('fa-box',           '124',        'Produits actifs',  'text-charcoal')}
          ${construireKpi('fa-percent',       '18,4',       '% Marge nette',    'text-terracotta')}
        </div>

        <!-- Produits les plus rentables -->
        <div class="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <h2 class="font-display text-xl font-semibold text-charcoal mb-4">Top Produits — Rentabilité</h2>
          <div class="space-y-3">
            ${construireLigneRentabilite('Canapé Dakar Premium',     '450 000 Fcfa', 38, 85)}
            ${construireLigneRentabilite('Lit Plateforme Sango',     '620 000 Fcfa', 15, 72)}
            ${construireLigneRentabilite('Bureau Acajou Executive',  '280 000 Fcfa', 24, 60)}
            ${construireLigneRentabilite('Fauteuil Rotin XL',        '95 000 Fcfa',  51, 45)}
          </div>
        </div>

        <!-- Gestion utilisateurs -->
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="font-display text-xl font-semibold text-charcoal">Gestion des Utilisateurs</h2>
            <span class="text-xs text-muted">Modifiez les rôles ou supprimez des comptes</span>
          </div>

          <div class="grid grid-cols-[2fr_2fr_1.5fr_auto] px-6 py-3 border-b border-gray-100">
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Utilisateur</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Email</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Rôle actuel</span>
            <span class="text-xs font-semibold text-muted uppercase tracking-wider">Actions</span>
          </div>

          <div id="liste-utilisateurs-superadmin">
            <p class="text-center text-sm text-muted py-8">Chargement des utilisateurs…</p>
          </div>
        </div>

        <!-- Configuration système -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <h2 class="font-display text-xl font-semibold text-charcoal mb-4">Configuration Système</h2>
          <div class="grid md:grid-cols-3 gap-4">
            ${construireCarteConfig('fa-truck', 'Frais de livraison', 'Zones, tarifs, délais de livraison mobilier lourd')}
            ${construireCarteConfig('fa-percent', 'TVA & Taxes', 'Taux de TVA appliqués aux produits')}
            ${construireCarteConfig('fa-bell', 'Notifications', 'Alertes de rupture de stock automatiques')}
          </div>
        </div>

      </main>
    </div>
  `;

  // Navbar gérée globalement par navigation.js
  attacherNavigationNavbar(prenom);

  // Charger les utilisateurs depuis json-server

  listeUtilisateurs = await recupererTousLesUtilisateurs();
  rendreListeUtilisateurs(listeUtilisateurs, prenom);
  attacherEcouteursSuperadmin(prenom);
}

// ─── Rendu liste utilisateurs ─────────────────────────────────────────────────

function rendreListeUtilisateurs(utilisateurs, prenom) {
  var conteneur = document.getElementById('liste-utilisateurs-superadmin');
  if (!conteneur) return;

  conteneur.innerHTML = '';

  if (utilisateurs.length === 0) {
    var vide = document.createElement('p');
    vide.className = 'text-center text-sm text-muted py-8';
    vide.textContent = 'Aucun utilisateur trouvé.';
    conteneur.appendChild(vide);
    return;
  }

  utilisateurs.forEach(function(utilisateur) {
    var ligne = document.createElement('div');
    ligne.className = 'grid grid-cols-[2fr_2fr_1.5fr_auto] items-center px-6 py-4 border-b border-gray-50 hover:bg-beige/30 transition';
    ligne.setAttribute('data-id', utilisateur.id);

    // Nom
    var colonneNom = document.createElement('div');
    var nom = document.createElement('p');
    nom.className = 'text-sm font-medium text-charcoal';
    nom.textContent = utilisateur.nom;
    var entreprise = document.createElement('p');
    entreprise.className = 'text-xs text-muted';
    entreprise.textContent = utilisateur.entreprise || '—';
    colonneNom.appendChild(nom);
    colonneNom.appendChild(entreprise);

    // Email
    var colonneEmail = document.createElement('p');
    colonneEmail.className = 'text-sm text-muted';
    colonneEmail.textContent = utilisateur.email;

    // Rôle (select)
    var colonneRole = document.createElement('div');
    var selectRole = document.createElement('select');
    selectRole.className = 'border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-charcoal bg-beige/40 focus:outline-none focus:border-terracotta transition';
    selectRole.setAttribute('data-id', utilisateur.id);

    var roles = ['client', 'admin', 'superadmin'];
    roles.forEach(function(r) {
      var option = document.createElement('option');
      option.value = r;
      option.textContent = r.charAt(0).toUpperCase() + r.slice(1);
      option.selected = utilisateur.role === r;
      selectRole.appendChild(option);
    });
    colonneRole.appendChild(selectRole);

    // Actions
    var colonneActions = document.createElement('div');
    colonneActions.className = 'flex gap-2';

    var boutonSauvegarder = document.createElement('button');
    boutonSauvegarder.type = 'button';
    boutonSauvegarder.className = 'w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-muted hover:text-terracotta hover:border-terracotta transition';
    boutonSauvegarder.setAttribute('data-id', utilisateur.id);
    boutonSauvegarder.setAttribute('data-action', 'sauvegarder-role');
    boutonSauvegarder.title = 'Sauvegarder le rôle';
    var iconeSauve = document.createElement('i');
    iconeSauve.className = 'fa-regular fa-floppy-disk text-xs';
    boutonSauvegarder.appendChild(iconeSauve);

    var boutonSupprimer = document.createElement('button');
    boutonSupprimer.type = 'button';
    boutonSupprimer.className = 'w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-muted hover:text-red-400 hover:border-red-200 transition';
    boutonSupprimer.setAttribute('data-id', utilisateur.id);
    boutonSupprimer.setAttribute('data-action', 'supprimer-utilisateur');
    boutonSupprimer.setAttribute('data-nom', utilisateur.nom);
    boutonSupprimer.title = 'Supprimer l\'utilisateur';
    var iconeSuppr = document.createElement('i');
    iconeSuppr.className = 'fa-regular fa-trash-can text-xs';
    boutonSupprimer.appendChild(iconeSuppr);

    colonneActions.appendChild(boutonSauvegarder);
    colonneActions.appendChild(boutonSupprimer);

    ligne.appendChild(colonneNom);
    ligne.appendChild(colonneEmail);
    ligne.appendChild(colonneRole);
    ligne.appendChild(colonneActions);

    conteneur.appendChild(ligne);
  });
}

// ─── Constructeurs ────────────────────────────────────────────────────────────

function construireKpi(icone, valeur, label, couleurVal) {
  return `
    <div class="bg-white rounded-xl p-5 border border-gray-100 flex items-center gap-4">
      <div class="w-10 h-10 rounded-full bg-beige flex items-center justify-center flex-shrink-0">
        <i class="fa-solid ${icone} text-terracotta text-sm"></i>
      </div>
      <div>
        <p class="font-display text-xl font-semibold ${couleurVal}">${valeur}</p>
        <p class="text-xs text-muted">${label}</p>
      </div>
    </div>
  `;
}

function construireLigneRentabilite(nom, prix, ventes, pourcentage) {
  return `
    <div class="py-3 border-b border-gray-50">
      <div class="flex items-center justify-between mb-1.5">
        <p class="text-sm font-medium text-charcoal">${nom}</p>
        <div class="flex items-center gap-3">
          <span class="text-xs text-muted">${ventes} vendus</span>
          <span class="text-sm font-semibold font-display text-terracotta">${prix}</span>
        </div>
      </div>
      <div class="w-full bg-beige rounded-full h-1.5">
        <div class="bg-terracotta h-1.5 rounded-full barre-graphique" style="width: ${pourcentage}%"></div>
      </div>
    </div>
  `;
}

function construireCarteConfig(icone, titre, description) {
  return `
    <div class="border border-gray-100 rounded-xl p-5 hover:border-terracotta transition cursor-pointer">
      <i class="fa-solid ${icone} text-terracotta text-lg mb-3 block"></i>
      <p class="text-sm font-semibold text-charcoal mb-1">${titre}</p>
      <p class="text-xs text-muted">${description}</p>
    </div>
  `;
}

// ─── Écouteurs ────────────────────────────────────────────────────────────────

function attacherEcouteursSuperadmin(prenom) {
  var conteneur = document.getElementById('liste-utilisateurs-superadmin');
  if (!conteneur) return;

  // Délégation d'événements sur le conteneur de la liste
  conteneur.addEventListener('click', async function(evenement) {
    var bouton = evenement.target.closest('button[data-action]');
    if (!bouton) return;

    var id     = parseInt(bouton.getAttribute('data-id'));
    var action = bouton.getAttribute('data-action');

    if (action === 'sauvegarder-role') {
      var selectRole = conteneur.querySelector('select[data-id="' + id + '"]');
      if (!selectRole) return;
      var nouveauRole = selectRole.value;
      try {
        await modifierRoleUtilisateur(id, nouveauRole);
        afficherNotification('Rôle mis à jour avec succès.', 'succes');
      } catch (e) {
        afficherNotification('Erreur lors de la mise à jour du rôle.', 'erreur');
      }
    }

    if (action === 'supprimer-utilisateur') {
      var nomUtilisateur = bouton.getAttribute('data-nom');
      if (!confirm('Supprimer le compte de ' + nomUtilisateur + ' ? Cette action est irréversible.')) return;
      try {
        await supprimerUtilisateur(id);
        listeUtilisateurs = listeUtilisateurs.filter(function(u) { return u.id !== id; });
        rendreListeUtilisateurs(listeUtilisateurs, prenom);
        afficherNotification('Utilisateur supprimé.', 'succes');
      } catch (e) {
        afficherNotification('Erreur lors de la suppression.', 'erreur');
      }
    }
  });
}

function afficherNotification(message, type) {
  var notification = document.createElement('div');
  notification.className = [
    'fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg transition',
    type === 'succes' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-600'
  ].join(' ');
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(function() { notification.remove(); }, 3000);
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