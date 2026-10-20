#  IEEE GRSS SRM - Official Chapter Website

A modern, responsive, high-performance one-page website created for the **IEEE Geoscience and Remote Sensing Society (GRSS) SRM Student Branch Chapter**.

---

##  Features

- **Hero Section**: Satellite Earth observation theme with animated particle background canvas, live statistics counter (250+ Members, 15+ Events), and quick CTA links.
- **About Us**: Comprehensive overview of IEEE GRSS, SRM Chapter mission, vision, and core technical pillars (Remote Sensing, AI & GIS, Space Systems).
- **Activities & Events (4 Filterable Cards)**:
  - **GeoHack 2025**: AI for Earth Observation & Climate Tech Hackathon.
  - **Satellite Remote Sensing & GIS Workshop**: Hands-on PySTAC & QGIS bootcamp.
  - **Space-Borne Earth Monitoring Webinar**: Guest talk series by NASA & ISRO researchers.
  - **Drone Sensing & Field Acquisition**: Practical field demonstration.
- **Interactive Modal Popup**: Click any event card to view full event details, date, time, location, speaker, and registration modal.
- **Contact & Join Us Section**: Interactive membership application form with domain interest selector, real-time field validation, and toast notifications.
- **Dark & Light Mode Switcher**: Customizable theme toggle with local storage persistence.
- **Fully Mobile Responsive**: Dynamic glassmorphism navigation drawer for all screen sizes.

---

##  Tech Stack

- **Markup & Layout**: HTML5 (Semantic Structure)
- **Styling**: Modern CSS3 (Glassmorphism, HSL Design Tokens, CSS Grid, Flexbox, Animations)
- **Scripting**: Pure JavaScript ES6+ (Canvas Particle Renderer, IntersectionObserver, Modals, Form Validation)
- **Icons & Fonts**: FontAwesome 6, Google Fonts (*Outfit*, *Space Grotesk*, *Inter*)

---

##  Project Structure

```
IEEE GRSS SRM/
├── index.html        # Main one-page HTML5 structure
├── styles.css        # CSS3 Design system, themes, and responsiveness
├── script.js         # Interactive features, theme toggle, modals & canvas
├── assets/           # High-resolution generated satellite & event visuals
│   ├── hero_satellite.png
│   ├── geohack.png
│   ├── gis_workshop.png
│   └── drone_sensing.png
└── README.md         # Documentation & deployment guide
```

---

##  How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/IEEE-GRSS-SRM.git
   cd IEEE-GRSS-SRM
   ```

2. **Open directly in browser**:
   Simply double click `index.html` or run a local HTTP server:
   ```bash
   python -m http.server 8000
   ```
   Navigate to `http://localhost:8000`.

---

##  Deploy to GitHub Pages

1. Push code to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for IEEE GRSS SRM website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/IEEE-GRSS-SRM.git
   git push -u origin main
   ```
2. Go to **Repository Settings** -> **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your deployed link will be live at `https://<your-username>.github.io/IEEE-GRSS-SRM/`.

---

##  Submission Checklist

- [x] **Home Section with Intro & Live Stats**
- [x] **About Us Section**
- [x] **4 Cards for Activities/Events with Modal View**
- [x] **Contact / Join Us Section with Form Validation**
- [x] **GitHub Repository Code**
- [x] **Deployed Link (GitHub Pages / Vercel)**
- [x] **Website Screenshots**
