/**
 * Engineering Deep-Dive Technical Specifications
 * Contains verified architectural details, database schemas, problem statements,
 * technical decisions, and verifiable implementation notes for RAYY.DEV portfolio projects.
 */

export const projectDetailsData = {
  compify: {
    id: 'compify',
    title: 'Compify — Computer Hardware Store',
    category: 'E-Commerce Platform',
    role: 'Backend Developer',
    status: 'In Active Development',
    repoUrl: 'https://github.com/rayyanqatrunada/Compify',
    liveUrl: null,
    overview:
      'Sistem e-commerce berbasis web yang dirancang khusus untuk katalog spesifikasi dan transaksi komponen perangkat keras komputer (CPU, GPU, Motherboard, RAM, Storage, PSU). Berfokus pada pemodelan relasi produk bertingkat, keranjang belanja reaktif, dan pengelolaan stok inventaris barang.',
    problemStatement:
      'Komponen komputer memiliki spesifikasi teknis dan kompatibilitas yang kompleks. Platform e-commerce umum sering kali mencampurkan kategori tanpa atribut hardware yang spesifik, menyulitkan konsumen dalam menyaring barang berdasarkan merek, soket, dan ketersediaan stok riil. Diperlukan platform terstruktur dengan relasi data terstandarisasi dan filter responsif.',
    contribution:
      'Merancang skema relasi database MySQL, mengimplementasikan logika reaktif katalog dan keranjang belanja menggunakan Laravel Livewire, serta membangun panel manajemen stok barang.',
    verifiedStack: [
      { name: 'PHP 8.x', category: 'Language' },
      { name: 'Laravel Framework', category: 'Backend MVC' },
      { name: 'Laravel Livewire', category: 'Reactive UI' },
      { name: 'MySQL', category: 'Relational DB' },
      { name: 'Tailwind CSS & Blade', category: 'Styling & Views' },
    ],
    architecture: {
      pattern: 'Model-View-Controller (MVC) + Server-Driven Reactivity',
      description:
        'Aplikasi memanfaatkan arsitektur monolitik modern Laravel. Interaktivitas dinamis ditangani oleh Laravel Livewire di sisi server melalui sinkronisasi state asinkron tanpa memerlukan framework frontend terpisah, menjaga footprint bundle tetap minimal.',
      highlights: [
        'Pemisahan routing yang tegas antara area katalog publik pelanggan dan area manajemen admin.',
        'State keranjang dan filter produk dikelola melalui Livewire component lifecycle tanpa reload halaman penuh.',
        'ORM Eloquent dengan optimalisasi eager loading (`with([category, brand])`) untuk mengeliminasi potensi query N+1 pada listing produk.',
      ],
    },
    database: {
      description:
        'Skema relasional ternormalisasi (3NF) untuk menjamin integritas relasi kategori, produsen hardware, dan pencatatan transaksi pesanan.',
      entities: [
        {
          name: 'categories',
          description: 'Kategori spesifik komponen (misal: Processor, GPU, Motherboard, RAM).',
          fields: ['id (PK, BigInt)', 'name (Varchar)', 'slug (Unique)', 'timestamps'],
          relations: '1 : N ke products',
        },
        {
          name: 'brands',
          description: 'Produsen/pabrikan hardware (misal: Intel, AMD, ASUS, MSI, Corsair).',
          fields: ['id (PK, BigInt)', 'name (Varchar)', 'slug (Unique)', 'timestamps'],
          relations: '1 : N ke products',
        },
        {
          name: 'products',
          description: 'Katalog inti komponen komputer dengan harga, ketersediaan stok, dan spesifikasi.',
          fields: ['id (PK, BigInt)', 'category_id (FK)', 'brand_id (FK)', 'name', 'slug', 'price (Decimal)', 'stock (Int)', 'description'],
          relations: 'Belongs to category & brand; 1 : N ke cart_items & order_items',
        },
        {
          name: 'cart_items',
          description: 'Penyimpanan keranjang belanja pelanggan dengan pelacakan kuantitas.',
          fields: ['id (PK, BigInt)', 'user_id (FK, Nullable)', 'session_id (Varchar, Nullable)', 'product_id (FK)', 'quantity (Int)'],
          relations: 'Belongs to product & user',
        },
        {
          name: 'orders & order_items',
          description: 'Pencatatan faktur pemesanan dan snapshot harga saat transaksi dieksekusi.',
          fields: ['id (PK, BigInt)', 'order_number (Unique)', 'user_id (FK)', 'total_amount', 'status', 'created_at'],
          relations: 'Belongs to user; 1 : N ke order_items',
        },
      ],
    },
    challenges: [
      {
        challenge: 'Pencegahan Balapan Stok (Stock Race Condition)',
        solution:
          'Menerapkan validasi kuantitas berlapis di level FormRequest dan verifikasi stok sebelum transaksi checkout. Menggunakan database transaction (`DB::transaction`) untuk memastikan pengurangan stok dan pembuatan order berjalan atomik.',
        impact: 'Mencegah pemesanan barang melebihi stok fisik yang tersedia.',
      },
      {
        challenge: 'Filter Multi-Atribut Tanpa Page Reload',
        solution:
          'Menggunakan Laravel Livewire dengan query scopes dinamis pada Model Product, menerapkan pagination asynchronous dan penanganan query filter langsung di server.',
        impact: 'Navigasi katalog terasa instan dan interaktif tanpa membebani browser client dengan bundle JavaScript berukuran besar.',
      },
      {
        challenge: 'Integritas Relasi Kategori dan Merek',
        solution:
          'Menerapkan foreign key constraint eksplisit pada level database migration dengan aturan penanganan penghapusan (RESTRICT) untuk melindungi konsistensi data katalog.',
        impact: 'Mencegah terjadinya produk tanpa induk kategori (orphan records) ketika data master diubah.',
      },
    ],
    keyFeatures: [
      'Katalog produk perangkat keras dengan filtering dinamis berdasarkan Brand & Kategori.',
      'Pencarian produk real-time dengan paginasi Livewire.',
      'Sistem keranjang belanja reaktif dengan kalkulasi otomatis subtotal dan total.',
      'Wishlist produk untuk menyimpan perangkat yang diincar.',
      'Dashboard admin untuk penambahan produk, manajemen kategori, dan update stok.',
    ],
    verification: {
      isVerified: true,
      source: 'Repository GitHub rayyanqatrunada/Compify',
      repoUrl: 'https://github.com/rayyanqatrunada/Compify',
      notes:
        'Fitur inti katalog, keranjang belanja, dan database telah diverifikasi pada repositori publik. Integrasi otomatisasi payment gateway eksternal (Midtrans/Xendit) berada dalam rencana rilis lanjutan.',
    },
  },

  'tsm-portal': {
    id: 'tsm-portal',
    title: 'TSM Department Portal',
    category: 'Institutional Portal & CMS',
    role: 'Backend Developer',
    status: 'Internal Deployment',
    repoUrl: 'https://github.com/rayyanqatrunada/toweb',
    liveUrl: null,
    overview:
      'Portal sistem informasi dan publikasi kegiatan untuk jurusan Teknik Bisnis Sepeda Motor (TBSM / TSM). Memfasilitasi penerbitan pengumuman bengkel, berita kegiatan praktik, profil kurikulum, kemitraan industri, dan dokumentasi prestasi siswa.',
    problemStatement:
      'Informasi akademik kejuruan, dokumentasi kegiatan praktik bengkel otomotif, serta kemitraan dengan industri sebelumnya tersebar dan tidak terpusat. Jurusan membutuhkan portal resmi dengan sistem kelola konten berbasis peran (RBAC) agar guru dan staf dapat memperbarui informasi dengan aman dan terorganisir.',
    contribution:
      'Mengembangkan backend Laravel, mengimplementasikan panel administrasi Filament, merancang skema relasi konten berita dan mitra industri, serta mengonfigurasi proteksi peran pengguna.',
    verifiedStack: [
      { name: 'PHP 8.x', category: 'Language' },
      { name: 'Laravel Framework', category: 'Backend MVC' },
      { name: 'Filament Admin', category: 'Admin Panel' },
      { name: 'MySQL', category: 'Relational DB' },
      { name: 'Tailwind CSS & Blade', category: 'Frontend' },
    ],
    architecture: {
      pattern: 'Layered MVC with Filament Resource Architecture',
      description:
        'Arsitektur backend Laravel yang memisahkan antara frontend publik yang ringan berbasis Blade & Tailwind CSS, dengan backend administrasi terproteksi yang ditenagai oleh Filament Resources.',
      highlights: [
        'Role-Based Access Control (RBAC) untuk membatasi hak akses pengelolaan artikel dan kemitraan.',
        'Media library terstruktur untuk mengunggah dan mengoptimasi dokumentasi bengkel dan kegiatan kejuruan.',
        'Slug otomatis dan validasi integritas tautan untuk keperluan keterbacaan URL publik institusi.',
      ],
    },
    database: {
      description:
        'Skema database relasional terpusat untuk publikasi konten akademik, profil kemitraan, dan manajemen galeri kegiatan kejuruan.',
      entities: [
        {
          name: 'users',
          description: 'Pengguna sistem dengan penentuan peran hak akses (Admin, Staf Guru, Kontributor).',
          fields: ['id (PK, BigInt)', 'name', 'email (Unique)', 'password', 'role', 'timestamps'],
          relations: '1 : N ke articles',
        },
        {
          name: 'articles / posts',
          description: 'Konten warta kegiatan, pengumuman bengkel, dan agenda jurusan.',
          fields: ['id (PK, BigInt)', 'user_id (FK)', 'category_id (FK)', 'title', 'slug (Unique)', 'content', 'thumbnail', 'is_published', 'published_at'],
          relations: 'Belongs to user & category',
        },
        {
          name: 'categories',
          description: 'Kategori artikel (e.g., Pengumuman, Agenda Praktik, Berita Kejuruan, Prestasi).',
          fields: ['id (PK, BigInt)', 'name', 'slug (Unique)', 'timestamps'],
          relations: '1 : N ke articles',
        },
        {
          name: 'partners',
          description: 'Daftar dunia usaha dan industri kerja sama (e.g., Bengkel Resmi, Pabrikan Motor).',
          fields: ['id (PK, BigInt)', 'name', 'logo_path', 'partnership_type', 'mou_period', 'description'],
          relations: 'Entitas profil kemitraan institusi',
        },
        {
          name: 'galleries',
          description: 'Dokumentasi visual sarana prasarana bengkel otomotif dan kegiatan siswa.',
          fields: ['id (PK, BigInt)', 'title', 'image_path', 'activity_date', 'description'],
          relations: 'Entitas media',
        },
      ],
    },
    challenges: [
      {
        challenge: 'Manajemen Hak Akses Konten yang Ketat',
        solution:
          'Menerapkan Laravel Policy dan Middleware otentikasi untuk membatasi otorisasi CRUD hanya bagi staf yang berwenang.',
        impact: 'Mencegah publikasi konten tidak terverifikasi atau perubahan data institusi secara tidak sengaja.',
      },
      {
        challenge: 'Penyimpanan & Pengorganisasian File Media Bengkel',
        solution:
          'Menggunakan Laravel Storage API dengan sanitasi nama berkas otomatis dan validasi ekstensi MIME (jpeg, png, webp) dengan batas ukuran terukur.',
        impact: 'Mencegah eksploitasi upload file sembari menjaga performa pemuatan halaman galeri tetap cepat.',
      },
    ],
    keyFeatures: [
      'Publikasi berita & pengumuman resmi jurusan dengan rich text editor.',
      'Katalog mitra industri kerja sama (DUDI) dan riwayat kemitraan.',
      'Galeri kegiatan siswa dan sarana prasarana bengkel.',
      'Panel administrasi terproteksi dengan autentikasi sandi terenkripsi.',
    ],
    verification: {
      isVerified: true,
      source: 'Repository GitHub rayyanqatrunada/toweb & kode lokal',
      repoUrl: 'https://github.com/rayyanqatrunada/toweb',
      notes: 'Struktur database, panel Filament, dan routing publik terverifikasi penuh pada repositori aktif.',
    },
  },

  pmart: {
    id: 'pmart',
    title: 'PMart — Student Commerce Marketplace',
    category: 'Campus Commerce System',
    role: 'Backend Developer',
    status: 'Institutional Project',
    repoUrl: 'https://github.com/rayyanqatrunada/PMart-test',
    liveUrl: null,
    overview:
      'Platform marketplace lingkungan kampus/sekolah kejuruan yang memfasilitasi siswa jurusan pemasaran (Bisnis Daring dan Pemasaran) untuk mengelola stan jualan digital, mencatat pesanan, dan mempraktikkan alur wirausaha modern.',
    problemStatement:
      'Praktik kewirausahaan siswa sering kali terkendala pencatatan manual berbasis kertas yang rawan salah hitung, kehilangan data pesanan, dan minimnya transparansi rekapitulasi penjualan per kelompok stan.',
    contribution:
      'Merancang skema multi-booth, relasi produk dan pesanan, mekanisme input transaksi belanja, serta dashboard rekapitulasi data penjualan.',
    verifiedStack: [
      { name: 'PHP 8.x', category: 'Language' },
      { name: 'Laravel Framework', category: 'Backend MVC' },
      { name: 'Filament Admin', category: 'Seller Management' },
      { name: 'MySQL', category: 'Relational DB' },
      { name: 'JavaScript & Tailwind', category: 'Frontend' },
    ],
    architecture: {
      pattern: 'Multi-Tenant Booth System with Central Order Dispatcher',
      description:
        'Arsitektur di mana entitas produk dan pesanan terisolasi per stan (booth) siswa, namun memiliki pintu masuk katalog terpadu bagi pembeli di lingkungan sekolah.',
      highlights: [
        'Isolasi data antar stan pedagang siswa melalui scoping query di level model.',
        'Pelacakan status transaksi berjenjang (Pending -> Confirmed -> Completed -> Cancelled).',
        'Agregasi transaksi untuk memudahkan pelaporan rekapitulasi nilai omset praktik.',
      ],
    },
    database: {
      description:
        'Model data yang menghubungkan pedagang stan siswa, variasi barang dagangan, dan data transaksi pemesanan.',
      entities: [
        {
          name: 'booths / sellers',
          description: 'Stan digital milik kelompok siswa penjual.',
          fields: ['id (PK, BigInt)', 'booth_name', 'group_members_json', 'class_name', 'contact_number'],
          relations: '1 : N ke products dan orders',
        },
        {
          name: 'products',
          description: 'Barang dagangan siswa yang dijajakan pada masing-masing stan.',
          fields: ['id (PK, BigInt)', 'booth_id (FK)', 'name', 'price', 'stock', 'image', 'is_available'],
          relations: 'Belongs to booth; 1 : N ke order_items',
        },
        {
          name: 'orders',
          description: 'Pencatatan nota transaksi pembelian siswa/guru.',
          fields: ['id (PK, BigInt)', 'booth_id (FK)', 'customer_name', 'customer_class', 'total_price', 'status', 'order_date'],
          relations: 'Belongs to booth; 1 : N ke order_items',
        },
        {
          name: 'order_items',
          description: 'Rincian produk dan kuantitas yang dibeli pada satu nomor nota.',
          fields: ['id (PK, BigInt)', 'order_id (FK)', 'product_id (FK)', 'quantity', 'unit_price', 'subtotal'],
          relations: 'Belongs to order & product',
        },
      ],
    },
    challenges: [
      {
        challenge: 'Pemisahan Akses Data Antar Kelompok Stan',
        solution:
          'Menggunakan Laravel Model Scopes dan Filament tenant-like resource restriction agar siswa dari Stan A tidak dapat melihat atau mengubah barang Stan B.',
        impact: 'Integritas dan privasi data penjualan antar kelompok siswa terjaga aman.',
      },
      {
        challenge: 'Penghitungan Rekapitulasi Otomatis yang Akurat',
        solution:
          'Menerapkan query agregasi teroptimasi (`DB::raw("SUM(total_price)")`) dengan filter tanggal dan status order completed.',
        impact: 'Guru pembimbing dan siswa dapat langsung melihat laporan laba-rugi kotor tanpa perlu merekap struk manual.',
      },
    ],
    keyFeatures: [
      'Katalog etalase produk terpadu untuk seluruh stan siswa.',
      'Formulir pemesanan cepat untuk pelanggan internal sekolah.',
      'Manajemen katalog dan stok per akun stan siswa.',
      'Dashboard rekap omset dan riwayat pesanan masuk.',
    ],
    verification: {
      isVerified: true,
      source: 'Repository GitHub rayyanqatrunada/PMart-test',
      repoUrl: 'https://github.com/rayyanqatrunada/PMart-test',
      notes: 'Struktur multi-stan dan manajemen transaksi terverifikasi pada repositori proyek.',
    },
  },

  'inventory-api-gateway': {
    id: 'inventory-api-gateway',
    title: 'RESTful Inventory & Order Service',
    category: 'API Service & Architecture',
    role: 'Backend Architecture & API Engineer',
    status: 'Core Service Boilerplate',
    repoUrl: null,
    liveUrl: null,
    overview:
      'Layanan mandiri backend RESTful API yang menyediakan antarmuka terstandarisasi untuk pengelolaan inventaris stok gudang barang dan orkestrasi pesanan, dirancang dengan format respons JSON seragam dan penanganan error standar HTTP.',
    problemStatement:
      'Integrasi antara aplikasi client (web maupun mobile) dan basis data sering kali menimbulkan inkonsistensi respons, validasi yang rapuh di layer client, dan ketiadaan riwayat pencatatan (audit trail) saat stok gudang berkurang atau bertambah.',
    contribution:
      'Merancang kontrak endpoint API, penanganan kode status HTTP semantik, middleware validasi request, serta model relasional transaksi inventaris.',
    verifiedStack: [
      { name: 'PHP', category: 'Language' },
      { name: 'RESTful Architecture', category: 'Design Pattern' },
      { name: 'MySQL', category: 'Database' },
      { name: 'JSON Protocol', category: 'Data Exchange' },
      { name: 'Postman / Bruno', category: 'API Testing & Docs' },
    ],
    architecture: {
      pattern: 'Stateless Service-Oriented REST API',
      description:
        'Arsitektur API tanpa status (stateless) yang memisahkan tanggung jawab antara Controller (Request/Response HTTP), Service Layer (aturan bisnis dan kalkulasi stok), serta Model Layer (akses database).',
      highlights: [
        'Format respons seragam: `{ success: boolean, message: string, data: object|null, errors: array|null }`.',
        'HTTP Status Codes semantik: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 422 Unprocessable Entity, 500 Internal Error.',
        'Database transaction locks untuk mencegah inkonsistensi saat stok barang diperbarui bersamaan.',
      ],
    },
    database: {
      description:
        'Model data relasional yang berfokus pada pencatatan log perubahan stok (audit trail) dan transaksi pesanan.',
      entities: [
        {
          name: 'items',
          description: 'Daftar master barang inventaris gudang.',
          fields: ['id (PK, BigInt)', 'sku (Unique Index)', 'name', 'current_stock', 'unit_price', 'status'],
          relations: '1 : N ke stock_logs dan order_items',
        },
        {
          name: 'stock_logs',
          description: 'Buku besar histori audit pencatatan penambahan atau pengurangan barang.',
          fields: ['id (PK, BigInt)', 'item_id (FK)', 'type (IN / OUT / ADJUST)', 'quantity', 'reference_id', 'created_at'],
          relations: 'Belongs to item',
        },
        {
          name: 'orders',
          description: 'Data pesanan yang memicu pengurangan inventaris.',
          fields: ['id (PK, BigInt)', 'order_number (Unique)', 'customer_ref', 'total_amount', 'status', 'created_at'],
          relations: '1 : N ke order_items',
        },
        {
          name: 'order_items',
          description: 'Detail barang per baris pesanan.',
          fields: ['id (PK, BigInt)', 'order_id (FK)', 'item_id (FK)', 'quantity', 'unit_price'],
          relations: 'Belongs to order & item',
        },
      ],
    },
    challenges: [
      {
        challenge: 'Format JSON & Error Handling yang Prediktabel',
        solution:
          'Membangun standard response handler terpusat yang membungkus seluruh luaran controller, sehingga client tidak pernah menerima raw error HTML.',
        impact: 'Konsumsi API oleh frontend client menjadi sangat mudah didebug dan bebas crash tak terduga.',
      },
      {
        challenge: 'Audit Trail Riwayat Stok yang Akurat',
        solution:
          'Setiap operasi yang mengubah field `current_stock` wajib menyisipkan record ke tabel `stock_logs` di dalam blok transaksi database yang sama (`BEGIN ... COMMIT`).',
        impact: 'Setiap pergeseran kuantitas barang dapat dilacak asal-usulnya secara kronologis.',
      },
    ],
    keyFeatures: [
      'Endpoint RESTful CRUD inventaris lengkap dengan filter pagination.',
      'Mekanisme pembuatan order otomatis memotong kuantitas stok.',
      'Logging otomatis mutasi stok barang (barang masuk / keluar).',
      'Validasi payload masukan dengan pesan error field-level terperinci.',
    ],
    verification: {
      isVerified: true,
      source: 'Arsitektur Boilerplate Internal RAYY.DEV',
      repoUrl: null,
      notes:
        'Proyek ini dirancang sebagai acuan arsitektur endpoint dan standarisasi API backend mandiri. Repositori publik akan ditautkan setelah modul autentikasi JWT disempurnakan.',
    },
  },

  study: {
    id: 'study',
    title: 'Study — Knowledge Base & Code Laboratory',
    category: 'Learning & Code Archive',
    role: 'Independent Researcher & Developer',
    status: 'Continuous Learning Archive',
    repoUrl: 'https://github.com/rayyanqatrunada/Study',
    liveUrl: null,
    overview:
      'Repositori pembelajaran mandiri dan dokumentasi teknis yang mengarsipkan eksplorasi algoritma, struktur data, sintaksis bahasa pemrograman modern (Python, JavaScript, HTML/CSS), serta eksperimen arsitektur perangkat lunak.',
    problemStatement:
      'Penguasaan teknologi baru memerlukan eksperimen langsung dan dokumentasi berulang. Tanpa repositori terpusat dan catatan kode yang terstruktur, konsep teknis yang dipelajari rentan hilang dan sulit dijadikan referensi saat membangun sistem produksi nyata.',
    contribution:
      'Mengembangkan implementasi modular untuk setiap topik pembelajaran, menstrukturkan direktori berdasarkan domain keilmuan, menguji algoritma, dan mendokumentasikan kode pembelajaran secara terbuka di GitHub.',
    verifiedStack: [
      { name: 'Python 3.x', category: 'Language & Scripting' },
      { name: 'HTML5 & CSS3', category: 'Web Fundamentals' },
      { name: 'Data Structures', category: 'Computer Science' },
      { name: 'Algorithms', category: 'Problem Solving' },
      { name: 'Git & GitHub', category: 'Version Control' },
    ],
    architecture: {
      pattern: 'Modular Domain-Driven Topic Hierarchy',
      description:
        'Struktur direktori independen per domain pembelajaran (Python, Web Fundamentals, Algoritma, Database). Setiap topik memuat file implementasi mandiri dengan pengujian logika langsung.',
      highlights: [
        'Pemisahan modul eksplorasi per bahasa pemrograman dan topik komputasi.',
        'Dokumentasi konsep fundamental dengan studi kasus kode interaktif.',
        'Pencatatan riwayat commit berkala untuk merekam progres pembelajaran teknis secara transparan.',
      ],
    },
    database: {
      description:
        'Taksonomi direktori terstruktur yang mengkategorikan topik komputasi dan modul teknis.',
      entities: [
        {
          name: 'Python/',
          description: 'Eksplorasi sintaksis Python, fungsi, manipulasi data, dan algoritma.',
          fields: ['core_syntax.py', 'data_structures.py', 'algorithms.py'],
          relations: 'Modul mandiri per topik pembelajaran',
        },
        {
          name: 'html, css/',
          description: 'Eksperimen tata letak semantik, responsive grid, dan desain UI modern.',
          fields: ['index.html', 'styles.css', 'components/'],
          relations: 'Implementasi antarmuka web murni',
        },
        {
          name: 'algorithms/',
          description: 'Implementasi pencarian, sorting, dan struktur data fundamental.',
          fields: ['binary_search', 'recursion', 'sorting_benchmarks'],
          relations: 'Analisis kompleksitas waktu dan ruang (Big-O)',
        },
      ],
    },
    challenges: [
      {
        challenge: 'Konsistensi Dokumentasi dan Kerapian Struktur',
        solution:
          'Menerapkan aturan penamaan file semantik, pemisahan folder berdasarkan materi, dan penjelasan ringkas di setiap file kode.',
        impact: 'Mempermudah pencarian kembali saat membutuhkan referensi implementasi pada proyek nyata.',
      },
      {
        challenge: 'Implementasi Algoritma Tanpa Library Eksternal',
        solution:
          'Menulis logika algoritma dan struktur data murni (pure Python) untuk memahami mekanisme internal eksekusi memori dan alur logika secara mendalam.',
        impact: 'Membangun intuisi pemrograman yang kuat untuk pemecahan masalah di level sistem backend.',
      },
    ],
    keyFeatures: [
      'Eksplorasi sintaksis dan fitur modern Python.',
      'Praktik dasar web semantics (HTML5 & CSS3 modern).',
      'Implementasi logika algoritma dan pemecahan masalah komputasi.',
      'Repositori publik terbuka yang terus diperbarui seiring perkembangan belajar.',
    ],
    verification: {
      isVerified: true,
      source: 'Repository GitHub rayyanqatrunada/Study',
      repoUrl: 'https://github.com/rayyanqatrunada/Study',
      notes:
        'Repositori publik aktif yang memuat catatan dan kode pembelajaran teknis secara berkelanjutan.',
    },
  },
}
