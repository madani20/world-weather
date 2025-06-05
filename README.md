# world-weather
# Application Météo Angular 18

Cette application permet d’obtenir la météo et des informations générales sur le temps pour n’importe quelle ville dans le monde, en utilisant l’API [Weatherstack](https://api.weatherstack.com/).

## 🚀 Fonctionnalités

- Recherche météo par ville, partout dans le monde
- Affichage des données météorologiques actuelles (température, humidité, conditions, etc.)
- Utilisation de l’API Weatherstack pour la récupération des données

## 🛠️ Prérequis

- Node.js (version 18 ou supérieure recommandée)
- npm (Node Package Manager)
- Une clé API Weatherstack (gratuite ou payante selon vos besoins)

## ⚙️ Installation

1. **Cloner le dépôt**
    ```
    git clone <url-du-repo>
    cd <nom-du-repo>
    ```

2. **Installer les dépendances**
    ```
    npm install
    ```

3. **Configurer la clé API Weatherstack**
    - Créez un compte sur [Weatherstack](https://weatherstack.com/) pour obtenir une clé API.
    - Ajoutez votre clé API dans le fichier d’environnement Angular (`src/environments/environment.ts`) :
      ```
      export const environment = {
        production: false,
        weatherstackApiKey: 'VOTRE_CLE_API_ICI'
      };
      ```

4. **Lancer l’application**
    ```
    ng serve
    ```
    L’application sera accessible à l’adresse [http://localhost:4200/](http://localhost:4200/).

## 🖥️ Utilisation

- Entrez le nom d’une ville dans le champ de recherche.
- Consultez les informations météo affichées (température, conditions, etc.).
- Changez de ville à tout moment pour obtenir de nouvelles données.
