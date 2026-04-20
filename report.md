# Tic-Tac-Toe

> [!Note]
> Ce document présente le parcours effectuer dans la création d'un projet de fin de 1<sup>er</sup> semestre

- [Tic-Tac-Toe](#tic-tac-toe)
  - [1. Introduction : recherche du projet](#1-introduction--recherche-du-projet)
  - [2. Développement](#2-développement)
    - [2.1 Documentation](#21-documentation)
    - [2.2 Recherche d'élément](#22-recherche-délément)
    - [2.3 Développement du jeu](#23-développement-du-jeu)
    - [2.4 Revue de code et recherche de bug](#24-revue-de-code-et-recherche-de-bug)
    - [2.5 Correction des bugs et réorganisation](#25-correction-des-bugs-et-réorganisation)
  - [3. Conclusion](#3-conclusion)

## 1. Introduction : recherche du projet

Au départ, j'avais décidé de choisir une application de chat avec Socket.io (`#14`). Il y avait un bon tutoriel sur l'utilisation de l'outil et j'ai pu le réaliser assez simplement.

Cependant, la structure du code était assez difficile a assimilée, l'utilisation de Node.js et de module était encore nouvelle pour moi et je ne savais pas si je pouvais facilement l'expliquer. Du coup j'ai laissé le projet en pause, mais il est toujours disponible à cette [adresse](https://github.com/Tsh1m/chat).

Ensuite, j'ai voulu essayer d'utiliser le Framework [TailwindCss](https://tailwindcss.com/) (`#23`) mais son utilisation ne me donner pas envie de l'utiliser car, de ce que j'ai vue, les classe des balises devenait très long ce qui ne faciliter pas la lecture du code. J'avais vue qu'il y avait une alternative à ce problème en spécifiant des composants, mais la procédure ne me plaisait pas non plus. Alors, par souci de visibilité, de compréhension et de manque de volonté j'ai décidé d'abandonner ce projet.

Finalement, mon dernier choix s'est porté sur la création d'un mini jeu web interactif (`#24`) sur le jeu **Tic-Tac-Toe**. Je me disais que je pourrais essayer et voir comment se dérouler la création d'un jeu.

---

> [!Note]
> J'avais déjà fait un portfolio personnel pour ma page GitHub (`#21`) avant l'annonce des projets, mais il n'est pas vraiment complet, du coup j'ai décidé d'en choisir un autre parce que je voulais faire le projet correctement.

## 2. Développement

Avant de commencer à coder je devais d'abord m'organiser sur les étapes de conception du jeu :

- Se documenter sur le jeu
- Rechercher les éléments me permettant de réaliser le jeu
- Développement du jeu
- Revue de code et recherche de bugs
- Correction des bugs et réorganisation

### 2.1 Documentation

J'ai fait des rechercher simple du jeu sur une page [Wikipédia](https://www.wikipedia.org/), ce qui m'a permis de trouver une définition assez claire du jeu.

> Le **tic-tac-toe**, aussi appelé « **morpion** » (par analogie avec le jeu de **Morpion** et **OXO** en Belgique), est un jeu de réflexion se pratiquant à deux joueurs, tour par tour, dont le but est de créer le premier un alignement. Le jeu se joue généralement en dessinant sur papier au crayon.

Et le résumé de ses règles :

> Deux joueurs s'affrontent. Ils doivent remplir chacun à leur tour une case de la grille avec le symbole qui leur est attribué : O ou X. Le gagnant est celui qui arrive à aligner trois symboles identiques, horizontalement, verticalement ou en diagonale. Il est coutume de laisser le joueur jouant X effectuer le premier coup de la partie.

Ainsi, j'ai pu me faire une idée globale du jeu.

### 2.2 Recherche d'élément

À ce niveau, je cherchais des fonctions qui me permettrais de faire les actions suivantes :

- Récupérer les éléments : Grâce à la méthode `querySelector` et `querySelectorAll`
- Détection de click de l'utilisateur : Utilisation de la fonction `addEventlistener`
- changer le type de la carte : Avec `element.classList.replace`
- Changement de l'arrière-plan : Avec `element.style.background`

### 2.3 Développement du jeu

J'ai commencé par créer une page d'accueil avec un bouton qui redirige vers la page du jeu lui-même.

Dans cette page, j'ai créé une grille de 3x3 avec un titre qui aide à afficher le tour des deux adversaires. J'ai rajouté aussi un bouton que j'ai caché et que j'afficherai lors de la fin de la partie pour pouvoir en relancer une autre

J'ai commencé à déclarer quelques variables :

- h2 : Récupère le titre
- cards : Récupère une liste contenant les 9 cases
- reset : Récupère le bouton
- tours : Les tours des joueurs
- coups : La liste de coups disponible
- etat : Qui représente la liste des états possible d'une case

Je commence par détecter le click du joueur dans la liste des cases et en changeant le fond par un **`X`** et en changeant le titre pour indiquer le tour de **"""ia"""**. Ensuite je retire un coup de la liste, et je lance une fonction appeler `check` qui se chargera de vérifier si les cases forme une ligne verticale, horizontale ou une diagonale.

---

> [!warning]
> Je mets des guillemets sur le terme **ia** car j'aimerai que l'on ne mélange pas l'ia des jeux avec les modèles de LLM, Renforcement Learning... tels que ChatGPT, Deepseek, Claude etc... Ce jeu a été réalisé sans l'intervention de quelconque ia que ce soit dans la recherche, le développement, la relecture, la recherche et correction de bugs, ni même dans la création de ce document.

Le terme **ia** sera utiliser pour définir le code qui constitue l'adversaire du joueur.

---

Lors du tour de l'ia, le jeu se met en pause pour un moment avec `sleep`, l'ordinateur choisie un nombre aléatoirement dans la liste de coups et le retire de cette liste puis change le fond de la carte correspondante en **`O`** et change le titre pour indiquer le tour du joueur. Enfin on refait un autre `check` pour vérifier si l'ordi à gagner.

On refait ses étapes jusqu'à ce que l'un des deux adversaires gagne ou que la partie se termine.

SI l'un des deux cas est découvert, on arrête le jeu et on détermine le vainqueur avec la fonction `end` et l'on affiche le vainqueur ainsi que le bouton qui permet de relancer une autre partie.

### 2.4 Revue de code et recherche de bug

En regardant le code et en faisant des tests j'ai remarqué les bugs suivants :

- Le joueur pouvez cliquer pendant le tour de l'ia, ce qui perturber la liste de coup et qui bloquer le tour de l'ia plus souvent
- Un manque de temps d'attente car l'ia jouer directement après chaque coup du joueur
- L'ia joue même après la fin de la partie.

### 2.5 Correction des bugs et réorganisation

Pour chaque bug :

- J'ai mis une condition qui vérifie si c'est le tour du joueur ou non
- J'ai implémenté une fonction qui appelle `sleep`, cette fonction utilise le principe des promesse JavaScript, me permettant, en modifiant d'autres fonctions à permettre la mise en pause du jeu. Ce code a été trouver sur le site [StackOverflow](https://stackoverflow.com)
- J'ai créé une variable `finish` que j'ai mis dans une condition, si la partie est fini cela empêchera le lancement d'autre action

## 3. Conclusion

Ce projet était riche en connaissance et en effort et m'a permis :

- De mieux comprendre la gestion d'un projet web.
- D'avoir une meilleure vue d'ensemble du JavaScript

Le code est toujours disponible sur ce dépôt et est sous licence MIT. Libre à vous de le cloner pour ajouter des fonctionnalités.

**_Améliorations possibles_** :

- Ajout d'un mode 2 joueur
- Ajout d'effets
- Déploiement sur un serveur
  ........

J'ai essayé de le rendre cette rédaction aussi précise que possible tout en enlevant les surplus inutiles pour pouvoir le remettre dans les temps. Veuillez m'excuser de toute erreur de ma part.

Sur ce, je vous remercie d'avoir porté attention à ce projet.
