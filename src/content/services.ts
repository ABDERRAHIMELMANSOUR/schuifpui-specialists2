/**
 * Dienstpagina's (/diensten/:slug).
 *
 * Elke dienst heeft unieke, uitgebreide Nederlandse content (400+ woorden) met
 * eigen H1, H2-structuur, meta title/description en FAQ. Dit bestand bevat
 * bewust geen React-imports: het wordt ook door de build-time SEO plugin
 * ingelezen voor de sitemap en de prerender.
 */

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  /** Volledige dienstnaam, o.a. gebruikt in schema.org en breadcrumbs. */
  name: string;
  /** Korte naam voor navigatie en kaarten. */
  shortName: string;
  /** Naam van het lucide-react icoon (zie ICONS in de dienstpagina). */
  icon: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Korte samenvatting onder de H1 en in overzichtskaarten. */
  summary: string;
  intro: string[];
  /** Concrete klachten die klanten herkennen — goed voor long-tail zoekwoorden. */
  symptoms: string[];
  sections: ContentSection[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "schuifpui-reparatie",
    name: "Schuifpui Reparatie",
    shortName: "Schuifpui reparatie",
    icon: "Wrench",
    metaTitle: "Schuifpui Reparatie | Binnen 24u Ter Plaatse in NL",
    metaDescription:
      "Schuifpui die zwaar loopt of niet meer sluit? Onze specialisten repareren alle merken in heel Nederland. 100% garantie. Bel direct: 0344 700 234.",
    h1: "Schuifpui Reparatie in Heel Nederland",
    summary:
      "Loopt uw schuifpui zwaar, hangt hij scheef of sluit hij niet meer af? Wij vervangen wieltjes, rails en beslag zodat uw schuifpui weer soepel glijdt.",
    intro: [
      "Een schuifpui die zwaar loopt is bijna nooit een kwestie van pech, maar van slijtage. Het volledige gewicht van een glaspaneel van soms wel 150 kilo rust op twee tot vier looprollen die dagelijks over dezelfde rail bewegen. Zand, stof en regenwater doen de rest. Wanneer die rollen inzakken of de rail beschadigd raakt, moet u steeds harder duwen — en juist dat harde duwen versnelt de schade aan het beslag en het kozijn.",
      "Schuifpui Service Nederland is gespecialiseerd in het repareren van schuifpuien van alle merken en bouwjaren. Wij komen meestal binnen 24 uur bij u langs, stellen ter plaatse de oorzaak vast en repareren in de meeste gevallen direct tijdens het eerste bezoek. U krijgt vooraf een duidelijke prijsopgave en garantie op zowel het werk als de gebruikte onderdelen.",
    ],
    symptoms: [
      "De schuifpui loopt zwaar of moet met twee handen worden opengetrokken",
      "De schuifdeur hapert, springt uit de rail of loopt scheef",
      "Een schurend of piepend geluid bij het openen en sluiten",
      "De schuifpui sluit niet meer volledig aan en er staat tocht op",
      "Zichtbaar ingezakte of geblokkeerde looprollen",
      "Regenwater dat via de onderdorpel naar binnen loopt",
    ],
    sections: [
      {
        heading: "Wat wij tijdens een schuifpui reparatie doen",
        paragraphs: [
          "Onze monteur begint altijd met een volledige inspectie van het schuifsysteem. Wij controleren de looprollen, de onder- en bovenrail, de geleiders, de borstelafdichting, het hang- en sluitwerk en de uitlijning van het paneel in het kozijn. Pas als duidelijk is wat de werkelijke oorzaak is, wordt er gerepareerd — zo voorkomt u dat er onderdelen worden vervangen die nog prima functioneren.",
          "In de meeste gevallen wordt het paneel gelicht, worden de versleten looprollen vervangen door nieuwe rollen van hetzelfde type, en wordt de rail gereinigd en waar nodig gericht of vervangen. Daarna stellen wij het paneel opnieuw af zodat het over de volle hoogte gelijkmatig aansluit en de afdichting weer overal contact maakt.",
        ],
        bullets: [
          "Vervangen van versleten looprollen en lagers",
          "Reinigen, richten of vervangen van de onderrail",
          "Vervangen van geleiders en borstelafdichting",
          "Opnieuw uitlijnen en afstellen van het schuifpaneel",
          "Afstellen van het hang- en sluitwerk",
          "Controle op tocht- en lekdichtheid na afloop",
        ],
      },
      {
        heading: "Alle merken en systemen",
        paragraphs: [
          "Wij werken dagelijks met schuifpuien van Reynaers, Schüco, Kawneer, Aliplast, Sapa, Hueck en Alutherm, maar ook met oudere aluminium en kunststof systemen waarvan de fabrikant niet meer bestaat. Juist bij die oudere systemen loont het om een specialist in te schakelen: veel onderdelen zijn niet meer origineel leverbaar, maar met de juiste universele looprollen en aanpassingen is een reparatie vrijwel altijd mogelijk.",
          "Naast klassieke schuifpuien repareren wij ook hefschuifdeuren (HS-systemen), parallelschuifkiepdeuren (PSK) en vouwwanden. Deze systemen hebben een zwaarder beslag en vragen om specifiek gereedschap en ervaring — een reguliere klusbedrijf loopt hier vaak op vast.",
        ],
      },
      {
        heading: "Repareren of vervangen?",
        paragraphs: [
          "Een nieuwe schuifpui kost al snel enkele duizenden euro's. Een reparatie ligt daar een factor lager en is in verreweg de meeste gevallen de verstandigste keuze: het glas, het kozijn en het frame gaan doorgaans decennia mee, terwijl juist het bewegende deel slijt. Alleen wanneer het kozijn zelf is doorgerot of het glas onherstelbaar beschadigd is, adviseren wij vervanging.",
          "Onze monteur geeft altijd een eerlijk advies, ook als dat betekent dat een reparatie niet zinvol is. U ontvangt dan een onderbouwde uitleg waarom, zodat u een goed geïnformeerde keuze kunt maken.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hoe lang duurt een schuifpui reparatie?",
        a: "Een standaardreparatie, zoals het vervangen van looprollen en het afstellen van het paneel, duurt gemiddeld één tot twee uur. Moet er een specifiek onderdeel besteld worden, dan plannen wij een tweede korte afspraak in.",
      },
      {
        q: "Kunnen jullie mijn schuifpui repareren als het merk onbekend is?",
        a: "Ja. Wij herkennen de meeste systemen aan het profiel en het beslag. Is een origineel onderdeel niet meer leverbaar, dan gebruiken wij een gelijkwaardig universeel alternatief dat past op uw systeem.",
      },
      {
        q: "Wat kost een schuifpui reparatie?",
        a: "De kosten hangen af van het type reparatie en de benodigde onderdelen. U ontvangt altijd vooraf een vrijblijvende prijsopgave, zodat u niet voor verrassingen komt te staan.",
      },
    ],
  },
  {
    slug: "slot-reparatie-schuifpui",
    name: "Slot Reparatie en Vervanging",
    shortName: "Slot reparatie",
    icon: "Lock",
    metaTitle: "Slot Reparatie Schuifpui | SKG-Slot Vervangen",
    metaDescription:
      "Slot van uw schuifpui kapot of klemt de cilinder? Wij repareren en vervangen schuifpui-sloten met SKG-keurmerk. Snel ter plaatse. Bel 0344 700 234.",
    h1: "Slot Reparatie Schuifpui: Herstel en Vervanging",
    summary:
      "Een klemmend of kapot slot maakt uw woning kwetsbaar. Wij repareren en vervangen schuifpui-sloten en cilinders met erkend SKG-keurmerk.",
    intro: [
      "Het slot is het meest bepalende onderdeel voor de inbraakwerendheid van uw schuifpui. Een schuifpui heeft geen zware scharnieren die het paneel op zijn plaats houden: het is het meerpuntssluiting-slot dat het paneel in het kozijn vergrendelt. Werkt dat slot niet meer goed, dan is de schuifpui in feite alleen nog dichtgeschoven en niet meer daadwerkelijk vergrendeld.",
      "Wij repareren en vervangen sloten, cilinders en meerpuntssluitingen van schuifpuien in heel Nederland. Waar mogelijk repareren wij het bestaande slot; is vervanging nodig, dan plaatsen wij uitsluitend sloten en cilinders die voldoen aan de actuele SKG-veiligheidsnormen.",
    ],
    symptoms: [
      "De sleutel draait zwaar, hapert of blijft steken in de cilinder",
      "Het slot valt niet meer in de sluitkom van het kozijn",
      "De hendel laat zich niet meer volledig omhoog of omlaag bewegen",
      "De schuifpui kan wel dicht, maar niet meer op slot",
      "Zichtbare braakschade rond de cilinder of het sluitblik",
      "De sleutel is afgebroken in het slot",
    ],
    sections: [
      {
        heading: "Meerpuntssluiting: het slot van een schuifpui",
        paragraphs: [
          "Een schuifpui werkt met een meerpuntssluiting: door de hendel te bedienen worden op meerdere punten haken of pennen in het kozijn geschoven. Dat verdeelt de kracht over de volledige hoogte van het paneel. Het nadeel is dat één ontregeld punt de hele sluiting kan blokkeren — daarom is een goede diagnose belangrijker dan simpelweg een nieuwe cilinder plaatsen.",
          "In veel gevallen ligt de oorzaak niet in het slot zelf, maar in een verzakt paneel: de haken komen dan niet meer precies tegenover de sluitkommen uit. Wij stellen in dat geval eerst het paneel opnieuw af. Dat is een goedkopere en duurzamere oplossing dan het vervangen van goed werkend slotwerk.",
        ],
      },
      {
        heading: "Cilinders met SKG-keurmerk",
        paragraphs: [
          "Bij vervanging plaatsen wij cilinders met een SKG-keurmerk (SKG** of SKG***). Deze cilinders zijn getest op kerntrekken, boren en het zogenoemde 'bumpen' — de meest gebruikte inbraakmethoden bij woningen in Nederland. Voor veel woningverzekeringen is gecertificeerd hang- en sluitwerk bovendien een voorwaarde bij schade-uitkering na een inbraak.",
          "Wij kunnen meerdere cilinders gelijksluitend maken, zodat u met één sleutel zowel uw voordeur als uw schuifpui bedient. Ook het verwijderen van een afgebroken sleutel of het openen van een geblokkeerd slot zonder het kozijn te beschadigen behoort tot ons werk.",
        ],
        bullets: [
          "Vervangen van cilinders met SKG** of SKG*** keurmerk",
          "Reparatie van meerpuntssluitingen en sluitkommen",
          "Gelijksluitende cilinders voor één sleutel",
          "Verwijderen van afgebroken sleutels",
          "Plaatsen van anti-optilbeveiliging",
          "Advies over inbraakwerendheid volgens PKVW-richtlijnen",
        ],
      },
      {
        heading: "Spoed bij een niet-afsluitbare schuifpui",
        paragraphs: [
          "Een schuifpui die niet meer op slot kan is een acuut veiligheidsprobleem. Meld dit bij het maken van uw afspraak: wij behandelen niet-afsluitbare puien met voorrang en proberen dezelfde dag nog een monteur te sturen. Lukt dat niet, dan brengen wij eerst een tijdelijke maar veilige vergrendeling aan.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan het slot van mijn schuifpui vervangen worden zonder het hele kozijn te vervangen?",
        a: "Vrijwel altijd. Het slot en de cilinder zijn losse componenten die uit het profiel gedemonteerd kunnen worden. Het kozijn en het glas blijven gewoon zitten.",
      },
      {
        q: "Plaatsen jullie sloten die aan mijn verzekeringseisen voldoen?",
        a: "Ja, wij plaatsen standaard cilinders en sluitwerk met SKG-keurmerk. Op verzoek ontvangt u een specificatie van het geplaatste materiaal voor uw verzekeraar.",
      },
      {
        q: "Mijn sleutel is afgebroken in het slot. Kunnen jullie helpen?",
        a: "Ja. Wij verwijderen de afgebroken sleutel zonder de cilinder of het profiel te beschadigen en beoordelen daarna of de cilinder nog bruikbaar is of vervangen moet worden.",
      },
    ],
  },
  {
    slug: "hendel-reparatie",
    name: "Hendel Reparatie en Vervanging",
    shortName: "Hendel reparatie",
    icon: "Hand",
    metaTitle: "Schuifpui Hendel Vervangen | Alle Merken & Typen",
    metaDescription:
      "Hendel van uw schuifpui los, gebroken of draait door? Wij vervangen schuifpui-handgrepen van alle merken. Vaak dezelfde week klaar. Bel 0344 700 234.",
    h1: "Hendel Reparatie en Vervanging voor Schuifpuien",
    summary:
      "Een doordraaiende of afgebroken hendel maakt bedienen onmogelijk. Wij leveren en monteren handgrepen voor alle gangbare schuifpui-systemen.",
    intro: [
      "De hendel van een schuifpui verwerkt bij elke bediening de volledige kracht die nodig is om de meerpuntssluiting te bewegen. Bij een pui die zwaar loopt of een sluiting die niet meer soepel valt, gaan gebruikers vanzelf harder duwen en trekken. De hendel is dan het onderdeel dat als eerste bezwijkt: de vierkantstift verdraait, het gietwerk breekt of de bevestiging komt los.",
      "Wij vervangen schuifpui-hendels van alle gangbare merken, inclusief afsluitbare uitvoeringen met cilinder. Belangrijker nog: wij controleren altijd waaróm de hendel is bezweken, zodat de nieuwe hendel niet binnen een jaar hetzelfde lot ondergaat.",
    ],
    symptoms: [
      "De hendel draait door zonder dat de sluiting beweegt",
      "De handgreep zit los en beweegt in het profiel",
      "De hendel is afgebroken of gescheurd",
      "De vierkantstift is verbogen of uit de sluiting geschoten",
      "De afsluitbare hendel gaat niet meer op slot",
      "De hendel moet met veel kracht bediend worden",
    ],
    sections: [
      {
        heading: "Waarom een hendel bezwijkt",
        paragraphs: [
          "In negen van de tien gevallen is een gebroken hendel een symptoom en niet de oorzaak. Wanneer het paneel is verzakt, komen de sluithaken niet meer recht tegenover de sluitkommen. De gebruiker compenseert dat door tegen het paneel te duwen terwijl hij de hendel forceert. Vervangt u dan alleen de hendel, dan blijft de onderliggende oorzaak bestaan.",
          "Daarom stellen wij bij elke hendelvervanging ook het paneel en de sluiting opnieuw af. Na afloop moet een schuifpui met één hand en zonder krachtsinspanning te vergrendelen zijn. Dat is de standaard waar wij op afstellen.",
        ],
      },
      {
        heading: "Passende hendels voor elk systeem",
        paragraphs: [
          "Schuifpui-hendels zijn niet universeel. Bepalend zijn de maat van de vierkantstift, de hartafstand tussen de schroefgaten, de diepte van het profiel en of er wel of geen cilinder in de greep zit. Onze monteurs hebben de meest voorkomende maten op de bus, zodat de vervanging vaak tijdens het eerste bezoek kan worden uitgevoerd.",
          "Wij leveren zowel standaard aluminium hendels als afsluitbare uitvoeringen en design-varianten in RVS, zwart of antraciet. Wilt u dat de nieuwe greep aansluit bij het beslag van uw overige kozijnen, geef dat dan door bij het maken van de afspraak — dan nemen wij passende varianten mee.",
        ],
        bullets: [
          "Standaard en afsluitbare schuifpui-hendels",
          "Binnen- en buitengrepen, ook als set",
          "Kleuren: aluminium, RVS, zwart, antraciet en wit",
          "Vervangen van verbogen of verkeerde vierkantstiften",
          "Herstel van uitgesleten schroefgaten in het profiel",
        ],
      },
      {
        heading: "Ook voor hefschuifdeuren en vouwwanden",
        paragraphs: [
          "Hefschuifdeuren (HS-systemen) werken met een zware hefhendel die het volledige paneel enkele millimeters optilt voordat het gaat schuiven. Die hendels staan onder aanzienlijk hogere belasting dan bij een gewone schuifpui en vragen om specifiek beslag. Wij vervangen ook deze zware hefgrepen en stellen het hefmechanisme opnieuw af.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kan ik een schuifpui hendel zelf vervangen?",
        a: "Bij een eenvoudige greep kan dat soms, maar de juiste maat vierkantstift en hartafstand zijn cruciaal. Bovendien blijft de onderliggende oorzaak — meestal een verzakt paneel — dan bestaan, waardoor de nieuwe hendel opnieuw sneuvelt.",
      },
      {
        q: "Hebben jullie de hendel van mijn merk op voorraad?",
        a: "Wij hebben de meest voorkomende typen op de servicebus. Stuur bij het maken van de afspraak een foto van uw hendel mee via WhatsApp, dan zorgen wij dat het juiste onderdeel meekomt.",
      },
      {
        q: "Kan de nieuwe hendel afsluitbaar zijn?",
        a: "Ja. Een afsluitbare hendel met cilinder is een goedkope manier om de inbraakwerendheid van uw schuifpui te verhogen, zeker in combinatie met anti-optilbeveiliging.",
      },
    ],
  },
  {
    slug: "inbraakschade-herstel",
    name: "Inbraakschade Herstel",
    shortName: "Inbraakschade herstel",
    icon: "ShieldAlert",
    metaTitle: "Inbraakschade Schuifpui Herstellen | Spoedservice",
    metaDescription:
      "Inbraak of braakschade aan uw schuifpui? Wij herstellen snel en veilig, met rapportage voor uw verzekering. Spoedservice: bel 0344 700 234.",
    h1: "Inbraakschade aan Schuifpuien Professioneel Herstellen",
    summary:
      "Snel weer een veilig afsluitbare woning na een inbraakpoging, inclusief onderbouwing en fotorapportage voor uw verzekeraar.",
    intro: [
      "Een inbraak of inbraakpoging via de schuifpui laat meer achter dan alleen materiële schade. De eerste prioriteit is dat uw woning diezelfde dag weer veilig afsluitbaar is. Daarom behandelen wij meldingen van braakschade met voorrang: waar mogelijk komen wij nog dezelfde dag, en anders zorgen wij eerst voor een deugdelijke tijdelijke beveiliging.",
      "Daarna herstellen wij de schade volledig en versterken wij de zwakke plekken die de inbreker heeft gebruikt. Een schuifpui die eenmaal is aangevallen, is vaak een tweede keer doelwit — juist omdat het zwakke punt bekend is geworden in de buurt.",
    ],
    symptoms: [
      "Braaksporen of koevoetafdrukken in het profiel of kozijn",
      "Verbogen sluitkommen of uitgescheurd sluitblik",
      "Uitgeboorde, afgebroken of getrokken cilinder",
      "Het paneel is uit de rail getild of verschoven",
      "Beschadigd of gebroken glas in de pui",
      "De schuifpui kan niet meer vergrendeld worden",
    ],
    sections: [
      {
        heading: "Wat wij bij braakschade doen",
        paragraphs: [
          "Onze monteur beoordeelt eerst de constructieve schade: is het profiel verbogen, is het kozijn beschadigd en loopt het paneel nog in de rail? Vervolgens wordt alle beschadigde vergrendeling vervangen — cilinder, sluitkommen, sluitblik en waar nodig de volledige meerpuntssluiting. Tot slot wordt de pui opnieuw afgesteld en getest op sluitbaarheid.",
          "Van alle schade maken wij foto's vóór en na het herstel, met een specificatie van de vervangen onderdelen. Die rapportage kunt u rechtstreeks bij uw verzekeraar indienen. Dat scheelt discussie en versnelt de afhandeling van uw schadeclaim aanzienlijk.",
        ],
        bullets: [
          "Directe beveiliging bij een niet-afsluitbare pui",
          "Vervangen van beschadigde sloten, cilinders en sluitkommen",
          "Richten of vervangen van verbogen profielen en sluitblikken",
          "Vervangen van beschadigd glas",
          "Fotorapportage en onderdelenspecificatie voor uw verzekeraar",
        ],
      },
      {
        heading: "Voorkomen dat het opnieuw gebeurt",
        paragraphs: [
          "Herstellen is één ding, herhaling voorkomen is het andere. Schuifpuien worden bij inbraak vaak aangevallen door het paneel op te tillen of uit de rail te wippen. Met anti-optilbeveiliging, extra sluitpunten en cilinders met kerntrekbeveiliging maken wij dat vrijwel onmogelijk.",
          "Wij adviseren volgens de uitgangspunten van het Politiekeurmerk Veilig Wonen (PKVW). Dat betekent: gecertificeerd hang- en sluitwerk, sluitpunten verdeeld over de volle hoogte en beslag dat bestand is tegen de gangbare braakmethoden. In veel gevallen levert dat ook korting op uw inboedelverzekering op.",
        ],
      },
      {
        heading: "Werken met uw verzekeraar",
        paragraphs: [
          "Braakschade valt vrijwel altijd onder de dekking van uw opstal- of inboedelverzekering. Wij zijn gewend te werken met de gebruikelijke schadeformulieren en leveren een offerte en factuur met de specificatie die verzekeraars vragen. Neem bij het melden van de schade uw polisnummer bij de hand, dan kunnen wij de administratie meteen goed inrichten.",
        ],
      },
    ],
    faqs: [
      {
        q: "Kunnen jullie dezelfde dag komen na een inbraak?",
        a: "Wij behandelen braakschade met voorrang en proberen dezelfde dag ter plaatse te zijn. Lukt dat door de planning niet, dan zorgen wij eerst voor een deugdelijke tijdelijke beveiliging van de woning.",
      },
      {
        q: "Krijg ik een rapport voor mijn verzekering?",
        a: "Ja. U ontvangt fotomateriaal van de schade en een gespecificeerde offerte en factuur met de vervangen onderdelen, geschikt voor het indienen van uw schadeclaim.",
      },
      {
        q: "Kunnen jullie de schuifpui daarna extra beveiligen?",
        a: "Zeker. Wij plaatsen anti-optilbeveiliging, extra sluitpunten en SKG-gecertificeerde cilinders, conform de richtlijnen van het Politiekeurmerk Veilig Wonen.",
      },
    ],
  },
  {
    slug: "schuifpui-onderhoud",
    name: "Schuifpui Onderhoud",
    shortName: "Schuifpui onderhoud",
    icon: "Settings",
    metaTitle: "Schuifpui Onderhoud | Voorkom Dure Reparaties",
    metaDescription:
      "Preventief schuifpui onderhoud door specialisten: reinigen, smeren en afstellen. Verlengt de levensduur en voorkomt storingen. Bel 0344 700 234.",
    h1: "Schuifpui Onderhoud: Voorkom Storingen en Slijtage",
    summary:
      "Periodiek onderhoud houdt uw schuifpui soepel, tocht- en waterdicht en voorkomt kostbare reparaties aan rails en beslag.",
    intro: [
      "Vrijwel elke schuifpui die wij repareren, had met tijdig onderhoud in veel betere staat kunnen zijn. Een schuifpui is een mechanisch systeem dat continu is blootgesteld aan weer, wind, zand en stuifmeel. Zonder onderhoud slijpt het vuil in de rail als schuurpapier langs de looprollen, verhardt de borstelafdichting en droogt het smeermiddel in de sluiting uit.",
      "Met een onderhoudsbeurt van ongeveer een uur per pui blijft dat systeem in goede conditie. Wij bieden zowel eenmalige onderhoudsbeurten als jaarlijkse onderhoudscontracten, ook voor VvE's, woningcorporaties en beheerders met meerdere puien op één locatie.",
    ],
    symptoms: [
      "De schuifpui loopt merkbaar zwaarder dan een jaar geleden",
      "Zichtbaar vuil, zand of bladresten in de onderrail",
      "De borstelafdichting is plat, vies of losgeraakt",
      "Er staat tocht langs de sluitzijde van de pui",
      "Piepende of krakende geluiden bij bediening",
      "De pui is jaren niet nagekeken of afgesteld",
    ],
    sections: [
      {
        heading: "Wat een onderhoudsbeurt inhoudt",
        paragraphs: [
          "Een volledige onderhoudsbeurt begint met het grondig reinigen van de onder- en bovenrail, inclusief de afwateringsgaten in de dorpel. Verstopte afwatering is een van de meest onderschatte oorzaken van lekkage: het water kan niet weg en zoekt zijn weg naar binnen, wat op termijn tot corrosie en houtrot leidt.",
          "Daarna controleren en smeren wij de looprollen, de meerpuntssluiting en de cilinder met de juiste smeermiddelen. Let op: huishoudelijke smeersprays bevatten vaak oplosmiddelen die het bestaande vet juist wegspoelen en stof aantrekken — dat versnelt de slijtage in plaats van hem te remmen. Tot slot stellen wij het paneel opnieuw af en controleren wij de afdichting over de volle hoogte.",
        ],
        bullets: [
          "Reinigen van rails, geleiders en afwateringsgaten",
          "Controle en smering van looprollen en lagers",
          "Smeren en afstellen van de meerpuntssluiting en cilinder",
          "Vervangen van versleten borstel- en rubberafdichting",
          "Uitlijnen en afstellen van het schuifpaneel",
          "Controle op tocht, lekkage en beginnende slijtage",
        ],
      },
      {
        heading: "Hoe vaak is onderhoud nodig?",
        paragraphs: [
          "Voor een gemiddelde woning adviseren wij één onderhoudsbeurt per jaar. Staat uw schuifpui aan de kustzijde, in een omgeving met veel zand of bomen, of wordt hij intensief gebruikt bij bijvoorbeeld een horecalocatie of kantoor, dan is twee keer per jaar verstandig.",
          "Tussen de beurten door helpt het enorm om de onderrail simpelweg regelmatig stofzuigen en met een vochtige doek na te lopen. Alleen dat al voorkomt een groot deel van de slijtage aan de looprollen.",
        ],
      },
      {
        heading: "Onderhoudscontracten voor VvE's en beheerders",
        paragraphs: [
          "Beheert u een appartementencomplex, een vakantiepark of een kantoorpand met meerdere schuifpuien? Wij stellen dan een onderhoudscontract op met een vaste jaarlijkse ronde, een gezamenlijke rapportage per pui en een vaste contactpersoon. Storingen tussentijds worden met voorrang ingepland.",
          "U ontvangt na elke ronde een overzicht van de staat van elke pui, inclusief signalering van onderdelen die op korte termijn aan vervanging toe zijn. Zo kunt u onderhoud plannen en begroten in plaats van reageren op storingen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Hoe vaak moet een schuifpui onderhouden worden?",
        a: "Voor een gemiddelde woning is één keer per jaar voldoende. Bij intensief gebruik of een locatie met veel zand, zout of bladval adviseren wij twee onderhoudsbeurten per jaar.",
      },
      {
        q: "Kan ik mijn schuifpui zelf smeren?",
        a: "Rails stofzuigen en schoonmaken kunt u prima zelf. Gebruik echter geen kruipolie of huishoudspray: die lossen het aanwezige vet op en trekken stof aan, wat de slijtage juist versnelt.",
      },
      {
        q: "Bieden jullie onderhoudscontracten aan?",
        a: "Ja, zowel voor particulieren als voor VvE's, woningcorporaties en zakelijke beheerders met meerdere puien. U krijgt een vaste jaarlijkse ronde en rapportage per pui.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
