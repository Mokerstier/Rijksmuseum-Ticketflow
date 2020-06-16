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
#### Alles met de tab bereikbaar maken
Tijdens het testen met zowel Hannes als Roger kwamen we erachter dat ze allebei bepaalde toetsenbord triggers verwachtte die er niet waren. Zo wilde ze met de tab alles kunnen bereiken. Ook in een fieldset met radio buttons. Zij wisten niet dat je daarin moet navigeren met de pijltjes en raakte daar dan ook verdwaald. Wij wilden dit oplossen alleen is dit helaas niet mogelijk. Het is de standaardregel dat je navigeert met pijltjes over radio buttons heen en je kan het nooit met de tab bereiken. Daarom hebben wij gekozen voor een andere oplossing. Door in de legend een aria-label te plaatsen met onder andere instructies hoe je verder moet navigeren, willen wij ervoor zorgen dat dit nu voor de meeste mensen duidelijk wordt. Zodra je voor het eerst op een groep radio buttons komt hoor je dankzij de aria-labels op de legends dit: “Op welke datum wil je komen? Kies uit 6 beschikbare opties met de pijltjes toetsen.” Hiermee willen wij instructies geven aan de gebruiker zodat hij door kan gaan met iets selecteren zonder dat hij verdwaald raakt. De gebruiker hoort ook gelijk hoeveel beschikbare opties er zijn zodat hij weet wat hij kan verwachten. 

#### Selecteren met enter
De “regel” op het web is dat je checkboxes en radio buttons selecteert met een spatie. Toch kregen wij uit meerdere tests feedback dat er behoefte is om een selectie te maken met enter. Dit hebben wij geïmplementeerd met een event listener in javascript die luistert naar de “enter” key. Als gebruikers toch wel gewend zijn spatie te gebruiken hebben zij ook altijd nog de mogelijkheid dat te doen. CODECODECODECODE!!! 

### Toegankelijkheid screenreader
#### De gebruiker up to date houden
Tijdens het bestellen van een ticket is het belangrijk om de gebruiker op de hoogte te houden van zijn keuzes en de prijzen. Visueel is dit goed te doen maar voor iemand die gebruik maakt van een screen reader en mogelijk ook niet tot nauwelijks ziet is dit lastig voor hem. Om dat op te lossen hebben wij gebruik gemaakt van aria-live polite. Hiermee stellen we de gebruiker op de hoogte zodra hij een verandering maakt in zijn bestelling. Een verandering kan bijvoorbeeld zijn dat hij een ticket weg haalt of erbij doet. Als de gebruiker dit doet vertelt de screen reader uitgebreid wat de huidige bestelling is. Dit wordt dan op een rustige manier, dankzij polite, verteld door de screen reader: “Entree volwassene ticket, aantal 3. Entree t/m 18 jaar ticket, aantal 2. Totaal aantal tickets: 5. Totale prijs: €57.00.” De eerste twee zinnen zijn onzichtbaar voor gebruikers met zicht. Zij kunnen het al uit de interface aflezen.

#### Buttons omzetten naar div’s
Zodra je een ticket wilt bestellen kom je al snel de plus en min buttons tegen waarmee je tickets kan selecteren. Ook heb je de mogelijkheid om dit te doen in de dropdown, die tussen de twee buttons staat. 

Deze buttons leverde bij het testen met mensen die blind zijn al snel verwarring op. Ook heel begrijpelijk als je er niks aan hebt. Om een button weg te stoppen voor de screen reader moet je nog best veel moeite voor doen. Daarnaast is dat eigenlijk ook helemaal niet gewenst. Onze oplossing hiervoor was om div’s te gebruiken in plaats van buttons. Deze div’s zijn met de screen reader niet te bereiken maar lijken en doen nog wel alsof ze buttons zijn. Bij de tweede test bleek dit een succes. De gebruiker had een veel beter (en “schoner”) overzicht van de pagina en kon veel makkelijker zonder afleiding tickets selecteren. Omdat er gebruik werd gemaakt van een dropdown werden deze twee buttons niet gemist. 

### De date picker
De datepicker hebben wij toegankelijk gemaakt door deze helemaal uit elkaar te halen en in stapjes te tonen. De stapjes hebben we gemaakt aan de hand van select options, radio buttons en checkboxes. Uit eerdere onderzoeken (Web Design) bleken deze inputs goed toegankelijk te zijn voor toetsenborden en screenreaders. Ook tijdens verschillende tests bleek dit een goede oplossing te zijn.

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

### Tickets bestellen zonder javascript
Een van de dingen die wij opmerkte in het proces was dat je geen tickets kan bestellen zonder javascript. Dit vonden wij wel belangrijk, je maakt tenslotte een ticketflow voor iedereen. Ook voor mensen met een slechte verbinding. 

Dit hebben wij opgelost door alle data van de bestelling op te slaan op de server. Hierdoor moesten we ook een andere date picker flow creëren die niet zo toegankelijk is voor de screen reader maar omdat de screen reader niet werkt zonder javascript is dit geen probleem. 

Nu moet de gebruiker een paar “extra” stappen doorlopen die je normaal gesproken op 1 pagina hebt staan. Ook de stappen zelf zijn iets anders. Je geeft eerst aan in welke maand je wilt komen. Vervolgens kies je een dag. Dit zijn alle beschikbare dagen in de maand. Dit kan wat overweldigend overkomen. Als laatste kies je een tijd. Ook dit is een lange lijst met keuzes. De informatie blijft wel te overzien en behapbaar maar het is wel een mooie enhancement als je wel javascript aan hebt staan. 
CODE!!! EN FOTOS!!!!


