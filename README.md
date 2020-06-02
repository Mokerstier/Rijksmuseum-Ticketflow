# Rijksmuseum-Ticketflow
Redesign de ticketflow van Rijksmuseum en zorg dat deze eenvoudig en voor iedereen toegankelijk is.

## Inhoudsopgave
* [Het team](#Het-team)
* [De opdracht](#De-opdracht)
* [Het probleem](#Het-probleem)
* [Concept](#Concept)
* [De oplossingen](#De-oplossingen)
   * [Toegankelijkheid toetsenbord](#Toegankelijkheid-toetsenbord)
   * [Toegankelijkheid screenreader](#Toegankelijkheid-screenreader)
   * [De date picker](#De-date-picker)
   * [Groepssamenstelling](#Groepssamenstelling)
   * [De flow van de ticketstraat](#De-flow-van-de-ticketstraat)

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

## De oplossingen
### Toegankelijkheid toetsenbord
AANVULLEN + FOTOS

### Toegankelijkheid screenreader
AANVULLEN + FOTOS

### De date picker
De datepicker hebben wij toegankelijk gemaakt door deze helemaal uit elkaar te halen en in stapjes te tonen. De stapjes hebben we gemaakt aan de hand van select options, radio buttons en checkboxes. Uit eerdere onderzoeken (Web Design) bleken deze inputs goed toegankelijk te zijn voor toetsenborden en screenreaders. 

Niet alleen voor screenreaders en toetsenborden is de datepicker fijn maar ook voor mensen die wel met de muis navigeren. De opties en keuzes worden in een vraagvorm gesteld zodat dit later ook voice-proof is. 

De datepicker is helemaal gelinkt met de api en zo over te nemen als het Rijksmuseum hier behoefte aan heeft. 
AANVULLEN + FOTOS

### Groepssamenstelling
De groepssamenstelling van het Rijksmuseum was niet zo handig opgesteld. Zoals bij het probleem al vermeld moest deze component toegankelijker en duidelijker niet alleen voor mensen die werken met een screenreader maar voor iedereen. 

Het overzicht met alle tickets, prijzen, informatie, subtotalen en aantallen waren allemaal verwerkt in een tabel en dit was lastig te begrijpen voor de screenreaders. Ook de knoppen en de verdeling was niet zo overzichtelijk. 

Deze problemen hebben we opgelost door articles te gebruiken in plaats van een tabel. Hierin konden we alle informatie groeperen zonder dat iemand door een tabel moet navigeren. Daarnaast is het ook visueel overzichtelijker. 

Niet alleen de layout hebben we veranderd maar ook de knoppen. Het Rijksmuseum maakte gebruik van knoppen die erg op 1 geheel lijken. Hierdoor voelt het minder als een knop waardoor je in de war kan raken als je deze ziet. Wij wilde duidelijke knoppen maken die ook meer voelen als knoppen. Hiervoor hebben we gekozen om de plus en min knoppen los te trekken van het getal. Ook hebben we voor ronde knoppen gekozen. Meestal zijn in apps of op website zult soort knoppen rond en omdat dit een “gewoonte” is kunnen we beter deze gewoonte meenemen in ons ontwerp. 

De subtotalen hebben we weggelaten. Dit zorgde voor veel verwarring met de screenreader en het was gaf volgens ons overbodige informatie. Daarentegen hebben we het totaal aantal tickets toegevoegd zodat mensen altijd kunnen checken of ze genoeg tickets hebben geselecteerd. De totaalprijs hebben we gehouden want dit is wel belangrijke informatie die gebruikers willen weten. 
AANVULLING + FOTOS

### De flow van de ticketstraat
#### De huidige ticketflow stappen van het Rijksmuseum:
1. Tickets
2. Extra opties
3. Persoonsgegevens
4. Overzicht en betaling

#### Onze ticketflow stappen:
1. Kies je groep
2. Tickets
3. Plan je bezoek
4. Extra opties
5. persoonsgegevens
6. Overzicht en betaling

De huidige flow van de ticket straat mochten we van de opdrachtgever volledig aanpassen als dat nodig was en uit gesprekken met hen kwamen we er ook achter dat dit wel nodig is. De pagina’s waren erg druk met veel acties die gebruikers moesten doen en daarnaast had het Rijksmuseum nog ideeen voor meer componenten waardoor het eigenlijk steeds maar drukker werd. 

De ticket flow en de taken hebben we helemaal los getrokken en weer in elkaar gezet. Sommige dingen die het Rijksmuseum had hebben we meegenomen. Een voorbeeld hiervan is dat de ticket samenstelling voor de rondleidingen en datepicker komen. Dit is zodat je zeker weet dat er genoeg plek is voor iedereen. 

Een van de dingen die we hebben veranderd is dat we nu aan het begin de gebruiker een keuze laten maken tussen verschillende groepen. Op deze manier konden we default settings aanbieden zodat het voor de meeste mensen gelijk al goed staat en de ticket stap (semi) over kunnen slaan. Deze keuze biedt ook de mogelijkheid om op de website snel linkjes te kunnen plaatsen die direct naar een samenstelling leiden. Het Rijksmuseum kan bijvoorbeeld op hun pagina over gezinnen een linkje kunnen plaatsen die gelijk naar de groepssamenstelling gaat voor families. Hetzelfde geldt ook voor kleinere groepen. 

Wat we ook hebben veranderd is de tweede stap van de ticketflow. Deze bestond uit veel componenten en niet alle componenten paste bij elkaar. Deze stap heet bij het Rijksmuseum “extra opties”. Hier vallen rondleidingen, datepicker, donaties en multimedia items bij. Deze vier hebben wij nu in tweeën gesplitst. Bij ons is de derde stap “plan je bezoek” hier vallen de rondleidingen en datepicker onder. De vierde stap is nu bij ons “extra opties”, waar de multimedia items en dotaties onder vallen. Nu staan de logische componenten bij elkaar en onder de logische pagina’s. Voor het Rijksmuseum is er nu ook nog ruimte componenten toe te voegen zonder dat het te druk wordt. Zo kan de shop component onder “extra opties” als ze dat zouden willen. 

Onze ticketflow heeft wel meer stappen maar is per stap rustiger en overzichtelijker.

