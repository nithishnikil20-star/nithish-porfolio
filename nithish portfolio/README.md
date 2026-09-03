# Cinematic Portfolio - Video Editor & Filmmaker

A personal, cinematic portfolio website engineered for **Nithishkumar B** (Video Editor & Filmmaker). Built with pure HTML5, CSS3, and modern Vanilla JavaScript with zero external build dependencies.

---

## Quick Start

Simply double-click `index.html` or open it in any modern browser (Google Chrome, Brave, Safari, Firefox, Edge).

To run locally with a lightweight development server:
```bash
# Using Python
python -m http.server 8000
# Then visit: http://localhost:8000
```

---

## File Structure

```
├── index.html                   # Core semantic HTML structure with marked placeholders
├── css/
│   ├── style.css                # Dark cinematic design, typography, modal, animations
│   └── responsive.css           # Breakpoints for desktop, tablet, and mobile
├── js/
│   └── main.js                  # Filtering, video lightbox modal, mobile navigation, form
└── assets/
    └── images/                  # High-quality cinematic SVG placeholders
        ├── profile-placeholder.svg
        ├── showreel-cover.svg
        ├── project-shortfilm.svg
        ├── project-shortfilm2.svg
        ├── project-reel1.svg
        ├── project-reel2.svg
        ├── project-youtube.svg
        ├── project-ad.svg
        ├── project-ad2.svg
        ├── project-cinematic.svg
        └── project-motion.svg
```

---

## How to Customize Content

Every placeholder in `index.html` is accompanied by a comment starting with `<!-- PLACEHOLDER: ... -->`.

### 1. Showreel Video
In `index.html` under section `#showreel`:
- Replace `assets/images/showreel-cover.svg` with your custom high-resolution video still thumbnail.
- In `js/main.js` inside the `showreelTrigger` click listener, paste your YouTube or Vimeo embed URL into `videoEmbed`:
  ```javascript
  videoEmbed: "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
  ```

### 2. Selected Works / Projects
Inside each `<article class="project-card">` in `index.html`:
- **Thumbnail**: Change `<img src="assets/images/YOUR_IMAGE.jpg">`
- **Video Embed**: Set `data-video-embed="https://www.youtube.com/embed/YOUR_ID?autoplay=1"` or Vimeo URL. When set, clicking "WATCH PROJECT" immediately plays the video in the cinema modal!
- **External Link**: Set `data-video-url="https://vimeo.com/..."` to allow opening the project on Vimeo/YouTube in a new tab.

### 3. Profile Image & Bio
- In section `#about`, replace `assets/images/profile-placeholder.svg` with your headshot or portrait.
- Edit the paragraphs inside `<div class="about-narrative">` with your personal filmmaking narrative.

### 4. Contact Details & Social Handles
In section `#contact` and `<footer>`:
- Update `mailto:your-email@domain.com` with your real email.
- Update links to your Instagram (`instagram.com/yourhandle`), LinkedIn, and YouTube channel.

### 5. Contact Form Backend
The contact form in `index.html` is pre-configured with interactive client-side confirmation. To receive emails directly to your inbox without a backend server, you can attach [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com):
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## Features
- **Cinematic Dark Palette**: Tailored film-industry aesthetics with letterbox ratios, subtle film grain overlay, and timecode telemetry.
- **Interactive Lightbox Modal**: Plays YouTube/Vimeo embeds or displays sleek project cards with keyboard `ESC` and click-outside dismissal.
- **Category Filter**: Instant filtering between Short Films, Reels, YouTube Videos, Advertisements, Cinematic Edits, and Motion Graphics.
- **9:16 Vertical Reel Layout**: Specially formatted cards for TikTok/Instagram vertical video reels.
- **Zero Dependencies**: Pure HTML5, CSS3, ES6+ JavaScript. Fast load times, SEO-optimized semantic markup.
