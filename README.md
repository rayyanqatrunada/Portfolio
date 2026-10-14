# Portfolio - Backend Developer

Website personal portfolio untuk Backend Developer, dirancang dengan komposisi minimalis, clean typography, dan performa tinggi menggunakan React, Vite, dan Tailwind CSS.

## 🛠️ Teknologi & Stack

- **Framework**: [React](https://react.dev/) (v19)
- **Build Tool / Bundler**: [Vite](https://vite.dev/) (v8)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4 via `@tailwindcss/vite`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: Oxlint

## 📁 Struktur Direktori

```text
portfolio/
├── public/                 # File publik statis (favicon, icons)
├── src/
│   ├── assets/             # Aset gambar & ilustrasi lokal
│   ├── components/         # Komponen UI reusable (Button, SectionHeading, dll.)
│   ├── data/               # Konten & konfigurasi data terpusat (portfolioData.js)
│   ├── sections/           # Bagian halaman (Navbar, Hero, Services, About, Projects, dll.)
│   ├── App.jsx             # Komposisi halaman utama
│   ├── index.css           # Global CSS & konfigurasi tema Tailwind
│   └── main.jsx            # Entry point aplikasi React
├── index.html              # HTML shell & metadata SEO dasar
├── package.json            # Daftar script & dependencies
└── vite.config.js          # Konfigurasi bundler Vite
```

## 🚀 Perintah Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

3. **Build untuk Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

5. **Linting**
   ```bash
   npm run lint
   ```
