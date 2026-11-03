# Eu Que Me Vejo

Between-sessions journal PWA inspired by Acceptance and Commitment Therapy (ACT), made for Socorro Silveira, Psicóloga Clínica. Plain HTML/CSS/JS, no build step, installable on iOS and Android.

## Features

- Step-by-step entry: what happened, emotions and intensity, what I struggled with, thoughts, values, committed action, intensity afterwards
- History grouped by day, with period and value filters, edit and delete
- Patterns: entries per week, intensity before/after, time of day, frequent emotions and values
- Branded PDF report (download or share), e-mail and copy
- Guided one-minute breathing pause
- Daily reminder as a calendar event (.ics)
- Psychologist profile: bio, approaches, press, gallery, contacts
- Light and dark themes (follows the system)

Entries are stored only in the browser on the device (`localStorage`). Nothing is sent to a server.

## Structure

- `index.html`: page shell, meta tags, icons and iOS splash screens
- `app.css`: styles and color tokens
- `app.js`: the whole app; psychologist data lives in the `PRO` object at the top
- `sw.js`: service worker (network first, cache fallback)
- `manifest.json`, `icons/`, `apple-touch-icon.png`, `favicon.ico`: install icons
- `photos/`, `splash/`, `logo.png`, `logo-light.png`: images

## Running locally

Serve the folder with any static server (for example `npx serve .`) and open it in the browser. Icons, the PDF logo and installation need it to be served over http(s). Opening `index.html` as a file is not enough.

## Deploy

Live at https://euquemevejo.vercel.app (Vercel, connected to this repository: every push to `main` deploys).
