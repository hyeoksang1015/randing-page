// src/data/beans.ts
var sizes = (a, b, c, first = 200) => [
  { grams: first, label: `${first}g`, price: a },
  { grams: 500, label: "500g", price: b },
  { grams: 1e3, label: "1kg", price: c }
];
var beans = [
  {
    slug: "worka-sakaro",
    name: "\uC5D0\uD2F0\uC624\uD53C\uC544 \uC608\uAC00\uCCB4\uD504 \uC6CC\uCE74 \uC0AC\uCE74\uB85C",
    subtitle: "Ethiopia Yirgacheffe Worka Sakaro Anaerobic",
    category: "single",
    roast: "light",
    roastLabel: "Light",
    roastTone: "cobalt",
    origin: "\uC608\uAC00\uCCB4\uD504 \uAC8C\uB370\uC624 \u2022 2,050m",
    meta: "\uBB34\uC0B0\uC18C \uBC1C\uD6A8 (Anaerobic)",
    notes: ["\uC790\uC2A4\uBBFC", "\uBCF5\uC22D\uC544", "\uC5BC\uADF8\uB808\uC774"],
    badges: [{ text: "SCA 90.5", tone: "white" }, { text: "Anaerobic Slow", tone: "navy" }],
    image: "/images/worka-sakaro.webp",
    imageAlt: "\uCF58\uD06C\uB9AC\uD2B8 \uD14C\uC774\uBE14 \uC704\uC5D0 \uB193\uC778 \uC6CC\uCE74 \uC0AC\uCE74\uB85C \uC6D0\uB450 \uD328\uD0A4\uC9C0",
    sizes: sizes(22e3, 49e3, 88e3),
    acidity: 4,
    sweet: 4,
    body: 2,
    harvest: "2024-12",
    rank: 3,
    detail: {
      lot: "ET-24-WS031",
      score: "90.5",
      altitude: "2,050m",
      region: "Gedeo, Worka",
      process: "Anaerobic",
      processNote: "Sealed Tank (96h)",
      varietal: "Heirloom",
      varietalNote: "Wolisho & Kudhume",
      crop: "2024 New",
      moisture: "Moisture 10.6%",
      quote: "\u201C\uBC00\uD3D0 \uD0F1\uD06C\uC5D0\uC11C \uCC9C\uCC9C\uD788 \uC775\uC5B4 \uAC04 \uBCF5\uC22D\uC544\uC640 \uAF43\uC758 \uACB9\u201D",
      story: "\uCCB4\uB9AC\uB97C \uBC00\uD3D0 \uD0F1\uD06C\uC5D0\uC11C 96\uC2DC\uAC04 \uC800\uC628 \uBC1C\uD6A8\uD55C \uB4A4 \uAC74\uC870\uD588\uC2B5\uB2C8\uB2E4. \uCCAB \uBAA8\uAE08\uC740 \uC790\uC2A4\uBBFC\uCC98\uB7FC \uD654\uC0AC\uD558\uACE0, \uC2DD\uC5B4 \uAC08\uC218\uB85D \uC798 \uC775\uC740 \uBCF5\uC22D\uC544\uC640 \uC5BC\uADF8\uB808\uC774\uC758 \uB2E8\uB9DB\uC774 \uB610\uB837\uD574\uC9D1\uB2C8\uB2E4.",
      flavors: ["Jasmine", "White Peach", "Earl Grey", "Cane Sugar"],
      roastDegree: "Light (Agtron 72/86)",
      sensory: { aroma: 4.5, sweetness: 4.5, acidity: 4, aftertaste: 4, body: 2.5 }
    }
  },
  {
    slug: "tempo",
    name: "\uD15C\uD3EC \uD558\uC6B0\uC2A4 \uBE14\uB80C\uB4DC",
    subtitle: "Tempo House Blend",
    category: "blend",
    roast: "medium",
    roastLabel: "Medium",
    roastTone: "amber",
    origin: "\uCF5C\uB86C\uBE44\uC544 \u2022 \uBE0C\uB77C\uC9C8 \u2022 \uC5D0\uD2F0\uC624\uD53C\uC544",
    meta: "\uC62C\uB370\uC774 \uC5D0\uC2A4\uD504\uB808\uC18C",
    notes: ["\uB2E4\uD06C\uCE74\uCE74\uC624", "\uD5E4\uC774\uC990\uB11B", "\uBCA8\uBCB3\uBC14\uB514"],
    badges: [{ text: "House Signature", tone: "white" }, { text: "All-Day Espresso", tone: "navy" }],
    image: "/images/tempo.webp",
    imageAlt: "\uC9D9\uC740 \uD30C\uB780 \uB77C\uBCA8\uC758 \uD15C\uD3EC \uD558\uC6B0\uC2A4 \uBE14\uB80C\uB4DC \uC6D0\uB450 \uD328\uD0A4\uC9C0",
    sizes: sizes(18e3, 39e3, 7e4),
    acidity: 2,
    sweet: 4,
    body: 4,
    harvest: "2024-10",
    rank: 2,
    detail: {
      lot: "BL-24-TP012",
      score: "87.0",
      altitude: "1,400\u20131,900m",
      region: "3 Origins Blend",
      process: "Washed + Natural",
      processNote: "Post-roast Blend",
      varietal: "Caturra \uC678",
      varietalNote: "Bourbon \xB7 Heirloom",
      crop: "2024",
      moisture: "Moisture 10.9%",
      quote: "\u201C\uC6B0\uC720\uB97C \uB9CC\uB098\uB3C4 \uD750\uB824\uC9C0\uC9C0 \uC54A\uB294 \uB2E8\uB2E8\uD55C \uCE74\uCE74\uC624\u201D",
      story: "\uC138 \uC0B0\uC9C0\uB97C \uB530\uB85C \uBCF6\uC544 \uC11E\uC5B4 \uC5D0\uC2A4\uD504\uB808\uC18C\uC640 \uB77C\uB5BC \uBAA8\uB450\uC5D0\uC11C \uADE0\uD615\uC774 \uBB34\uB108\uC9C0\uC9C0 \uC54A\uB3C4\uB85D \uC124\uACC4\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uD06C \uCE74\uCE74\uC624\uC640 \uAD6C\uC6B4 \uD5E4\uC774\uC990\uB11B, \uBCA8\uBCB3\uCC98\uB7FC \uBD80\uB4DC\uB7EC\uC6B4 \uC9C8\uAC10\uC774 \uD558\uB8E8 \uC885\uC77C \uAC19\uC740 \uB9DB\uC744 \uB0C5\uB2C8\uB2E4.",
      flavors: ["Dark Cacao", "Hazelnut", "Brown Sugar", "Velvet Body"],
      roastDegree: "Medium (Agtron 55/64)",
      sensory: { aroma: 4, sweetness: 4, acidity: 2.5, aftertaste: 4, body: 4.5 }
    }
  },
  {
    slug: "pink-bourbon",
    name: "\uCF5C\uB86C\uBE44\uC544 \uC6B0\uC77C\uB77C \uD551\uD06C \uBC84\uBCF8",
    subtitle: "Colombia Huila Pink Bourbon Washed",
    category: "single",
    roast: "light",
    roastLabel: "Light-Medium",
    roastTone: "cobalt",
    origin: "\uCF5C\uB86C\uBE44\uC544 \uC6B0\uC77C\uB77C \u2022 1,750m",
    meta: "\uC6CC\uC2DC\uB4DC (Washed)",
    notes: ["\uD551\uD06C\uC790\uBABD", "\uD30C\uD30C\uC57C", "\uAFC0"],
    badges: [{ text: "SCA 89.8", tone: "white" }, { text: "Washed Micro-Lot", tone: "navy" }],
    image: "/images/pink-bourbon.webp",
    imageAlt: "\uD578\uB4DC\uB4DC\uB9BD \uB3C4\uAD6C \uC606\uC5D0 \uB193\uC778 \uD551\uD06C \uBC84\uBCF8 \uC6D0\uB450 \uD328\uD0A4\uC9C0",
    sizes: sizes(24e3, 53e3, 96e3),
    acidity: 4,
    sweet: 4,
    body: 3,
    harvest: "2024-11",
    rank: 5,
    detail: {
      lot: "CO-24-PB044",
      score: "89.8",
      altitude: "1,750m",
      region: "San Adolfo, Huila",
      process: "Washed",
      processNote: "Double Fermented",
      varietal: "Pink Bourbon",
      varietalNote: "Single Varietal",
      crop: "2024 New",
      moisture: "Moisture 10.5%",
      quote: "\u201C\uD551\uD06C \uC790\uBABD\uCC98\uB7FC \uBC1D\uACE0, \uAFC0\uCC98\uB7FC \uAE38\uAC8C \uB0A8\uB294 \uB2E8\uB9DB\u201D",
      story: "\uC6B0\uC77C\uB77C \uC0B0 \uC544\uB3CC\uD3EC\uC758 \uC18C\uADDC\uBAA8 \uB18D\uC7A5\uC5D0\uC11C \uD551\uD06C \uBC84\uBCF8 \uD488\uC885\uB9CC \uACE8\uB77C \uB450 \uBC88 \uBC1C\uD6A8\uD55C \uC6CC\uC2DC\uB4DC \uB78F\uC785\uB2C8\uB2E4. \uBC1D\uC740 \uC790\uBABD \uC0B0\uBBF8 \uB4A4\uB85C \uD30C\uD30C\uC57C\uC640 \uAFC0\uC758 \uB2E8\uB9DB\uC774 \uC774\uC5B4\uC9D1\uB2C8\uB2E4.",
      flavors: ["Pink Grapefruit", "Papaya", "Honey", "Red Apple"],
      roastDegree: "Light-Medium (Agtron 66/78)",
      sensory: { aroma: 4.5, sweetness: 4, acidity: 4, aftertaste: 4, body: 3 }
    }
  },
  {
    slug: "aricha",
    name: "\uC5D0\uD2F0\uC624\uD53C\uC544 \uC608\uAC00\uCCB4\uD504 \uC544\uB9AC\uCC28 G1",
    subtitle: "Morning Wave \xB7 Ethiopia Yirgacheffe Aricha Natural",
    category: "single",
    roast: "light",
    roastLabel: "Light Roast",
    roastTone: "cobalt",
    origin: "\uC5D0\uD2F0\uC624\uD53C\uC544 \uC608\uAC00\uCCB4\uD504 \u2022 2,100m",
    meta: "\uB0B4\uCD94\uB7F4 (Natural)",
    notes: ["\uBCA0\uB974\uAC00\uBABB", "\uBCF5\uC22D\uC544", "\uD654\uC774\uD2B8\uC790\uC2A4\uBBFC"],
    badges: [{ text: "SCA 89.2", tone: "white" }, { text: "Micro-lot", tone: "navy" }],
    image: "/images/aricha.webp",
    imageAlt: "\uBC1D\uC740 \uB3CC \uC704\uC5D0 \uB193\uC778 \uD770\uC0C9 \uB77C\uBCA8\uC758 \uC608\uAC00\uCCB4\uD504 \uC544\uB9AC\uCC28 \uC6D0\uB450 \uD328\uD0A4\uC9C0",
    sizes: sizes(19e3, 42e3, 76e3),
    acidity: 4,
    sweet: 3,
    body: 2,
    harvest: "2024-12",
    rank: 4,
    detail: {
      lot: "ET-24-CH098",
      score: "89.2",
      altitude: "2,100m",
      region: "Gedeo, Chelbesa",
      process: "Slow Natural",
      processNote: "Raised Beds (24 Days)",
      varietal: "Heirloom",
      varietalNote: "Kurume & Dega",
      crop: "2024 New",
      moisture: "Moisture 10.4%",
      quote: "\u201C\uC0C8\uBCBD \uC548\uAC1C\uAC00 \uAC77\uD788\uB294 \uCCBC\uBCA0\uC0AC \uD611\uACE1\uC758 \uCC2C\uB780\uD558\uACE0 \uD22C\uBA85\uD55C \uC0B0\uBBF8\u201D",
      story: "\uC5D0\uD2F0\uC624\uD53C\uC544 \uB0A8\uBD80 \uCCBC\uBCA0\uC0AC \uD611\uACE1\uC758 \uACE0\uC9C0\uB300\uC5D0\uC11C \uC790\uB780 \uCCB4\uB9AC\uB97C 24\uC77C\uAC04 \uC544\uD504\uB9AC\uCE78 \uBCA0\uB4DC\uC5D0\uC11C \uC2AC\uB85C\uC6B0 \uB0B4\uCD94\uB7F4\uB85C \uC815\uAD50\uD558\uAC8C \uAC74\uC870\uD588\uC2B5\uB2C8\uB2E4. \uCCAB \uBAA8\uAE08\uC5D0\uC11C \uD53C\uC5B4\uB098\uB294 \uD654\uC0AC\uD55C \uC790\uC2A4\uBBFC \uAF43 \uD5A5\uAE30\uC640 \uD568\uAED8 \uBC31\uB3C4\uC758 \uB18D\uBC00\uD55C \uACFC\uC999\uAC10\uC774 \uD600 \uB05D\uC744 \uAC10\uC309\uB2C8\uB2E4. \uC2DD\uC5B4\uAC08\uC218\uB85D \uC5BC\uADF8\uB808\uC774 \uBCA0\uB974\uAC00\uBABB\uACFC \uAFC0\uCC98\uB7FC \uB9E4\uB044\uB7EC\uC6B4 \uB2E8\uB9DB\uC774 \uAE34 \uC5EC\uC6B4\uC73C\uB85C \uC774\uC5B4\uC9D1\uB2C8\uB2E4.",
      flavors: ["Jasmine Blossom", "Ripe White Peach", "Bergamot Earl Grey", "Honeycomb Sweet Finish"],
      roastDegree: "Light-Medium (Agtron 68/82)",
      sensory: { aroma: 5, sweetness: 4.5, acidity: 4, aftertaste: 4.5, body: 3 }
    }
  },
  {
    slug: "cadence",
    name: "\uC2DC\uADF8\uB2C8\uCC98 \uD558\uC6B0\uC2A4 \uBE14\uB80C\uB4DC \u2018\uCF00\uC774\uB358\uC2A4\u2019",
    subtitle: "Cadence Signature House Blend",
    category: "blend",
    roast: "medium",
    roastLabel: "Medium-Dark",
    roastTone: "navy",
    origin: "\uCF5C\uB86C\uBE44\uC544 \u2022 \uBE0C\uB77C\uC9C8 \u2022 \uC778\uB3C4",
    meta: "\uC5D0\uC2A4\uD504\uB808\uC18C \uB9DE\uCDA4",
    notes: ["\uB2E4\uD06C\uCD08\uCF5C\uB9BF", "\uBCF6\uC740\uC544\uBAAC\uB4DC", "\uBE0C\uB77C\uC6B4\uC288\uAC00"],
    badges: [{ text: "Best Seller", tone: "amber" }, { text: "House Signature", tone: "white" }],
    image: "/images/cadence.webp",
    imageAlt: "\uCEE4\uD53C\uC794\uACFC \uC6D0\uB450 \uC606\uC5D0 \uB193\uC778 \uCF00\uC774\uB358\uC2A4 \uD558\uC6B0\uC2A4 \uBE14\uB80C\uB4DC \uD328\uD0A4\uC9C0",
    sizes: sizes(16e3, 34e3, 58e3),
    acidity: 2,
    sweet: 4,
    body: 5,
    harvest: "2024-09",
    rank: 1,
    detail: {
      lot: "BL-24-CD001",
      score: "86.5",
      altitude: "1,100\u20131,600m",
      region: "3 Origins Blend",
      process: "Natural + Washed",
      processNote: "Pre-roast Blend",
      varietal: "Catuai \uC678",
      varietalNote: "Castillo \xB7 S795",
      crop: "2024",
      moisture: "Moisture 11.0%",
      quote: "\u201C\uC9C4\uD55C \uCD08\uCF5C\uB9BF\uACFC \uACE0\uC18C\uD55C \uC544\uBAAC\uB4DC, \uB9E4\uC7A5\uC758 \uAE30\uBCF8\uC774 \uB418\uB294 \uB9DB\u201D",
      story: "\uBE0C\uB77C\uC9C8 \uB0B4\uCD94\uB7F4\uC744 \uBC14\uD0D5\uC73C\uB85C \uCF5C\uB86C\uBE44\uC544\uC758 \uB2E8\uB9DB\uACFC \uC778\uB3C4 \uBAAC\uC21C\uC758 \uBB35\uC9C1\uD568\uC744 \uB354\uD588\uC2B5\uB2C8\uB2E4. \uC5D0\uC2A4\uD504\uB808\uC18C \uD55C \uC794\uC5D0\uC11C\uB3C4, \uD070 \uB77C\uB5BC\uC5D0\uC11C\uB3C4 \uB2E4\uD06C \uCD08\uCF5C\uB9BF\uACFC \uBCF6\uC740 \uC544\uBAAC\uB4DC \uD5A5\uC774 \uB610\uB837\uD569\uB2C8\uB2E4.",
      flavors: ["Dark Chocolate", "Roasted Almond", "Brown Sugar", "Heavy Crema"],
      roastDegree: "Medium-Dark (Agtron 48/56)",
      sensory: { aroma: 4, sweetness: 4, acidity: 2, aftertaste: 4, body: 5 }
    }
  },
  {
    slug: "decaf",
    name: "\uCF5C\uB86C\uBE44\uC544 \uC6B0\uC77C\uB77C \uC288\uAC00\uCF00\uC778 \uB514\uCE74\uD398\uC778",
    subtitle: "Colombia Huila Sugar Cane Decaf",
    category: "decaf",
    roast: "medium",
    roastLabel: "Medium Roast",
    roastTone: "secondary",
    origin: "\uCF5C\uB86C\uBE44\uC544 \uC6B0\uC77C\uB77C \u2022 \uCE74\uD22C\uB77C",
    meta: "\uD654\uD559\uC6A9\uB9E4 \uBB34\uCCA8\uAC00",
    notes: ["\uBA54\uC774\uD50C\uC2DC\uB7FD", "\uC801\uD3EC\uB3C4", "\uBC00\uD06C\uCD08\uCF5C\uB9BF"],
    badges: [{ text: "99.9% Caffeine-Free", tone: "emerald" }, { text: "Sugar Cane Process", tone: "white" }],
    image: "/images/decaf.webp",
    imageAlt: "\uC0AC\uD0D5\uC218\uC218 \uC606\uC5D0 \uB193\uC778 \uB514\uCE74\uD398\uC778 \uC6D0\uB450 \uD328\uD0A4\uC9C0",
    sizes: sizes(18e3, 39e3, 72e3),
    acidity: 2,
    sweet: 4,
    body: 3,
    harvest: "2024-08",
    rank: 6,
    detail: {
      lot: "CO-24-DC020",
      score: "86.0",
      altitude: "1,650m",
      region: "Huila",
      process: "Sugar Cane E.A.",
      processNote: "Natural Solvent",
      varietal: "Caturra",
      varietalNote: "Castillo Blend",
      crop: "2024",
      moisture: "Moisture 10.8%",
      quote: "\u201C\uBC24\uC5D0\uB3C4 \uB9C8\uC74C \uD3B8\uD788, \uBA54\uC774\uD50C \uC2DC\uB7FD\uCC98\uB7FC \uB465\uADFC \uB2E8\uB9DB\u201D",
      story: "\uC0AC\uD0D5\uC218\uC218\uC5D0\uC11C \uC5BB\uC740 \uCC9C\uC5F0 \uC131\uBD84\uC73C\uB85C \uCE74\uD398\uC778\uC744 \uAC78\uB7EC \uB0B4 \uD654\uD559 \uC6A9\uB9E4\uB97C \uC4F0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uBA54\uC774\uD50C \uC2DC\uB7FD\uACFC \uC801\uD3EC\uB3C4\uC758 \uBD80\uB4DC\uB7EC\uC6B4 \uB2E8\uB9DB\uC774 \uB514\uCE74\uD398\uC778\uC774\uB77C\uB294 \uC0AC\uC2E4\uC744 \uC78A\uAC8C \uD569\uB2C8\uB2E4.",
      flavors: ["Maple Syrup", "Red Grape", "Milk Chocolate", "Round Body"],
      roastDegree: "Medium (Agtron 58/66)",
      sensory: { aroma: 3.5, sweetness: 4, acidity: 2.5, aftertaste: 3.5, body: 3.5 }
    }
  },
  {
    slug: "socorro",
    name: "\uACFC\uD14C\uB9D0\uB77C \uC5D8 \uC18C\uCF54\uB85C \uAC8C\uC774\uC0E4 \uC625\uC158\uB78F",
    subtitle: "Guatemala El Socorro Geisha Auction Lot",
    category: "single",
    roast: "light",
    roastLabel: "Light Roast",
    roastTone: "cobalt",
    origin: "\uACFC\uD14C\uB9D0\uB77C \uD314\uB80C\uC2DC\uC544 \u2022 1,850m",
    meta: "\uD55C\uC815 \uC218\uB7C9 80\uBD09",
    notes: ["\uC624\uB80C\uC9C0\uBE14\uB77C\uC378", "\uB9DD\uACE0", "\uC790\uC2A4\uBBFC"],
    badges: [{ text: "SCA 91.5", tone: "white" }, { text: "Auction Lot", tone: "cobalt" }],
    image: "/images/socorro.webp",
    imageAlt: "\uB9DD\uACE0\uC640 \uAF43 \uC606\uC5D0 \uB193\uC778 \uC9D9\uC740 \uD30C\uB780\uC0C9 \uAC8C\uC774\uC0E4 \uC625\uC158\uB78F \uD328\uD0A4\uC9C0",
    sizes: sizes(32e3, 72e3, 138e3, 150),
    acidity: 5,
    sweet: 4,
    body: 2,
    harvest: "2025-01",
    rank: 7,
    detail: {
      lot: "GT-25-SC080",
      score: "91.5",
      altitude: "1,850m",
      region: "Palencia, El Socorro",
      process: "Washed",
      processNote: "Auction Lot #3",
      varietal: "Geisha",
      varietalNote: "Panama Selection",
      crop: "2025 New",
      moisture: "Moisture 10.2%",
      quote: "\u201C\uC624\uB80C\uC9C0 \uAF43\uC774 \uD53C\uC5B4\uC624\uB974\uB294, \uACBD\uB9E4\uB85C \uD655\uBCF4\uD55C \uB2E8 80\uBD09\u201D",
      story: "\uC5D8 \uC18C\uCF54\uB85C \uB18D\uC7A5\uC758 \uAC8C\uC774\uC0E4 \uACBD\uB9E4 \uB78F\uC744 \uB2E8 80\uBD09\uB9CC \uD655\uBCF4\uD588\uC2B5\uB2C8\uB2E4. \uC624\uB80C\uC9C0 \uBE14\uB77C\uC378\uACFC \uC790\uC2A4\uBBFC \uD5A5\uC774 \uC794\uC5D0\uC11C \uBA3C\uC800 \uD53C\uC5B4\uB098\uACE0, \uC798 \uC775\uC740 \uB9DD\uACE0\uC758 \uB2E8\uB9DB\uC774 \uAE68\uB057\uD558\uAC8C \uB9C8\uBB34\uB9AC\uB429\uB2C8\uB2E4.",
      flavors: ["Orange Blossom", "Mango", "Jasmine", "Bergamot"],
      roastDegree: "Light (Agtron 74/88)",
      sensory: { aroma: 5, sweetness: 4.5, acidity: 5, aftertaste: 4.5, body: 2.5 }
    }
  },
  {
    slug: "kirinyaga",
    name: "\uCF00\uB0D0 \uD0A4\uB9B0\uC57C\uAC00 AA Top",
    subtitle: "Kenya Kirinyaga AA Top",
    category: "single",
    roast: "light",
    roastLabel: "Light-Medium",
    roastTone: "secondary",
    origin: "\uCF00\uB0D0 \uD0A4\uB9B0\uC57C\uAC00 \u2022 1,900m",
    meta: "SL28 \u2022 SL34",
    notes: ["\uBE14\uB799\uCEE4\uB7F0\uD2B8", "\uC790\uBABD", "\uBE0C\uB77C\uC6B4\uC288\uAC00"],
    badges: [{ text: "SCA 88.5", tone: "white" }, { text: "AA Top Lot", tone: "navy" }],
    image: "/images/kirinyaga.webp",
    imageAlt: "\uBE14\uB799\uCEE4\uB7F0\uD2B8\uC640 \uC790\uBABD \uC606\uC5D0 \uB193\uC778 \uCF00\uB0D0 \uD0A4\uB9B0\uC57C\uAC00 \uC6D0\uB450 \uD328\uD0A4\uC9C0",
    sizes: sizes(21e3, 46e3, 84e3),
    acidity: 4,
    sweet: 3,
    body: 3,
    harvest: "2024-11",
    rank: 8,
    detail: {
      lot: "KE-24-KR055",
      score: "88.5",
      altitude: "1,900m",
      region: "Kirinyaga, Mt. Kenya",
      process: "Washed",
      processNote: "Kenya 72h Soak",
      varietal: "SL28 \xB7 SL34",
      varietalNote: "Ruiru 11",
      crop: "2024 New",
      moisture: "Moisture 10.7%",
      quote: "\u201C\uBE14\uB799\uCEE4\uB7F0\uD2B8\uC758 \uCA0D\uD55C \uC0B0\uBBF8, \uCF00\uB0D0\uB2E4\uC6B4 \uC120\uBA85\uD568\u201D",
      story: "\uCF00\uB0D0\uC0B0 \uD2B9\uC720\uC758 72\uC2DC\uAC04 \uC218\uC138 \uACF5\uC815\uC744 \uAC70\uCE5C AA \uB4F1\uAE09 \uC6D0\uB450\uC785\uB2C8\uB2E4. \uBE14\uB799\uCEE4\uB7F0\uD2B8\uC640 \uC790\uBABD\uC758 \uB610\uB837\uD55C \uC0B0\uBBF8 \uB4A4\uB85C \uBE0C\uB77C\uC6B4 \uC288\uAC00\uC758 \uB2E8\uB9DB\uC774 \uBC1B\uCCD0 \uC90D\uB2C8\uB2E4.",
      flavors: ["Blackcurrant", "Grapefruit", "Brown Sugar", "Tomato Leaf"],
      roastDegree: "Light-Medium (Agtron 64/76)",
      sensory: { aroma: 4, sweetness: 3.5, acidity: 4.5, aftertaste: 4, body: 3 }
    }
  },
  {
    slug: "velvet-night",
    name: "\uBCA8\uBCB3 \uB098\uC774\uD2B8 \uB2E4\uD06C \uC5D0\uC2A4\uD504\uB808\uC18C",
    subtitle: "Velvet Night Dark Espresso",
    category: "blend",
    roast: "medium",
    roastLabel: "Dark Roast",
    roastTone: "navy",
    origin: "\uBE0C\uB77C\uC9C8 \u2022 \uACFC\uD14C\uB9D0\uB77C \uB2E4\uD06C",
    meta: "\uBC00\uD06C\uBCA0\uBC84\uB9AC\uC9C0 \uCD5C\uC801",
    notes: ["\uCE74\uCE74\uC624\uB2D9\uC2A4", "\uC2A4\uBAA8\uD0A4\uBC14\uB2D0\uB77C", "\uD5E4\uC774\uC990\uB11B"],
    badges: [{ text: "Latte Pairing Pick", tone: "white" }, { text: "Heavy Crema", tone: "navy" }],
    image: "/images/velvet-night.webp",
    imageAlt: "\uAC80\uC740 \uB3CC \uC704\uC5D0 \uCE74\uCE74\uC624\uB2D9\uC2A4\uC640 \uD568\uAED8 \uB193\uC778 \uBCA8\uBCB3 \uB098\uC774\uD2B8 \uC6D0\uB450 \uD328\uD0A4\uC9C0",
    sizes: sizes(17e3, 37e3, 68e3),
    acidity: 1,
    sweet: 3,
    body: 5,
    harvest: "2024-09",
    rank: 9,
    detail: {
      lot: "BL-24-VN007",
      score: "85.5",
      altitude: "1,100\u20131,500m",
      region: "2 Origins Blend",
      process: "Natural + Washed",
      processNote: "Slow Dark Develop",
      varietal: "Mundo Novo \uC678",
      varietalNote: "Bourbon",
      crop: "2024",
      moisture: "Moisture 11.1%",
      quote: "\u201C\uB450\uAEBC\uC6B4 \uD06C\uB808\uB9C8\uC640 \uC2A4\uBAA8\uD0A4\uD55C \uBC14\uB2D0\uB77C, \uB77C\uB5BC\uB97C \uC704\uD55C \uBC24\u201D",
      story: "\uB2E4\uD06C \uB85C\uC2A4\uD305\uC5D0\uC11C\uB3C4 \uC4F4\uB9DB\uC774 \uD280\uC9C0 \uC54A\uB3C4\uB85D \uBC1C\uD604 \uC2DC\uAC04\uC744 \uAE38\uAC8C \uAC00\uC838\uAC14\uC2B5\uB2C8\uB2E4. \uCE74\uCE74\uC624\uB2D9\uC2A4\uC640 \uC2A4\uBAA8\uD0A4\uD55C \uBC14\uB2D0\uB77C \uD5A5\uC774 \uC6B0\uC720\uC640 \uB9CC\uB098 \uB354 \uC9C4\uD574\uC9D1\uB2C8\uB2E4.",
      flavors: ["Cacao Nibs", "Smoky Vanilla", "Hazelnut", "Molasses"],
      roastDegree: "Dark (Agtron 40/48)",
      sensory: { aroma: 3.5, sweetness: 3.5, acidity: 1.5, aftertaste: 4, body: 5 }
    }
  },
  {
    slug: "geisha-reserve",
    name: "\uACFC\uD14C\uB9D0\uB77C \uAC8C\uC774\uC0E4 \uB9AC\uC800\uBE0C \uB0B4\uCD94\uB7F4",
    subtitle: "Guatemala Geisha Reserve Natural",
    category: "single",
    roast: "light",
    roastLabel: "Light Roast",
    roastTone: "cobalt",
    origin: "\uACFC\uD14C\uB9D0\uB77C \uC544\uCE74\uD14C\uB0AD\uACE0 \u2022 1,950m",
    meta: "\uB0B4\uCD94\uB7F4 (Natural)",
    notes: ["\uC790\uC2A4\uBBFC", "\uB9D0\uB9B0\uC0B4\uAD6C", "\uBCA0\uB974\uAC00\uBABB"],
    badges: [{ text: "SCA 91.2", tone: "white" }, { text: "Reserve", tone: "cobalt" }],
    image: "/images/geisha-reserve.webp",
    imageAlt: "\uC544\uCE68 \uD587\uC0B4\uC774 \uB4DC\uB294 \uC2A4\uD29C\uB514\uC624\uC5D0 \uC138\uC6CC \uB454 \uAC8C\uC774\uC0E4 \uB9AC\uC800\uBE0C \uC6D0\uB450 \uD328\uD0A4\uC9C0\uC640 \uC6D0\uB450 \uADF8\uB987",
    sizes: sizes(28e3, 62e3, 116e3),
    acidity: 5,
    sweet: 5,
    body: 2,
    harvest: "2025-01",
    rank: 10,
    detail: {
      lot: "RC-2024-GE01",
      score: "91.2",
      altitude: "1,950m",
      region: "Acatenango, El Progreso",
      process: "Natural",
      processNote: "Shade Dried (30 Days)",
      varietal: "Geisha",
      varietalNote: "Single Varietal",
      crop: "2025 New",
      moisture: "Moisture 10.3%",
      quote: "\u201C\uC790\uC2A4\uBBFC\uACFC \uB9D0\uB9B0 \uC0B4\uAD6C, \uB9AC\uC800\uBE0C \uB77C\uC778\uC758 \uC815\uC810\u201D",
      story: "\uC544\uCE74\uD14C\uB0AD\uACE0 \uD654\uC0B0 \uC9C0\uB300\uC758 \uADF8\uB298\uC5D0\uC11C 30\uC77C\uAC04 \uCC9C\uCC9C\uD788 \uB9D0\uB9B0 \uAC8C\uC774\uC0E4 \uB0B4\uCD94\uB7F4\uC785\uB2C8\uB2E4. \uC790\uC2A4\uBBFC \uAF43\uD5A5\uACFC \uB9D0\uB9B0 \uC0B4\uAD6C, \uB9C8\uC774\uC5B4 \uB808\uBAAC, \uC0AC\uD0D5\uC218\uC218 \uAC19\uC740 \uB2E8\uB9DB\uC774 \uCE35\uCE35\uC774 \uC774\uC5B4\uC9D1\uB2C8\uB2E4.",
      flavors: ["Jasmine Floral", "Dried Apricot", "Meyer Lemon", "Cane Sugar"],
      roastDegree: "Light (Agtron 73/87)",
      sensory: { aroma: 5, sweetness: 5, acidity: 4.5, aftertaste: 5, body: 2.5 }
    }
  }
];
var getBean = (slug) => beans.find((b) => b.slug === slug);

// src/data/site.ts
var site = {
  name: "LowWave Coffee",
  nameKo: "\uB85C\uC6B0\uC6E8\uC774\uBE0C \uCEE4\uD53C",
  tagline: "Roastery & Lab",
  description: "\uC0B0\uC9C0\uC758 \uB5BC\uB8E8\uC544\uB97C \uC815\uBC00\uD55C \uB85C\uC2A4\uD305\uC73C\uB85C \uC62E\uAE30\uB294 \uC2A4\uD398\uC15C\uD2F0 \uCEE4\uD53C \uB85C\uC2A4\uD130\uB9AC. \uC2F1\uAE00 \uC624\uB9AC\uC9C4\xB7\uC2DC\uADF8\uB2C8\uCC98 \uBE14\uB80C\uB4DC \uC6D0\uB450\uC640 \uCE74\uD398 \uB0A9\uD488(B2B)\uC744 \uC18C\uAC1C\uD558\uB294 \uD3EC\uD2B8\uD3F4\uB9AC\uC624\uC6A9 \uAC00\uC0C1 \uBE0C\uB79C\uB4DC \uC0AC\uC774\uD2B8\uC785\uB2C8\uB2E4.",
  address: "\uC11C\uC6B8\uC2DC \uB9C8\uD3EC\uAD6C \uB3C5\uB9C9\uB85C \uB85C\uC6B0\uC6E8\uC774\uBE0C \uC544\uD2C0\uB9AC\uC5D0",
  hours: "09:00 - 18:00 (\uC6D4-\uAE08)",
  b2bPhone: "02-000-0000",
  email: "hello@example.com",
  company: "\uC8FC\uC2DD\uD68C\uC0AC \uB85C\uC6B0\uC6E8\uC774\uBE0C (\uAC00\uC0C1)",
  bizNo: "000-00-00000",
  mailOrderNo: "\uC81C0000-\uC11C\uC6B8\uB9C8\uD3EC-0000\uD638",
  /** 이 금액 이상 주문하면 배송비가 없다(시안 문구). 미만이면 shippingFee 를 더한다. */
  freeShipping: 3e4,
  shippingFee: 3e3
};

// src/lib/cart.ts
var GRINDS = [
  { id: "whole", label: "\uD640\uBE48 (Whole)", note: "\uC6D0\uB450 \uADF8\uB300\uB85C (\uAD8C\uC7A5)" },
  { id: "filter", label: "\uD544\uD130/\uB4DC\uB9BD", note: "V60 / \uCE7C\uB9AC\uD0C0" },
  { id: "espresso", label: "\uC5D0\uC2A4\uD504\uB808\uC18C", note: "\uD30C\uC778 \uADF8\uB77C\uC778\uB4DC" }
];
var PLAN_LABEL = { once: "1\uD68C \uAD6C\uB9E4", "2w": "\uC815\uAE30\uAD6C\uB3C5 \xB7 2\uC8FC", "4w": "\uC815\uAE30\uAD6C\uB3C5 \xB7 4\uC8FC" };
var SUBSCRIPTION_DISCOUNT = 0.15;
var MAX_QTY = 20;
function unitPrice(bean, grams, plan) {
  const base = bean.sizes.find((s) => s.grams === grams)?.price ?? bean.sizes[0].price;
  return plan === "once" ? base : Math.round(base * (1 - SUBSCRIPTION_DISCOUNT) / 100) * 100;
}
function linePrice(i) {
  const bean = getBean(i.slug);
  return bean ? unitPrice(bean, i.grams, i.plan) * i.qty : 0;
}
function totals(items) {
  const subtotal = items.reduce((sum, i) => sum + linePrice(i), 0);
  const shipping = subtotal === 0 || subtotal >= site.freeShipping ? 0 : site.shippingFee;
  return { subtotal, shipping, total: subtotal + shipping, count: items.reduce((n, i) => n + i.qty, 0) };
}
var clampQty = (n) => Math.min(MAX_QTY, Math.max(1, Math.floor(n)));
function parseCart(raw) {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((v) => {
    const bean = getBean(v?.slug);
    const ok = bean && bean.sizes.some((s) => s.grams === v.grams) && GRINDS.some((g) => g.id === v.grind) && v.plan in PLAN_LABEL && Number.isInteger(v.qty) && v.qty >= 1;
    return ok ? [{ slug: v.slug, grams: v.grams, grind: v.grind, plan: v.plan, qty: clampQty(v.qty) }] : [];
  });
}

// src/lib/orders.ts
function expectedAmount(raw) {
  const items = parseCart(raw);
  if (!Array.isArray(raw) || items.length === 0 || items.length !== raw.length) return null;
  if (items.some((i, n) => i.qty !== raw[n].qty)) return null;
  return totals(items).total;
}

// src/lib/server.ts
var json = (data, status = 200) => Response.json(data, { status });
var handle = (fn) => async (ctx) => {
  try {
    return await fn(ctx);
  } catch (e) {
    console.error(e);
    return json({ message: "\uC11C\uBC84 \uC624\uB958\uB85C \uCC98\uB9AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694." }, 500);
  }
};
var ORDER_ID = /^[A-Za-z0-9_-]{6,64}$/;
var identity = (env, action, body) => fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${env.FIREBASE_API_KEY}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }).then((r) => r.json());
async function serverToken(env) {
  const r = await identity(env, "signInWithPassword", { email: env.LW_SERVER_EMAIL, password: env.LW_SERVER_PASSWORD, returnSecureToken: true });
  if (typeof r.idToken !== "string") throw new Error("\uC11C\uBC84 \uACC4\uC815 \uB85C\uADF8\uC778 \uC2E4\uD328");
  return r.idToken;
}
function toValue(v) {
  if (v === null || v === void 0) return { nullValue: null };
  if (v instanceof Date) return { timestampValue: v.toISOString() };
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toValue) } };
  return { mapValue: { fields: toFields(v) } };
}
var toFields = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, toValue(v)]));
function fromValue(v) {
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("arrayValue" in v) return (v.arrayValue.values ?? []).map(fromValue);
  if ("mapValue" in v) return fromFields(v.mapValue.fields ?? {});
  return Object.values(v)[0];
}
var fromFields = (f) => Object.fromEntries(Object.entries(f).map(([k, v]) => [k, fromValue(v)]));
var docUrl = (env, path) => `https://firestore.googleapis.com/v1/projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}`;
async function getDoc(env, token, path) {
  const r = await fetch(docUrl(env, path), { headers: { authorization: `Bearer ${token}` } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`Firestore \uC77D\uAE30 \uC2E4\uD328 ${r.status}`);
  return fromFields((await r.json()).fields);
}
async function patchDoc(env, token, path, data) {
  const mask = Object.keys(data).map((k) => `updateMask.fieldPaths=${k}`).join("&");
  const r = await fetch(`${docUrl(env, path)}?${mask}&currentDocument.exists=true`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    body: JSON.stringify({ fields: toFields(data) })
  });
  if (!r.ok) throw new Error(`Firestore \uC4F0\uAE30 \uC2E4\uD328 ${r.status}`);
}
async function toss(env, path, body) {
  const r = await fetch(`https://api.tosspayments.com${path}`, {
    method: "POST",
    headers: { authorization: `Basic ${btoa(env.TOSS_SECRET_KEY + ":")}`, "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  return { ok: r.ok, status: r.status, data: await r.json() };
}

// functions/api/confirm.ts
var onRequestPost = handle(async ({ request, env }) => {
  const body = await request.json().catch(() => null);
  const { paymentKey, orderId, amount } = body ?? {};
  if (typeof paymentKey !== "string" || !paymentKey || paymentKey.length > 200 || typeof orderId !== "string" || !ORDER_ID.test(orderId) || !Number.isInteger(amount)) {
    return json({ message: "\uACB0\uC81C \uC815\uBCF4\uAC00 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." }, 400);
  }
  const token = await serverToken(env);
  const path = `lwOrders/${orderId}`;
  const order = await getDoc(env, token, path);
  if (!order) return json({ message: "\uC8FC\uBB38\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }, 404);
  const payment = order.payment;
  if (order.status === "paid" && payment?.paymentKey === paymentKey) return json({ ok: true, orderId });
  if (order.status !== "pending") return json({ message: "\uC774\uBBF8 \uCC98\uB9AC\uB41C \uC8FC\uBB38\uC785\uB2C8\uB2E4." }, 409);
  const expected = expectedAmount(order.items);
  if (expected === null || expected !== order.amount || amount !== order.amount) return json({ message: "\uACB0\uC81C \uAE08\uC561\uC774 \uC8FC\uBB38 \uAE08\uC561\uACFC \uB2E4\uB985\uB2C8\uB2E4." }, 400);
  const res = await toss(env, "/v1/payments/confirm", { paymentKey, orderId, amount });
  if (!res.ok) return json({ message: res.data.message ?? "\uACB0\uC81C \uC2B9\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.", code: res.data.code }, res.status);
  const d = res.data;
  try {
    await patchDoc(env, token, path, {
      status: "paid",
      payment: { paymentKey, method: d.method ?? "", approvedAt: d.approvedAt ?? "", receiptUrl: d.receipt?.url ?? "" },
      updatedAt: /* @__PURE__ */ new Date()
    });
  } catch {
    await toss(env, `/v1/payments/${encodeURIComponent(paymentKey)}/cancel`, { cancelReason: "\uC8FC\uBB38 \uC800\uC7A5 \uC2E4\uD328\uB85C \uC790\uB3D9 \uCDE8\uC18C" });
    return json({ message: "\uC8FC\uBB38 \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD574 \uACB0\uC81C\uB97C \uC790\uB3D9 \uCDE8\uC18C\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694." }, 500);
  }
  return json({ ok: true, orderId });
});
export {
  onRequestPost
};
