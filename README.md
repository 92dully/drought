# DROUGHT

The official website for **DROUGHT**, a specialty cold beverage bar at 2 Coplaw Street, Glasgow.

Live brand identity, full menu, specials, and visit info — built as a lightweight static site with no build step and no dependencies to install.

## Tech stack

Vanilla HTML, CSS, and JavaScript. No framework, no bundler, no npm install.

- `index.html` — page structure and content
- `style.css` — all styling, including design tokens (colours, type, spacing) at the top of the file
- `data.js` — every editable fact: address, hours, Instagram, menu, prices, specials, customisation options
- `main.js` — renders the data into the page and handles nav, accordion menu, and scroll animations
- `logo.png` — official DROUGHT logo

Google Fonts (Oswald + Barlow Condensed) are loaded via CDN link in `index.html`; everything else is self-contained.

## Running locally

No build step. Either:

- Open `index.html` directly in a browser, or
- Serve the folder so relative paths resolve cleanly, e.g.:
  ```bash
  npx serve .
  # or
  python3 -m http.server 8000
  ```

## Editing content

Almost everything you'd want to change day-to-day — prices, flavours, opening hours, address, Instagram handle, specials — lives in **`data.js`**. Edit values there; the page updates automatically, no HTML editing required.

Colours, fonts, and spacing are controlled by CSS custom properties at the top of **`style.css`** under `:root`.

To swap the logo, replace `logo.png` with a new file of the same name (or update the three `<img src="logo.png">` references in `index.html` if you rename it).

## Deployment

Static site, deployable anywhere. Configured for [Vercel](https://vercel.com):

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. No framework preset, no build command, no output directory override needed — Vercel will serve the files as-is.

## Outstanding items

A few details are still pending from the business and are marked accordingly in the code:

- Phone number and email (not yet provided)
- Official allergen/ingredient information (site currently says "ask in store")
- Product photography (hero and menu are typography/graphic-led until real images are supplied)

## Credits

Built by [92dully](https://github.com/92DULLY).
