# Rijksmuseum-Ticketflow
> Lees voor gebruik van dit project de design rationale goed door. Hierin staan de belangrijkste keuzes beschreven. Dit is belangrijk om het project en de code ervan goed te begrijpen. [Lees hier de design rationale](https://github.com/Mokerstier/Rijksmuseum-Ticketflow/wiki/Design-rationale).

![Happy Flow van de ticketstraat](https://user-images.githubusercontent.com/33430655/84995585-79f5bc80-b14c-11ea-849b-a1d1b169dc70.gif)

## Inhoudsopgave
* [Het team](#Het-team)
* [De opdracht](#De-opdracht)
* [Concept](#Concept)
* [Installatie](#Installatie)
* [API](#API)
* [Features](#Features)
* [Wishlist](#Wishlist)
* [Credits](#Credits)

## Het team
- [Manouk Kappé](https://github.com/ManoukK)
- [Mohamad Al Ghorani](https://github.com/MohamadAlGhorani)
- [Wouter van der Heijde](https://github.com/Mokerstier)

## De opdracht
> Redesign de ticketflow van Rijksmuseum en zorg dat deze eenvoudig en toegankelijk is voor iedereen.

Onze opdrachtgever is Q42 samen met het Rijksmuseum.

De opdracht is om de ticketflow van het Rijksmuseum te verbeteren op gebied van toegankelijkheid. Het is nog lastig voor een aantal mensen om een ticket te kopen en aan ons de taak dit te verbeteren. De punten waar het nog niet goed gaan zijn de groepssamenstelling en het kiezen van een datum en tijd. Dit zijn voor ons dan ook een van de belangrijkere punten. Het uiteindelijke doel is dat iedereen een ticket kan kopen op de website van het Rijksmusem. 

Ook mag de algemene volgorde anders. Eigenlijk komt het er op neer dat we helemaal los mogen gaan. Wel moeten we met sommige punten rekening houden zoals dat het Rijksmuseum een shop-component wilt toevoegen. Dit soort wensen moeten we wel in ons achterhoofd houden. 

De debriefing die wij hebben gemaakt voor deze opdracht kan je hier vinden: https://docs.google.com/presentation/d/1rhxgCs-4tJe0IvmQbdUTolULDeQaAlo0ushD4pV00qE/edit?usp=sharing

## Concept 
Ons plan is om de ticketflow in kleinere stapjes op te delen. Zo willen we het rustig laten ogen voor de gebruiker en houd de gebruiker nog overzicht wat er allemaal te kiezen is per pagina. Wij willen ook dicht bij de huisstijl van het Rijksmuseum blijven zodat zij goed kunnen inbeelden hoe dat op hun website komt te staan.

Ook willen wij de website maken als een lopend verhaal. Dit willen wij doen omdat wij of Q42 later altijd nog voice kunnen implementeren. Niet alleen is een lopend verhaal fijn voor voice maar het is fijn voor iedereen. Door te vragen weten mensen beter wat ze moeten verwachten en kunnen zij sneller denken aan een antwoord. Het is ook fijner lezen dan een opdracht. 

Om het toegankelijk te maken zorgen wij ervoor dat we gebruik maken van semantische html. Dit geldt niet voor alles. Een table of een input type date zijn ideale elementen alleen niet te doen met de screenreader. Voor dat soort elementen gebruiken we juist niet de standaard maar een andere oplossing zodat het voor iedereen, dus ook met de screenreader, het fijn is om te gebruiken. Ook gaan wij gebruik maken van aria in html. Op deze manier willen wij ervoor zorgen dat sommige elementen die nog vaag kunnen zijn voor de screenreader duidelijk worden.

## Installatie
Als je dit project wilt installeren kan je dat doen via de groene knop rechtboven in. Hier kan je het project clonen of downloaden. Je kan het ook in de terminal installeren via git. 

Clone deze repository via de terminal
```
$ git clone https://github.com/Mokerstier/Rijksmuseum-Ticketflow.git
```

Navigeer in de terminal naar het bestand waar dit project in zit. Installeer nu alle dependencies
```
$ npm install
```

Nu is alles klaar om te builden
```
$ npm run build
```

Nu is het project klaar om op te starten. Het project kan je nu live zien op: http://localhost:3000/
```
$ npm run dev
```

Het is belangrijk dat je een watcher aan zet als je van plan bent in het project te werken. Door de watcher kan jij veranderingen zien op de localhost. Open in je code editor hiervoor wel een andere terminal. 
```
$ npm run watch
```

#### Dependencies
```
"dependencies": {
    "chokidar-cli": "^2.1.0",
    "csv-parser": "^2.3.2",
    "dotenv": "^8.2.0",
    "ejs": "^3.1.3",
    "express": "^4.17.1",
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^7.0.1",
    "gulp-clean-css": "^4.3.0",
    "gulp-concat": "^2.6.1",
    "neat-csv": "^5.2.0",
    "node-fetch": "^2.6.0",
    "npm-run-all": "^4.1.5",
    "rimraf": "^3.0.2"
  }
```

#### De scripts 
```
"scripts": {
    "predev": "npm run build",
    "dev": "nodemon server.js",
    "prestart": "npm run build",
    "start": "node server.js",
    "prebuild": "rimraf \"static/\"",
    "build": "npm-run-all build:*",
    "build:css": "node scripts/build-css.js",
    "build:js": "node scripts/build-js.js",
    "build:assets": "node scripts/build-assets.js",
    "watch": "run-p watch:*",
    "watch:css": "chokidar \"src/css/*.css\" --c \"npm run build:css\"",
    "watch:js": "chokidar \"src/js/*.js\" --c \"npm run build:js\"",
    "watch:assets": "chokidar \"src/**/*.*\" --c \"npm run build:assets\""
  }
```

## Data

De dataset die we hebben gekregen van de opdrachtgever (Q42) bevat alle teksten, ticketinformatie en beschikbaarheid van de rondleidingen. We kregen de bestanden aangeleverd als `.csv` maar hebben deze zelf omgezet naar werkbaar `.json`.

Meer informatie over datamanagement is te vinden in onze [wiki](https://github.com/Mokerstier/Rijksmuseum-Ticketflow/wiki) volg [deze link.](https://github.com/Mokerstier/Rijksmuseum-Ticketflow/wiki/Plan-van-aanpak#data-management)

## Features
- Tickets kunnen kopen zonder javascript
- Tickets kunnen kopen op een toegankelijke, vriendelijke manier
- Custom, accessible datepicker
- (Semi) gepersonaliseerde ticketflow
- Keuzes worden opgeslagen in de localStorage 
- Reduce motion
- Responsive 

## Wishlist
- [ ] Voice implementeren
- [ ] Dark mode toevoegen
- [x] ~~Regex schrijven voor de postcode bij stap 5
- [ ] Errors op een leukere manier laten zien
- [ ] Babel js implementeren zodat de meest enhancement versie ook op safari en IE11 werkt 
- [ ] Zodra de gebruiker op stap 5 komt de timer laten aflopen

## Bronnen 
- Het testen met [Hannes](https://github.com/Mokerstier/Rijksmuseum-Ticketflow/wiki/Testen-met-Hannes), [Roger](https://github.com/Mokerstier/Rijksmuseum-Ticketflow/wiki/Testen-met-Roger) en [Jesse](https://github.com/Mokerstier/Rijksmuseum-Ticketflow/wiki/Testen-met-Jesse)
- [Aria labels](https://www.w3.org/TR/html-aria/#:~:text=ARIA%20in%20HTML%20is%20a,subject%20to%20change%20without%20notice)

## Credits 
- [Mohamad Al Ghorani](https://github.com/MohamadAlGhorani)
- [Wouter van der Heijde](https://github.com/Mokerstier)
- [Manouk Kappé](https://github.com/ManoukK)
- De Minor WebDev docenten voor hulp, feedback en ondersteuning
- Bedankt Hannes, Roges en Jesse voor het testen van ons prototype!

Onze speciale dank gaat uit naar:


- Q42 als opdrachtgever 
- [<img src="https://images.prismic.io/q42-site/84e439947ab621f214d66ec79abef55b61dc6b37_q42-logo-nerd.png?auto=compress,format" alt="Q42 logo" width="100"/>](https://www.q42.nl/)
- [Rijksmuseum](https://www.rijksmuseum.nl/), voor het beschikbaar stellen van de data en de intresse in de minor web-development (HVA)


