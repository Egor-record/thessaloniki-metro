export const STATIONS = [
    { 
      id: "neos-sidirodromikos",
      name: {
        en: "Neos Sidirodromikos Stathmos",
        el: "Νέος Σιδηροδρομικός Σταθμός",
      },
      lat: 40.64421636016618,
      lon: 22.927690579505224
    },
    { 
      id: "dimokratias",
      name: {
        en: "Dimokratias",
        el: "Δημοκρατίας",
      },
      lat: 40.64130180521715,
      lon: 22.935782080235427
    },
    { 
      id: "venizelou",
      name: {
        en: "Venizelou",
        el: "Βενιζέλου",
      },
      lat: 40.637697618146824,
      lon: 22.93947539502607
    },
    { 
      id: "agias-sofias",
      name: {
        en: "Agias Sofias",
        el: "Αγίας Σοφίας",
      },
      lat: 40.63511629929138,
      lon: 22.94513278970566
    },
    { 
      id: "sintrivani",
      name: {
        en: "Sintrivani",
        el: "Σιντριβάνι",
      },
      lat: 40.63050693949274,
      lon: 22.954382094675818
    },
    { 
      id: "panepistimio",
      name: {
        en: "Panepistimio",
        el: "Πανεπιστήμιο",
      },
      lat: 40.626039413453256,
      lon: 22.961110411639687
    },
    { 
      id: "papafi",
      name: {
        en: "Papafi",
        el: "Παπάφη",
      },
      lat: 40.62025461926455,
      lon: 22.964041683706103
    },
    { 
        id: "efkleidis",
        name: {
          en: "efkleidis",
          el: "Ευκλείδης",
        },
        lat: 440.61632501877454,
        lon: 22.962905010691472
      },
    { 
      id: "fleming",
      name: {
        en: "Fleming",
        el: "Φλέμινγκ",
      },
      lat: 40.61265594484967,
      lon: 22.95980450032778
    },
    { 
      id: "analipsi",
      name: {
        en: "Analipsi",
        el: "Ανάληψη",
      },
      lat: 40.606472729348646,
      lon: 22.96058123474921
    },
    { 
      id: "25-martiou",
      name: {
        en: "25 Martiou",
        el: "25 Μαρτίου",
      },
      lat: 40.601435818895524,
      lon: 22.961358097370578
    },
    { 
        id: "voulgari",
        name: {
          en: "Voulgari",
          el: "Βούλγαρη",
        },
        lat: 40.599845484552084,
        lon: 22.972656483204396
      },
    { 
      id: "nea-elvetia",
      name: {
        en: "Nea Elvetia",
        el: "Νέα Ελβετία",
      },
      lat: 40.594279140335885,
      lon: 22.96689444616156
    },
]

export const STATIONS_GRAPH = {
    "neos-sidirodromikos": { "dimokratias": 3 },
    "dimokratias": { 
      "neos-sidirodromikos": 3, 
      "venizelou": 2 
    },
    "venizelou": { 
      "dimokratias": 2, 
      "agias-sofias": 3 
    },
    "agias-sofias": { 
      "venizelou": 3, 
      "sintrivani": 2 
    },
    "sintrivani": { 
      "agias-sofias": 2, 
      "panepistimio": 4 
    },
    "panepistimio": { 
      "sintrivani": 4, 
      "papafi": 3 
    },
    "papafi": { 
      "panepistimio": 3, 
      "efkleidis": 2 
    },
    "efkleidis": { 
      "papafi": 2, 
      "fleming": 3 
    },
    "fleming": { 
      "efkleidis": 3, 
      "analipsi": 2 
    },
    "analipsi": { 
      "fleming": 2, 
      "25-martiou": 3 
    },
    "25-martiou": { 
      "analipsi": 3, 
      "voulgari": 4 
    },
    "voulgari": { 
      "25-martiou": 4, 
      "nea-elvetia": 3 
    },
    "nea-elvetia": { "voulgari": 3 }
}