/*
 * Realiteez Custom Creations — site content.
 *
 * This is the ONLY file you need to edit to change products, prices,
 * payment links, contact info, and the order form destination.
 *
 * isSampleContent: while true, a banner tells visitors the catalog is a
 * preview. Set it to false once the real products and prices are in.
 */
window.SITE = Object.freeze({
  isSampleContent: true,

  brand: {
    name: "Realiteez Custom Creations",
    shortName: "Realiteez",
    tagline: "Your idea. Your tee. Your Realiteez.",
    pitch:
      "Custom apparel with a creator-first process — personalized designs, DIY print service and original printed tees, all under one roof.",
    url: "https://realiteez-custom-creations.vercel.app",
    // Hero photo, e.g. "/assets/hero.jpg". Empty = the illustrated tee shows instead.
    heroImage: "",
    heroImageAlt: "Realiteez crew wearing custom painted tees in front of a graffiti wall",
  },

  // Leave a field empty ("") to hide it on the site.
  contact: {
    email: "",
    phone: "",
    city: "",
    instagram: "",
    tiktok: "",
    facebook: "",
  },

  // Where the custom-order form sends requests.
  // Paste a Formspree / Basin / Getform endpoint, e.g. "https://formspree.io/f/abcdwxyz".
  // Empty = the form shows the visitor how to send the request by email instead.
  formEndpoint: "",

  // Each product: paymentLink is a Stripe Payment Link (https://buy.stripe.com/...).
  // Empty paymentLink = the button opens the custom-order form for that item.
  products: [
    {
      id: "classic-tee",
      name: "Classic Custom Tee",
      price: 25,
      priceNote: "from",
      spec: "6.1 oz ringspun cotton · S–4XL",
      methods: ["Screen print", "DTG"],
      blurb: "Your art, front and back. Soft hand-feel, built to survive the wash.",
      swatch: "#1d1d1f",
      paymentLink: "",
    },
    {
      id: "heavy-hoodie",
      name: "Heavyweight Hoodie",
      price: 55,
      priceNote: "from",
      spec: "10 oz fleece · S–3XL",
      methods: ["Screen print", "Embroidery"],
      blurb: "Thick, warm, and boxy. Embroidered chest hits or full-back prints.",
      swatch: "#4a5a3c",
      paymentLink: "",
    },
    {
      id: "memorial-tee",
      name: "Memorial & Tribute Tee",
      price: 30,
      priceNote: "from",
      spec: "Photo-quality DTG · all sizes",
      methods: ["DTG"],
      blurb: "Honor someone you love with a photo tee the whole family can wear.",
      swatch: "#f4f4f2",
      paymentLink: "",
    },
    {
      id: "event-pack",
      name: "Event & Team Pack",
      price: 18,
      priceNote: "per shirt, 24+",
      spec: "Bulk pricing · mixed sizes",
      methods: ["Screen print"],
      blurb: "Reunions, birthdays, teams, launches. One design, everyone matching.",
      swatch: "#b8322a",
      paymentLink: "",
    },
    {
      id: "brand-merch",
      name: "Brand Merch Drop",
      price: 0,
      priceNote: "quote",
      spec: "Tees · hoodies · hats · totes",
      methods: ["Screen print", "Embroidery", "DTG"],
      blurb: "Launch your clothing line or business merch with tags and packaging.",
      swatch: "#2c4a7a",
      paymentLink: "",
    },
    {
      id: "one-of-one",
      name: "One-of-One Piece",
      price: 40,
      priceNote: "from",
      spec: "Hand-finished · single garment",
      methods: ["DTG", "Embroidery"],
      blurb: "A single custom piece made just for you. Gifts, birthdays, statements.",
      swatch: "#d9a521",
      paymentLink: "",
    },
  ],

  steps: [
    { title: "Send your idea", body: "A sketch, a photo, a phrase, or a finished logo. Tell us the item, colors, and quantity." },
    { title: "Approve your proof", body: "We send a digital mockup. You request changes until it is exactly right." },
    { title: "We print and ship", body: "Your order is printed, checked, and shipped or ready for pickup." },
  ],

  methods: [
    { name: "Screen print", best: "Bold colors, bulk orders", min: "12+ pieces" },
    { name: "DTG", best: "Photos, full-color art", min: "1+ piece" },
    { name: "Embroidery", best: "Logos, hats, premium look", min: "6+ pieces" },
  ],

  faq: [
    { q: "Is there a minimum order?", a: "No minimum for DTG and one-of-one pieces. Screen printing starts at 12 pieces; embroidery at 6." },
    { q: "How long does it take?", a: "Most orders ship 5–10 business days after you approve your proof. Rush options are available — ask in your request." },
    { q: "I don't have a design. Can you help?", a: "Yes. Describe your idea and we will design it for you. Simple layouts are included; complex artwork is quoted up front." },
    { q: "What files should I send?", a: "PNG, PDF, AI, or SVG at the highest quality you have. A phone photo of a sketch is fine to start." },
  ],
});
