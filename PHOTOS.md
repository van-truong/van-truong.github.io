# Photo directory

Where to drop image files. The site references these paths from `index.html`. Missing files degrade gracefully — the polaroid shows a camera-icon placeholder, awards just hide the image. So you can add photos one at a time as you find them.

**File format conventions:**
- JPG preferred (smaller). PNG if transparency needed.
- Polaroid display crops to a 4:5 aspect ratio (portrait). Wider images get cropped to center.
- Awards display at ~95 px square — small thumbnails are fine.
- Keep filenames lowercase, hyphenated, no spaces.

---

## `awards/` — Scientist page · "Recognition" section

11 slots, displayed as small polaroids in the "Selected awards & funding" feature box.

| File | Award |
|---|---|
| `awards/cooperative-ai.jpg` | Cooperative AI Research Fellowship (2026) |
| `awards/gutmann.jpg` | President Amy Gutmann Leadership Award (2025) |
| `awards/microsoft-research.jpg` | Microsoft Research PhD Fellowship (2022–25) |
| `awards/sighpc.jpg` | ACM SIGHPC Computational & Data Science Fellowship (2023–25) |
| `awards/aim-ahead.jpg` | NIH AIM-AHEAD & NCATS Data Analytics Training Grant (2024) |
| `awards/penn-global.jpg` | Inaugural Penn Global Dissertation Grant (2024) |
| `awards/fulbright.jpg` | Fulbright U.S. Open Study/Research Award — Semifinalist (2024) |
| `awards/leadership-engagement.jpg` | Penn Leadership & Engagement Award |
| `awards/women-in-bio.jpg` | Women in Bio recognition |
| `awards/nih-jhu.jpg` | NIH / Johns Hopkins recognition |
| `awards/mcquown.jpg` | McQuown award |

---

## `designs/` — Artist page · "Graphic design" section

12 slots, displayed as scattered polaroids.

| File | Design |
|---|---|
| `designs/surf-club.jpg` | Surf club logo & t-shirt (2025) |
| `designs/ritchie-lab.jpg` | Ritchie Lab logo redesign (~2022 · year tbd) |
| `designs/spruce-creek-2017.jpg` | Spruce Creek class shirt — 2017 |
| `designs/spruce-creek-2016.jpg` | Spruce Creek class shirt — 2016 |
| `designs/spruce-creek-2015.jpg` | Spruce Creek class shirt — 2015 |
| `designs/spruce-creek-2014.jpg` | Spruce Creek class shirt — 2014 |
| `designs/spruce-creek-2013.jpg` | Spruce Creek class shirt — 2013 |
| `designs/hope-for-japan.jpg` | Hope for Japan tsunami relief (~2014 · year tbd) |
| `designs/creek-basketball.jpg` | Creek basketball team shirt (2013–17) |
| `designs/creek-track.jpg` | Creek track & field shirt (2013–17) |
| `designs/creekside-middle-2008.jpg` | Creekside Middle 8th grade shirt (2008) |
| `designs/more-shirts.jpg` | More club & org shirts (placeholder) |

---

## `sports/` — Sporty page · per-sport polaroid collages

6 sports, ~4–5 photos each (25 total). Each collage shows photos in a scattered polaroid layout.

| Sport | Files |
|---|---|
| Bike touring | `sports/bike-touring-1.jpg` … `bike-touring-5.jpg` |
| Mountain biking | `sports/mountain-biking-1.jpg` … `mountain-biking-4.jpg` |
| Surfing | `sports/surfing-1.jpg` … `surfing-4.jpg` |
| Ultimate frisbee | `sports/ultimate-frisbee-1.jpg` … `ultimate-frisbee-4.jpg` |
| Touch rugby | `sports/touch-rugby-1.jpg` … `touch-rugby-4.jpg` |
| Rock climbing | `sports/rock-climbing-1.jpg` … `rock-climbing-4.jpg` |

---

## `rugged/` — Rugged page · backpacking trips + foraging

32 slots total. Backpacking has one trip subsection per outing (4 photos each); foraging is a single collage (4 photos).

### Backpacking (7 trips × 4 photos)

| Trip | Files |
|---|---|
| Grayson Highlands with Ilan B. (2017) | `rugged/grayson-highlands-1.jpg` … `-4.jpg` |
| UF OAR Club (2014–2017) | `rugged/uf-oar-1.jpg` … `-4.jpg` |
| Shenandoah NP with Brandon J., Sheets & co (Mar 2019) | `rugged/shenandoah-2019-1.jpg` … `-4.jpg` |
| Alaska with Jamie Lay (May 2018) | `rugged/alaska-2018-1.jpg` … `-4.jpg` |
| Virgin Falls, TN with Ethan K. & Edith P. (2017?) | `rugged/virgin-falls-1.jpg` … `-4.jpg` |
| Black Balsam Knob with Brandon J. (year tbd) | `rugged/black-balsam-1.jpg` … `-4.jpg` |
| Pinnacle Peak, PA with Brandon J., Erica S., Carter M. (Aug 2020?) | `rugged/pinnacle-peak-1.jpg` … `-4.jpg` |

### Foraging (1 collage × 4 photos)

| File | Use |
|---|---|
| `rugged/foraging-1.jpg` … `foraging-4.jpg` | Foraging collage |

---

## `faves/` — Traveler page · "All-time fave trips"

3 placeholder cards at the top of the Traveler section. Each has one cover photo.

| File | Use |
|---|---|
| `faves/fave-1.jpg` | Fave trip 1 cover |
| `faves/fave-2.jpg` | Fave trip 2 cover |
| `faves/fave-3.jpg` | Fave trip 3 cover |

You can add more cards by copying the `<article class="fave-trip">` block in `index.html` and bumping the filename.

---

## `headshot.jpg` — Home page portrait

Single file at the repo root. Square crop recommended (the headshot frame is round).

---

## `bg/` — Per-page background patterns

SVG only, no JPGs. These are pre-made tileable patterns and you generally don't need to touch them.

- `bg/home.svg` — cloud pattern for home
- `bg/science.svg` — scientist page
- `bg/art.svg` — artist page
- `bg/sporty.svg` — sporty page
- `bg/traveler.svg` — traveler page
- `bg/online.svg` — online/content page
- `bg/outdoor.svg` — (unused — placeholder)

---

## `hats/` — Hat-dock icons

SVG only. Already done — one per hat in the dock.

---

## `posts/` — Blog post cover images *(recommended, not yet used)*

If you want to add images inside blog posts (under `_posts/`), drop them in `posts/` and reference them in the Markdown as:

```markdown
![alt text](/posts/2026-05-25-cape-town-rooftop.jpg)
```

Naming convention: `YYYY-MM-DD-short-slug.jpg`, matching the post filename.

---

## Lightbox behavior

Any image inside a `.polaroid` (awards, sports, designs) is clickable to enlarge. Click outside the image or press Esc to close.

To opt in *other* images to the lightbox, add `class="lightbox-img"` to the `<img>` tag.
