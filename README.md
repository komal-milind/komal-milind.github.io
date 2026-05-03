# 💍 Komal & Milind — Wedding Invitation Website

A beautiful, fully interactive wedding invitation website inspired by the viral Instagram reel.  
**Theme:** Deep Maroon · Gold · Cream  
**Wedding Date:** 23rd June 2026

---

## 📁 Project Structure

```
wedding-invite/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Interactions, countdown, scratch card
└── README.md
```

---

## ✨ Features

- **Envelope opening animation** — Tap to open the invitation
- **Ganesh Vandana page** — Hindi devta blessings with rotating mandala
- **Hero section** — Couple names with falling petals animation
- **Scratch-to-reveal card** — Interactive canvas scratch card
- **Live countdown** — Real-time days/hours/minutes/seconds to the wedding
- **Program timeline** — Baraat → Varmala → Pheras → Dinner
- **Wedding ceremonies** — Haldi, Mehendi, Sangeet, Pheras cards
- **Venue with map** — Embedded Google Maps + directions button
- **RSVP / Send Message form** — Name, email, attendance, wishes
- **Scroll reveal animations** — Elements fade in as you scroll
- **Fully responsive** — Mobile-first design

---

## 🚀 Deploy to Vercel

### Option 1 — Vercel CLI (Fastest)
```bash
npm install -g vercel
cd wedding-invite
vercel
```
Follow the prompts. Your site will be live at `https://your-project.vercel.app`

### Option 2 — Vercel Dashboard
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Click **Deploy** — done!

---

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `komal-milind-wedding`)
2. Upload all files:
   ```bash
   git init
   git add .
   git commit -m "Wedding invitation website"
   git remote add origin https://github.com/YOUR_USERNAME/komal-milind-wedding.git
   git push -u origin main
   ```
3. Go to your repo → **Settings** → **Pages**
4. Source: `Deploy from a branch` → Branch: `main` → Folder: `/ (root)`
5. Click Save. Site goes live at:  
   `https://YOUR_USERNAME.github.io/komal-milind-wedding`

---

## ✏️ Customisation Guide

### 1. Update Venue
In `index.html`, find the `<section id="venue">` section and replace:
- `YOUR VENUE NAME` → actual venue name
- Address lines → real address
- The Google Maps `iframe src` — replace `q=Jaipur,Rajasthan` with your actual location query
- The `href` on the gold button → update to your venue's Google Maps link

### 2. Add Google Maps Embed (Free)
1. Go to [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)
2. Get a free API key
3. Replace `YOUR_GOOGLE_MAPS_API_KEY` in the iframe src in `index.html`

### 3. Connect RSVP Form to Email (Formspree — Free)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a form, get your form ID (e.g. `xpwzabcd`)
3. In `js/main.js`, replace the `console.log` in `submitRSVP` with:
```js
fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, attend, msg })
});
```

### 4. Add Ceremony Dates
In `index.html`, update the ceremony section cards with actual dates if needed.

### 5. Add Couple Photos
Add a `<img src="assets/couple.jpg" alt="Komal and Milind" class="couple-photo"/>` anywhere you want, and style it in `css/style.css`.

### 6. Change Wedding Date
In `js/main.js` line ~87, update:
```js
var target = new Date('2026-06-23T00:00:00');
```
Change to your actual date and time (ISO format).

---

## 🎨 Colour Customisation

All colours are CSS variables in `css/style.css` at the top:
```css
:root {
  --maroon:      #7B1E2E;
  --gold:        #C9933A;
  --gold-light:  #E8C06A;
  --cream:       #FDF6E3;
  --bg:          #1A0508;
}
```
Change these to match your wedding colours!

---

Made with ❤️ for Komal & Milind's special day — 23 June 2026
