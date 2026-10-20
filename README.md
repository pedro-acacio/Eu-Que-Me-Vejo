# Eu Que Me Vejo

Personal website / PWA for Socorro Silveira — a single page in plain HTML/CSS/JS, installable as an app (manifest, icons and iOS splash screens included).

## How to view

Open `index.html` in your browser — no installation or server required. It can also be "installed" from the browser (Add to Home Screen) thanks to `manifest.json`.

## Structure

- `index.html` — all of the page's content, styles and scripts
- `manifest.json` — PWA configuration (name, icons, colors)
- `icons/`, `photos/`, `splash/` — images used on the page and on the iOS launch screens

## External dependencies

The page loads a font from Google Fonts and the [jsPDF](https://github.com/parallax/jsPDF) library via CDN — an internet connection is required for these resources to load.

## Running locally

Just open `index.html` directly in the browser or serve the folder with any static server (e.g. `npx serve .`).
