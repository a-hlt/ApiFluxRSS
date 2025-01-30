# Utiliser l'image officielle de Node.js 22
FROM node:22

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer toutes les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

RUN npx prisma generate

# Exposer le port de l'application
EXPOSE 3000

# Lancer nodemon en mode développement
CMD ["npm", "run", "dev"]
