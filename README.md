# Curu Games Website v6

Dark/light, mobile-first static website for `https://games.thecurushop.com`.

## Main changes in v6
- Hero highlights **500+ games available in the app**.
- Updated copy: **Turn points into 3D prints** and **Games are just the starting point**.
- Redesigned live points/minute metric for better readability.
- Replaced generic 3D-print imagery with The Curu Shop's supplied photos/posts and videos.
- Added an `@thecurushop` social/reels showcase.
- Added direct Call, WhatsApp, Email, The Curu Shop, and Instagram actions.
- Redesigned the “See how it works” hero CTA.

## Publish
Upload the **contents of this folder** to the web root for `games.thecurushop.com`.
Keep these files at the root:
- `index.html`
- `styles.css`
- `app.js`
- `CNAME`
- `.nojekyll`
- `app-ads.txt`
- `robots.txt`
- `sitemap.xml`

Upload the complete `assets/` directory, including `assets/media/`.

## Live Curu data
The site reads these public endpoints from `https://thecurushop.com`:
- `/api/games/config`
- `/api/games/pro/showcase`

The Curu Shop backend must allow CORS for the Curu Games subdomain on these public read-only endpoints.

## Google Play
All install CTAs point to:
`https://play.google.com/store/apps/details?id=com.thecurushop.curugames`

The official Google Play badge is loaded from Google's public badge URL.

## Contact links used on the site
- Website: `https://thecurushop.com`
- Instagram: `https://www.instagram.com/thecurushop/`
- Phone: `+91 81692 36824`
- WhatsApp: `+91 81692 36824`
- Email: `thecurushop@gmail.com`

## Media
The 3D-print photos/posts and videos in `assets/media/` were supplied by The Curu Shop for this website. Videos are optimized for web delivery and use local poster images with `preload="none"` so the mobile homepage does not download every reel at once.

## SEO
The package includes canonical URLs, page-specific titles/descriptions, internal links, structured data, `robots.txt`, and `sitemap.xml`.


## v7 media interaction update
- Real print post rotator changes every 3 seconds.
- Custom reel playback: hover preview on desktop, click/tap playback with Stop and Sound controls.
- See GITHUB-PAGES-DEPLOY.md for deployment.
