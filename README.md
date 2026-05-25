# van-truong.github.io

Personal site. One click per hat — each hat swaps content + theme. Includes a
self-hosted Jekyll blog and an auto-fetching YouTube widget.

```
.
├── index.html              ← main page (hats: home, scientist, artist,
│                              sporty, outdoorsy, traveler)
├── styles.css              ← base + one theme per hat + blog styles
├── app.js                  ← hat-swap + YouTube/blog auto-fetch
├── blog.html               ← Jekyll-processed blog index
├── _config.yml             ← Jekyll config
├── _layouts/post.html      ← Layout for each blog post
├── _posts/                 ← Blog posts (markdown, dated filenames)
│   └── YYYY-MM-DD-slug.md
├── headshot.jpg
├── hats/                   ← Hat SVGs (swap any file to replace the art)
└── bg/                     ← Per-theme background-pattern SVGs
```

## Writing a blog post

Drop a markdown file in `_posts/` with a dated filename:

```
_posts/2026-06-12-my-second-post.md
```

Frontmatter (everything above the second `---`) is optional except for `title`
and `date`:

```markdown
---
title: "My second post"
subtitle: "Optional one-liner under the title."
date: 2026-06-12
location: Cape Town, South Africa
youtube: dQw4w9WgXcQ        # optional — embeds the video at the top
---

Markdown body goes here. Headers, lists, links, images — all standard.
```

The post will appear at `/blog/2026/06/12/my-second-post/` and on `/blog.html`.

## YouTube auto-fetch (Traveler page)

The Traveler section pulls your latest videos from YouTube's RSS feed via the
free [rss2json](https://rss2json.com) gateway.

**One-time setup:** open `app.js`, find `YT_CHANNEL_ID`, and paste your channel
ID (the string starting with `UC...`). To find it:

1. Visit [youtube.com/account_advanced](https://www.youtube.com/account_advanced)
   while signed in — it's printed there, OR
2. Open your channel page → view source → search for `channelId`.

Until you fill it in, the section shows a friendly fallback linking to your
channel directly.

## Adding or swapping a hat

To **replace** a hat illustration: overwrite the SVG in `hats/`. Keep the
viewBox roughly the same aspect so it lands nicely on the head.

To **add a new hat**:

1. Drop the new SVG in `hats/` (e.g. `hats/nonla.svg`).
2. In `app.js`, append to the `hats` array:
   ```js
   { id: 'heritage', label: 'Heritage', tagline: 'Vietnamese roots',
     asset: 'hats/nonla.svg', alt: 'Nón lá' }
   ```
3. In `index.html`, add a new section with the matching `data-section`.
4. In `styles.css`, add a `body[data-theme="heritage"] { ... }` block.

The dock button, deep link (`#heritage`), and theme swap auto-wire from the
array.

## Local preview

Pure static (no Jekyll):

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

Full Jekyll preview (matches GitHub Pages):

```bash
gem install bundler jekyll
bundle init && bundle add jekyll jekyll-feed jekyll-sitemap
bundle exec jekyll serve
# → http://localhost:4000
```

GitHub Pages rebuilds automatically on every push to `main`.

## Deep links

- `/#scientist`, `/#artist`, `/#sporty`, `/#outdoorsy`, `/#traveler`
- `/blog.html` — blog index
- `/blog/YYYY/MM/DD/slug/` — individual posts
