/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH for La Meridiana's core business facts.
 * ---------------------------------------------------------------------------
 * Nav, footer, contact page, and the Restaurant schema.org markup all read
 * from here — change a phone number or an opening hour ONCE and it updates
 * everywhere on the site. Values marked `PLACEHOLDER` should be replaced with
 * confirmed real content (see README → "Swapping in real content").
 */

export const site = {
  name: 'La Meridiana',
  legalName: 'La Meridiana',
  tagline: 'The neighbourhood Italian in East Horsley',
  description:
    'Award-winning Italian restaurant in East Horsley, Surrey — the neighbourhood table for great food, a proper welcome and a long, unhurried meal close to home.',
  // "La Meridiana" means sundial — used as a subtle brand motif throughout.
  meaning: 'sundial',

  address: {
    street: 'Ockham Road South',
    locality: 'East Horsley',
    region: 'Surrey',
    postTown: 'Leatherhead',
    postalCode: 'KT24 6QU',
    country: 'GB',
  },

  // Google Maps embed + directions. Update the query if the pin is off.
  mapsQuery: 'La Meridiana, Ockham Road South, East Horsley, KT24 6QU',
  mapsEmbedSrc:
    'https://www.google.com/maps?q=La%20Meridiana%2C%20Ockham%20Road%20South%2C%20East%20Horsley%2C%20KT24%206QU&output=embed',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=La%20Meridiana%2C%20Ockham%20Road%20South%2C%20East%20Horsley%2C%20KT24%206QU',

  phone: '+44 1483 284343',
  phoneHref: 'tel:+441483284343',
  email: 'contact@lameridiana.co.uk',

  social: {
    instagram: {
      label: '@lameridianar',
      url: 'https://www.instagram.com/lameridianar/',
    },
    // PLACEHOLDER: confirm the exact Facebook page URL.
    facebook: {
      label: 'Facebook',
      url: 'https://www.facebook.com/lameridianar',
    },
    // PLACEHOLDER: confirm the exact TripAdvisor listing URL.
    tripadvisor: {
      label: 'TripAdvisor',
      url: 'https://www.tripadvisor.co.uk/',
    },
  },
} as const;

/**
 * Opening hours. `ranges` drives both the human-readable footer/contact display
 * AND the schema.org `openingHoursSpecification`. Times are 24h "HH:MM".
 * Days use schema.org day names.
 */
export type HoursRange = { opens: string; closes: string; label: string };
export type DayHours = {
  day:
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday';
  ranges: HoursRange[];
};

export const openingHours: DayHours[] = [
  { day: 'Monday', ranges: [{ opens: '17:00', closes: '21:30', label: 'Dinner 5:00pm – 9:30pm' }] },
  {
    day: 'Tuesday',
    ranges: [
      { opens: '12:00', closes: '15:00', label: 'Lunch 12:00pm – 3:00pm' },
      { opens: '17:00', closes: '21:30', label: 'Dinner 5:00pm – 9:30pm' },
    ],
  },
  {
    day: 'Wednesday',
    ranges: [
      { opens: '12:00', closes: '15:00', label: 'Lunch 12:00pm – 3:00pm' },
      { opens: '17:00', closes: '21:30', label: 'Dinner 5:00pm – 9:30pm' },
    ],
  },
  {
    day: 'Thursday',
    ranges: [
      { opens: '12:00', closes: '15:00', label: 'Lunch 12:00pm – 3:00pm' },
      { opens: '17:00', closes: '21:30', label: 'Dinner 5:00pm – 9:30pm' },
    ],
  },
  { day: 'Friday', ranges: [{ opens: '12:00', closes: '22:30', label: 'Open 12:00pm – 10:30pm' }] },
  { day: 'Saturday', ranges: [{ opens: '12:00', closes: '22:30', label: 'Open 12:00pm – 10:30pm' }] },
  { day: 'Sunday', ranges: [{ opens: '12:00', closes: '21:00', label: 'Open 12:00pm – 9:00pm' }] },
];

/**
 * Grouped opening hours for compact display (consecutive days with identical
 * hours are merged). Kept as a hand-authored list so the copy reads naturally.
 */
export const openingHoursDisplay: { days: string; hours: string[] }[] = [
  { days: 'Monday', hours: ['Dinner 5:00pm – 9:30pm'] },
  {
    days: 'Tuesday – Thursday',
    hours: ['Lunch 12:00pm – 3:00pm', 'Dinner 5:00pm – 9:30pm'],
  },
  { days: 'Friday & Saturday', hours: ['12:00pm – 10:30pm'] },
  { days: 'Sunday', hours: ['12:00pm – 9:00pm'] },
];

/**
 * Awards — surfaced in the trust bar directly under the hero AND on the
 * dedicated Awards page. `pressUrl` should link to the award announcement.
 */
export type Award = {
  title: string;
  organisation: string;
  year: string;
  category: string;
  blurb: string;
  pressUrl: string; // PLACEHOLDER links — replace with the real announcements.
};

export const awards: Award[] = [
  {
    title: 'Best Casual Restaurant in Surrey',
    organisation: 'Muddy Stilettos',
    year: '2025',
    category: 'Surrey Awards',
    blurb:
      'Voted the county’s best casual restaurant in the 2025 Muddy Stilettos Awards — a reader-nominated celebration of the best independent places to eat, drink and stay across Surrey.',
    pressUrl: 'https://surrey.muddystilettos.co.uk/',
  },
  {
    title: 'Restaurant of the Year, South East',
    organisation: 'The Food Awards England',
    year: '2022',
    category: 'National / Regional',
    blurb:
      'Named Restaurant of the Year for the South East at the 2022 Food Awards England, which recognise outstanding independent restaurants and culinary talent across the country.',
    pressUrl: 'https://www.foodawardsengland.co.uk/',
  },
];

/**
 * Press mentions for the trust bar / awards page.
 * PLACEHOLDER: swap for real publications + links when confirmed.
 */
export const pressMentions: { outlet: string; quote: string; url: string }[] = [
  {
    outlet: 'Muddy Stilettos',
    quote: 'Best Casual Restaurant in Surrey, 2025',
    url: 'https://surrey.muddystilettos.co.uk/',
  },
  {
    outlet: 'Food Awards England',
    quote: 'Restaurant of the Year, South East',
    url: 'https://www.foodawardsengland.co.uk/',
  },
];

/**
 * Primary navigation. Order here === order in the header and footer.
 */
export const nav: { label: string; href: string }[] = [
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Awards', href: '/awards' },
  { label: "What's On", href: '/whats-on' },
  { label: 'Delivery', href: '/delivery' },
  { label: 'Gift Cards', href: '/gift-cards' },
  { label: 'Contact', href: '/contact' },
];

/**
 * -------------------------------------------------------------------------
 * HERO COPY OPTIONS
 * -------------------------------------------------------------------------
 * Three distinct headline/subheadline pairs, deliberately steering clear of
 * "a little slice of Italy" and other Italian-restaurant clichés. Each leans
 * on a real, specific hook: the meaning of the name (sundial / midday light),
 * the awards, and the sense of unhurried Surrey dining.
 *
 * Pick one by changing `activeHeroIndex` below (0, 1 or 2). The other two stay
 * here for reference / A-B testing.
 */
export const heroOptions = [
  {
    // Option A — the local table. Frames the experience as English/Surrey
    // neighbourhood hospitality, with Italian cooking as the draw (not a
    // "trip to Italy").
    eyebrow: 'East Horsley · Surrey',
    headline: 'Your table in the heart of East Horsley',
    subheadline:
      'The warm welcome of a proper local, the unhurried pleasure of a good meal close to home, and an award-winning Italian kitchen behind it. Dining out, done the Surrey way.',
  },
  {
    // Option B — leads with place + awards; "best of Surrey" framing.
    eyebrow: 'Muddy Stilettos 2025 · Food Awards England 2022',
    headline: 'The best of Surrey, gathered round the table',
    subheadline:
      'A neighbourhood restaurant East Horsley comes back to — honest Italian plates, a proper glass of wine, and service that knows your name. Great food, enjoyed the way we do it here.',
  },
  {
    // Option C — good food, good company, no rush. Directly contrasts
    // "not a trip to Italy" with local pleasure.
    eyebrow: 'Ockham Road South · East Horsley',
    headline: 'Good food, good company, no rush',
    subheadline:
      'Long Surrey lunches and easy evenings over cooking we’re proud of. Not a trip to Italy — just the simple pleasure of eating well, right here on your doorstep.',
  },
] as const;

/** Which hero copy is live on the homepage. Change to 1 or 2 to switch. */
export const activeHeroIndex = 0;
export const activeHero = heroOptions[activeHeroIndex];
