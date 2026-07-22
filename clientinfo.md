# La Meridiana — Client Fact Sheet
Single source of truth for all client information. Every fact below was verified from the client's own website (July 2026) unless marked as an open question. **Nothing outside this file may be presented as fact on the site.**

## Identity
- Name: La Meridiana
- Tagline: "A little slice of Italy, in the heart of Surrey"
- Type: Family-run Italian restaurant, 30+ years in operation
- Known for: fresh hand-made pasta, "our famous pizzas", Italian wine

## Location & contact
- Address: Ockham Road South, East Horsley, Leatherhead, Surrey KT24 6QU
- Phone: +44 1483 284343
- Email: contact@lameridiana.co.uk
- Domain: lameridiana.co.uk (currently on Squarespace)

## Opening hours — ADOPTED VERSION (contact-page version, majority of the three below)
| Day | Hours |
|---|---|
| Monday | Dinner 5:00 – 9:30pm |
| Tuesday – Thursday | Lunch 12 – 3pm · Dinner 5 – 9:30pm |
| Friday | Lunch 12 – 3pm · Dinner 5 – 10:30pm |
| Saturday | All day 12:00pm – 10:30pm |
| Sunday | All day 12:00pm – 9:00pm |

⚠️ The client's current site shows THREE conflicting versions:
1. Homepage: groups "Friday & Saturday 12 – 10:30pm" (no Friday afternoon break)
2. Contact page: the adopted version above
3. About page: same as contact **plus** Monday lunch 12 – 3pm

**Do not treat hours as final until the client confirms in writing.**

## Awards & trust (all real — do not invent others)
- Restaurant of the Year, South East — The Food Awards England, 2022
- Best Casual Restaurant in Surrey — Muddy Stilettos Awards, 2025
- Food hygiene rating 5/5 "Very Good" — Food Standards Agency, inspected July 2024

## Current offerings (from their What's On page)
- **Terrace:** open for the season; lunch and dinner outdoors
- **Sicilian Brunch:** Tuesday – Sunday from 10:00am, on the terrace, walk-ins welcome
- **Private events:** birthdays, weddings, corporate dinners, graduations — with catering
- **Delivery:** offered on the current site (Phase 2 page)
- **Gift cards:** offered on the current site (Phase 2 page)

## Social
- Instagram: @lameridianar
- Facebook: facebook.com/lameridiana.co.uk
- Tripadvisor: listed (link from current site footer)

## Booking
- Current site uses a **Dojo** booking link ("Book a table" button).
- Rule: all reservation buttons stay dead (`data-booking="connect"`) until the client approves the design. When wiring, take the exact Dojo URL from the live site's Book a Table button — do not guess it.

## Old URLs (for the vercel.json redirect map)
`/menu-1`, `/our-story`, `/what-is-going-on`, `/book-a-table`, `/contact`, `/delivery`, `/fresh-pasta-1` (gift cards)

## Open questions for the client — collect before launch
1. Confirm opening hours (three versions live right now — see above)
2. Original logo files (vector preferred) → exact brand hex codes for `:root`
3. Confirm booking provider + exact link (keep Dojo, or change?)
4. Photos that don't exist yet: the famous pizzas (zero photos on the entire current site), the family/chef/people (the 30-year story has no faces)
5. Confirm terrace + Sicilian Brunch details are current (days, start time, walk-ins)
6. Delivery & gift cards: keep for Phase 2? Which platforms/details?
7. Sign-off on the design before the full build begins
