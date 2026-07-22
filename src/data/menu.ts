/**
 * ---------------------------------------------------------------------------
 * MENU CONTENT  —  PLACEHOLDER DATA
 * ---------------------------------------------------------------------------
 * Every dish, description and price below is placeholder content with a
 * realistic structure. Replace it with La Meridiana's real menu — the page
 * layout, SEO and schema.org markup all read from this one file, so you only
 * edit here. Prices are plain strings in GBP (no leading "£" — the UI adds it).
 *
 * To add/remove a section, edit the `menu` array. To mark a dish, use the
 * optional `tags` field (e.g. 'v' vegetarian, 've' vegan, 'gf' gluten-free).
 */

export type MenuItem = {
  name: string;
  description?: string;
  price: string;
  tags?: ('v' | 've' | 'gf' | 'signature')[];
};

export type MenuSection = {
  id: string;
  title: string;
  italian?: string;
  note?: string;
  items: MenuItem[];
};

export const menuTagLabels: Record<string, string> = {
  v: 'Vegetarian',
  ve: 'Vegan',
  gf: 'Gluten-free',
  signature: 'Signature',
};

export const menuIntro =
  'A seasonal à la carte menu of regional Italian cooking — pasta rolled in-house, produce from trusted suppliers, and a cellar built for lingering. The list below is a sample; menus change with the seasons.';

export const menu: MenuSection[] = [
  {
    id: 'antipasti',
    title: 'Antipasti',
    italian: 'To begin',
    items: [
      {
        name: 'Burrata Pugliese',
        description: 'Creamy Puglian burrata, slow-roasted datterini tomatoes, basil, Ligurian olive oil',
        price: '12.50',
        tags: ['v', 'gf', 'signature'],
      },
      {
        name: 'Carpaccio di Manzo',
        description: 'Thinly sliced beef fillet, rocket, aged Parmigiano, capers, lemon',
        price: '13.00',
        tags: ['gf'],
      },
      {
        name: 'Calamari Fritti',
        description: 'Lightly fried squid, chilli, garlic aioli, lemon',
        price: '11.50',
      },
      {
        name: 'Antipasto della Casa',
        description: 'A board of cured Italian meats, marinated vegetables, olives and focaccia (to share)',
        price: '16.00',
      },
      {
        name: 'Funghi Trifolati',
        description: 'Wild mushrooms, garlic, parsley and white wine on grilled sourdough',
        price: '10.50',
        tags: ['v'],
      },
    ],
  },
  {
    id: 'pasta',
    title: 'Pasta',
    italian: 'Made in-house',
    items: [
      {
        name: 'Tagliatelle al Ragù',
        description: 'Slow-cooked beef and pork ragù, hand-rolled tagliatelle, Parmigiano',
        price: '15.50',
        tags: ['signature'],
      },
      {
        name: 'Ravioli di Zucca',
        description: 'Butternut squash ravioli, sage butter, amaretti, toasted pumpkin seeds',
        price: '15.00',
        tags: ['v'],
      },
      {
        name: 'Spaghetti alle Vongole',
        description: 'Clams, garlic, chilli, white wine, parsley',
        price: '17.00',
      },
      {
        name: 'Rigatoni all’Arrabbiata',
        description: 'Datterini tomato, garlic, chilli, basil — simple and fiery',
        price: '13.50',
        tags: ['ve'],
      },
      {
        name: 'Lasagne al Forno',
        description: 'Layered beef ragù, béchamel, Parmigiano, baked to order',
        price: '15.00',
      },
    ],
  },
  {
    id: 'secondi',
    title: 'Secondi',
    italian: 'Mains',
    items: [
      {
        name: 'Branzino alla Griglia',
        description: 'Whole grilled sea bass, salsa verde, roasted lemon, seasonal greens',
        price: '23.00',
        tags: ['gf', 'signature'],
      },
      {
        name: 'Pollo Milanese',
        description: 'Breaded chicken breast, rocket and cherry tomato salad, lemon',
        price: '19.50',
      },
      {
        name: 'Bistecca',
        description: '10oz ribeye, rosemary roast potatoes, salsa verde or peppercorn',
        price: '29.00',
        tags: ['gf'],
      },
      {
        name: 'Melanzane alla Parmigiana',
        description: 'Baked aubergine, tomato, basil and mozzarella',
        price: '16.50',
        tags: ['v', 'gf'],
      },
    ],
  },
  {
    id: 'pizza',
    title: 'Pizza',
    italian: 'Stone-baked',
    items: [
      {
        name: 'Margherita',
        description: 'San Marzano tomato, fior di latte, basil',
        price: '11.50',
        tags: ['v'],
      },
      {
        name: 'Diavola',
        description: 'Spicy Calabrian salami, tomato, mozzarella, chilli honey',
        price: '14.00',
      },
      {
        name: 'Prosciutto e Funghi',
        description: 'Cooked ham, mushrooms, mozzarella, tomato',
        price: '14.50',
      },
      {
        name: 'Ortolana',
        description: 'Grilled seasonal vegetables, tomato, vegan mozzarella',
        price: '13.50',
        tags: ['ve'],
      },
    ],
  },
  {
    id: 'contorni',
    title: 'Contorni',
    italian: 'Sides',
    items: [
      { name: 'Rosemary roast potatoes', price: '5.00', tags: ['ve', 'gf'] },
      { name: 'Mixed leaf salad, balsamic', price: '4.50', tags: ['ve', 'gf'] },
      { name: 'Tenderstem broccoli, chilli, garlic', price: '5.50', tags: ['ve', 'gf'] },
      { name: 'Focaccia, olive oil, balsamic', price: '4.50', tags: ['v'] },
    ],
  },
  {
    id: 'dolci',
    title: 'Dolci',
    italian: 'Desserts',
    items: [
      {
        name: 'Tiramisù',
        description: 'The house classic — mascarpone, espresso, Marsala, cocoa',
        price: '7.50',
        tags: ['v', 'signature'],
      },
      {
        name: 'Panna Cotta',
        description: 'Vanilla panna cotta, seasonal fruit compote',
        price: '7.00',
        tags: ['v', 'gf'],
      },
      {
        name: 'Affogato',
        description: 'Vanilla gelato "drowned" in a shot of hot espresso',
        price: '6.00',
        tags: ['v', 'gf'],
      },
      {
        name: 'Cannoli Siciliani',
        description: 'Crisp shells, sweet ricotta, candied peel, pistachio',
        price: '7.00',
        tags: ['v'],
      },
    ],
  },
];
