# Documentation technique du site Emcaffe

> Dernère mise a jour : 21/10/24

## Introduction

## Prérequis

Avant de commencer, assurez-vous que vous avez les éléments suivants installés sur votre machine :

-   **Node.js** (v16.x ou supérieur)
-   **npm** ou **yarn** comme gestionnaire de paquets
-   Un éditeur de texte, recommandé : **Visual Studio Code**

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/bastos-rcd/EMCAFFE.git

# Naviguer dans le répertoire du projet
cd EMCAFFE

# Installer les dépendances
npm install
```

Une fois les dépendances installées, vous pouvez lancer le serveur de développement avec la commande suivante :

```bash
npm run dev
```

Cela démarre le site en local à l'adresse http://localhost:4321.

## Structure du projet

```bash
emcaffe-site/
│
├── .github/             # Workflows de Github Actions
├── public/              # Ressources statiques (images, polices, etc.)
├── src/                 # Dossier principal du code source
│   ├── components/      # Composants Astro réutilisables
│   ├── layouts/         # Templates et layouts globaux
│   ├── pages/           # Pages du site (routes Astro)
│   ├── i18n/            # Fichiers de traductions
│   └── utils/           # Utilitaires et fonctions auxiliaires
│
├── astro.config.mjs     # Configuration d'Astro
├── tailwind.config.js   # Configuration de Tailwind CSS
├── package.json         # Fichier de configuration du projet
└── README.md            # Documentation de base du projet
```

-   `public/` : Contient les fichiers qui ne nécessitent pas de traitement, tels que les images.
-   `src/components/` : Les composants Astro et/ou React utilisés à plusieurs endroits du site.
-   `src/pages/` : Chaque fichier .astro ou .md dans ce répertoire correspond à une route du site.
-   `astro.config.mjs` : Configuration du framework Astro.
-   `tailwind.config.js` : Fichier de configuration de Tailwind CSS où sont définis les styles personnalisés.

## Astro et géneration statique

**Astro** est un framework moderne de construction de sites web qui se concentre sur la génération de sites statiques performants, tout en offrant une approche flexible et compatible avec des composants dynamiques. Les pages statiques ultra-rapides en s'appuient sur des composants réactifs uniquement là où c'est nécessaire. Voici comment une page typique est créée :

1. Chaque fichier dans le répertoire `src/pages/` devient une URL sur le site.
2. Les composants peuvent être importés et utilisés dans des fichiers `.astro` pour rendre dynamiquement du contenu.
3. Utilisation des variables globales dans les templates via des frontmatter (bloc `---` au début des fichiers Astro).

Cette technologie nous permet de deployer le site sur n'importe quelle plateforme supportant les fichiers HTML/CSS/JS.

Lorsque vous exécutez la commande `npm run build`, Astro génère une version statique du site. Ce processus :

1. Parcourt toutes les pages.
2. Compile chaque fichier `.astro` ou `.md` en HTML statique.
3. Minifie les fichiers HTML, CSS, et JavaScript (si nécessaire) pour optimiser la taille.
4. Place tous les fichiers générés (HTML, CSS, JS et autres ressources) dans le répertoire de sortie, sur `dist/`.

Pour publier, il suffit de pousser les fichiers du répertoire `dist/` vers l'hébergement ou d'automatiser le processus de déploiement avec des services CI/CD (intégration continue).

## Utilisation de Tailwind CSS

**Tailwind CSS** est un framework CSS utilitaire qui permet de concevoir des interfaces utilisateur rapidement et de manière flexible. Contrairement aux frameworks traditionnels comme Bootstrap, qui viennent avec des composants prédéfinis (boutons, cartes, formulaires, etc.), Tailwind adopte une approche "utilitaire" où chaque classe CSS correspond à une seule fonction ou propriété de style. Cela donne aux développeurs un contrôle total sur la conception sans avoir à écrire du CSS personnalisé pour chaque élément.

Voici un exemple d'utilisation dans le header du site :

```astro
---
import LanguagePicker from '@/components/LanguagePicker.astro';
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
---

<header id="header" class={isContactRedirect ? 'sticky' : 'transparent'}>
	<a
		href=`/${lang}/`
		class="flex flex-row items-center gap-x-2 border-b-2 py-2 md:gap-x-4 md:border-b-0 md:py-0 lg:gap-x-14"
	>
		<picture>
			<img
				class="h-44 w-auto max-w-xs rounded-full border-4 border-[#315a4d] md:max-w-md lg:max-w-lg"
				src="/emca-logo.png"
			/>
		</picture>
	</a>
</header>
```

## Déploiement du site de dev (CI/CD)

Le processus CI/CD (Intégration Continue / Déploiement Continu) permet d'automatiser la compilation, les tests et le déploiement du site à chaque modification du code source. Dans notre projet, nous avons mit en place un pipeline CI/CD pour déployer automatiquement le site **Astro** sur **Cloudflare Pages**.

Ce workflow utilise **GitHub Actions** pour automatiser le déploiement du site sur https://emcaffe-dev.pages.dev/.

-   Avec à chaque modification (`push`) sur la branche principale (`main`), un deploy se déclenche pour mettre a jour le site principal.
-   Avec chaque branche et/out Pull Request, un autre deploy se déclenche dans un subdomaine `https://(nom branche).emcaffe-dev.pages.dev/`

Aussi, nous avons un autre workflow pour vérifier automatiquement que le code est bien formaté selon les règles définies par **Prettier**, ce qui nous permet de maintenir la même structure partout.
