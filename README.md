# ApiFluxRSS

Ce projet fournit une API pour gérer les utilisateurs, dossiers et articles avec des routes documentées via Fastify.

## Installation des dépendances

### Prérequis

Assurez-vous d'avoir installé Node.js.

#### Commande pour Linux

```bash
sudo apt update && sudo apt install -y nodejs
```

#### Commande pour Windows

Téléchargez et installez Node.js depuis [le site officiel](https://nodejs.org/).

### Installation des dépendances du projet

Une fois le projet cloné, exécutez la commande suivante pour installer les dépendances :

```bash
npm install
```

## Configuration du fichier `.env`

Avant de lancer le projet, créez un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :

```env
DATABASE_URL="file:../dev.db" # Chemin vers la base de données SQLite (celle que j'ai choisi) Important à faire pour Prisma.
SECRET_KEY="votre Clés secrete" # Clé secrète pour la signature des tokens JWT.
BCRYPT_SALT_ROUNDS=10 # Nombre de tours pour le hachage des mots de passe (10 est un bon compromis entre sécurité et performance).
```

### Explications des variables :

- **`DATABASE_URL`** : Définit l'URL de connexion à la base de données. Ici, nous utilisons SQLite avec un fichier nommé `dev.db`.
- **`SECRET_KEY`** : Clé secrète utilisée pour signer et vérifier les tokens JWT, nécessaire pour les fonctionnalités d'authentification.
- **`BCRYPT_SALT_ROUNDS`** : Détermine la complexité du hachage des mots de passe avec bcrypt. Un nombre plus élevé augmente la sécurité, mais ralentit les performances.

### Générez les fichiers Prisma nécessaires :

Exécutez la commande suivante pour générer le client Prisma à partir de votre schéma :

```bash
npx prisma generate
```

### Créez la base de données et appliquez les migrations :

Pour synchroniser votre base de données avec le schéma défini dans `prisma/schema.prisma` :

```bash
npx prisma db push
```

Cela crée la base de données et les tables définies dans votre fichier `schema.prisma`.

## Lancer le serveur

Pour démarrer le serveur en mode développement :

```bash
npm run dev
```

## Tests avec Swagger et Postman

### Swagger

Dans Swagger, le token JWT n'est pas stocké automatiquement. Cela signifie que vous ne pouvez pas effectuer de tests nécessitant une authentification directement depuis Swagger.

### Postman

Pour effectuer vos tests d'API, utilisez **Postman**. Voici les étapes à suivre :

1. **Créer un environnement** :
   - A gauche dans postman sélectionnez "Environments" puis new.

Un export Postman en json est dans le projet, est conserve certaines options et réglage.

## Docker

Pour build l'image docker

```bash
 docker build -t api_flux_start .
```

Api_flux_start = nom de l'image
. signifie, cherche le dockerfile à l'endroit ou je me trouve (dans le terminal)

Pour lancer le dockerfile :

```bash
docker run -p 3000:3000 --name api_flux_container api_flux_start
```

le -p est pour mapper le port de notre machine à celle du container
---name = nom du container
api_flux_start = nom de l'image

## Docker Compose

Dans docker compose build . signifie qu'il build le dockerfile qu'il trouve à partir de l'endroit ou il est. Renitialise l'image pour le docker compose.

pas de volume / lien sur les fichier prisma, il doit le générate depuis l'image de base.

Faire les variables de db dans le env et schema.prisma.

lancer le docker compose :

```bash
docker compose up -d --build
```

--build, car au debut je demande un build : . (pour les modifications dans l'image)
