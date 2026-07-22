# Photography

Drop final, colour-graded images in this folder, then reference them by
filename via the `<Photo src="/images/your-file.jpg" … />` component.

## Consistent treatment (the audit's fix #5)

Every food/interior photo renders through the same `.photo-frame` in
`src/app/globals.css`, which applies one uniform warm grade and crops with
`object-cover`. To keep the whole gallery looking like one set:

- Export at a consistent aspect ratio per use (the `<Photo aspect="…">` prop
  supports `square`, `portrait`, `landscape`, `wide`, `hero`).
- Aim for a warm, slightly-lifted grade before export; the CSS filter then
  nudges everything to match. Tune the filter once in `.photo-frame img`.
- Use 2000px on the long edge; `next/image` generates responsive sizes + AVIF/WebP.

## Recommended set to supply

| File | Used on | Aspect |
|------|---------|--------|
| `og-default.jpg` (1200×630) | social share card | wide |
| hero image | Home hero | portrait |
| 3× signature dishes | Home "favourites" | landscape |
| kitchen + room | Home/About | portrait |
| delivery | Delivery page | landscape |

Until you add them, on-brand placeholders render automatically at the right
aspect ratio, so the layout never shifts when you swap real photos in.
