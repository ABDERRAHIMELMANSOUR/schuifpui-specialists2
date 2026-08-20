/**
 * Werkgebied-pagina's (/werkgebieden/:slug).
 *
 * Elke stad heeft eigen, unieke Nederlandse content met lokale context
 * (wijken, woningtypes, veelvoorkomende klachten in die regio). Dat is
 * bewust: identieke teksten met alleen een andere plaatsnaam worden door
 * Google als "doorway pages" gezien en niet geïndexeerd.
 *
 * Geen React-imports in dit bestand — het wordt ook door de build-time SEO
 * plugin ingelezen voor sitemap en prerender.
 */
import type { ContentSection, Faq } from "./services";

export type City = {
  slug: string;
  name: string;
  province: string;
  /** Wijken en kernen die wij expliciet noemen (long-tail zoekverkeer). */
  districts: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  intro: string[];
  sections: ContentSection[];
  faqs: Faq[];
  /** Indicatie van de gemiddelde aanrijtijd vanuit Tiel of de regiomonteur. */
  responseTime: string;
};

export const cities: City[] = [
  {
    slug: "amsterdam",
    name: "Amsterdam",
    province: "Noord-Holland",
    districts: ["Centrum", "Amsterdam-Zuid", "De Pijp", "Oost", "Noord", "Nieuw-West", "IJburg", "Amstelveen"],
    metaTitle: "Schuifpui Reparatie Amsterdam | Binnen 24u Ter Plaatse",
    metaDescription:
      "Schuifpui reparatie in Amsterdam en omgeving. Specialist voor alle merken, ook op hoogte en in monumentale panden. 100% garantie. Bel 0344 700 234.",
    h1: "Schuifpui Reparatie Amsterdam",
    summary:
      "Van de grachtengordel tot IJburg: onze monteurs repareren schuifpuien in heel Amsterdam, ook in appartementen op hoogte.",
    intro: [
      "Amsterdam heeft een woningvoorraad met twee uitersten die allebei hun eigen schuifpui-problematiek kennen. In de vooroorlogse panden rond het centrum en in De Pijp zijn schuifpuien vaak later ingebouwd in bestaande kozijnopeningen, waarbij het draagvlak onder de dorpel niet altijd optimaal is. Zakt zo'n vloer over de jaren enkele millimeters, dan gaat het paneel klemmen en slijten de looprollen versneld.",
      "Aan de andere kant staan de nieuwbouwappartementen in IJburg, Zeeburgereiland en Nieuw-West met grote, zware hefschuifdeuren naar het balkon. Die systemen zijn robuust, maar door hun gewicht en de intensieve blootstelling aan wind en slagregen op hoogte hebben ze structureel onderhoud nodig. Wij zijn wekelijks in Amsterdam en kennen beide type systemen goed.",
    ],
    sections: [
      {
        heading: "Werken op hoogte en in het centrum van Amsterdam",
        paragraphs: [
          "Een schuifpui op de vijfde verdieping vraagt om andere voorbereiding dan een tuindeur. Een glaspaneel van een hefschuifdeur weegt al snel meer dan honderd kilo en moet gelicht worden om bij de looprollen te komen. Onze monteurs werken standaard met glaszuignappen en tilhulpen, zodat het paneel veilig en zonder schade aan de vloerafwerking kan worden uitgenomen — ook in een appartement zonder buitenruimte om het paneel neer te zetten.",
          "In het centrum houden wij rekening met de praktische kant van werken in Amsterdam: laden en lossen in vergunningsgebied, smalle trappenhuizen en beperkte parkeergelegenheid. Wij plannen die klussen bewust ruim in, zodat een lastige bereikbaarheid niet ten koste gaat van de kwaliteit van het werk of tot meerkosten leidt.",
        ],
      },
      {
        heading: "Veelvoorkomende klachten in Amsterdam",
        paragraphs: [
          "De meest gemelde klacht uit Amsterdam is een schuifpui die zwaar loopt na een aantal jaren, vaak in combinatie met een sluiting die niet meer soepel valt. In balkonsituaties zien wij daarnaast regelmatig verstopte afwateringsgaten in de onderdorpel, met lekkage naar binnen tot gevolg. Beide klachten verhelpen wij doorgaans tijdens één bezoek.",
        ],
        bullets: [
          "Zwaar lopende schuifpuien in appartementen op hoogte",
          "Lekkage door verstopte afwatering in de onderdorpel",
          "Slot- en cilindervervanging na inbraakpogingen op de begane grond",
          "Hefschuifdeuren (HS-systemen) die niet meer volledig heffen",
        ],
      },
    ],
    faqs: [
      {
        q: "Komen jullie ook in Amsterdam-Noord en IJburg?",
        a: "Ja, wij bedienen heel Amsterdam inclusief Noord, IJburg, Zeeburgereiland en de omliggende gemeenten zoals Amstelveen, Diemen en Duivendrecht.",
      },
      {
        q: "Kunnen jullie een zware hefschuifdeur op een hoge verdieping repareren?",
        a: "Ja. Onze monteurs werken met glaszuignappen en tilhulpen en kunnen panelen ook in appartementen zonder buitenruimte veilig lichten.",
      },
    ],
    responseTime: "meestal binnen 24 uur",
  },
  {
    slug: "rotterdam",
    name: "Rotterdam",
    province: "Zuid-Holland",
    districts: ["Centrum", "Kralingen", "Rotterdam-Zuid", "Hillegersberg", "Delfshaven", "Nesselande", "Capelle aan den IJssel"],
    metaTitle: "Schuifpui Reparatie Rotterdam | Snel & Met Garantie",
    metaDescription:
      "Schuifpui specialist in Rotterdam: reparatie, slot vervangen en onderhoud in de hele Maasstad. Vakkundig en met garantie. Bel 0344 700 234.",
    h1: "Schuifpui Reparatie Rotterdam",
    summary:
      "Van Kralingen tot Nesselande: reparatie, slotvervanging en onderhoud van schuifpuien in de hele regio Rotterdam.",
    intro: [
      "Rotterdam is een stad van hoogbouw, en dat is aan de schuifpuien te merken. In de woontorens rond het centrum, de Kop van Zuid en Nesselande zitten grote schuifpuien en hefschuifdeuren die permanent worden blootgesteld aan wind. Die winddruk zorgt voor extra belasting op de sluitpunten: een pui die op de begane grond twintig jaar meegaat, vraagt op de achttiende verdieping merkbaar eerder om afstelling.",
      "Daarnaast heeft Rotterdam veel naoorlogse portiekwoningen en jaren-zeventig eengezinswoningen met schuifpuien naar de tuin. Bij die generatie puien lopen wij vooral tegen versleten looprollen en verweerde afdichting aan. Wij zijn wekelijks in de regio Rotterdam actief en hebben de gangbare onderdelen voor beide categorieën op de servicebus.",
    ],
    sections: [
      {
        heading: "Winddruk en zoute lucht in de Maasstad",
        paragraphs: [
          "De combinatie van hoogbouw en de open ligging richting de Maasvlakte betekent dat Rotterdamse schuifpuien meer te verduren krijgen dan gemiddeld. Winddruk drukt het paneel tegen de afdichting aan; slaat de pui bovendien niet meer volledig aan, dan ontstaat er tocht en fluitende geluiden bij storm. Dat is bijna altijd een kwestie van afstelling en niet van een defecte pui.",
          "In de westelijke stadsdelen en richting Hoek van Holland speelt daarnaast zoute lucht mee. Zout versnelt corrosie van onbehandelde stalen onderdelen in het beslag en de looprollen. Bij onderhoud in die gebieden vervangen wij versleten onderdelen daarom bij voorkeur door RVS-uitvoeringen, die aanzienlijk langer meegaan.",
        ],
      },
      {
        heading: "Onderhoud voor VvE's en woningcorporaties",
        paragraphs: [
          "Een groot deel van ons werk in Rotterdam bestaat uit collectieve opdrachten: complexen met tientallen identieke schuifpuien die in één ronde worden nagelopen. Wij plannen dat efficiënt per portiek of per bouwlaag en leveren achteraf een overzicht per woning, zodat de VvE of beheerder precies weet welke puien op korte termijn aandacht nodig hebben.",
          "Voor bewoners betekent dit korte, aangekondigde bezoeken van doorgaans drie kwartier per pui. Voor de beheerder betekent het een voorspelbare onderhoudsbegroting in plaats van losse storingsmeldingen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Werken jullie ook in Capelle, Schiedam en Barendrecht?",
        a: "Ja. Onze regio rond Rotterdam omvat onder meer Capelle aan den IJssel, Schiedam, Vlaardingen, Barendrecht, Ridderkerk en Spijkenisse.",
      },
      {
        q: "Mijn schuifpui fluit bij harde wind. Is dat te verhelpen?",
        a: "Vrijwel altijd. Fluiten en tocht duiden erop dat het paneel niet meer overal even strak tegen de afdichting sluit. Opnieuw afstellen en waar nodig de borstelafdichting vervangen lost dit doorgaans op.",
      },
    ],
    responseTime: "meestal binnen 24 uur",
  },
  {
    slug: "utrecht",
    name: "Utrecht",
    province: "Utrecht",
    districts: ["Binnenstad", "Leidsche Rijn", "Overvecht", "Lombok", "Vleuten-De Meern", "Nieuwegein", "Zeist", "Houten"],
    metaTitle: "Schuifpui Reparatie Utrecht | Specialist in de Regio",
    metaDescription:
      "Schuifpui reparatie en onderhoud in Utrecht en omgeving. Snelle service vanuit onze vestiging in Tiel, vaak dezelfde dag. Bel 0344 700 234.",
    h1: "Schuifpui Reparatie Utrecht",
    summary:
      "Utrecht ligt in onze thuisregio: korte aanrijtijden vanuit Tiel voor reparatie, slotvervanging en onderhoud.",
    intro: [
      "Utrecht ligt op nog geen drie kwartier rijden van onze vestiging in Tiel. Daardoor kunnen wij in de stad Utrecht en de omliggende gemeenten vaak sneller schakelen dan elders in het land — bij spoedgevallen zoals een niet-afsluitbare schuifpui lukt het regelmatig om dezelfde dag nog langs te komen.",
      "De stad kent een sterk gemengde woningvoorraad. In Leidsche Rijn en Vleuten-De Meern staan grote aantallen woningen van na 2000 met ruime schuifpuien naar de tuin, die nu precies in de levensfase komen waarin de eerste looprollen vervangen moeten worden. In Overvecht en Kanaleneiland gaat het juist vaak om galerijflats met oudere puien waarvan de originele onderdelen niet meer leverbaar zijn.",
    ],
    sections: [
      {
        heading: "Nieuwbouw in Leidsche Rijn: de eerste slijtageronde",
        paragraphs: [
          "Schuifpuien uit de bouwjaren 2000 tot 2010 in Leidsche Rijn draaien nu vijftien tot twintig jaar mee. Dat is precies de periode waarin de kunststof loopvlakken van de originele rollen hun spanning verliezen. De klacht begint bijna altijd hetzelfde: de pui loopt eerst 'een beetje zwaarder' en binnen een half jaar is hij met één hand niet meer te bedienen.",
          "Wordt daar op tijd naar gekeken, dan volstaat het vervangen van de looprollen en een reiniging van de rail. Wacht u te lang, dan vreet de ingezakte rol zich in de rail vast en moet ook de rail vervangen worden — een aanzienlijk grotere ingreep. Vroeg melden bespaart in dit geval echt geld.",
        ],
      },
      {
        heading: "Onze werkregio rond Utrecht",
        paragraphs: [
          "Naast de stad Utrecht zijn wij actief in Nieuwegein, Houten, IJsselstein, Zeist, De Bilt, Maarssen, Vianen en Woerden. Voor deze gemeenten geldt dezelfde snelle service als voor de stad zelf. Woont u net buiten dit gebied, bel dan gerust: in de provincie Utrecht zijn wij vrijwel dagelijks onderweg.",
        ],
        bullets: [
          "Utrecht stad, inclusief Leidsche Rijn en Vleuten-De Meern",
          "Nieuwegein, IJsselstein en Houten",
          "Zeist, De Bilt en Bilthoven",
          "Woerden, Maarssen en Vianen",
        ],
      },
    ],
    faqs: [
      {
        q: "Kunnen jullie in Utrecht dezelfde dag komen?",
        a: "Bij spoed, zoals een schuifpui die niet meer op slot kan, lukt dat regelmatig. Utrecht ligt dicht bij onze vestiging in Tiel, waardoor wij hier flexibel kunnen plannen.",
      },
      {
        q: "Mijn schuifpui uit 2005 loopt zwaar. Is dat normaal?",
        a: "Ja, dat is een typische leeftijdsklacht. Na vijftien tot twintig jaar zijn de looprollen aan vervanging toe. Laat het tijdig doen: een ingezakte rol beschadigt op den duur ook de rail.",
      },
    ],
    responseTime: "vaak nog dezelfde dag",
  },
  {
    slug: "den-haag",
    name: "Den Haag",
    province: "Zuid-Holland",
    districts: ["Centrum", "Scheveningen", "Loosduinen", "Benoordenhout", "Ypenburg", "Leidschenveen", "Rijswijk", "Voorburg"],
    metaTitle: "Schuifpui Reparatie Den Haag | Ook Kustzijde",
    metaDescription:
      "Schuifpui specialist in Den Haag en Scheveningen. Reparatie en onderhoud, bestand tegen zeeklimaat en zoute lucht. Bel direct: 0344 700 234.",
    h1: "Schuifpui Reparatie Den Haag",
    summary:
      "Van Scheveningen tot Ypenburg: schuifpui reparatie en onderhoud in de hofstad, met extra aandacht voor het zeeklimaat.",
    intro: [
      "Den Haag is de enige grote stad van Nederland die direct aan zee ligt, en dat heeft merkbare gevolgen voor schuifpuien. Zout in de lucht tast onbehandeld staal aan, fijn duinzand komt via de rail het schuifsysteem binnen en de wind vanaf zee zet permanent druk op de afdichting. Puien in Scheveningen, Kijkduin en Duindorp verouderen daardoor aantoonbaar sneller dan vergelijkbare puien in het binnenland.",
      "Wij houden daar bij reparatie en onderhoud rekening mee. In het kustgebied kiezen wij standaard voor corrosiebestendige onderdelen en adviseren wij een kortere onderhoudscyclus. In de wijken verder landinwaarts, zoals Ypenburg, Leidschenveen en Benoordenhout, volstaat een reguliere jaarlijkse beurt.",
    ],
    sections: [
      {
        heading: "Zoute lucht en duinzand: wat dat met uw schuifpui doet",
        paragraphs: [
          "Duinzand is scherp en fijn. Het waait in de onderrail en werkt daar als schuurmiddel tussen rol en loopvlak. Waar een schuifpui in het binnenland na jaren nog een gladde rail heeft, zien wij in de kustwijken vaak duidelijke groefvorming. Regelmatig uitzuigen van de rail is aan de kust daarom geen luxe maar noodzaak.",
          "Zout versnelt bovendien de corrosie van assen, veren en sluitpunten in de meerpuntssluiting. Een sluiting die stroef begint te lopen is aan zee zelden een afstelprobleem alleen — vaak zit er corrosie in het mechaniek. Wij reinigen en behandelen die onderdelen, en vervangen ze bij aantasting door RVS-uitvoeringen.",
        ],
      },
      {
        heading: "Schuifpui service in heel Haaglanden",
        paragraphs: [
          "Naast Den Haag zelf werken wij in Rijswijk, Voorburg, Leidschendam, Wassenaar, Zoetermeer, Delft en Naaldwijk. Voor appartementencomplexen aan de boulevard verzorgen wij ook collectief onderhoud, waarbij alle puien in één ronde worden nagelopen en gerapporteerd.",
        ],
        bullets: [
          "Reparatie en afstelling van schuifpuien en hefschuifdeuren",
          "Vervanging van gecorrodeerd beslag door RVS-onderdelen",
          "Slot- en cilindervervanging met SKG-keurmerk",
          "Onderhoudsrondes voor VvE's aan de kustzijde",
        ],
      },
    ],
    faqs: [
      {
        q: "Hoe vaak moet onderhoud aan de kust gebeuren?",
        a: "In Scheveningen, Kijkduin en Duindorp adviseren wij twee onderhoudsbeurten per jaar in plaats van één, vanwege zout en instuivend duinzand.",
      },
      {
        q: "Werken jullie ook in Rijswijk, Voorburg en Zoetermeer?",
        a: "Ja, de hele regio Haaglanden valt binnen ons werkgebied, inclusief Rijswijk, Voorburg, Leidschendam, Wassenaar, Zoetermeer en Delft.",
      },
    ],
    responseTime: "meestal binnen 24 uur",
  },
  {
    slug: "eindhoven",
    name: "Eindhoven",
    province: "Noord-Brabant",
    districts: ["Centrum", "Strijp", "Woensel", "Stratum", "Gestel", "Tongelre", "Veldhoven", "Helmond"],
    metaTitle: "Schuifpui Reparatie Eindhoven | Alle Merken",
    metaDescription:
      "Schuifpui reparatie in Eindhoven en regio Zuidoost-Brabant. Specialist in alle merken en systemen. Snel ter plaatse. Bel 0344 700 234.",
    h1: "Schuifpui Reparatie Eindhoven",
    summary:
      "Reparatie, slotvervanging en onderhoud van schuifpuien in Eindhoven, Veldhoven, Helmond en de rest van Zuidoost-Brabant.",
    intro: [
      "Eindhoven heeft de afgelopen twintig jaar een enorme bouw- en renovatiegolf doorgemaakt. In Strijp-S en het centrum zijn oude industriële panden omgebouwd tot lofts met grote glaspartijen en zware schuifdeuren. In Meerhoven en Blixembosch staan duizenden woningen van na 2000. En daaromheen ligt een grote voorraad jaren-zestig en zeventig woningen met de klassieke tuindeur-schuifpui.",
      "Die diversiteit maakt Eindhoven een stad waar merkkennis loont. Wij komen hier zowel oude, niet meer ondersteunde systemen tegen als moderne hefschuifdeuren met elektronisch bediende sluiting. Onze monteurs in de regio Zuidoost-Brabant zijn op beide uitersten voorbereid.",
    ],
    sections: [
      {
        heading: "Grote glaspartijen in lofts en nieuwbouw",
        paragraphs: [
          "De grote schuifdeuren in de gerenoveerde Strijp-panden en in moderne nieuwbouw zijn indrukwekkend, maar ook zwaar. Panelen van tweehonderd kilo of meer zijn geen uitzondering. Bij dat gewicht is de afstelling extreem nauw: een afwijking van enkele millimeters in de hoogte maakt het verschil tussen een pui die met één vinger glijdt en een pui waar u tegenaan moet leunen.",
          "Wij werken bij die systemen altijd met tilgereedschap en stellen de pui na de reparatie in beide uiterste standen af. Ook controleren wij de bovengeleiding: bij zware panelen is dat het punt waar overbelasting zich als eerste manifesteert, vaak nog voordat de gebruiker iets merkt.",
        ],
      },
      {
        heading: "Ons werkgebied in Zuidoost-Brabant",
        paragraphs: [
          "Vanuit Eindhoven bedienen wij de hele regio: Veldhoven, Helmond, Best, Son en Breugel, Geldrop, Nuenen, Waalre en Valkenswaard. Voor bedrijven en horeca in het centrum plannen wij het werk waar mogelijk buiten openingstijden, zodat uw bedrijfsvoering geen hinder ondervindt.",
        ],
        bullets: [
          "Reparatie van zware hefschuifdeuren en grote glaspartijen",
          "Onderhoud aan schuifpuien in nieuwbouwwijken",
          "Slot- en hendelvervanging bij oudere tuinpuien",
          "Service buiten kantooruren voor horeca en kantoren",
        ],
      },
    ],
    faqs: [
      {
        q: "Repareren jullie ook zeer grote of zware schuifdeuren?",
        a: "Ja. Panelen van tweehonderd kilo en meer zijn voor ons routine; wij werken standaard met glaszuignappen en tilhulpen en stellen de deur na afloop volledig opnieuw af.",
      },
      {
        q: "Komen jullie ook in Helmond en Veldhoven?",
        a: "Zeker. Ons werkgebied rond Eindhoven omvat onder meer Helmond, Veldhoven, Best, Geldrop, Nuenen, Waalre en Valkenswaard.",
      },
    ],
    responseTime: "meestal binnen 24 uur",
  },
  {
    slug: "tilburg",
    name: "Tilburg",
    province: "Noord-Brabant",
    districts: ["Centrum", "Reeshof", "Berkel-Enschot", "Udenhout", "Goirle", "Oisterwijk", "Waalwijk"],
    metaTitle: "Schuifpui Reparatie Tilburg | Snel & Vakkundig",
    metaDescription:
      "Schuifpui reparatie, hendel- en slotvervanging in Tilburg en omgeving. Vakkundige monteurs met garantie op het werk. Bel 0344 700 234.",
    h1: "Schuifpui Reparatie Tilburg",
    summary:
      "Hendelvervanging, slotreparatie en volledig onderhoud van schuifpuien in Tilburg, de Reeshof en omliggende kernen.",
    intro: [
      "Tilburg kent met de Reeshof een van de grootste aaneengesloten nieuwbouwwijken van Nederland. Tienduizenden woningen daar zijn tussen 1985 en 2010 gebouwd, veelal met een vergelijkbaar type schuifpui naar de achtertuin. Dat betekent dat wij in deze wijk keer op keer dezelfde systemen tegenkomen — en dus vrijwel altijd de juiste onderdelen op de bus hebben liggen.",
      "In het centrum en in de oudere wijken rond de voormalige textielfabrieken ligt het anders. Daar zitten schuifpuien die bij verbouwingen zijn ingebouwd, vaak met beslag dat inmiddels niet meer leverbaar is. Juist voor dat soort situaties is onze ervaring met universele vervangingsonderdelen waardevol.",
    ],
    sections: [
      {
        heading: "Reeshof: dezelfde pui, dezelfde klacht",
        paragraphs: [
          "Woningen uit dezelfde bouwstroom slijten in hetzelfde tempo. In de Reeshof zien wij dan ook golven van vergelijkbare meldingen: eerst een reeks zware schuifpuien, een jaar later dezelfde straat met klemmende sluitingen. Dat maakt het voor ons goed voorspelbaar en voor u voordelig, omdat wij de klus vrijwel altijd tijdens het eerste bezoek kunnen afronden.",
          "Woont u in een straat waar buren recent hetzelfde probleem hadden, geef dat dan door bij het maken van de afspraak. Weten wij welk systeem er in uw blok zit, dan nemen wij de juiste onderdelen direct mee.",
        ],
      },
      {
        heading: "Schuifpui hendel en slot vervangen in Tilburg",
        paragraphs: [
          "Hendel- en slotvervanging is in Tilburg onze meest gevraagde dienst. Een doordraaiende hendel of een sluiting die niet meer wil vallen is meestal binnen een uur verholpen. Wij controleren daarbij altijd of het paneel goed is afgesteld: is dat niet het geval, dan is een nieuwe hendel een tijdelijke oplossing en breekt ook die weer af.",
        ],
        bullets: [
          "Vervanging van standaard en afsluitbare hendels",
          "Reparatie van meerpuntssluitingen en sluitkommen",
          "SKG-gecertificeerde cilinders",
          "Afstellen van het paneel om herhaling te voorkomen",
        ],
      },
    ],
    faqs: [
      {
        q: "Hebben jullie onderdelen voor Reeshof-woningen op voorraad?",
        a: "Voor de meest voorkomende systemen in de Reeshof wel. Geef bij het maken van de afspraak uw straat en bouwjaar door, dan zorgen wij dat het juiste materiaal meekomt.",
      },
      {
        q: "Werken jullie ook in Goirle, Oisterwijk en Waalwijk?",
        a: "Ja, de omliggende kernen zoals Goirle, Oisterwijk, Udenhout, Berkel-Enschot, Waalwijk en Loon op Zand vallen binnen ons werkgebied.",
      },
    ],
    responseTime: "meestal binnen 24 uur",
  },
  {
    slug: "breda",
    name: "Breda",
    province: "Noord-Brabant",
    districts: ["Centrum", "Ginneken", "Prinsenbeek", "Teteringen", "Haagse Beemden", "Oosterhout", "Etten-Leur"],
    metaTitle: "Schuifpui Reparatie Breda | Met Garantie op het Werk",
    metaDescription:
      "Schuifpui reparatie in Breda en West-Brabant. Ervaren monteurs, eerlijke prijzen en garantie op elke reparatie. Bel direct: 0344 700 234.",
    h1: "Schuifpui Reparatie Breda",
    summary:
      "Vakkundige reparatie en onderhoud van schuifpuien in Breda, Oosterhout, Etten-Leur en de rest van West-Brabant.",
    intro: [
      "Breda combineert een historische binnenstad met ruime, groene woonwijken als het Ginneken, Prinsenbeek en de Haagse Beemden. Vooral in die groene wijken zien wij een specifieke klacht terug: bladval en bloesem die zich in de onderrail ophopen. Vermengd met regenwater ontstaat een laag die de afwatering verstopt en de looprollen versneld laat slijten.",
      "Dat is ook precies de reden dat wij in Breda relatief veel onderhoudsbeurten uitvoeren in het najaar. Een pui die vóór de winter is gereinigd, afgesteld en gesmeerd komt het natte seizoen zonder problemen door — en voorkomt de klassieke januarimelding van een pui die niet meer sluit.",
    ],
    sections: [
      {
        heading: "Bladval, afwatering en lekkage",
        paragraphs: [
          "De onderdorpel van een schuifpui heeft kleine afwateringsgaten die regenwater naar buiten afvoeren. Raken die verstopt met bladresten en zand, dan blijft het water in de dorpel staan. Bij vorst zet dat water uit en bij langdurige stilstand zoekt het zijn weg naar binnen, langs de vloerafwerking. Wij zien in Breda regelmatig plinten en vloeren die daardoor onnodig beschadigd zijn geraakt.",
          "Het goede nieuws: het is eenvoudig te voorkomen. Bij elke onderhoudsbeurt maken wij de afwateringsgaten vrij en controleren wij de doorstroming met water. Dat is een kwestie van minuten en voorkomt schade die honderden euro's kan kosten.",
        ],
      },
      {
        heading: "Onze service in West-Brabant",
        paragraphs: [
          "Vanuit Breda bedienen wij Oosterhout, Etten-Leur, Prinsenbeek, Teteringen, Zundert, Rijsbergen, Made en Roosendaal. Voor particuliere klanten werken wij op afspraak binnen een tijdvak van twee uur, zodat u niet een halve dag hoeft te wachten.",
        ],
        bullets: [
          "Najaarsonderhoud met reiniging van de afwatering",
          "Vervanging van versleten looprollen en geleiders",
          "Herstel van tocht- en lekkageproblemen",
          "Slot-, cilinder- en hendelvervanging",
        ],
      },
    ],
    faqs: [
      {
        q: "Mijn schuifpui lekt bij hevige regen. Wat kan dat zijn?",
        a: "In de meeste gevallen zijn de afwateringsgaten in de onderdorpel verstopt met blad en zand. Wij maken die vrij en controleren de doorstroming; vaak is het probleem daarmee opgelost.",
      },
      {
        q: "Wanneer kan ik het beste onderhoud laten uitvoeren?",
        a: "Wij adviseren het najaar, na de bladval en vóór de vorstperiode. Uw pui gaat dan schoon en goed afgesteld de winter in.",
      },
    ],
    responseTime: "meestal binnen 24 uur",
  },
  {
    slug: "arnhem",
    name: "Arnhem",
    province: "Gelderland",
    districts: ["Centrum", "Velp", "Oosterbeek", "Presikhaaf", "Schuytgraaf", "Rheden", "Duiven", "Westervoort"],
    metaTitle: "Schuifpui Reparatie Arnhem | Regio Gelderland",
    metaDescription:
      "Schuifpui reparatie en onderhoud in Arnhem en de regio Gelderland. Korte aanrijtijden vanuit Tiel. Bel direct: 0344 700 234.",
    h1: "Schuifpui Reparatie Arnhem",
    summary:
      "Arnhem ligt in onze eigen provincie: snelle service voor reparatie, inbraakschade en onderhoud van schuifpuien.",
    intro: [
      "Arnhem ligt in onze eigen provincie Gelderland, op korte afstand van onze vestiging in Tiel. Daardoor kunnen wij hier flexibel plannen en bij spoed vaak snel schakelen. Dat is met name relevant bij inbraakschade: een niet-afsluitbare schuifpui willen wij liefst dezelfde dag nog veilig hebben.",
      "De woningvoorraad in Arnhem is opvallend divers. Rond Velp, Oosterbeek en de noordelijke stadsrand staan ruime, vaak vrijstaande woningen met grote glaspartijen richting de tuin. In Presikhaaf en Malburgen gaat het vaker om gestapelde bouw met balkonpuien. Schuytgraaf is nieuwbouw met moderne hefschuifsystemen. Elk type vraagt een eigen aanpak.",
    ],
    sections: [
      {
        heading: "Grote glaspartijen aan de Veluwezoom",
        paragraphs: [
          "De villawijken rond Velp, Rozendaal en Oosterbeek hebben veel woningen met brede schuifpuien die uitkijken op de tuin. Die panelen zijn groot en zwaar, en staan bovendien vaak aan de zuidkant. De combinatie van gewicht en thermische uitzetting door zoninstraling maakt dat deze puien vaker afgesteld moeten worden dan gemiddeld.",
          "Bij dit type pui letten wij extra op de bovengeleiding en op de speling in het kozijn. Een paneel dat in de zomer klemt maar in de winter probleemloos loopt, heeft geen defect onderdeel maar te weinig ruimte voor uitzetting. Dat is een afstelkwestie en vraagt dus geen dure vervangingen.",
        ],
      },
      {
        heading: "Spoedservice bij inbraakschade in Arnhem",
        paragraphs: [
          "Omdat Arnhem dicht bij onze vestiging ligt, is spoedservice hier goed te organiseren. Meld bij het bellen dat de pui niet meer afsluitbaar is, dan krijgt uw melding voorrang in de planning. Wij herstellen de sluiting, vervangen beschadigde cilinders en sluitkommen en leveren fotorapportage voor uw verzekeraar.",
        ],
        bullets: [
          "Voorrang bij niet-afsluitbare puien",
          "Vervanging van beschadigde sloten en sluitkommen",
          "Anti-optilbeveiliging tegen herhaling",
          "Rapportage voor de verzekering",
        ],
      },
    ],
    faqs: [
      {
        q: "Mijn schuifpui klemt alleen in de zomer. Hoe kan dat?",
        a: "Aluminium en kunststof zetten uit bij warmte. Klemt de pui alleen bij hoge temperaturen, dan is er meestal te weinig speling. Opnieuw afstellen lost dat op, zonder dat er onderdelen vervangen hoeven te worden.",
      },
      {
        q: "Komen jullie ook in Velp, Duiven en Westervoort?",
        a: "Ja. Arnhem en omliggende plaatsen als Velp, Rheden, Oosterbeek, Duiven, Westervoort en Zevenaar liggen in onze thuisregio Gelderland.",
      },
    ],
    responseTime: "vaak nog dezelfde dag",
  },
  {
    slug: "nijmegen",
    name: "Nijmegen",
    province: "Gelderland",
    districts: ["Centrum", "Nijmegen-Oost", "Lent", "Dukenburg", "Hatert", "Beuningen", "Wijchen", "Malden"],
    metaTitle: "Schuifpui Reparatie Nijmegen | Alle Merken & Typen",
    metaDescription:
      "Schuifpui specialist in Nijmegen en omgeving. Reparatie van alle merken, ook oudere systemen. Snel ter plaatse. Bel 0344 700 234.",
    h1: "Schuifpui Reparatie Nijmegen",
    summary:
      "Van Nijmegen-Oost tot Lent: reparatie van alle merken schuifpuien, inclusief oudere systemen waarvan onderdelen niet meer leverbaar zijn.",
    intro: [
      "Nijmegen heeft een woningvoorraad met een grote spreiding in bouwjaren. In Nijmegen-Oost en rond het centrum staan veel woningen uit de wederopbouwperiode, waar schuifpuien later zijn ingebouwd bij verbouwingen. In Dukenburg en Lindenholt gaat het om jaren-zeventig planbouw. En in Lent en de Waalsprong staat nieuwbouw van na 2010.",
      "In de praktijk betekent dit dat wij in Nijmegen relatief veel oudere systemen tegenkomen waarvan de originele onderdelen niet meer verkrijgbaar zijn. Dat is zelden een reden om een pui af te schrijven: met universele looprollen, aangepaste geleiders en vakkundige montage is een reparatie vrijwel altijd mogelijk.",
    ],
    sections: [
      {
        heading: "Oudere systemen zonder originele onderdelen",
        paragraphs: [
          "Wanneer een fabrikant is gestopt of een systeem uit productie is genomen, krijgen huiseigenaren vaak te horen dat de hele pui vervangen moet worden. In verreweg de meeste gevallen klopt dat niet. Looprollen, geleiders en borstelafdichting zijn standaardcomponenten die in verschillende maten universeel verkrijgbaar zijn; het komt aan op het correct opmeten en waar nodig aanpassen van de bevestiging.",
          "Onze monteurs meten bij zulke puien de asafstand, de wieldiameter en de profielbreedte in en selecteren daarop een passend alternatief. Het resultaat is een pui die weer soepel loopt tegen een fractie van de kosten van vervanging — en waarbij uw bestaande kozijn en glas gewoon blijven zitten.",
        ],
      },
      {
        heading: "Werkgebied rond Nijmegen",
        paragraphs: [
          "Wij zijn actief in Nijmegen en omliggende gemeenten als Beuningen, Wijchen, Malden, Groesbeek, Elst en Bemmel. Vanuit onze vestiging in Tiel is dit een korte rit, waardoor wij ook hier flexibel kunnen inplannen.",
        ],
        bullets: [
          "Universele looprollen voor niet meer leverbare systemen",
          "Reparatie van ingebouwde schuifpuien in oudere panden",
          "Onderhoud aan nieuwbouwpuien in Lent en de Waalsprong",
          "Slot- en hendelvervanging voor alle merken",
        ],
      },
    ],
    faqs: [
      {
        q: "Mijn schuifpui is uit 1985 en het merk bestaat niet meer. Kunnen jullie helpen?",
        a: "Vrijwel zeker. Wij meten de asafstand, wieldiameter en profielmaat op en monteren een passend universeel alternatief. Vervanging van de hele pui is zelden nodig.",
      },
      {
        q: "Werken jullie ook in Wijchen, Beuningen en Elst?",
        a: "Ja. De regio rond Nijmegen, waaronder Wijchen, Beuningen, Malden, Groesbeek, Elst en Bemmel, valt binnen ons werkgebied.",
      },
    ],
    responseTime: "vaak nog dezelfde dag",
  },
  {
    slug: "almere",
    name: "Almere",
    province: "Flevoland",
    districts: ["Almere Stad", "Almere Buiten", "Almere Haven", "Almere Poort", "Lelystad", "Zeewolde"],
    metaTitle: "Schuifpui Reparatie Almere | Heel Flevoland",
    metaDescription:
      "Schuifpui reparatie en onderhoud in Almere en Flevoland. Specialist in nieuwbouwsystemen en hefschuifdeuren. Bel 0344 700 234.",
    h1: "Schuifpui Reparatie Almere",
    summary:
      "Almere Stad, Buiten, Haven en Poort: reparatie en onderhoud van moderne schuifpuien en hefschuifdeuren in heel Flevoland.",
    intro: [
      "Almere is een jonge stad, en dat bepaalt het werk dat wij er doen. De woningvoorraad dateert grotendeels uit de periode 1980 tot heden, met een sterke concentratie rond de eeuwwisseling. Die puien zijn technisch modern, maar bereiken nu wel massaal de leeftijd waarop de eerste looprollen en afdichtingen aan vervanging toe zijn.",
      "Daarbij speelt de open ligging van Flevoland een rol. Er staan weinig obstakels tussen het IJsselmeer en de woonwijken, waardoor de wind vol op de gevels staat. Schuifpuien aan de west- en noordzijde van een woning krijgen daardoor structureel meer winddruk te verwerken dan gemiddeld, met tocht en fluitgeluiden als eerste signaal.",
    ],
    sections: [
      {
        heading: "Winddruk en afdichting in Flevoland",
        paragraphs: [
          "Tocht langs een schuifpui wordt vaak geweten aan 'oude kozijnen', maar bij puien van na 2000 is de oorzaak bijna altijd een afdichting die zijn veerkracht heeft verloren of een paneel dat een paar millimeter is verzakt. Beide zijn goed te verhelpen: nieuwe borstel- of rubberafdichting plaatsen en het paneel opnieuw uitlijnen zodat het over de volle hoogte gelijkmatig aandrukt.",
          "Het effect is direct merkbaar in comfort en in de energierekening. Een schuifpui die over de volle hoogte aansluit, scheelt in een winderige omgeving als Almere aanzienlijk in warmteverlies langs de gevel.",
        ],
      },
      {
        heading: "Hefschuifdeuren en moderne systemen",
        paragraphs: [
          "In Almere Poort en de nieuwere delen van Almere Buiten zien wij veel hefschuifdeuren. Deze systemen tillen het paneel bij bediening enkele millimeters op, waardoor het gewicht tijdens het schuiven van de afdichting wordt gehaald. Werkt het hefmechanisme niet meer volledig, dan sleept het paneel over de afdichting: dat voelt zwaar en beschadigt de afdichting snel.",
          "Wij stellen het hefmechanisme opnieuw af, vervangen versleten hefblokken en controleren de hendel. Meestal is de pui daarna weer met één hand te bedienen.",
        ],
        bullets: [
          "Vervanging van borstel- en rubberafdichting tegen tocht",
          "Afstellen en repareren van hefschuifdeuren (HS-systemen)",
          "Vervangen van looprollen bij puien uit 1995–2010",
          "Onderhoud voor VvE's in Almere Stad en Poort",
        ],
      },
    ],
    faqs: [
      {
        q: "Er staat tocht langs mijn schuifpui uit 2004. Moet hij vervangen worden?",
        a: "Nee, vrijwel nooit. Tocht bij puien van die leeftijd komt door een verharde afdichting of een licht verzakt paneel. Nieuwe afdichting en opnieuw afstellen lossen dit doorgaans volledig op.",
      },
      {
        q: "Komen jullie ook in Lelystad en Zeewolde?",
        a: "Ja, heel Flevoland valt binnen ons werkgebied, inclusief Lelystad, Zeewolde, Dronten en de Noordoostpolder.",
      },
    ],
    responseTime: "meestal binnen 24 uur",
  },
  {
    slug: "tiel",
    name: "Tiel",
    province: "Gelderland",
    districts: ["Centrum", "Passewaaij", "Drumpt", "Culemborg", "Geldermalsen", "Zaltbommel", "Buren"],
    metaTitle: "Schuifpui Reparatie Tiel | Uw Lokale Specialist",
    metaDescription:
      "Schuifpui specialist gevestigd in Tiel, Voltastraat 3B. Reparatie en onderhoud in Tiel en de Betuwe, vaak dezelfde dag. Bel 0344 700 234.",
    h1: "Schuifpui Reparatie Tiel en de Betuwe",
    summary:
      "Onze thuisbasis. Vanuit Voltastraat 3B in Tiel bedienen wij de hele Betuwe, vaak nog dezelfde dag.",
    intro: [
      "Tiel is onze thuisbasis. Ons bedrijf is gevestigd aan de Voltastraat 3B en van hieruit rijden onze monteurs elke dag heel Nederland in. Voor klanten in Tiel en de Betuwe betekent dat de kortst mogelijke lijnen: een spoedmelding kunnen wij hier vrijwel altijd dezelfde dag oppakken, en voor kleine klussen kunnen wij vaak aansluiten op een rit die al gepland stond.",
      "Ook praktisch heeft dat voordelen. Onderdelen die besteld moeten worden, halen wij hier zelf op zodra ze binnen zijn, zonder extra voorrijkosten voor een tweede bezoek. En twijfelt u over de staat van uw schuifpui, dan kunt u langskomen met een foto of een onderdeel voor advies.",
    ],
    sections: [
      {
        heading: "Schuifpui service in de Betuwe",
        paragraphs: [
          "Vanuit Tiel bedienen wij Culemborg, Geldermalsen, Zaltbommel, Buren, Beesd, Leerdam, Kesteren en Ochten. De Betuwe kent veel vrijstaande woningen en boerderijwoningen met ruime schuifpuien naar de tuin, vaak in aluminium uitvoering en soms van aanzienlijke breedte.",
          "Bij die brede puien is periodiek afstellen belangrijker dan bij een standaardmaat. Hoe breder het paneel, hoe groter het effect van een kleine verzakking op de aansluiting aan de sluitzijde. Een jaarlijkse controle voorkomt hier dat een klein afstelverschil uitgroeit tot een versleten rail.",
        ],
      },
      {
        heading: "Lokaal bedrijf, landelijke service",
        paragraphs: [
          "Wij zijn een lokaal geworteld bedrijf dat landelijk werkt. Dat betekent voor u in Tiel de voordelen van beide: een vaste, bereikbare vestiging in de buurt én de ervaring en onderdelenvoorraad van een specialist die dagelijks in het hele land schuifpuien onder handen heeft.",
        ],
        bullets: [
          "Vestiging aan de Voltastraat 3B, 4004 KA Tiel",
          "Vaak dezelfde dag ter plaatse in Tiel en directe omgeving",
          "Geen extra voorrijkosten bij nabestelde onderdelen",
          "Onderhoud en reparatie voor particulieren en bedrijven",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan ik langskomen op de Voltastraat in Tiel?",
        a: "Voor advies of het tonen van een onderdeel bent u van harte welkom, wel graag na telefonisch overleg — onze monteurs zijn overdag meestal op locatie.",
      },
      {
        q: "Hoe snel kunnen jullie in Tiel ter plaatse zijn?",
        a: "In Tiel en directe omgeving lukt het regelmatig om nog dezelfde dag langs te komen, zeker bij spoed zoals een niet-afsluitbare schuifpui.",
      },
    ],
    responseTime: "vaak nog dezelfde dag",
  },
];

export const cityBySlug = (slug: string): City | undefined =>
  cities.find((c) => c.slug === slug);

/** Platte lijst met plaatsnamen, gebruikt in `areaServed` van het schema. */
export const cityNames = cities.map((c) => c.name);
