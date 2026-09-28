# 🌐 Anshul Kanodia — Personal Developer Portfolio

> **Modern, Interactive Software Engineer Portfolio with Glassmorphism & 3D Tilt**  
> A high-performance personal portfolio website built to present projects, skills, academic achievements, verified certifications, and interactive resumes. Engineered with lightweight vanilla web standards, dynamic particle physics, and glassmorphic card aesthetics.

[![HTML5](https://img.shields.io/badge/Language-HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/Styling-Tailwind_CSS_&_CSS3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/Interactivity-Vanilla_JS-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Live Demo](https://img.shields.io/badge/Demo-anshulkanodia.me-00C7B7?style=flat&logo=vercel&logoColor=white)](https://anshulkanodia.me/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Overview & Small Description

This repository powers **[anshulkanodia.me](https://anshulkanodia.me/)**, the flagship personal web portal for **Anshul Kanodia**.

Built without the weight of heavy JavaScript runtime frameworks, the site emphasizes sub-second First Contentful Paint (FCP), accessibility, and micro-interactions. It features a custom HTML5 canvas particle background, holographic 3D card tilt physics, integrated project modal walkthroughs with downloadable academic reports, an interactive resume sub-page with printable PDF exports, and telemetry powered by Vercel Web Analytics.

---

## ✨ Features

- **Custom Particle Engine**: Lightweight vanilla JavaScript canvas backdrop that dynamically renders, animates, and connects floating particles based on cursor proximity.
- **Glassmorphic UI Design**: Frosted-glass aesthetics crafted with backdrop filters, subtle translucent borders, and dark OLED gradients.
- **Holographic 3D Tilt Effects**: Integrated `vanilla-tilt.js` for mouse-tracking perspective elevation on skill badges and project cards.
- **Integrated Project Showcase Hub**:
  - Detailed project pages for **Cyber Shield**, **Desktop Voice Assistant**, and **Geocraft**.
  - Direct links to embedded academic research PDFs and live GitHub repositories.
- **Interactive Resume Suite (`/resume`)**:
  - Web-native structured resume highlighting education, technical skills, coursework, and honors.
  - One-click direct PDF downloads for official CV and standard technical resumes.
- **Serverless Form Handling**: Integrated Formspree AJAX submission pipeline providing instant feedback without page reloads.
- **Performance Telemetry**: Full instrumentation with Vercel Web Analytics and Speed Insights for Core Web Vitals monitoring.

---

## 📂 File Structure

```text
Anshul-Kanodia-Portfolio/
├── .gitignore                    # Excludes OS thumbnails, editor configs & Vercel caches
├── LICENSE                       # MIT Open Source License
├── README.md                     # Comprehensive project documentation
├── index.html                    # Single-page portfolio application & hero view
├── assets/                       # Core styles, logic, scripts & images
│   ├── main.jpg                  # Profile hero portrait
│   ├── main.js                   # Particle engine, smooth scroll & form handlers
│   ├── resume.md                 # Markdown source text for developer resume
│   ├── style.css                 # Custom glassmorphism, animations & typography
│   └── validate_portfolio.py     # Python script verifying link integrity & assets
├── project/                      # Dedicated project detail pages & report assets
│   ├── project.js                # Project modal controller
│   ├── cyber-shield/
│   │   ├── index.html            # Cyber Shield showcase sub-page
│   │   └── Report.pdf            # Research & system design report
│   ├── desktop-voice-assistant/
│   │   ├── index.html            # Desktop Voice Assistant walkthrough
│   │   └── Report.pdf            # Architecture and implementation report
│   └── geocraft/
│       ├── index.html            # Geocraft project details
│       └── geocraftReport.pdf    # Academic research paper
└── resume/                       # Dedicated resume portal
    ├── index.html                # Interactive resume page
    ├── resume.css                # Print & display styling
    ├── resume.js                 # Resume interactivity & download dispatcher
    ├── Anshul Kanodia CV.pdf     # Complete curriculum vitae
    └── Anshul Kanodia Resume.pdf # Single-page technical resume
```

---

## 🚀 Setup & Deployment

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Lightweight static HTTP server (`live-server`, `http-server`, or Python)

### Local Setup & Testing

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AnshulKanodia/Anshul-Kanodia-Portfolio.git
   cd Anshul-Kanodia-Portfolio
   ```

2. **Run Asset Verification Script**:
   ```bash
   python assets/validate_portfolio.py
   ```

3. **Serve Locally**:
   ```bash
   # Using Python
   python -m http.server 3000
   ```
   Open `http://localhost:3000` in your browser.

### Deployment on Vercel
Deploy to production instantly using the Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```
Or link this repository to [Vercel](https://vercel.com/) for automatic Git-push deployments.

---

## 🛠️ Tech Stack & Language Breakdown

| Layer | Technologies |
|---|---|
| **Structure & Semantics** | HTML5 |
| **Styling & Effects** | CSS3, Tailwind CSS (CDN), Custom Keyframe Animations |
| **Logic & Interactivity** | Vanilla JavaScript (ES6+), Vanilla-Tilt.js |
| **Integrations** | Formspree (AJAX Forms), Vercel Analytics, Google Fonts |
| **Deployment** | Vercel (Edge Network) |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — see the [LICENSE](LICENSE) file for details.
