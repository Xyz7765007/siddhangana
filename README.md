# Siddhangana Bhagat · The Grimoire

An interactive portfolio. A dark Victorian library you walk down, a glowing door,
a rotating grimoire that opens into a paginated book of the CV, plus a "rift" fast
route that gives the whole picture in about two minutes.

Single HTML file. No build step, no dependencies, no framework.

---

## Deploy to Vercel

### Option A · GitHub, then Vercel (recommended)

1. Create a new **empty** repository on GitHub. Suggested name: `siddhangana-grimoire`.
   Do not tick "Add a README", the repo must start empty.
2. Unzip this package, then from inside the unzipped folder:

   ```bash
   git init
   git add .
   git commit -m "The Grimoire"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/siddhangana-grimoire.git
   git push -u origin main
   ```

   No terminal? On the repo page use **Add file → Upload files**, drag in every file
   from the unzipped folder (including the dot file `.gitignore`), then Commit.
3. Go to vercel.com → **Add New → Project** → Import the repository.
4. Framework Preset: **Other**. Leave Build Command and Output Directory empty.
   Root Directory: `./`
5. Deploy. It takes about twenty seconds because nothing is compiled.

### Option B · No GitHub

Drag the unzipped folder onto vercel.com/new, or run `npx vercel --prod` inside it.

---

## After the first deploy: set the domain

Vercel gives you a URL such as `https://siddhangana-grimoire.vercel.app`.
If yours differs, find and replace the placeholder domain in three files so the
link previews and search listings point at the right place:

- `index.html` (canonical, `og:url`, `og:image`, `twitter:image`)
- `robots.txt`
- `sitemap.xml`

Replace every occurrence of `https://siddhangana-grimoire.vercel.app` with your real URL.
Commit, push, and Vercel redeploys on its own.

To use a custom domain, add it under Project → Settings → Domains, then do the same
find and replace with the custom domain.

---

## Files

| File | What it is |
|---|---|
| `index.html` | The entire site. Markup, styles, artwork and logic in one file. |
| `og.png` | 1200x630 social card used by LinkedIn, WhatsApp, Slack, X. |
| `favicon.svg` | Browser tab mark. |
| `icon-180.png` | Home screen icon when saved to an iPhone or iPad. |
| `vercel.json` | Static hosting config and security headers. |
| `robots.txt`, `sitemap.xml` | Search engine basics. |
| `.gitignore` | Keeps `.vercel`, `.DS_Store` and friends out of the repo. |

---

## Editing the content

Everything lives in the `<script>` block near the bottom of `index.html`.
Search for these names:

| Name | Controls |
|---|---|
| `PROFILE` | Name, headline, email, LinkedIn, site, phone, city. |
| `EXPERIENCE` | Roles in the Chronicles chapter and in the printable CV. |
| `SKILLS` | The Grimoire chapter. |
| `EDUCATION` | The Provenance chapter. |
| `SIGILS` | The five hidden moths and the line each one reveals. |
| `CHAPTERS` | Chapter titles, blurbs and page content, including the sealed chapter. |
| `TRIAD`, `LEVERS`, `RIBBON`, `STARS` | The rift stations: overlap rings, psychology levers, timeline, tool cloud. |
| `buildManuscript()` | The clean CV used by Save PDF and by browser printing. |

Pagination is automatic. Add or remove blocks and the book re-flows on its own,
and re-flows again whenever the window is resized.

---

## Notes

- Typography loads from Google Fonts (Cinzel, Cormorant Garamond, Pinyon Script).
  Everything else is drawn in CSS and inline SVG, so there are no image dependencies.
- Ambient sound starts when a visitor clicks **Enter the library** or **Take the rift**,
  because browsers refuse to play audio before a gesture. There is a Sound toggle in
  the hall HUD and in the rift bar.
- Save PDF opens a clean light manuscript view, and the print stylesheet targets it,
  so browser print and iOS Share → Print both produce a tidy CV.
- Honours `prefers-reduced-motion`, and sheds visual detail automatically if the first
  couple of seconds of walking run below roughly 38fps.

---

© Siddhangana Bhagat. All rights reserved. Content and design are not licensed for reuse.
