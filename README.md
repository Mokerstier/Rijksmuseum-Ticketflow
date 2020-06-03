# Rijksmuseum-Ticketflow
Redesign de ticketflow van Rijksmuseum en zorg dat deze eenvoudig en voor iedereen toegankelijk is.

## Inhoudsopgave
* [Het team](#Het-team)
* [De opdracht](#De-opdracht)
* [Het probleem](#Het-probleem)
* [Concept](#Concept)

## Het team
- [Manouk Kappé](https://github.com/ManoukK)
- [Mohamad Al Ghorani](https://github.com/MohamadAlGhorani)
- [Wouter van der Heijde](https://github.com/Mokerstier)

## De opdracht
Onze opdrachtgever is Q42 samen met het Rijksmuseum.

De opdracht is om de ticketflow van het Rijksmuseum te verbeteren op gebied van toegankelijkheid. Het is nog lastig voor een aantal mensen om een ticket te kopen en aan ons de taak dit te verbeteren. De punten waar het nog niet goed gaan zijn de groepssamenstelling en het kiezen van een datum en tijd. Dit zijn voor ons dan ook een van de belangrijkere punten. Het uiteindelijke doel is dat iedereen een ticket kan kopen op de website van het Rijksmusem. 

Ook mag de algemene volgorde anders. Eigenlijk komt het er op neer dat we helemaal los mogen gaan. Wel moeten we met sommige punten rekening houden zoals dat het Rijksmuseum een shop-component wilt toevoegen. Dit soort wensen moeten we wel in ons achterhoofd houden. 

## Het probleem 
Er zijn een aantal problemen bij de huidige ticketflow. Sommige componenten zijn heel lastig te begrijpen met de screenreader en sommige componenten zijn ook lastig als je geen gebruik maakt van een screenreader. 

Het grootste en belangrijkste probleem is dat de toegankelijkheid nog niet optimaal is. Dit is dan ook onze hoofdtaak van het project om dit op te lossen. Een grote uitdaging die daar onder valt is het toegankelijk maken van de datepicker. De huidige datepicker is voor de screenreader lastig te besturen en je raakt al snel het overzicht en dus je motivatie kwijt. 

Een ander component die ook lastig te begrijpen is, is het maken van je groepssamenstelling. Met andere woorden je tickets kiezen voor het museum. Het is niet alleen lastig met de screenreader maar ook zonder is het voor veel mensen moeilijk te begrijpen wat er nu gevraagd word. Aan ons hier dus ook de taak deze toegankelijk en duidelijk te maken voor iedereen. 

Een onderliggend probleem is dat het Rijksmuseum veel ideeën heeft voor toekomstige componenten. Zo willen ze ook de shop in de ticketflow verwerken. Met dit soort ideeën en flexibiliteit moeten we ook mee rekening houden. De pagina’s moeten niet te druk worden maar er moet ook ruimte zijn om componenten toe te voegen. Dit geldt hetzelfde voor rondleidingen en tickets. Ook deze moeten toegevoegd kunnen worden zonder dat het ten koste gaat van het ontwerp. 

## Concept 
Ons plan is om de ticketflow in kleinere stapjes op te delen. Zo willen we het rustig laten ogen voor de gebruiker en houd de gebruiker nog overzicht wat er allemaal te kiezen is per pagina. Wij willen ook dicht bij de huisstijl van het Rijksmuseum blijven zodat zij goed kunnen inbeelden hoe dat op hun website komt te staan.

Ook willen wij de website maken als een lopend verhaal. Dit willen wij doen omdat wij of Q42 later altijd nog voice kunnen implementeren. Niet alleen is een lopend verhaal fijn voor voice maar het is fijn voor iedereen. Door te vragen weten mensen beter wat ze moeten verwachten en kunnen zij sneller denken aan een antwoord. Het is ook fijner lezen dan een opdracht. 

Om het toegankelijk te maken zorgen wij ervoor dat we gebruik maken van semantische html. Dit geldt niet voor alles. Een table of een input type date zijn ideale elementen alleen niet te doen met de screenreader. Voor dat soort elementen gebruiken we juist niet de standaard maar een andere oplossing zodat het voor iedereen, dus ook met de screenreader, het fijn is om te gebruiken. Ook gaan wij gebruik maken van arai in html. Op deze manier willen wij ervoor zorgen dat sommige elementen die nog vaag kunnen zijn voor de screenreader duidelijk worden.
