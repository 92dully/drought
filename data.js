/* ============================================================
   DROUGHT — SITE DATA
   ------------------------------------------------------------
   Everything a business owner is likely to need to change lives
   here: prices, flavours, hours, address, socials, specials.
   Edit this file only — the markup reads from it directly.
   ============================================================ */

const BUSINESS = {
  name: "DROUGHT",
  tagline: "Fresh drinks, good vibes & more",
  address: {
    line1: "2 Coplaw Street",
    city: "Glasgow",
    postcode: "G43 7JE",
    country: "United Kingdom"
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=2+Coplaw+Street+Glasgow+G43+7JE",
  mapsEmbedUrl: "https://www.google.com/maps?q=2+Coplaw+Street,+Glasgow,+G43+7JE&output=embed",
  instagram: {
    handle: "@droughtuk",
    url: "https://instagram.com/droughtuk"
  },
  // Not yet provided by the business
  phone: "",
  email: "",
  hours: [
    { day: "Monday", open: null, close: null },
    { day: "Tuesday", open: null, close: null },
    { day: "Wednesday", open: null, close: null },
    { day: "Thursday", open: null, close: null },
    { day: "Friday", open: "10:00", close: "20:00" },
    { day: "Saturday", open: "10:00", close: "20:00" },
    { day: "Sunday", open: "10:00", close: "20:00" }
  ],
  hoursNote: "Open Friday to Sunday.",
  allergenNote: "For allergen information, please ask in store."
};

/* Specials — rotating / featured menu, shown with elevated styling */
const SPECIALS = [
  {
    name: "Rose Matcha",
    price: "£5.00",
    description: "Smooth and floral matcha latte infused with delicate rose flavour"
  },
  {
    name: "Cookies and Cream Matcha",
    price: "£5.00",
    description: "Creamy iced matcha latte with cookies and cream flavour, topped with crushed oreo pieces"
  },
  {
    name: "Iced Ube Latte",
    price: "£5.00",
    description: "A smooth and creamy iced ube latte with rich vanilla notes and a naturally vibrant purple finish"
  },
  {
    name: "Mango Lassi",
    price: "£4.00",
    description: "A rich and velvety mango yoghurt drink, perfectly chilled"
  }
];

/* Main menu, grouped by category */
const MENU = [
  {
    category: "Matcha Iced Latte",
    price: "£4.50",
    flavours: ["Vanilla", "White Choc", "Strawberry", "Mango", "Hazelnut", "Vanilla S/F"],
    milk: ["Full Fat", "Semi Skimmed", "Almond", "Oat"],
    addOns: ["Syrups +£0.50", "Cold Foam +£0.50", "Fruit Bases +£0.50"]
  },
  {
    category: "Vietnamese Iced Latte",
    price: "£4.50",
    flavours: ["Vanilla", "Vanilla Ube", "Banana", "Caramel & Hazelnut"],
    milk: ["Full Fat", "Semi Skimmed", "Almond", "Oat"],
    addOns: ["Cold Foam +£0.50", "Fruit Bases +£0.50"]
  },
  {
    category: "Lemonade",
    price: "£5.00",
    flavours: ["Classic", "Mint", "Mango", "Kiwi", "Strawberry", "Raspberry", "Passion Fruit"],
    addOns: ["Fruit Bases +£0.50"]
  },
  {
    category: "Fresh Juice",
    price: "£5.00",
    flavours: ["Pear", "Apple", "Orange", "Pineapple"]
  },
  {
    category: "Milkshakes",
    price: "£6.00",
    flavours: ["Tiramisu", "Dubai Chocolate", "Salted Pretzel", "Strawberry Cheesecake"],
    addOns: ["Cold Foam +£0.50"]
  },
  {
    category: "Cream Sodas",
    price: "£5.00",
    flavours: ["Mango Paradise", "Blue Lagoon", "Kiwi Berry", "Red Berry Duo"],
    addOns: ["Cold Foam +£0.50", "Fruit Bases +£0.50"]
  },
  {
    category: "Smoothies",
    price: "£4.50",
    flavours: ["Mango Passion", "Strawberry Split", "Blueberry Bliss", "Kale Kick", "Very Berry", "Avo Go"]
  }
];

/* Customisation options, shown once rather than repeated on every card */
const CUSTOMISATION = {
  coldFoam: {
    price: "+£0.50",
    flavours: ["Vanilla", "Vanilla Ube", "Banana", "Caramel & Hazelnut"]
  },
  fruitBases: {
    price: "+£0.50",
    flavours: ["Strawberry", "Raspberry", "Passion Fruit", "Mango", "Kiwi"]
  },
  milk: {
    // No surcharge confirmed for alternative milk — none is shown
    options: ["Full Fat", "Semi Skimmed", "Almond", "Oat"]
  }
};
