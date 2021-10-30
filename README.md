# Boxy v1.0

Une box pour votre TV ou votre écran de Pc déjà intégré avec un adblocker.

<img src="screen.gif" alt="Screen"/>

## Boxy c'est quoi ?
---

Boxy est une application du style google hub. Il suffit de l'installer sur une rasberry PI puis de la brancher à votre écran pour avoir accées à l'heure, la météo, l'actualité et plusieurs applications.

## Ajouter une application
---

Regarder le fichier ./src/apps/apps.json

```json
{
    "name": "GOOGLE",
    "img": "assets/google.jpg",
    "url": "https://www.google.com"
}
```

## Installation

Il faut avoir nodejs puis lancer la commande ```npm install``` à la source du dossier (là où est présent le fichier package.json). Puis lancer la commande ```npm run electron:serve```.