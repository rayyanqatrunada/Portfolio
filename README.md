# RAYY.DEV — Backend Developer Portfolio

A sleek, high-contrast, minimalist personal portfolio engineered to showcase backend development competencies, database architecture, and RESTful API design.

Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Lucide React**, following a strictly data-driven architecture and a modern monochrome design system.

---

## 📌 Project Overview

**RAYY.DEV** is the personal portfolio of **Rayyan Qatrunada (Rayy)**, a backend developer specializing in PHP, Laravel, relational database modeling (MySQL/3NF), and RESTful API architecture.

Unlike generic developer showcases, this portfolio highlights engineering depth rather than superficial UI flair:
- **Architecture & System Design**: Dedicated modal deep-dives highlighting database schemas, query optimization, and architectural decisions.
- **Honest & Verifiable Data**: Zero fake metrics, no broken dead links (`href="#"`), and no placeholder credentials.
- **Strict Monochrome Aesthetics**: High-contrast, clean typography, dark surfaces, and responsive layouts designed for clarity and legibility.

---

## ✨ Features

- **Interactive Terminal Hero (`HeroTerminal`)**:
  - Client-side static terminal simulation demonstrating shell profiles (`profile.sh`), normalized database schemas (`schema.sql`), and RESTful JSON responses (`api.json`).
  - Supports keyboard navigation (`Enter`, `Space`), tab switching, and one-click code copying with visual feedback.
- **Engineering Deep-Dive Modals (`ProjectDetailModal`)**:
  - Accessible technical breakdowns for featured projects (Compify, TSM Portal, PMart, Inventory & Order Service).
  - 5 structured inspection tabs per project: **Overview**, **Architecture**, **Relational Schema (3NF)**, **Technical Decisions**, and **Backend Features**.
- **Competency-Driven Skills Organization**:
  - Skills structured by actual backend competency rather than arbitrary progress percentages: *Backend Development*, *Database & Storage*, *API Development & Testing*, *Tools & Workflow*, and *Frontend Fundamentals*.
  - **Currently Exploring**: Dedicated research tracker displaying ongoing explorations (e.g., Laravel Sanctum/JWT, Webhook architectures).
- **Accessible & Reliable Copy Email**:
  - Interactive email copy button using the Clipboard API with legacy `execCommand` fallback.
  - Screen-reader friendly with `aria-live="polite"` feedback announcements.
- **Honest Asset & Link Management**:
  - Conditional CV handling displaying an honest *"Awaiting File"* badge instead of a dead 404 download link.
  - LinkedIn profile labeled as *"Available Upon Request"* pending public URL configuration.
- **Comprehensive Viewport Responsiveness**:
  - Tested across screens from 320px mobile to 1440px desktop with zero unintended horizontal overflow.
  - Accessible keyboard focus rings (`focus-visible`) and WCAG AAA contrast compliance.

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [React](https://react.dev/) | `^19.2.8` | Core UI component hierarchy |
| **Tooling & Bundler** | [Vite](https://vite.dev/) | `^8.3.0` | Ultra-fast HMR and production bundling |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^4.3.3` | Utility-first styling via `@tailwindcss/vite` |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.57.0` | High-consistency SVG interface icons |
| **Linter** | [Oxlint](https://oxc.rs/) | `^1.81.0` | High-performance Rust-based static code analysis |

---

## 📁 Project Structure

```text
Portfolio/
├── public/
│   ├── favicon.svg             # Minimalist monochrome brand favicon
│   └── resume.pdf              # (Optional) Place CV PDF here to enable download
├── src/
│   ├── assets/
│   │   └── projects/           # Technical vector schematic illustrations (SVG)
│   ├── components/
│   │   ├── Button.jsx          # Reusable styled button component
│   │   ├── Container.jsx       # Standard max-width layout wrapper
│   │   ├── CopyEmailButton.jsx # Accessible clipboard interaction with live feedback
│   │   ├── Footer.jsx          # Semantic footer with social links & copyright
│   │   ├── HeroTerminal.jsx    # Interactive 3-tab static terminal simulation
│   │   ├── Navbar.jsx          # Sticky header with mobile drawer navigation
│   │   ├── ProjectCard.jsx     # Card component with deep-dive modal trigger
│   │   ├── ProjectDetailModal.jsx # 5-tab architectural deep-dive dialog
│   │   └── SectionHeading.jsx  # Consistent section title & subtitle presenter
│   ├── data/
│   │   ├── portfolioData.js    # Centralized developer identity, contact & metadata
│   │   ├── projectDetails.js   # In-depth architectural & schema data for modals
│   │   ├── projects.js         # Featured projects list & repository links
│   │   └── skills.js           # Skills categorized by technical competency
│   ├── sections/
│   │   ├── About.jsx           # Developer bio and architectural principles
│   │   ├── Contact.jsx         # Contact banner with direct communication channels
│   │   ├── Hero.jsx            # Headline, elevator pitch, and terminal preview
│   │   ├── Projects.jsx        # Project gallery grid
│   │   ├── Services.jsx        # Core backend offerings breakdown
│   │   └── Skills.jsx          # Grouped technical competencies & ongoing research
│   ├── App.jsx                 # Main application page layout
│   ├── index.css               # Tailwind v4 `@theme` configuration & global styles
│   └── main.jsx                # React DOM root entry point
├── index.html                  # HTML entry with Open Graph & SEO meta tags
├── package.json                # Project dependencies, metadata, and run scripts
├── vite.config.js              # Vite configuration with React & Tailwind plugins
└── README.md                   # Project documentation
```

---

## 📥 Installation

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **npm**: `v9.0.0` or higher

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rayyanqatrunada/Portfolio.git
   cd Portfolio
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

---

## ⚡ Development Commands

All available scripts are defined in `package.json`:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the local Vite development server with Hot Module Replacement (HMR) at `http://localhost:5173/`. |
| `npm run lint` | Runs [Oxlint](https://oxc.rs/) to inspect all JavaScript/JSX files for bugs, anti-patterns, and unused code. |
| `npm run build` | Compiles and optimizes assets into the production-ready `dist/` directory. |
| `npm run preview` | Starts a local HTTP server to preview the production build output from `dist/`. |

---

## 🏗️ Production Build

To generate an optimized client production bundle:

```bash
npm run build
```

The output will be placed in `dist/`:
- **`dist/index.html`**: Minified HTML document containing preconnect links and SEO metadata.
- **`dist/assets/*.css`**: Purged, vendor-prefixed, and minified CSS (~35 kB, ~6.8 kB gzip).
- **`dist/assets/*.js`**: Code-split, tree-shaken JavaScript bundle (~305 kB, ~91 kB gzip).
- **`dist/assets/*.svg`**: Vector project schematic assets.

You can verify the production bundle locally prior to deployment by running:
```bash
npm run preview
```

---

## ⚙️ Configuration & Customization

The codebase follows a strictly data-driven design. Update content without modifying UI component templates:

1. **Profile, Bio & Contact Details**:
   - Edit [`src/data/portfolioData.js`](src/data/portfolioData.js) to configure your name, bio, email address, GitHub URL, and LinkedIn URL.
2. **Project Summaries & Repositories**:
   - Edit [`src/data/projects.js`](src/data/projects.js) to manage project titles, taglines, tech badges, and live demo/repo links.
3. **Engineering Deep-Dive Specifications**:
   - Edit [`src/data/projectDetails.js`](src/data/projectDetails.js) to customize the 5-tab technical breakdowns, database schemas (DDL), architecture patterns, and decision logs.
4. **Skills & Research Tracker**:
   - Edit [`src/data/skills.js`](src/data/skills.js) to update technical categories or add items to the *Currently Exploring* section.
5. **Resume / CV Integration**:
   - Place a PDF named `resume.pdf` inside the `public/` directory and update `resumeUrl` in [`src/data/portfolioData.js`](src/data/portfolioData.js) to enable the download button.

---

## 🌐 Deployment

As a client-rendered Single-Page Application (SPA), **RAYY.DEV** can be hosted on any modern static hosting provider.

### Vercel
1. Push your repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. The Vite build presets will be detected automatically:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

### Netlify
1. Connect your GitHub repository on [Netlify](https://app.netlify.com/).
2. Set the build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Click **Deploy Site**.

---

## 📄 License & Terms

This repository contains the personal portfolio and project showcase of **Rayyan Qatrunada**.

The source code is made publicly available for code review, inspection, and demonstration purposes. All rights to personal branding, written bio content, and project schematics are reserved by the author.
