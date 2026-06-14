import { afficherPageConnexion }   from './connexion.js';
import { afficherPageInscription } from './inscription.js';



export function afficherPageAccueil() {
  // Ne plus utiliser pushState pour #accueil : sinon le routeur (main.js) peut traiter
  // les changements d’URL/hash comme une navigation et rediriger vers dashboard.
  if (window.location.hash !== '#accueil') {
    window.location.hash = '#accueil';
  }
  var conteneurApp = document.getElementById('app');
  conteneurApp.className = 'w-full min-h-screen';

  document.getElementById('corps-application').className =
    'font-body bg-white min-h-screen w-full p-0 transition-all duration-300';
  document.body.classList.remove('flex','items-center','justify-center');

  conteneurApp.innerHTML = `
    <div id="page-accueil" class="animer-fond w-full min-h-screen flex flex-col">

      <!-- ══ NAVBAR ══ -->
      <header class="w-full px-8 py-4 flex items-center justify-between bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <img src="LOGOD.png" alt="DecoFlow" class="h-8" />
          <span class="font-display text-xl font-semibold text-charcoal tracking-wide">DecoFlow</span>
        </div>
        <nav class="hidden md:flex items-center gap-8">
          <a href="#curation"   class="text-xs text-muted uppercase tracking-widest hover:text-charcoal transition decoflow-scroll">Collection</a>
          <a href="#chiffres"   class="text-xs text-muted uppercase tracking-widest hover:text-charcoal transition decoflow-scroll">À propos</a>
          <a href="#curation" class="text-xs text-muted uppercase tracking-widest hover:text-charcoal transition decoflow-scroll">Services</a>
          <a href="#temoignages" class="text-xs text-muted uppercase tracking-widest hover:text-charcoal transition decoflow-scroll">Témoignages</a>
          <a href="#newsletter" class="text-xs text-muted uppercase tracking-widest hover:text-charcoal transition decoflow-scroll">Contact</a>
        </nav>
        <button id="bouton-connexion-accueil" type="button"
          class="bg-charcoal text-white text-xs font-medium uppercase tracking-widest px-5 py-2.5 hover:bg-terracotta transition-colors duration-200">
          Se connecter
        </button>
      </header>

      <!-- ══ HERO ══ -->
      <section class="px-8 pt-20 pb-16 max-w-6xl mx-auto w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <div>
            <p class="text-terracotta text-xs font-semibold uppercase tracking-widest mb-5">Studio d'intérieur · Dakar</p>
            <h1 class="font-display text-6xl md:text-7xl font-semibold text-charcoal leading-[1.02] mb-8">
              L'Art de<br />Vivre<br /><em class="not-italic text-muted">l'Espace</em>
            </h1>
            <p class="text-sm text-muted leading-relaxed max-w-sm mb-10">
              DecoFlow conçoit des intérieurs d'exception — mêlant élégance contemporaine et savoir-faire artisanal sénégalais pour des espaces qui durent.
            </p>
            <div class="flex items-center gap-4">
              <button id="bouton-decouvrir" type="button"
                class="bg-charcoal text-white text-xs font-medium uppercase tracking-widest px-7 py-3 hover:bg-terracotta transition-colors duration-200">
                Découvrir la collection
              </button>
              <a href="#curation" class="text-xs text-charcoal uppercase tracking-widest border-b border-charcoal pb-0.5 hover:text-terracotta hover:border-terracotta transition">
                Nos services
              </a>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="aspect-square bg-[#C4A882] overflow-hidden rounded-sm">
                <img src="CONIM.png" alt="Intérieur DecoFlow" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div class="bg-[#F5F0EA] p-5 flex flex-col justify-between rounded-sm">
                <p class="font-display text-[#C97B5A] text-6xl font-semibold leading-none opacity-20 self-end">A</p>
                <div>
                  <p class="text-xs text-muted leading-relaxed mb-3">
                    Chaque espace raconte une histoire. Nous la concevons avec vous.
                  </p>
                  <p class="text-[10px] text-terracotta uppercase tracking-widest">— Studio DecoFlow</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-[#2C2A27] rounded-sm p-5 flex flex-col justify-end">
                <p class="font-display text-white text-3xl font-semibold mb-1">+120</p>
                <p class="text-[10px] text-white/50 uppercase tracking-widest">Projets livrés</p>
              </div>
              <div class="overflow-hidden rounded-sm aspect-video bg-[#C97B5A]">
                <img src="bureau.png" alt="Projet DecoFlow" class="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition duration-700" />
              </div>
            </div>
            <div class="flex items-center justify-end gap-2">
              <span class="text-xs text-muted tracking-widest">01</span>
              <div class="w-12 h-px bg-gray-300"></div>
              <span class="text-xs text-muted tracking-widest">03</span>
            </div>
          </div>

        </div>
      </section>

      <!-- ══ BANDE CHIFFRES ══ -->
      <section id="chiffres" class="w-full bg-[#F5F0EA] py-14 border-y border-gray-100">
        <div class="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="flex flex-col items-center text-center">
            <p class="font-display text-4xl font-semibold text-charcoal mb-1">+120</p>
            <p class="text-xs text-muted uppercase tracking-widest">Projets livrés</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <p class="font-display text-4xl font-semibold text-charcoal mb-1">8</p>
            <p class="text-xs text-muted uppercase tracking-widest">Années d'expérience</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <p class="font-display text-4xl font-semibold text-charcoal mb-1">+60</p>
            <p class="text-xs text-muted uppercase tracking-widest">Artisans partenaires</p>
          </div>
          <div class="flex flex-col items-center text-center">
            <p class="font-display text-4xl font-semibold text-charcoal mb-1">98%</p>
            <p class="text-xs text-muted uppercase tracking-widest">Clients satisfaits</p>
          </div>
        </div>
      </section>

      <!-- ══ CURATION ══ -->
      <section id="curation" class="px-8 py-20 max-w-6xl mx-auto w-full">
        <div class="mb-12 flex items-end justify-between">
          <div>
            <p class="text-terracotta text-xs font-semibold uppercase tracking-widest mb-3">Notre Univers</p>
            <h2 class="font-display text-4xl font-semibold text-charcoal leading-tight">Curation Artisanale</h2>
          </div>
          <a href="#" class="hidden md:flex items-center gap-2 text-xs text-muted uppercase tracking-widest hover:text-charcoal transition border-b border-muted pb-0.5">
            Voir tout <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="md:col-span-2 overflow-hidden rounded-sm aspect-[16/9] bg-[#2C2A27] group">
            <img src="bureau.png" alt="Curation artisanale" class="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div class="flex flex-col gap-6">
            <div class="overflow-hidden rounded-sm flex-1 bg-[#C4A882] group">
              <img src="CONIM.png" alt="Mobilier" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div class="bg-[#F5F0EA] rounded-sm p-6">
              <p class="font-display text-terracotta text-4xl font-semibold mb-2 opacity-30">06</p>
              <p class="text-sm text-charcoal font-medium mb-1">Collections exclusives</p>
              <p class="text-xs text-muted leading-relaxed">Chaque pièce sélectionnée pour son caractère unique et sa durabilité exceptionnelle.</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="border border-gray-100 rounded-sm p-6 hover:border-terracotta transition-colors duration-200">
            <div class="w-8 h-8 bg-terra-pale rounded-full flex items-center justify-center mb-4">
              <i class="fa-solid fa-leaf text-terracotta text-xs"></i>
            </div>
            <p class="text-sm font-semibold text-charcoal mb-2">Matériaux naturels</p>
            <p class="text-xs text-muted leading-relaxed">Bois massif, pierre naturelle, lin et coton biologiques sélectionnés aux quatre coins du monde.</p>
          </div>
          <div class="border border-gray-100 rounded-sm p-6 hover:border-terracotta transition-colors duration-200">
            <div class="w-8 h-8 bg-terra-pale rounded-full flex items-center justify-center mb-4">
              <i class="fa-solid fa-pen-ruler text-terracotta text-xs"></i>
            </div>
            <p class="text-sm font-semibold text-charcoal mb-2">Sur-mesure</p>
            <p class="text-xs text-muted leading-relaxed">Chaque projet est unique. Nous concevons des pièces adaptées précisément à votre espace et vos goûts.</p>
          </div>
          <div class="border border-gray-100 rounded-sm p-6 hover:border-terracotta transition-colors duration-200">
            <div class="w-8 h-8 bg-terra-pale rounded-full flex items-center justify-center mb-4">
              <i class="fa-solid fa-award text-terracotta text-xs"></i>
            </div>
            <p class="text-sm font-semibold text-charcoal mb-2">Savoir-faire local</p>
            <p class="text-xs text-muted leading-relaxed">Nous collaborons avec les meilleurs artisans sénégalais pour valoriser l'excellence locale.</p>
          </div>
        </div>
      </section>

      <!-- ══ PROCESSUS ══ -->
      <section class="w-full bg-[#2C2A27] py-20">
        <div class="max-w-6xl mx-auto px-8">
          <div class="mb-14 text-center">
            <p class="text-terra-light text-xs font-semibold uppercase tracking-widest mb-3">Comment ça marche</p>
            <h2 class="font-display text-4xl font-semibold text-white leading-tight">Notre Processus</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-5">
                <span class="font-display text-xl text-white/40 font-semibold">01</span>
              </div>
              <p class="text-sm font-semibold text-white mb-2">Consultation</p>
              <p class="text-xs text-white/50 leading-relaxed">Nous écoutons vos envies, analysons votre espace et définissons ensemble votre vision.</p>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-5">
                <span class="font-display text-xl text-white/40 font-semibold">02</span>
              </div>
              <p class="text-sm font-semibold text-white mb-2">Conception</p>
              <p class="text-xs text-white/50 leading-relaxed">Nos designers créent des plans détaillés et des rendus 3D pour visualiser le résultat final.</p>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-5">
                <span class="font-display text-xl text-white/40 font-semibold">03</span>
              </div>
              <p class="text-sm font-semibold text-white mb-2">Réalisation</p>
              <p class="text-xs text-white/50 leading-relaxed">Nos artisans partenaires exécutent chaque détail avec précision dans les délais convenus.</p>
            </div>
            <div class="flex flex-col items-center text-center">
              <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-5">
                <span class="font-display text-xl text-white/40 font-semibold">04</span>
              </div>
              <p class="text-sm font-semibold text-white mb-2">Livraison</p>
              <p class="text-xs text-white/50 leading-relaxed">Installation complète, suivi post-projet et garantie sur tous nos travaux pendant 2 ans.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ EXCELLENCE ══ -->
      <section id="excellence" class="px-8 py-20 max-w-6xl mx-auto w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div class="md:order-2">
            <p class="text-xs text-muted uppercase tracking-widest mb-3">Studio Technique</p>
            <h2 class="font-display text-4xl font-semibold text-charcoal leading-tight mb-6">Réseau d'Excellence</h2>
            <p class="text-sm text-muted leading-relaxed mb-8">
              Bénéficiez d'une liste référencée d'artisans de haut niveau, rigoureusement sélectionnés, pour qui chaque détail incarne une perfection extrême.
            </p>
            <ul class="flex flex-col gap-4 mb-8">
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-terra-pale flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="fa-solid fa-check text-terracotta text-[9px]"></i>
                </div>
                <p class="text-xs text-muted leading-relaxed">Artisans certifiés et vérifiés par notre équipe technique</p>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-terra-pale flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="fa-solid fa-check text-terracotta text-[9px]"></i>
                </div>
                <p class="text-xs text-muted leading-relaxed">Délais garantis contractuellement sur chaque projet</p>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-terra-pale flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="fa-solid fa-check text-terracotta text-[9px]"></i>
                </div> 
                <p class="text-xs text-muted leading-relaxed">Suivi en temps réel de l'avancement de vos travaux</p>
              </li>
            </ul>
            <button id="bouton-acceder" type="button"
              class="border border-charcoal text-charcoal text-xs uppercase tracking-widest px-6 py-3 hover:bg-charcoal hover:text-white transition-colors duration-200">
              Accéder au Réseau
            </button>
          </div>
          <div class="overflow-hidden rounded-sm aspect-[4/3] bg-[#C4A882] md:order-1 group">
            <img src="inscim.png" alt="Réseau d'excellence" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      <!-- ══ TÉMOIGNAGES ══ -->
      <section id="temoignages" class="w-full bg-[#F5F0EA] py-20">
        <div class="max-w-6xl mx-auto px-8">
          <div class="text-center mb-14">
            <p class="text-terracotta text-xs font-semibold uppercase tracking-widest mb-3">Ce qu'ils disent</p>
            <h2 class="font-display text-4xl font-semibold text-charcoal">Témoignages</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-sm p-7 border border-gray-100">
              <p class="font-display text-terracotta text-4xl mb-4 opacity-30">"</p>
              <p class="text-sm text-muted leading-relaxed mb-6">DecoFlow a transformé notre appartement en un véritable écrin de sérénité. Leur attention au détail est incomparable.</p>
              <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div class="w-8 h-8 rounded-full bg-[#C4A882] flex items-center justify-center">
                  <span class="text-[10px] font-bold text-white">AD</span>
                </div>
                <div>
                  <p class="text-xs font-semibold text-charcoal">Awa Diop</p>
                  <p class="text-[10px] text-muted">Villa Almadies, Dakar</p>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-sm p-7 border border-gray-100">
              <p class="font-display text-terracotta text-4xl mb-4 opacity-30">"</p>
              <p class="text-sm text-muted leading-relaxed mb-6">Un studio professionnel et créatif. Notre bureau a été entièrement repensé, l'équipe a su allier fonctionnalité et esthétique.</p>
              <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div class="w-8 h-8 rounded-full bg-[#2C2A27] flex items-center justify-center">
                  <span class="text-[10px] font-bold text-white">MN</span>
                </div>
                <div>
                  <p class="text-xs font-semibold text-charcoal">Moussa Ndiaye</p>
                  <p class="text-[10px] text-muted">Penthouse Plateau, Dakar</p>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-sm p-7 border border-gray-100">
              <p class="font-display text-terracotta text-4xl mb-4 opacity-30">"</p>
              <p class="text-sm text-muted leading-relaxed mb-6">Le résultat a dépassé toutes nos attentes. DecoFlow a su capturer l'essence de notre marque dans chaque coin de notre boutique.</p>
              <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div class="w-8 h-8 rounded-full bg-[#C97B5A] flex items-center justify-center">
                  <span class="text-[10px] font-bold text-white">FS</span>
                </div>
                <div>
                  <p class="text-xs font-semibold text-charcoal">Fatou Sy</p>
                  <p class="text-[10px] text-muted">Boutique Concept, Rufisque</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ BANDE SIGNATURE ══ -->
      <section class="w-full bg-[#1C1A17] py-24 flex items-center justify-center overflow-hidden">
        <p class="font-display text-[clamp(2.5rem,8vw,7rem)] font-semibold text-white/10 uppercase tracking-[0.3em] select-none text-center leading-none">
          DECOFLOW<br />EXPERIENCE
        </p>
      </section>

      <!-- ══ NEWSLETTER + CONTACT ══ -->
      <section id="newsletter" class="px-8 py-20 max-w-6xl mx-auto w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">

          <div>
            <p class="text-terracotta text-xs font-semibold uppercase tracking-widest mb-4">Restez inspirés</p>
            <h3 class="font-display text-3xl font-semibold text-charcoal mb-3">
              Notes de Design
            </h3>
            <p class="text-sm text-muted leading-relaxed mb-8 max-w-xs">
              Recevez chaque mois nos sélections, tendances et coulisses de projets directement dans votre boîte mail.
            </p>
            <div class="flex gap-0 mb-4">
              <input id="champ-newsletter" type="email" placeholder="Votre adresse e-mail"
                class="flex-1 border border-gray-200 px-4 py-3 text-sm text-charcoal placeholder-gray-400 bg-beige/40 focus:outline-none focus:border-terracotta transition" />
              <button id="bouton-newsletter" type="button"
                class="bg-charcoal text-white text-xs uppercase tracking-widest px-5 py-3 hover:bg-terracotta transition-colors duration-200 whitespace-nowrap">
                S'inscrire
              </button>
            </div>
            <p class="text-[10px] text-muted">Pas de spam. Désabonnement en un clic à tout moment.</p>
          </div>

          <div class="flex flex-col gap-6 justify-center">
            <div class="border-b border-gray-100 pb-5">
              <p class="text-xs text-muted uppercase tracking-widest mb-2">Adresse</p>
              <p class="font-display text-xl font-semibold text-charcoal">Avenue Cheikh Anta Diop, Dakar</p>
            </div>
            <div class="border-b border-gray-100 pb-5">
              <p class="text-xs text-muted uppercase tracking-widest mb-2">Contact</p>
              <p class="text-sm text-charcoal">contact@decoflow.sn</p>
              <p class="text-sm text-charcoal">+221 77 000 00 00</p>
            </div>
            <div>
              <p class="text-xs text-muted uppercase tracking-widest mb-3">Nous suivre</p>
              <div class="flex items-center gap-5">
                <a href="#" class="text-xs text-muted hover:text-charcoal uppercase tracking-wider transition border-b border-transparent hover:border-charcoal pb-0.5">Instagram</a>
                <a href="#" class="text-xs text-muted hover:text-charcoal uppercase tracking-wider transition border-b border-transparent hover:border-charcoal pb-0.5">LinkedIn</a>
                <a href="#" class="text-xs text-muted hover:text-charcoal uppercase tracking-wider transition border-b border-transparent hover:border-charcoal pb-0.5">Pinterest</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ FOOTER ══ -->
      <footer class="border-t border-gray-100 px-8 py-6 w-full">
        <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <span class="font-display text-sm font-semibold text-charcoal">DecoFlow</span>
            <span class="text-gray-200">·</span>
            <span class="text-xs text-muted">L'excellence de design sénégalaise</span>
          </div>
          <nav class="flex items-center gap-6">
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">Mentions légales</a>
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">Confidentialité</a>
            <a href="#" class="text-xs text-muted hover:text-charcoal transition">CGV</a>
          </nav>
          <span class="text-xs text-muted">© 2024 DecoFlow</span>
        </div>
      </footer>

    </div>
  `;

  // navbar accueil: conserve la structure/largeur, sans changer le contenu public
  // (navigation.js gère uniquement le mode connecté côté app; sur l'accueil on ne l'affiche pas.)

  attacherEcouteursAccueil();
}


function attacherEcouteursAccueil() {
  document.querySelectorAll('.decoflow-scroll').forEach(function(el) {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      var cible = this.getAttribute('href');
      if (!cible || cible[0] !== '#') return;
      var elementCible = document.getElementById(cible.slice(1));
      if (elementCible) {
        elementCible.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  var boutonConnexion = document.getElementById('bouton-connexion-accueil');
  if (boutonConnexion) {
    boutonConnexion.addEventListener('click', function() {
      naviguerAccueil('connexion', function() { afficherPageConnexion(); });
    });
  }

  var boutonDecouvrir = document.getElementById('bouton-decouvrir');
  if (boutonDecouvrir) {
    boutonDecouvrir.addEventListener('click', function() {
      naviguerAccueil('connexion', function() { afficherPageConnexion(); });
    });
  }

  var boutonNewsletter = document.getElementById('bouton-newsletter');
  if (boutonNewsletter) {
    boutonNewsletter.addEventListener('click', function() {
      naviguerAccueil('inscription', function() { afficherPageInscription(); });
    });
  }

  var boutonAcceder = document.getElementById('bouton-acceder');
  if (boutonAcceder) {
    boutonAcceder.addEventListener('click', function() {
      naviguerAccueil('connexion', function() { afficherPageConnexion(); });
    });
  }
}

function naviguerAccueil(page, fallback) {
  if (window.decoflowRouter && typeof window.decoflowRouter.naviguerVers === 'function') {
    window.decoflowRouter.naviguerVers(page);
    return;
  }
  if (typeof fallback === 'function') {
    fallback();
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
