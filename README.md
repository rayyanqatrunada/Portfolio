# Rayy — Backend Developer Portfolio

Website personal portfolio untuk Backend Developer, dirancang dengan komposisi minimalis, tipografi tegas monokrom, dan performa tinggi menggunakan React, Vite, dan Tailwind CSS v4.

---

## 🛠️ Teknologi & Stack

- **UI Framework**: [React](https://react.dev/) 19 (JavaScript & JSX)
- **Bundler & Dev Server**: [Vite](https://vite.dev/) 8
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 (via plugin resmi `@tailwindcss/vite`)
- **Icons**: [Lucide React](https://lucide.dev/) & Ikon Brand SVG lokal
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 🧭 Struktur Section yang Tersedia

1. **Navbar** (`#home`): Header sticky dengan background `#F0F0F0`, logo `RAYY.DEV`, link navigasi uppercase, dan drawer mobile menu responsif (teruji keyboard accessible & tombol Escape).
2. **Hero** (`#home`): Layout dua kolom di desktop dengan sapaan, headline, pill badge peran, deskripsi ringkas, tombol aksi, serta frame visual arsitektural minimalis beraksen garis offset.
3. **Services** (`#services`): Bagian "What I Do" menampilkan 3 kartu backend (*Backend Development*, *API Development*, *Database Design*) dengan ikon teknis dan visual surface `#D6D6D6`.
4. **About** (`#about`): Layout dua kolom dengan frame visual di kiri serta biografi profesional dan 3 checklist fokus kompetensi di kanan.
5. **Technical Skills** (`#skills`): Grid responsif 4 kolom yang mengelompokkan keterampilan ke dalam *Backend Development*, *Database & Storage*, *Frontend Basics*, dan *Tools & Workflow* tanpa progress bar atau rating semu.
6. **Featured Projects** (`#projects`): Grid responsif 2 kolom yang menampilkan 4 proyek nyata (*Compify*, *TSM Department Portal*, *PMart*, dan *RESTful Inventory & Order Service*) dengan skematik SVG beresolusi tinggi, tag teknologi monokrom, dan status tautan jujur.
7. **Contact & CTA** (`#contact`): Banner ajakan kolaborasi berlatar abu-abu `#F0F0F0` diikuti kanal kontak langsung (*Direct Email*, *GitHub*, *LinkedIn*) dengan validasi pencegah tautan placeholder aktif.
8. **Footer**: Penutup halaman dengan identitas brand, navigasi ringkas, copyright dinamis, dan tautan sosial terverifikasi.

---

## 📁 Struktur Direktori

```text
portfolio/
├── public/                 # Favicon brand monokrom (favicon.svg)
├── src/
│   ├── assets/
│   │   └── projects/       # Aset ilustrasi skematik teknis proyek (SVG)
│   ├── components/         # Komponen reusable (Container, SectionHeading, Button, ProjectCard, SocialIcons)
│   ├── data/
│   │   ├── portfolioData.js # Sumber data terpusat (profil, bio, navbar, CTA, kontak)
│   │   ├── projects.js      # Data proyek featured (judul, deskripsi, teknologi, link)
│   │   └── skills.js        # Data kategori keterampilan teknis
│   ├── sections/           # Modul section halaman (Hero, Services, About, Skills, Projects, Contact, Footer)
│   ├── App.jsx             # Komposisi halaman utama
│   ├── index.css           # Global stylesheet & token tema Tailwind v4 (@theme)
│   └── main.jsx            # Entry point aplikasi React
├── index.html              # Shell HTML, metadata SEO, Open Graph & preconnect fonts
├── package.json            # Daftar dependencies & scripts
├── vite.config.js          # Konfigurasi Vite & plugin Tailwind v4
└── README.md               # Dokumentasi project
```

---

## 📋 Prasyarat

- **Node.js**: Versi `18.0.0` atau yang lebih baru.
- **npm**: Versi `9.0.0` atau yang lebih baru.

---

## 🚀 Perintah Development

1. **Instalasi Dependencies**
   ```bash
   npm install
   ```

2. **Menjalankan Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan secara lokal di `http://localhost:5173/`.

3. **Memeriksa Kode (Linting)**
   ```bash
   npm run lint
   ```

4. **Membuat Production Build**
   ```bash
   npm run build
   ```
   Hasil build yang dioptimalkan akan tersimpan di direktori `dist/`.

5. **Pratinjau Hasil Build Lokal**
   ```bash
   npm run preview
   ```

---

## ⚙️ Panduan Pengisian Data Profil & Proyek

Semua data telah dipisahkan secara terpusat agar mudah disesuaikan tanpa menyentuh kode UI:

1. **Data Profil & Kontak**: Edit file [`src/data/portfolioData.js`](src/data/portfolioData.js)
   - `name`: Nama asli Anda.
   - `logoText`: Teks logo navbar (misal: `RAYY.DEV`).
   - `email`: Alamat email aktif (mengaktifkan tombol kontak `mailto:`).
   - `githubUrl`: URL profil GitHub asli Anda.
   - `linkedinUrl`: URL profil LinkedIn asli Anda.

2. **Data Proyek**: Edit file [`src/data/projects.js`](src/data/projects.js)
   - `liveUrl`: Masukkan URL live demo jika proyek sudah aktif.
   - `repoUrl`: Masukkan URL repository GitHub jika sudah bersifat publik.
   - *Catatan*: Jika `liveUrl` atau `repoUrl` bernilai `null`, sistem secara otomatis menampilkan label status yang jujur (*In Active Development*, *Internal Project*) tanpa membuat link palsu atau tombol rusak `href="#"`.

---

## 🌐 Panduan Deployment ke Vercel (Hobby / Free)

Website ini adalah Single-Page Application (SPA) berbasis Vite statis dengan navigasi section anchor sehingga **tidak memerlukan konfigurasi `vercel.json` tambahan**.

### Langkah 1: Hubungkan ke GitHub
1. Buat repository baru di [GitHub](https://github.com/new) (misal: `portfolio`).
2. Jalankan perintah berikut di terminal lokal Anda:
   ```bash
   git remote add origin https://github.com/<USERNAME-ANDA>/<NAMA-REPO>.git
   git branch -M main
   git push -u origin main
   ```

### Langkah 2: Deploy di Vercel
1. Buka dan masuk ke [Vercel Dashboard](https://vercel.com/dashboard).
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pilih repository GitHub portfolio Anda yang telah di-push.
4. Pada halaman konfigurasi project (*Configure Project*), pastikan pengaturan berikut terisi secara otomatis:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Klik **"Deploy"**.
6. Tunggu proses build selesai (~1 menit), kemudian Vercel akan memberikan domain publik `https://<nama-project>.vercel.app`.
