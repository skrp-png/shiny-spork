export const saints = [
    "San Canio", "Santa Lucia", "San Nicola", "Sant'Antonio", "San Gerardo",
    "San Biagio", "Santa Rita", "San Giuseppe", "San Michele", "San Rocco"
];

export const marketItems = [
    {
        id: 1,
        title: "Cesta di fichi secchi",
        price: "BARATTO",
        category: "Cibo",
        image: "https://images.unsplash.com/photo-1601314167099-e6eeb23b6f5e?q=80&w=600&auto=format&fit=crop",
        seller_phone: "393331234567"
    },
    {
        id: 2,
        title: "Credenza antica da restaurare",
        price: "GRATIS",
        category: "Mobili",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop",
        seller_phone: "393339876543"
    },
    {
        id: 3,
        title: "Olio d'oliva casereccio (5L)",
        price: "BARATTO",
        category: "Cibo",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcdccef?q=80&w=600&auto=format&fit=crop",
        seller_phone: "393330000000"
    },
    {
        id: 4,
        title: "Bicicletta bimbo",
        price: "GRATIS",
        category: "Altro",
        image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?q=80&w=600&auto=format&fit=crop",
        seller_phone: "393331112222"
    }
];

// Eventi con date complete per il calendario
export const events = [
    {
        id: 1,
        title: "Sagra del Caciocavallo",
        date: "2026-07-25",
        time: "20:00",
        location: "Centro Storico",
        description: "Degustazione di prodotti tipici locali con musica dal vivo",
        category: "Sagra",
        recurring: false,
        coordinates: { lat: 40.8947, lng: 15.4383 }
    },
    {
        id: 2,
        title: "Processione San Canio",
        date: "2026-05-25",
        time: "10:00",
        location: "Chiesa Madre",
        description: "Processione religiosa in onore del Santo Patrono",
        category: "Religioso",
        recurring: true,
        coordinates: { lat: 40.8950, lng: 15.4380 }
    },
    {
        id: 3,
        title: "Torneo di Briscola",
        date: "2026-02-03",
        time: "21:00",
        location: "Bar Sport",
        description: "Torneo settimanale di carte",
        category: "Sport",
        recurring: true,
        recurringPattern: "Ogni Lunedì",
        coordinates: { lat: 40.8945, lng: 15.4385 }
    },
    {
        id: 4,
        title: "Cinema all'aperto: Nuovo Cinema Paradiso",
        date: "2026-08-10",
        time: "21:30",
        location: "Villa Comunale",
        description: "Rassegna cinematografica estiva",
        category: "Cultura",
        recurring: false,
        coordinates: { lat: 40.8952, lng: 15.4378 }
    },
    {
        id: 5,
        title: "Mercato Settimanale",
        date: "2026-02-01",
        time: "08:00",
        location: "Piazza Municipio",
        description: "Mercato ambulante con prodotti freschi e abbigliamento",
        category: "Mercato",
        recurring: true,
        recurringPattern: "Ogni Sabato",
        coordinates: { lat: 40.8948, lng: 15.4381 }
    },
    {
        id: 6,
        title: "Festa della Primavera",
        date: "2026-03-21",
        time: "15:00",
        location: "Parco Comunale",
        description: "Festa con giochi per bambini e stand gastronomici",
        category: "Festa",
        recurring: false,
        coordinates: { lat: 40.8955, lng: 15.4375 }
    }
];

// News e articoli del blog
export const news = [
    {
        id: 1,
        title: "Calitri vince il premio 'Borgo dei Borghi 2026'",
        excerpt: "Il nostro paese è stato premiato come borgo più bello d'Italia nella categoria tradizioni",
        content: "Grande soddisfazione per tutta la comunità di Calitri che ha visto riconosciuto il proprio impegno nella valorizzazione delle tradizioni locali...",
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop",
        date: "2026-01-20",
        category: "Notizie",
        author: "Redazione"
    },
    {
        id: 2,
        title: "La storia della ceramica calitrana",
        excerpt: "Un viaggio nella tradizione artigianale che ha reso famoso il nostro borgo",
        content: "La ceramica di Calitri ha origini antichissime, risalenti al periodo medievale. Le tecniche di lavorazione si sono tramandate di generazione in generazione...",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
        date: "2026-01-18",
        category: "Storia",
        author: "Maria Rossi"
    },
    {
        id: 3,
        title: "Nuova area giochi inaugurata al parco",
        excerpt: "Spazio moderno e sicuro per i più piccoli nel cuore del paese",
        content: "È stata inaugurata questa mattina la nuova area giochi attrezzata presso il parco comunale. L'area comprende altalene, scivoli e giochi inclusivi...",
        image: "https://images.unsplash.com/photo-1587818541965-a1c0b4c1a9c7?q=80&w=800&auto=format&fit=crop",
        date: "2026-01-15",
        category: "Notizie",
        author: "Redazione"
    },
    {
        id: 4,
        title: "Ricetta tradizionale: I Cavatelli con la Mollica",
        excerpt: "Il piatto simbolo della cucina calitrana spiegato passo dopo passo",
        content: "I cavatelli con la mollica sono un piatto povero ma ricco di sapore. Ingredienti semplici: pasta fatta in casa, mollica di pane tostata, aglio e olio...",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=800&auto=format&fit=crop",
        date: "2026-01-12",
        category: "Tradizioni",
        author: "Nonna Peppina"
    },
    {
        id: 5,
        title: "Intervista al Sindaco: progetti per il 2026",
        excerpt: "Le iniziative in programma per valorizzare il territorio",
        content: "Abbiamo incontrato il Sindaco per parlare dei progetti che l'amministrazione intende realizzare quest'anno...",
        image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=800&auto=format&fit=crop",
        date: "2026-01-10",
        category: "Notizie",
        author: "Redazione"
    }
];

// Servizi utili
export const services = [
    {
        id: 1,
        name: "Municipio",
        category: "Pubblica Amministrazione",
        address: "Via Roma, 2",
        phone: "0827 38459",
        hours: "Lun: 9:00-13:00 e 15:30-17:30, Mer-Ven: 9:00-13:00",
        coordinates: { lat: 40.8988481, lng: 15.4389277 }
    },
    {
        id: 2,
        name: "Farmacia Codella",
        category: "Salute",
        address: "Corso Garibaldi, 47",
        phone: "0827 30316",
        hours: "Lun-Sab: 9:00-13:00, 16:30-20:00",
        emergency: true,
        coordinates: { lat: 40.9010649, lng: 15.4329268 }
    },
    {
        id: 3,
        name: "Farmacia Pontillo",
        category: "Salute",
        address: "Via Benedetto Croce, 23",
        phone: "0827 30322",
        hours: "Lun-Sab: 9:00-13:00, 16:30-20:00",
        emergency: true,
        coordinates: { lat: 40.9007897, lng: 15.4354027 }
    },
    {
        id: 4,
        name: "Carabinieri",
        category: "Emergenze",
        address: "Via Paludi Di Pittoli",
        phone: "0827 34015",
        hours: "H24 (Pronto Intervento 112)",
        emergency: true,
        coordinates: { lat: 40.9091033, lng: 15.4226023 }
    },
    {
        id: 5,
        name: "Ufficio Postale",
        category: "Servizi",
        address: "Piazza Scoca, 4",
        phone: "0827 318631",
        hours: "Lun-Ven: 8:20-13:35, Sab: 8:20-12:35",
        coordinates: { lat: 40.9011598, lng: 15.4356337 }
    },
    {
        id: 6,
        name: "Guardia Medica",
        category: "Salute",
        address: "Corso Garibaldi (Presidio Sanitario)",
        phone: "-",
        hours: "Giorni feriali: 20:00-8:00, Sab/Festivi: H24",
        emergency: true,
        coordinates: { lat: 40.9009973, lng: 15.434639 }
    },
    {
        id: 7,
        name: "Misericordia",
        category: "Salute",
        address: "Via Pittoli (Centro Sociale)",
        phone: "0827 406182",
        hours: "H24 (Primo Soccorso e Trasporto)",
        emergency: true,
        coordinates: { lat: 40.9083789, lng: 15.4231549 }
    }
];

// Punti di interesse per la mappa
export const pointsOfInterest = [
    {
        id: 1,
        name: "Borgo Castello",
        category: "Monumenti",
        description: "Il cuore antico di Calitri, situato a 651 metri d'altezza. Un labirinto di stradine e case colorate costruite sui resti dell'antico castello.",
        image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepVAeKIo-y6mu09z1cKVsNm-zutX-C1rkf2WzrWvJlS-dXwE1jsm33AkCvY_P6s46n_VWzblc_Ezrug42Zds_fGqnZjDnyPyy6S5Zd-o3OcOB2GzcT-nTcKd9AJpuYHva7krhXu",
        coordinates: { lat: 40.9000779, lng: 15.4383901 }
    },
    {
        id: 2,
        name: "Chiesa Madre (San Canio)",
        category: "Chiese",
        description: "Chiesa principale dedicata al patrono San Canio. Custodisce reliquie preziose e un altare barocco del XVIII secolo.",
        image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweq0x5YHBFBfHPyOg0FNPIvU1X9L-2tnWqWgZrUCtyk8j6ElvQxIbrbvUAPA_Yo0bB_cFyFU4-oPhDmvCB5cMl7Uy9K9zxe-JBEjNw8jGa0fILu2Txjp09WXeMQutprdH7T0Xio6mYSXGYE",
        coordinates: { lat: 40.9008706, lng: 15.435802 }
    },
    {
        id: 3,
        name: "Museo della Ceramica",
        category: "Monumenti",
        description: "Ospitato nel Borgo Castello, racconta la millenaria tradizione dei maestri ceramisti calitrani.",
        image: "https://sistemairpinia.provincia.avellino.it/sites/default/files/2020-11/ceramica-roselli.jpg",
        coordinates: { lat: 40.899996, lng: 15.4385564 }
    },
    {
        id: 4,
        name: "Chiesa dell'Immacolata",
        category: "Chiese",
        description: "Situata sulla collina di San Biagio, stupisce per i suoi interni barocchi e la magnifica scalinata.",
        image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerl0B5q6V5xdlOA0IJGcFAZIANEyULv0lng2Fgi0rB3lxXh1fPap9m5r9gVr_QX5_q77ntUP1tHdAT8C_SXT4vZDoV8kPEY1ALJb2ry2GJjhDri4kRo6sPy_-vmEaAhyWrdlVHrLA",
        coordinates: { lat: 40.8971716, lng: 15.4387476 }
    },
    {
        id: 5,
        name: "Torre di Nanno",
        category: "Panorami",
        description: "Antico bastione aragonese che faceva parte delle mura difensive. Punto panoramico mozzafiato sulla valle.",
        image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep8etip4J5Z6mdHq6n4EeO-RIlTYAJrk7toRjl2Fvvr6fd9QuIc8EOg43n9ZMebZYiThDlCwRWyglQphPgwRbMAWBd1uqUhcLViH9j141NZg8_oysXieuaRTbN1eSf3SIQvUTLz4w",
        coordinates: { lat: 40.8998384, lng: 15.4376169 }
    },
    {
        id: 6,
        name: "Belvedere Santa Lucia",
        category: "Panorami",
        description: "Dalla chiesa di Santa Lucia si gode di una vista straordinaria sul fiume Ofanto e le colline circostanti.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Calitri_Landscape.jpg",
        coordinates: { lat: 40.8969458, lng: 15.4428472 }
    },
    {
        id: 7,
        name: "Il Calvario",
        category: "Panorami",
        description: "Punto più alto del paese con tre grandi croci, offre una vista a 360 gradi su Calitri e sul Vulture.",
        image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerKztHyWUAZhYPyfuiAQadmvUcxCumAb129pD9ZwmE8n0fqWEigcy9C1vV56rSRXV0_aFSlPuIaoqXt6RWe5yBEDoxZAYMj0t2XtKd4fLGpbZFjz1QysUzTKmj_K9N-NoAbsLM",
        coordinates: { lat: 40.8989811, lng: 15.4441196 }
    }
];

// Info raccolta differenziata
export const wasteCollection = [
    { day: "Lunedì", type: "Umido", color: "#2A9D8F", time: "Entro le 07:00" },
    { day: "Martedì", type: "Secco Indifferenziato", color: "#6C757D", time: "Entro le 07:00" },
    { day: "Mercoledì", type: "Umido", color: "#2A9D8F", time: "Entro le 07:00" },
    { day: "Venerdì", type: "Umido", color: "#2A9D8F", time: "Entro le 07:00" },
    { day: "Sabato", type: "Secco Indifferenziato", color: "#6C757D", time: "Entro le 07:00" }
];

// Ristoranti e luoghi dove mangiare
export const restaurants = [
    {
        id: 1,
        name: "Osteria Tre Rose",
        category: "Ristorante",
        cuisine: "Cucina Rustica",
        description: "Ristorante accogliente in stile rustico. Chiuso la domenica.",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/4f/7b/6e/tre-rose.jpg?w=1400&h=-1&s=1",
        address: "Via Sotto Macello, 9",
        phone: "0827 34123",
        priceRange: "€€",
        hours: "Chiuso la domenica",
        specialties: ["Cucina irpina", "Salumi locali"],
        coordinates: { lat: 40.905082, lng: 15.428531 },
        rating: 4.7
    },
    {
        id: 2,
        name: "La Gatta Cenerentola",
        category: "Ristorante",
        cuisine: "Cucina Locale",
        description: "Ristorante tipico nel centro storico",
        image: "https://menu.sluurpy.it/foto-g/80522/3148385.jpg",
        address: "Via G. Tozzoli",
        phone: "0827 38480",
        priceRange: "€€",
        hours: "Aperto tutti i giorni",
        specialties: ["Pasta fatta in casa"],
        coordinates: { lat: 40.9001471, lng: 15.4399947 },
        rating: 4.6
    },
    {
        id: 3,
        name: "La Locanda Dell'Arco",
        category: "Ristorante",
        cuisine: "Cucina Tradizionale",
        description: "Antichi sapori calitrani in una location suggestiva",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/473340068_1368021937851204_2835581904397021614_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=MAJ9sqf26sYQ7kNvwGmqgQb&_nc_oc=AdkoTG3448zIGgRl7v1cfHVcIuN81h0D7DfeLd4iCqCZWPyVND75As4oMK0wmf1t4qU&_nc_zt=23&_nc_ht=scontent-fco2-1.xx&_nc_gid=bgWDLMpG5IRRSTGfX1eTzQ&oh=00_AfqsgAbNBSvG0dMo7tD7KgP0S7NqrNpGrkvvnc9-hIJcPg&oe=697BD9D6",
        address: "Via dell’Arco di Zampaglione",
        phone: "0827 310951",
        priceRange: "€€",
        hours: "Ven-Dom: 12:30-15:00, 19:30-23:00",
        website: "www.locandadellarco.it",
        specialties: ["Cannazze", "Agnello"],
        coordinates: { lat: 40.8994958, lng: 15.4392549 },
        rating: 4.8
    },
    {
        id: 4,
        name: "Agriturismo Valle Ofanto",
        category: "Agriturismo",
        cuisine: "Cucina Contadina",
        description: "Agriturismo con piscina immerso nella valle",
        image: "https://www.valleofanto.com/wp-content/uploads/2019/11/home3.jpg",
        address: "SS. 401 Ofantina",
        phone: "0976 96314",
        priceRange: "€€",
        hours: "Sempre aperto",
        website: "www.valleofanto.com",
        specialties: ["Prodotti a km zero"],
        coordinates: { lat: 40.8924043, lng: 15.4906684 },
        rating: 4.9
    },
    {
        id: 5,
        name: "I Peccati di Cola",
        category: "Pizzeria",
        cuisine: "Pizza e Cucina",
        description: "Vista panoramica dalla collina di Gagliano",
        image: "https://lh3.googleusercontent.com/p/AF1QipO7_yPOPbJhJHWt1w3IOxiX1xRomsl3MSNvlftQ=s1326-k",
        address: "Località Gagliano",
        phone: "0827 34318",
        priceRange: "€€",
        hours: "Serale",
        specialties: ["Pizza panoramica"],
        coordinates: { lat: 40.9043857, lng: 15.4224456 },
        rating: 4.5
    },
    {
        id: 6,
        name: "Golden Mill",
        category: "Ristorante",
        cuisine: "Pizza e Cucina",
        description: "Vasto menu di pizze e piatti della tradizione",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/02/c4/07/getlstd-property-photo.jpg?w=800&h=-1&s=1",
        address: "Largo San Berardino, 10",
        phone: "0827 38024",
        priceRange: "€€",
        website: "www.goldenmill.it",
        coordinates: { lat: 40.8998487, lng: 15.4421199 },
        rating: 4.4
    },
    {
        id: 7,
        name: "Masseria Pietra Mulina",
        category: "Pizzeria",
        cuisine: "Pizza e cucina tipica",
        description: "Pizza e cucina tipica",
        image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerNI1dVlE_a6-OaXjLhWD5ICzXKWDJWoDW8qFlexWgL4oyXoqAG7qBuz6u1lY2_NYEG-WRFYv78D8lmTjKnBk9GLplfwaVJdhoB0UCUwzlq_O2pM29stDxi8sXG7kgl79O3APtmXg=s1326-k",
        address: "Corso Garibaldi, 1",
        phone: "334 3349901",
        priceRange: "€",
        specialties: ["Pizza e cucina tipica"],
        coordinates: { lat: 40.9007631, lng: 15.434746 },
        rating: 4.6
    },
    {
        id: 8,
        name: "Pizzeria Manhattan",
        category: "Pizzeria",
        cuisine: "Pizza",
        description: "La vera pizza nel cuore di Calitri",
        image: "https://menu.sluurpy.it/foto-g/126848/4058744.jpg",
        address: "Via Pittoli, 67",
        phone: "333 4294003",
        priceRange: "€",
        coordinates: { lat: 40.9036396, lng: 15.4279922 },
        rating: 4.5
    },
    {
        id: 9,
        name: "Rendez Vous",
        category: "Bar/Caffè",
        cuisine: "Pub/Beer",
        description: "Pub in stile moderno, ideale per serate tra amici",
        image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqrr6b2H0MlSbbP_zo4aHgH6PXToVPYeuVBrt5HsskP-1-c0nruZe5SuZTC3yb4nhxtGJxnu0lhlnRjEsoamjZz9YslFab16bGQ0mKkyvDhdyue5YroDumXfG8yWHS7AjysufmdtQ",
        address: "Via Pittoli, 126",
        phone: "339 4509100",
        priceRange: "€€",
        coordinates: { lat: 40.9058237, lng: 15.4262736 },
        rating: 4.7
    },
    {
        id: 10,
        name: "New Poldos",
        category: "Bar/Caffè",
        cuisine: "Caffetteria",
        description: "Bar accogliente sul corso principale",
        image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerybfortAiDM9mJbnCSKSZzKPxQKiJyF6LvWpQw6ktdMpuLUgXF8WaFeHMNnNL4UIGfZIatEOHkthgHAZ1LLhESIO2f_oEmBGfK2WrP7bEKLz-qpK8-326m0e618rmsmlnKGXmp=s1017",
        address: "Corso Garibaldi, 14",
        phone: "0827 30535",
        priceRange: "€",
        coordinates: { lat: 40.9008956, lng: 15.4348392 },
        rating: 4.3
    },
    {
        id: 11,
        name: "Bar Gulliver",
        category: "Bar/Caffè",
        cuisine: "Caffetteria",
        description: "Locale situato a fianco alla chiesa di San Canio",
        image: "https://scontent-fco2-1.cdninstagram.com/v/t51.82787-15/606334269_17850204339614685_4839098142984669748_n.heic?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=Mzc5Njk4OTQxOTc5ODk1NzA3MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=qYCyA3M90mEQ7kNvwGhhbgc&_nc_oc=AdnoxYPhRv3g3SOIWH5evVyK-c2XPAGMlta4RV3NiS3vIFecvwmGmOdur-DldWqjCrE&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-fco2-1.cdninstagram.com&_nc_gid=QAN_CIulUInZOEbYZnTwPA&oh=00_Afr_vIlBj7EdoU4mdbw2B6kOcd8exSITq9wjnH9USveWQw&oe=697C364C",
        address: "Largo Croce",
        phone: "338 8230744",
        priceRange: "€",
        coordinates: { lat: 40.9009134, lng: 15.4360767 },
        rating: 4.4
    },
    {
        id: 12,
        name: "Idee Golose",
        category: "Bar/Caffè",
        cuisine: "Dolci",
        description: "Cioccolateria – Pasticceria – Gelati – Bar. Chiuso: Venerdì",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/502409591_4195274590798168_1863842326962870763_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=OHKAg720TYQQ7kNvwEJKspl&_nc_oc=AdkCNQIVkSAXE8AbyD1hBcemHfMyL8YdO56fqjrMXZ8WBj-c_e_zapLfmRzZFV-xw_U&_nc_zt=23&_nc_ht=scontent-fco2-1.xx&_nc_gid=Ms8ae9OC5ZmSF6tut8iUpw&oh=00_AfpbVA8GVXMBoFbTrFjlHyIBHF0l73ZmbA0eDi6bchC7rg&oe=697C1CA5",
        address: "Largo Croce, 37",
        phone: "333 3357674",
        priceRange: "€€",
        hours: "Chiuso Venerdì",
        coordinates: { lat: 40.9007024, lng: 15.4350761 },
        rating: 4.8
    },
    {
        id: 13,
        name: "Pasticceria Zabatta",
        category: "Bar/Caffè",
        cuisine: "Dolci",
        description: "Pasticceria e gelateria artigianale",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/490091192_1293001102828486_2232055119767943672_n.jpg?stp=cp6_dst-jpegr_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=PkIVDSCLoCQQ7kNvwFPVgpA&_nc_oc=AdkVmN110iVLAZTqYzWAGXnfBska4M3A6SZyLvL-fR7ByuYwfQQ8sMfA0HRmvmJdX64&_nc_zt=23&se=-1&_nc_ht=scontent-fco2-1.xx&_nc_gid=1rWYMAUXVPjABs7mItjyZg&oh=00_AfrDx6J32aISQnaw30aSB_G0eV7tXTvkxDeZKFAIVM6V_Q&oe=697C36CA",
        address: "Via De Santis, 7",
        phone: "0827 30325",
        priceRange: "€€",
        coordinates: { lat: 40.9006734, lng: 15.4339148 },
        rating: 4.6
    },
    {
        id: 14,
        name: "Bar Gelateria Jolly",
        category: "Bar/Caffè",
        cuisine: "Caffetteria/Gelato",
        description: "Storico bar e gelateria nel cuore di Calitri",
        image: "https://lh3.googleusercontent.com/p/AF1QipPZyMlBJisCdbVfWgPx8QmNuj04q-tfbyN5GzkN",
        address: "Corso G. Garibaldi, 54",
        phone: "0827 30012",
        priceRange: "€",
        coordinates: { lat: 40.9012939, lng: 15.4329211 },
        rating: 4.5
    },
    {
        id: 15,
        name: "AD Sweets Bakery",
        category: "Bar/Caffè",
        cuisine: "Dolci",
        description: "Pasticceria moderna e dolci tradizionali",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/450563388_1114882296711820_2360723999686453218_n.jpg?stp=dst-jpegr_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=5sv_f1blJwcQ7kNvwE4kbCz&_nc_oc=Admjsn843o6fj7LDPKlFuxZaTOw2Pm6VMgAl8PIjrznwN0c0ox7UoqLc80Sxjxy5cZE&_nc_zt=23&se=-1&_nc_ht=scontent-fco2-1.xx&_nc_gid=-tzlmgpBiwuXypTMvicjsQ&oh=00_Afr4000uI6mbLYx07GGg1fF47T1HIeqU7LRSMqWphNVyJA&oe=697C2C71",
        address: "Corso Garibaldi",
        phone: "320 7241108",
        priceRange: "€€",
        coordinates: { lat: 40.9008478, lng: 15.4343265 },
        rating: 4.7
    },
    {
        id: 16,
        name: "L'angolo del gusto",
        category: "Pizzeria",
        cuisine: "Rosticceria e Pizza al Taglio",
        description: "Rosticceria e Pizza al Taglio",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/469818648_3931604870417959_8176238614885953867_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=3a1ebe&_nc_ohc=tw82imEYJQsQ7kNvwFeZGQ1&_nc_oc=AdmjAFLPZ7sDX6PzMV_vnFiVyyINJka-wbFT2mx-Mqgc6HbrXQk3SecSMUts2XwD5vE&_nc_zt=23&_nc_ht=scontent-fco2-1.xx&_nc_gid=KR2zozL7TXwqo1Tsg2Ta4g&oh=00_AfqbmwzsoGgg5Yw_ehf_oTgZ_zy5JAcRoww1CGMfmfwzYg&oe=697C25C9",
        address: "Via F. De Sanctis, 2",
        phone: "327 7569119",
        priceRange: "€",
        coordinates: { lat: 40.9007543, lng: 15.4335775 },
        rating: 4.4
    },
    {
        id: 17,
        name: "Ciak si Gira",
        category: "Bar/Caffè",
        cuisine: "Caffetteria",
        description: "Punto di ritrovo storico per un buon caffè",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/499054173_1252438346891383_7807992469819033816_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ucnPBhMkajYQ7kNvwGJXSAq&_nc_oc=AdkLF2h9MB5OqNtJkSS_72A-QdjsilkJ1JXV8bw74z-jceXqS4HO1G9g9U0IFPiX8gk&_nc_zt=23&_nc_ht=scontent-fco2-1.xx&_nc_gid=0ewny808Hdr_4ReRGZz2PA&oh=00_Afrj_V0kR93zCWLT3ofNRBcMS0c-Y4WQsLJpiBK1BSA4SA&oe=697C218C",
        address: "Via XXIII Novembre, 1",
        phone: "339 139 1269",
        priceRange: "€",
        coordinates: { lat: 40.901438, lng: 15.4365358 },
        rating: 4.3
    },
    {
        id: 18,
        name: "Internet Cafe",
        category: "Bar/Caffè",
        cuisine: "Bar",
        description: "Bar Tabacchi con servizi internet",
        image: "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?output=thumbnail&cb_client=maps_sv.tactile.gps&panoid=VVYmKv-nRWWdQJ_jLSw1qw&w=1161&h=572&thumb=2&yaw=151.22466&pitch=0",
        address: "Via Ferrovia, 9",
        phone: "0827 318513",
        priceRange: "€",
        coordinates: { lat: 40.8994325, lng: 15.4409084 },
        rating: 4.2
    },
    {
        id: 19,
        name: "Caffè Europa",
        category: "Bar/Caffè",
        cuisine: "Bar",
        description: "Bar e tabacchi situato in zona Europa",
        image: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoIvZIb-r5aRgDctDgUpnq3i00pIN2DQr1mP5dD5q63QUhUYajZtR0gQBnuuWYnCG6GF78s0cMDy7Pp5xjkDLFhCErR7cwURjKfee4gfVNrfnl6ipWA6HQTZorr3mMhTK2M_hHC",
        address: "Corso Europa, snc",
        phone: "N/D",
        priceRange: "€",
        coordinates: { lat: 40.9103128, lng: 15.4211224 },
        rating: 4.1
    },
    {
        id: 20,
        name: "L'Antica Grotta APS",
        category: "Ristorante",
        cuisine: "Cucina Tipica",
        description: "Associazione di Promozione Sociale che valorizza i sapori autentici di Calitri in una location suggestiva.",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/0d/f6/52/caption.jpg?w=1400&h=-1&s=1",
        address: "Via Pasquale Berrilli, 31",
        phone: "338 4071827",
        priceRange: "€",
        hours: "Su prenotazione",
        specialties: ["Prodotti tipici", "Cucina casereccia"],
        coordinates: { lat: 40.8997747, lng: 15.4392736 },
        rating: 4.8
    }
];

// Hotel, B&B e alloggi
export const accommodations = [
    {
        id: 1,
        name: "Hotel Ambasciatori",
        category: "Hotel",
        stars: 3,
        description: "Hotel 3 stelle con piscina situato presso il parco Tozzoli.",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/477017700_9064311333617713_3351837731653866810_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Ycpc1lNSPzkQ7kNvwEQdoXI&_nc_oc=AdnrhbMirzKBAqMDQIrtny2qk7aFiXAca4A_baVBRlnaK9sU3lUYn7t0W-TtmrRSvN8&_nc_zt=23&_nc_ht=scontent-fco2-1.xx&_nc_gid=R9xzrEqGIgEjEfHGS0LZ4Q&oh=00_AfqM-nGchLyih_7sD1OzSStmLRyCEdUZU-18VuGESpXInQ&oe=697C1B54",
        address: "Via Toscana (Parco Tozzoli)",
        phone: "0827 34872",
        priceRange: "€€",
        amenities: ["Piscina", "WiFi", "Parcheggio"],
        coordinates: { lat: 40.9051874, lng: 15.4298848 },
        rating: 4.5,
        website: "www.ambasciatorihotel-av.it"
    },
    {
        id: 2,
        name: "La Meridiana",
        category: "B&B",
        description: "COUNTRY HOUSE e B&B immerso nel verde.",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/479184979_1374040617186081_7050733344721260092_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=gaYUkUnHYsQQ7kNvwGd5AuR&_nc_oc=AdnQMBd0UYceqNTy6_vEXWbW0kPlURKzl70u-kBNu5F0DpJxEDbLi7oJT2rXQIcXN3A&_nc_zt=23&_nc_ht=scontent-fco2-1.xx&_nc_gid=LAlxjzHyglhPbNocWegBoQ&oh=00_AfrmHF3J6XHNzzRE8jF19kNuYREXt7mVnHphDgJztC9PpA&oe=697C38DE",
        address: "Ctr. Croce Penta",
        phone: "393 9077997",
        priceRange: "€€",
        amenities: ["Colazione", "WiFi", "Giardino"],
        coordinates: { lat: 40.9186766, lng: 15.4111659 },
        rating: 4.7,
        website: "www.lameridianacountryhouse.com"
    },
    {
        id: 3,
        name: "La Grotta di Suonn' Suonn'",
        category: "Affittacamere",
        description: "Luxury Room nel cuore di Calitri.",
        image: "https://www.lagrottadisuonnsuonn.it/wp-content/uploads/2023/02/DSC_6549.jpg",
        address: "Via Alfonso Del Re, 45",
        phone: "320 3470018",
        priceRange: "€€€",
        amenities: ["Luxury", "WiFi", "Centro Storico"],
        coordinates: { lat: 40.9002485, lng: 15.4397729 },
        rating: 4.9,
        website: "www.lagrottadisuonnsuonn.it"
    },
    {
        id: 4,
        name: "Agriturismo Valle Ofanto",
        category: "Agriturismo",
        description: "Agriturismo con piscina e cucina biologica.",
        image: "https://www.valleofanto.com/wp-content/uploads/2019/11/home3.jpg",
        address: "SS. 401 Ofantina",
        phone: "0976 96314",
        priceRange: "€€",
        amenities: ["Piscina", "Ristorante", "WiFi"],
        coordinates: { lat: 40.8924043, lng: 15.4906684 },
        rating: 4.9,
        website: "www.valleofanto.com"
    },
    {
        id: 6,
        name: "A un tiro di schioppo",
        category: "Agriturismo",
        description: "Agriturismo immerso nella valle Santa Maria.",
        image: "https://static.wixstatic.com/media/29813f_6b5ee2b67fb54b3ab23bb44dc2fe7f01~mv2.jpg/v1/fill/w_1600,h_960,al_c,q_85,enc_auto/29813f_6b5ee2b67fb54b3ab23bb44dc2fe7f01~mv2.jpg",
        address: "C/da valle Santa Maria",
        phone: "380 7327034",
        priceRange: "€€",
        amenities: ["Tranquillità", "WiFi"],
        coordinates: { lat: 40.9249708, lng: 15.4607881 },
        rating: 4.5,
        website: "www.auntirodischioppo.wixsite.com"
    },
    {
        id: 7,
        name: "Vicolo 72",
        category: "Affittacamere",
        description: "Luxury Room & Apartments nel centro storico.",
        image: "https://vicolo72.it/wp-content/uploads/2024/09/vicolo-72-132-Large.jpg",
        address: "Via Cipresso, 4",
        phone: "335 8393873",
        priceRange: "€€€",
        amenities: ["Design", "WiFi", "Apartments"],
        coordinates: { lat: 40.8987251, lng: 15.4396822 },
        rating: 4.9,
        website: "www.vicolo72.it"
    },
    {
        id: 8,
        name: "Le Strettole",
        category: "B&B",
        description: "Bed & Breakfast accogliente in contrada Strettole.",
        image: "https://asmez.halley.it/c064015/zf/index.php/locali-pubblici/index/download-foto/locale/3/foto/3/size/original",
        address: "Contrada Strettole",
        phone: "0827 30701",
        priceRange: "€€",
        amenities: ["Colazione", "WiFi"],
        coordinates: { lat: 40.8998501, lng: 15.4276976 },
        rating: 4.8,
        website: "www.lestrettole.it"
    },
    {
        id: 9,
        name: "La Vista",
        category: "B&B",
        description: "Bed & Breakfast con splendida vista panoramica.",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/480453695_656936470007216_3838390505185858826_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=HopdjSxdskgQ7kNvwE1lsrO&_nc_oc=Adm33hORTJSFnEwILqLukOtsPeenjs4kkmTGMxEHqmrrI1KOEKOrhiRuto0RNhKB--4&_nc_zt=23&_nc_ht=scontent-fco2-1.xx&_nc_gid=q1MMq9lz1UbaUY5_mWx9iA&oh=00_AfqmLyEoh4dc1krZqOsYdFPBztyaSgjH12-kvg-o9HkA8g&oe=697C4257",
        address: "Via Stanco, 36",
        phone: "340 1950593",
        priceRange: "€€",
        amenities: ["Vista Panoramica", "WiFi"],
        coordinates: { lat: 40.8989782, lng: 15.4393524 },
        rating: 4.7,
        website: "la-vista-bb-italy.co.uk"
    },
    {
        id: 10,
        name: "Il Melograno",
        category: "B&B",
        description: "Country House – B&B immerso nella tranquillità.",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/474384479_1095785018914500_2692975765992103212_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=xjopOh9wbhEQ7kNvwHGkoKJ&_nc_oc=AdmxlgCUlPRl7LVtTyzKSAGpCitGay8LSBfXHdjuKYzaNF2uwCe7djh-Z0mP5oYPkk0&_nc_zt=23&_nc_ht=scontent-fco2-1.xx&_nc_gid=_USHNg6DTUMEBP7hpk1Cqg&oh=00_AfrSrziDyihxO_qLNP6glt5VtSjYrvt4D7zvV8rQkxNivA&oe=697C34D1",
        address: "Via Delle Nazioni Unite, SS. 399",
        phone: "0827 318442",
        priceRange: "€€",
        amenities: ["WiFi", "Parcheggio"],
        coordinates: { lat: 40.9135665, lng: 15.4171009 },
        rating: 4.6,
        website: "www.countryhouseilmelograno.it"
    },
    {
        id: 11,
        name: "Sveva Design House",
        category: "Affittacamere",
        description: "Casa Vacanze di design nel centro storico.",
        image: "https://scontent-fco2-1.xx.fbcdn.net/v/t1.6435-9/82829235_122172222625768_4328973648753852416_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cf85f3&_nc_ohc=i0QcayoOxxQQ7kNvwGFA8Lw&_nc_oc=AdnrBVX6UC8WIr_iOJOTTAQuxyoCknBtLP40MeGm9k5cLZ373BT1Av_Vchb-q5RtyxA&_nc_zt=23&_nc_ht=scontent-fco2-1.xx&_nc_gid=cIs7qCQEIjVC3SM5gICzow&oh=00_AfrcWWcIoc0MArrSrBwQqC1fRAGJgnuntOKPcepND-ryEQ&oe=699DEF6C",
        address: "Via A. Del Re, 63",
        phone: "0827 30838",
        priceRange: "€€",
        amenities: ["Design", "WiFi"],
        coordinates: { lat: 40.900814, lng: 15.440168 },
        rating: 4.8
    },
    {
        id: 12,
        name: "Il Borgo degli Angeli",
        category: "B&B",
        description: "Bed & Breakfast accogliente lungo la SS. 399.",
        image: "http://www.ilborgodegliangeli.it/images/gallery3/01.jpg",
        address: "SS. 399, N°29",
        phone: "0827 34297",
        priceRange: "€€",
        amenities: ["WiFi", "Colazione"],
        coordinates: { lat: 40.91474084022974, lng: 15.41363933442051 },
        rating: 4.8,
        website: "www.ilborgodegliangeli.it"
    },
    {
        id: 13,
        name: "Casa Vacanze Donna Erminia",
        category: "Affittacamere",
        description: "Accogliente casa vacanze nel cuore del paese.",
        image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/423831321.jpg?k=ed9615d412050b9d96f7dcd70177fea3d1d52011f19050f0ca681f27978b4eb2&o=",
        address: "Via Stanco, 18",
        phone: "N/D",
        priceRange: "€€",
        amenities: ["WiFi"],
        coordinates: { lat: 40.8985291, lng: 15.4391002 },
        rating: 4.5
    }
];
