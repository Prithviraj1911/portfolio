# Prithviraj Lahare: technical writing portfolio

A static portfolio site (plain HTML, CSS, and JavaScript, with no build step), ready for GitHub Pages.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home page: intro, about, AI research, documentation library, experience, skills, contact |
| `docs/` | Full research write-up and guides, in a reading layout with table of contents |
| `css/styles.css` | All styles, with light and dark modes |
| `js/main.js` | Mobile menu, active-section highlighting, video and résumé fallbacks |
| `assets/` | Avatar, intro video, résumé PDF |
| `private/` | Internal source notes. **Git-ignored; never published.** |

## Before you publish: checklist

- [ ] **Permission:** Publish only material you're authorized to share. Keep internal or confidential work out of this repository.
- [ ] **Résumé:** Add `assets/Prithviraj-Lahare-Resume.pdf`. Until it exists, the download buttons hide themselves. Leave your phone number off the public copy.
- [ ] **Photo:** Replace `assets/avatar.svg` with a square photo (for example `assets/avatar.jpg`, 600×600 or larger) and update the `src` in `index.html`.
- [ ] **Intro video:** Add `assets/intro.mp4` (under about 25 MB) and `assets/intro-poster.jpg`, or swap in a YouTube embed (instructions are in the comment in `index.html`). Until then, a "coming soon" card shows.
- [ ] **Confirm the facts** on the page, especially the Calsoft bullet about the Paligo/Claude migration work.

## Preview locally

```powershell
cd C:\prithviraj-portfolio
python -m http.server 8000
```

Then open http://localhost:8000. (Opening `index.html` directly works too, but the video and résumé checks need a server.)

## Publish on GitHub Pages

1. Create a **public** repository on GitHub, for example `prithviraj-portfolio`. A repository named `<your-username>.github.io` gives the shortest URL.
2. Push this folder:
   ```powershell
   git remote add origin https://github.com/Prithviraj1911/portfolio.git
   git push -u origin main
   ```
3. In the repository, open **Settings > Pages**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. After a minute or two, the site is live at https://prithviraj1911.github.io/portfolio/. Put that link on your résumé.

## Updating

Edit the HTML directly. Each section in `index.html` is marked with a comment banner. To add a documentation sample, create a page under `docs/` and link to it from `index.html`.
