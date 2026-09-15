export type Theorist = {
  id: "maslow" | "herzberg" | "mcclelland" | "vroom";
  speaker: string;
  name: string;
  fullName: string;
  years: string;
  role: string;
  theory: string;
  year: number;
  book: string;
  photo: string;
  photoCredit: string;
  color: string;
  colorSoft: string;
};

export const THEORISTS: Theorist[] = [
  {
    id: "maslow",
    speaker: "1-адам",
    name: "Маслоу",
    fullName: "Абрахам Маслоу",
    years: "1908–1970",
    role: "Американ психологы, гуманистік психологияның негізін қалаушы",
    theory: "Қажеттіліктер иерархиясы",
    year: 1943,
    book: "«A Theory of Human Motivation»",
    photo: "/photos/maslow.jpg",
    photoCredit: "Фото: William Carter, Wikimedia Commons (CC BY-SA)",
    color: "#f59e0b",
    colorSoft: "rgba(245, 158, 11, 0.18)",
  },
  {
    id: "herzberg",
    speaker: "2-адам",
    name: "Герцберг",
    fullName: "Фредерик Герцберг",
    years: "1923–2000",
    role: "Американ психологы, Юта университетінің профессоры",
    theory: "Екі факторлы теория",
    year: 1959,
    book: "«The Motivation to Work»",
    photo: "/photos/herzberg.jpg",
    photoCredit: "Фото: toolshero.com",
    color: "#22d3ee",
    colorSoft: "rgba(34, 211, 238, 0.18)",
  },
  {
    id: "mcclelland",
    speaker: "3-адам",
    name: "МакКлелланд",
    fullName: "Дэвид МакКлелланд",
    years: "1917–1998",
    role: "Американ психологы, Гарвард университетінің профессоры",
    theory: "Қажеттіліктер теориясы",
    year: 1961,
    book: "«The Achieving Society»",
    photo: "/photos/mcclelland.jpg",
    photoCredit: "Фото: Wikimedia Commons",
    color: "#a78bfa",
    colorSoft: "rgba(167, 139, 250, 0.18)",
  },
  {
    id: "vroom",
    speaker: "4-адам",
    name: "Врум",
    fullName: "Виктор Врум",
    years: "1932–2023",
    role: "Канадалық психолог, Йель университетінің профессоры",
    theory: "Күту теориясы",
    year: 1964,
    book: "«Work and Motivation»",
    photo: "/photos/vroom.jpg",
    photoCredit: "Фото: Yale SOM / toolshero.com",
    color: "#f472b6",
    colorSoft: "rgba(244, 114, 182, 0.18)",
  },
];

export const byId = (id: Theorist["id"]) => THEORISTS.find((t) => t.id === id)!;

export const MASLOW_LEVELS = [
  {
    n: 1,
    title: "Физиологиялық қажеттіліктер",
    items: "тамақ, су, ұйқы, баспана",
    color: "#ef4444",
  },
  {
    n: 2,
    title: "Қауіпсіздік қажеттілігі",
    items: "тұрақты жұмыс, қаржылық тұрақтылық, қауіпсіз орта",
    color: "#f97316",
  },
  {
    n: 3,
    title: "Әлеуметтік қажеттіліктер",
    items: "достық, отбасы, адамдармен қарым-қатынас",
    color: "#facc15",
  },
  {
    n: 4,
    title: "Құрмет пен мойындалу",
    items: "адам өз еңбегінің бағаланғанын қалайды",
    color: "#22c55e",
  },
  {
    n: 5,
    title: "Өзін-өзі жүзеге асыру",
    items: "қабілеттерін толық дамыту, өз мақсатына жету",
    color: "#3b82f6",
  },
];

export const HERZBERG = {
  hygiene: {
    title: "Гигиеналық факторлар",
    sub: "болмаса — наразылық туады, бірақ болғаны ынталандырмайды",
    items: [
      "Жалақы",
      "Жұмыс жағдайы",
      "Қауіпсіздік",
      "Басшылықпен қарым-қатынас",
      "Компания саясаты",
    ],
  },
  motivators: {
    title: "Мотивациялық факторлар",
    sub: "болса — шынайы ынта мен қанағаттану береді",
    items: [
      "Жетістік",
      "Мойындалу",
      "Жауапкершілік",
      "Мансаптық өсу",
      "Жұмыстың өзі қызықты болуы",
    ],
  },
};

export const MCCLELLAND_NEEDS = [
  {
    key: "nAch",
    title: "Жетістікке жету",
    desc: "Өзіне мақсат қойып, жақсы нәтижеге жетуге тырысады. Қиын, бірақ қол жетімді тапсырмаларды таңдайды, кері байланысты бағалайды.",
    color: "#f59e0b",
  },
  {
    key: "nPow",
    title: "Билікке ұмтылу",
    desc: "Басқаларға әсер етуді және көшбасшы болуды қалайды. Жауапкершілік алып, шешім қабылдағанды ұнатады.",
    color: "#a78bfa",
  },
  {
    key: "nAff",
    title: "Қарым-қатынас қажеттілігі",
    desc: "Адамдармен жақсы байланыс орнатуға ұмтылады. Командада жұмыс істеуді, достық атмосфераны бағалайды.",
    color: "#34d399",
  },
];

export const VROOM_FACTORS = [
  {
    key: "E",
    title: "Күту",
    en: "Expectancy",
    q: "«Күш салсам, нәтижеге жетемін бе?»",
    desc: "Күш → нәтиже. Адам өз еңбегі нақты нәтижеге әкелетініне сенуі керек.",
    color: "#22d3ee",
  },
  {
    key: "I",
    title: "Құралдық",
    en: "Instrumentality",
    q: "«Нәтиже сыйақыға әкеле ме?»",
    desc: "Нәтиже → сыйақы. Жақсы нәтиже үшін сыйақы берілетініне сенім.",
    color: "#a78bfa",
  },
  {
    key: "V",
    title: "Валенттілік",
    en: "Valence",
    q: "«Сыйақы мен үшін маңызды ма?»",
    desc: "Сыйақының құндылығы. Адам үшін маңызды сыйақы ғана ынталандырады.",
    color: "#f472b6",
  },
];

export const COMPARISON = [
  {
    theory: "Қажеттіліктер иерархиясы",
    author: "Маслоу, 1943",
    idea: "Қажеттіліктер 5 деңгейге бөлінеді, төменнен жоғарыға қарай қанағаттандырылады",
    practice: "Алдымен базалық жағдай, кейін даму мүмкіндігі",
    color: "#f59e0b",
  },
  {
    theory: "Екі факторлы теория",
    author: "Герцберг, 1959",
    idea: "Гигиеналық факторлар наразылықты азайтады, мотивациялық факторлар ынта береді",
    practice: "Жалақы жеткіліксіз — мойындау мен өсу қажет",
    color: "#22d3ee",
  },
  {
    theory: "Қажеттіліктер теориясы",
    author: "МакКлелланд, 1961",
    idea: "Адамды 3 қажеттілік ынталандырады: жетістік, билік, қарым-қатынас",
    practice: "Әр адамға өз қажеттілігіне сай тапсырма",
    color: "#a78bfa",
  },
  {
    theory: "Күту теориясы",
    author: "Врум, 1964",
    idea: "Мотивация = Күту × Құралдық × Валенттілік",
    practice: "Күш → нәтиже → сыйақы байланысы айқын болуы керек",
    color: "#f472b6",
  },
];

export const SLIDE_TITLES = [
  "Титул",
  "Шолу",
  "Маслоу",
  "Маслоу пирамидасы",
  "Герцберг",
  "Екі фактор",
  "МакКлелланд",
  "Врум",
  "Күту формуласы",
  "Қорытынды",
];
