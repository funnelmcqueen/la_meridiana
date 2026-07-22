/**
 * ---------------------------------------------------------------------------
 * WHAT'S ON  —  PLACEHOLDER EVENTS / PROMOTIONS
 * ---------------------------------------------------------------------------
 * Replace with real events. The "What's On" page and the homepage teaser both
 * read from here. Set `featured: true` on the one you want highlighted.
 * Dates are ISO "YYYY-MM-DD"; leave `date` undefined for an ongoing offer.
 */

export type EventItem = {
  slug: string;
  title: string;
  date?: string;
  dateLabel: string;
  summary: string;
  body: string;
  category: 'Event' | 'Offer' | 'Seasonal' | 'Live Music';
  featured?: boolean;
};

export const events: EventItem[] = [
  {
    slug: 'summer-terrace-menu',
    title: 'Summer Terrace Menu',
    dateLabel: 'Now – early September',
    category: 'Seasonal',
    featured: true,
    summary:
      'A lighter seasonal menu of chilled antipasti, grilled fish and Aperol-forward spritzes, served on the terrace while the long evenings last.',
    body:
      'Our summer menu leans into the season: burrata with heritage tomatoes, grilled branzino, and a short list of spritzes built for a warm evening. Available for lunch and dinner, indoors or out on the terrace. No booking needed for drinks — but tables go quickly at the weekend, so we’d reserve ahead.',
  },
  {
    slug: 'midweek-lunch-two-courses',
    title: 'Midweek Lunch — Two Courses for £19',
    dateLabel: 'Tuesday – Thursday, 12–3pm',
    category: 'Offer',
    summary:
      'Two courses for £19 (or three for £24) from a dedicated lunch menu, Tuesday to Thursday. The unhurried Horsley lunch, done properly.',
    body:
      'A set lunch menu offering two courses for £19 or three for £24, available Tuesday to Thursday between noon and 3pm. Choose from a rotating selection of antipasti, pasta and dolci. Perfect for a leisurely catch-up or a working lunch that doesn’t feel like one.',
  },
  {
    slug: 'wine-tasting-supper',
    title: 'Regional Italy Wine Supper',
    dateLabel: 'Last Thursday of the month',
    category: 'Event',
    summary:
      'A five-course supper matched to wines from a single Italian region, hosted with our sommelier. Ticketed — limited covers.',
    body:
      'Once a month we take a tour of one Italian wine region — Piedmont, Sicily, Tuscany and beyond — across five courses, each matched to a glass and introduced by our sommelier. Tickets are limited and released on the newsletter first. Sign up below to hear about the next date before anyone else.',
  },
  {
    slug: 'sunday-lunch',
    title: 'Sunday at La Meridiana',
    dateLabel: 'Every Sunday, 12–9pm',
    category: 'Seasonal',
    summary:
      'A relaxed all-day Sunday: sharing antipasti, slow-cooked ragù and a glass of something red. Families and dogs welcome on the terrace.',
    body:
      'Sundays are made for lingering. We serve our full menu all day from noon, with a few Sunday-only specials from the kitchen. Bring the family — there’s a children’s menu — and well-behaved dogs are always welcome on the terrace.',
  },
];

export const featuredEvent = events.find((e) => e.featured) ?? events[0];
