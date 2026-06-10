(function () {
  const qs = new URLSearchParams(window.location.search);
  const role = ['admin', 'dlh', 'seller'].includes(qs.get('role')) ? qs.get('role') : 'admin';
  const page = qs.get('page') || 'dashboard';

  const users = [
    { id: 'USR-1001', nama: 'Fatma Azzahra', email: 'fatma@mail.com', role: 'masyarakat', status: 'aktif', tanggal: '2026-02-01', laporan: 7, poin: 181 },
    { id: 'USR-1002', nama: 'Bima Saputra', email: 'bima@mail.com', role: 'masyarakat', status: 'aktif', tanggal: '2026-02-03', laporan: 4, poin: 90 },
    { id: 'USR-1003', nama: 'Nadia Putri', email: 'nadia@mail.com', role: 'masyarakat', status: 'suspend', tanggal: '2026-02-07', laporan: 1, poin: 20 },
    { id: 'ADM-0001', nama: 'Admin Utama', email: 'admin@reworth.app', role: 'admin', status: 'aktif', tanggal: '2025-11-01', laporan: 0, poin: 0 },
    { id: 'DLH-0001', nama: 'Petugas DLH', email: 'dlh@reworth.app', role: 'dlh', status: 'aktif', tanggal: '2025-11-10', laporan: 0, poin: 0 }
  ];

  const sellers = [
    { id: 'SEL-5001', toko: 'Toko Daur Fatma', pemilik: 'Fatma Azzahra', email: 'seller1@reworth.app', produk: 18, verifikasi: 'menunggu', status: 'aktif', tanggal: '2026-05-26' },
    { id: 'SEL-5002', toko: 'Hijau Bersih Store', pemilik: 'Bima Saputra', email: 'seller2@reworth.app', produk: 21, verifikasi: 'menunggu', status: 'aktif', tanggal: '2026-05-25' },
    { id: 'SEL-5003', toko: 'EcoCycle Shop', pemilik: 'Nadia Putri', email: 'seller3@reworth.app', produk: 9, verifikasi: 'terverifikasi', status: 'aktif', tanggal: '2026-04-10' },
    { id: 'SEL-5004', toko: 'Daur Ulang Kita', pemilik: 'Rizki Aditya', email: 'seller4@reworth.app', produk: 6, verifikasi: 'ditolak', status: 'nonaktif', tanggal: '2026-04-12' }
  ];

  const reports = [
    { id: 1001, pelapor: 'Fatma Azzahra', jalan: 'Jl. Soekarno Hatta No. 45', kelurahan: 'Jatimulyo', kecamatan: 'Lowokwaru', tingkat: 'sedang', status: 'menunggu', tanggal: '2026-05-30 08:15:00', jenis: 'anorganik', deskripsi: 'Sampah menumpuk menutup setengah trotoar dan mulai bau.', x: 28, y: 36 },
    { id: 1002, pelapor: 'Bima Saputra', jalan: 'Jl. Ahmad Yani No. 12', kelurahan: 'Cihapit', kecamatan: 'Bandung Wetan', tingkat: 'parah', status: 'diproses', tanggal: '2026-05-29 18:30:00', jenis: 'campuran', deskripsi: 'Tumpukan sampah campuran mengganggu pejalan kaki.', x: 64, y: 44 },
    { id: 1003, pelapor: 'Nadia Putri', jalan: 'Jl. Asia Afrika No. 7', kelurahan: 'Braga', kecamatan: 'Sumur Bandung', tingkat: 'ringan', status: 'selesai', tanggal: '2026-05-28 07:45:00', jenis: 'organik', deskripsi: 'Sampah organik menumpuk di sisi drainase.', x: 46, y: 68 },
    { id: 1004, pelapor: 'Rizki Aditya', jalan: 'Jl. Dipatiukur No. 77', kelurahan: 'Lebakgede', kecamatan: 'Coblong', tingkat: 'ringan', status: 'ditolak', tanggal: '2026-05-27 12:21:00', jenis: 'lainnya', deskripsi: 'Foto kurang jelas dan lokasi laporan tidak akurat.', x: 72, y: 24 },
    { id: 1005, pelapor: 'Dina Maharani', jalan: 'Jl. Terusan Jakarta No. 9', kelurahan: 'Antapani Tengah', kecamatan: 'Antapani', tingkat: 'parah', status: 'menunggu', tanggal: '2026-05-30 06:35:00', jenis: 'anorganik', deskripsi: 'Sampah plastik menumpuk dan hampir menutup saluran air.', x: 36, y: 78 }
  ];

  const products = [
    { id: 'PRD-9001', nama: 'Tas Anyam Daur Ulang', seller: 'Toko Daur Fatma', kategori: 'Kerajinan', harga: 125000, stok: 14, status: 'aktif' },
    { id: 'PRD-9002', nama: 'Pot Tanam Botol', seller: 'Hijau Bersih Store', kategori: 'Dekorasi', harga: 55000, stok: 9, status: 'pending' },
    { id: 'PRD-9003', nama: 'Pupuk Kompos 5kg', seller: 'Kompos Lestari', kategori: 'Kompos', harga: 40000, stok: 40, status: 'aktif' },
    { id: 'PRD-9004', nama: 'Dompet Kertas Daur', seller: 'EcoCycle Shop', kategori: 'Kerajinan', harga: 70000, stok: 5, status: 'disembunyikan' },
    { id: 'PRD-9005', nama: 'Eco Brick Kit', seller: 'Daur Ulang Kita', kategori: 'Edukasi', harga: 85000, stok: 0, status: 'nonaktif' }
  ];

  const transactions = [
    { id: 'INV-7001', pembeli: 'Fatma Azzahra', seller: 'EcoCycle Shop', total: 245000, status: 'pending', tanggal: '2026-05-30' },
    { id: 'INV-7002', pembeli: 'Bima Saputra', seller: 'Kompos Lestari', total: 40000, status: 'diproses', tanggal: '2026-05-30' },
    { id: 'INV-7003', pembeli: 'Nadia Putri', seller: 'Toko Daur Fatma', total: 125000, status: 'selesai', tanggal: '2026-05-29' },
    { id: 'INV-7004', pembeli: 'Dina Maharani', seller: 'Hijau Bersih Store', total: 55000, status: 'dibatalkan', tanggal: '2026-05-28' }
  ];

  const sellerOrders = [
    { id: 'ORD-001', pembeli: 'Fatma Azzahra', tanggal: '2026-05-30', status: 'diproses', total: 245000 },
    { id: 'ORD-002', pembeli: 'Bima Saputra', tanggal: '2026-05-29', status: 'dikemas', total: 40000 },
    { id: 'ORD-003', pembeli: 'Nadia Putri', tanggal: '2026-05-28', status: 'selesai', total: 125000 },
    { id: 'ORD-004', pembeli: 'Dina Maharani', tanggal: '2026-05-27', status: 'dibatalkan', total: 55000 }
  ];

  const officers = [
    { id: 'PTG-001', nama: 'Rudi Hartono', tim: 'Tim A', wilayah: 'Lowokwaru', kontak: '0812-1111-2222', status: 'aktif' },
    { id: 'PTG-002', nama: 'Siti Nurhaliza', tim: 'Tim B', wilayah: 'Antapani', kontak: '0812-3333-4444', status: 'aktif' },
    { id: 'PTG-003', nama: 'Agus Sapri', tim: 'Tim C', wilayah: 'Coblong', kontak: '0812-5555-6666', status: 'nonaktif' }
  ];

  const activities = [
    { waktu: '2026-05-30 10:12:00', aktor: 'Admin Utama', role: 'admin', aktivitas: 'Verifikasi Seller', modul: 'Manajemen Seller', detail: 'Seller Toko Daur Fatma diverifikasi' },
    { waktu: '2026-05-30 09:44:00', aktor: 'Fatma Azzahra', role: 'masyarakat', aktivitas: 'Laporan Masuk', modul: 'Laporan Sampah', detail: 'Laporan #1005 dibuat' },
    { waktu: '2026-05-30 09:05:00', aktor: 'Petugas DLH', role: 'dlh', aktivitas: 'Status Laporan Berubah', modul: 'Monitoring', detail: 'Laporan #1002 diubah ke diproses' },
    { waktu: '2026-05-29 20:10:00', aktor: 'Nadia Putri', role: 'masyarakat', aktivitas: 'Transaksi Dibuat', modul: 'Mini Market', detail: 'Invoice INV-7003 berhasil dibuat' },
    { waktu: '2026-05-29 17:22:00', aktor: 'EcoCycle Shop', role: 'seller', aktivitas: 'Produk Dibuat', modul: 'Produk', detail: 'Produk PRD-9004 ditambahkan' }
  ];

  const profiles = {
    admin: { nama: 'Admin ReWorth', email: 'admin@reworth.app' },
    dlh: { nama: 'Petugas DLH', email: 'dlh@reworth.app' },
    seller: { nama: 'Seller Eco Craft', email: 'seller@reworth.app' }
  };

  const menu = {
    admin: [
      ['Dashboard', 'dashboard', 'home'],
      ['Manajemen User', 'users', 'users'],
      ['Manajemen Seller', 'sellers', 'store'],
      ['Laporan Sampah', 'laporan_sampah', 'file'],
      ['Mini Market', 'mini_market', 'shopping'],
      ['Verifikasi Pembayaran', 'payment_verifications', 'credit'],
      ['Transaksi', 'transaksi', 'credit'],
      ['Aktivitas Sistem', 'aktivitas', 'activity'],
      ['Pengaturan', 'pengaturan', 'settings']
    ],
    dlh: [
      ['Dashboard', 'dashboard', 'home'],
      ['Monitoring', 'monitoring', 'activity'],
      ['Laporan Sampah', 'laporan', 'orders'],
      ['Peta Lokasi', 'peta_lokasi', 'map'],
      ['Petugas', 'petugas', 'users'],
      ['Riwayat', 'riwayat', 'history'],
      ['Pengaturan', 'pengaturan', 'settings']
    ],
    seller: [
      ['Beranda', 'dashboard', 'home'],
      ['Produk', 'products', 'box'],
      ['Pesanan', 'orders', 'orders'],
      ['Pelanggan', 'customers', 'users'],
      ['Saldo', 'transactions', 'wallet'],
      ['Pengaturan Toko', 'store_profile', 'settings']
    ]
  };

  const titles = {
    admin: {
      dashboard: 'Dashboard Admin', users: 'Manajemen User', user_detail: 'Detail User', sellers: 'Manajemen Seller',
      seller_detail: 'Detail Seller', laporan_sampah: 'Laporan Sampah', laporan_detail: 'Detail Laporan',
      mini_market: 'Mini Market', product_detail: 'Detail Produk', payment_verifications: 'Verifikasi Pembayaran',
      payment_verification_detail: 'Detail Verifikasi Pembayaran', transaksi: 'Transaksi', transaksi_detail: 'Detail Transaksi',
      aktivitas: 'Aktivitas Sistem', pengaturan: 'Pengaturan'
    },
    dlh: {
      dashboard: 'Dashboard DLH', monitoring: 'Monitoring', laporan: 'Laporan Sampah', laporan_detail: 'Detail Laporan',
      peta_lokasi: 'Peta Lokasi', petugas: 'Petugas', petugas_form: 'Tambah Petugas', riwayat: 'Riwayat',
      pengaturan: 'Pengaturan', reporters: 'Data Pelapor'
    },
    seller: {
      dashboard: 'Dashboard Seller', products: 'Produk', product_detail: 'Detail Produk', product_form: 'Tambah Produk',
      orders: 'Pesanan', order_detail: 'Detail Pesanan', customers: 'Pelanggan', transactions: 'Saldo',
      store_profile: 'Pengaturan Toko'
    }
  };

  const money = (value) => 'Rp ' + Number(value).toLocaleString('id-ID');
  const text = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const link = (targetRole, targetPage) => `dashboard.html?role=${targetRole}&page=${targetPage}`;
  const statusClass = (status) => {
    const value = String(status).toLowerCase();
    if (['aktif', 'selesai', 'terverifikasi', 'berhasil', 'tersedia'].includes(value)) return 'badge-success';
    if (['menunggu', 'pending', 'dikemas', 'belum upload'].includes(value)) return 'badge-warning';
    if (['ditolak', 'dibatalkan', 'nonaktif', 'gagal', 'suspend'].includes(value)) return 'badge-danger';
    if (['diproses', 'dikirim'].includes(value)) return 'badge-info';
    return 'badge-neutral';
  };

  const badge = (value) => `<span class="status-badge ${statusClass(value)}">${text(label(value))}</span>`;
  const severityBadge = (value) => {
    const lower = String(value).toLowerCase();
    const cls = lower === 'parah' || lower === 'berat' ? 'severity-high' : lower === 'sedang' ? 'severity-medium' : 'severity-light';
    return `<span class="severity-badge ${cls}">${text(label(value))}</span>`;
  };
  const label = (value) => String(value ?? '').replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  function icon() {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-linecap="round"/></svg>';
  }

  function statCard(labelText, value, desc) {
    return `<article class="stat-card"><span class="stat-label">${text(labelText)}</span><strong class="stat-value">${text(value)}</strong><small class="stat-desc">${text(desc)}</small></article>`;
  }

  function table(headers, rows) {
    return `
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr>${headers.map((item) => `<th>${text(item)}</th>`).join('')}</tr></thead>
          <tbody>${rows.join('')}</tbody>
        </table>
      </div>
    `;
  }

  function toolbar(searchPlaceholder, filters) {
    return `
      <form class="toolbar" onsubmit="event.preventDefault()">
        <div class="toolbar-left">
          <input class="input" type="search" placeholder="${text(searchPlaceholder)}">
          ${filters || ''}
        </div>
        <button class="btn btn-primary" type="submit">Filter</button>
      </form>
    `;
  }

  function mapHtml(items) {
    return `
      <div class="static-map">
        ${items.map((item) => `<span class="map-pin ${text(item.tingkat)}" style="left:${item.x}%;top:${item.y}%;" title="#${item.id} ${text(item.jalan)}"></span>`).join('')}
      </div>
    `;
  }

  function detailPanel(title, rows, backRole, backPage) {
    return `
      <section class="panel">
        <div class="panel-header">
          <div><h2>${text(title)}</h2><p>Snapshot frontend statis dari tampilan dashboard.</p></div>
          <a class="btn btn-secondary" href="${link(backRole, backPage)}">Kembali</a>
        </div>
        <div class="detail-grid">
          ${rows.map(([key, value]) => `<div class="detail-box"><span>${text(key)}</span><strong>${value}</strong></div>`).join('')}
        </div>
      </section>
    `;
  }

  function shell(content) {
    const user = profiles[role];
    const currentTitle = titles[role][page] || titles[role].dashboard;
    const firstName = user.nama.split(' ')[0];
    const subtitle = role === 'admin' ? 'Kelola seluruh sistem ReWorth' : role === 'dlh' ? 'Dinas Lingkungan Hidup' : '';
    const search = role === 'admin' ? 'Cari user, seller, laporan, transaksi...' : role === 'dlh' ? 'Cari laporan, lokasi, petugas...' : 'Cari produk, pesanan, pelanggan...';
    const roleCopy = role === 'admin' ? 'Bersama Jaga Bumi, Ciptakan Dampak.' : 'Give Reworth. Create Impact.';

    return `
      <div class="dashboard-shell">
        <aside class="sidebar">
          <div class="brand">
            <img class="brand-logo" src="assets/images/logo_reworth.jpeg" alt="Logo ReWorth">
            <div class="brand-copy"><strong>ReWorth</strong><span>${roleCopy}</span></div>
          </div>
          <nav class="sidebar-nav">
            ${menu[role].map(([name, targetPage]) => `<a class="${targetPage === page ? 'active' : ''}" href="${link(role, targetPage)}"><span class="sidebar-menu-icon">${icon()}</span><span>${text(name)}</span></a>`).join('')}
            <a href="index.html"><span class="sidebar-menu-icon">${icon()}</span><span>Keluar</span></a>
          </nav>
          ${role === 'seller' ? '' : `<section class="sidebar-profile"><strong>${text(user.nama)}</strong><span>${text(user.email)}</span></section>`}
          <small class="sidebar-copyright">Copyright 2026 ReWorth ${label(role)} Dashboard</small>
        </aside>
        <main class="main-area">
          <header class="topbar">
            <div>
              <p>Welcome back, ${text(firstName)}</p>
              <h1>${text(currentTitle)}</h1>
              ${subtitle ? `<span class="topbar-subtitle">${text(subtitle)}</span>` : ''}
            </div>
            <div class="topbar-actions">
              <input class="dashboard-search" type="search" placeholder="${text(search)}" aria-label="Cari dashboard">
              <button class="topbar-icon" type="button" aria-label="Notifikasi">
                <svg class="topbar-bell-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 18H5.5a1 1 0 0 1-.8-1.6l1.1-1.5V10a6.2 6.2 0 0 1 5.2-6.1 6 6 0 0 1 6.8 6v5l1.1 1.5a1 1 0 0 1-.8 1.6h-3.6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" stroke-linecap="round"/></svg>
                ${role === 'seller' ? '' : '<span class="topbar-alert-dot"></span>'}
              </button>
              <div class="topbar-user">
                <div class="topbar-avatar">${text(firstName.charAt(0).toUpperCase())}</div>
                <div><strong>${text(user.nama)}</strong><span>${text(user.email)}</span></div>
              </div>
            </div>
          </header>
          <section class="page-content">${content}</section>
          <footer class="footer"><span>Copyright 2026 ReWorth. All rights reserved.</span></footer>
        </main>
      </div>
    `;
  }

  function adminDashboard() {
    const pending = sellers.filter((item) => item.verifikasi === 'menunggu');
    return `
      <section class="seller-hero">
        <div class="seller-hero-content">
          <h2>Platform ReWorth Aktif</h2>
          <p>Kelola pengguna, seller, laporan sampah, transaksi, dan aktivitas platform dalam satu dashboard terpusat.</p>
          <div class="hero-cta-row"><a class="btn btn-secondary" href="${link('admin', 'aktivitas')}">Lihat Aktivitas Sistem</a></div>
        </div>
        <div class="seller-hero-ellipse seller-hero-ellipse-fill" aria-hidden="true"></div>
        <div class="seller-hero-ellipse seller-hero-ellipse-ring" aria-hidden="true"></div>
        <img class="seller-hero-illustration" src="assets/images/ilust_admin.png" alt="Ilustrasi Admin ReWorth">
      </section>
      <div class="stat-grid stat-grid-five">
        ${statCard('Total User', '1.248', '+18 hari ini')}
        ${statCard('Total Seller', '342', '+6 minggu ini')}
        ${statCard('Total Laporan Sampah', '756', '+12 hari ini')}
        ${statCard('Total Transaksi', '2.453', '+7% minggu ini')}
        ${statCard('Total Pendapatan', money(45780000), 'Nilai transaksi platform')}
      </div>
      <div class="two-col-grid">
        <section class="panel">
          <div class="panel-header"><div><h2>Aktivitas Sistem Terbaru</h2><p>Audit trail aktivitas penting platform.</p></div><a class="btn btn-secondary" href="${link('admin', 'aktivitas')}">Lihat Semua</a></div>
          <div class="report-list">${activities.map((item) => `<article class="report-item" style="grid-template-columns:minmax(0,1fr);"><div><h3>${text(item.aktivitas)} - ${text(item.aktor)}</h3><p>${text(item.detail)}</p><div class="report-meta">${badge(item.role)}<span class="status-badge badge-neutral">${text(item.modul)}</span><span class="status-badge badge-neutral">${text(item.waktu)}</span></div></div></article>`).join('')}</div>
        </section>
        <section class="panel">
          <div class="panel-header"><div><h2>Seller Menunggu Verifikasi</h2><p>Validasi pengajuan seller baru.</p></div></div>
          <div class="report-list">${pending.map((seller) => `<article class="report-item"><img class="report-thumb" src="assets/images/logo_reworth.jpeg" alt="Logo seller"><div><h3>${text(seller.toko)}</h3><p>${text(seller.email)} | Daftar: ${text(seller.tanggal)}</p><div class="report-meta">${badge('menunggu')}<a class="btn btn-primary" href="${link('admin', 'seller_detail')}">Verifikasi</a><a class="btn btn-danger" href="${link('admin', 'seller_detail')}">Tolak</a></div></div></article>`).join('')}</div>
        </section>
      </div>
    `;
  }

  function adminList(kind) {
    if (kind === 'users') {
      return `<section class="panel"><div class="panel-header"><div><h2>Manajemen User</h2><p>Kelola semua pengguna platform ReWorth.</p></div></div>${toolbar('Cari nama/email user...', '<select class="select"><option>Semua role</option></select><select class="select"><option>Semua status</option></select>')}</section><section class="panel">${table(['ID User', 'Nama', 'Email', 'Role', 'Status', 'Tanggal Bergabung', 'Aksi'], users.map((u) => `<tr><td>${u.id}</td><td>${text(u.nama)}</td><td>${text(u.email)}</td><td><span class="status-badge badge-neutral">${text(u.role)}</span></td><td>${badge(u.status)}</td><td>${u.tanggal}</td><td><a class="btn btn-secondary" href="${link('admin', 'user_detail')}">Detail</a></td></tr>`))}</section>`;
    }
    if (kind === 'sellers') {
      return `<section class="panel"><div class="panel-header"><div><h2>Manajemen Seller</h2><p>Kelola semua seller dan verifikasi toko.</p></div></div>${toolbar('Cari seller...', '<select class="select"><option>Semua status verifikasi</option></select><select class="select"><option>Semua status toko</option></select>')}</section><section class="panel">${table(['ID Seller', 'Nama Toko', 'Pemilik', 'Email', 'Jumlah Produk', 'Status Verifikasi', 'Tanggal Bergabung', 'Aksi'], sellers.map((s) => `<tr><td>${s.id}</td><td>${text(s.toko)}</td><td>${text(s.pemilik)}</td><td>${text(s.email)}</td><td>${s.produk}</td><td>${badge(s.verifikasi)}</td><td>${s.tanggal}</td><td><a class="btn btn-secondary" href="${link('admin', 'seller_detail')}">Detail</a></td></tr>`))}</section>`;
    }
    if (kind === 'reports') {
      return `<section class="panel"><div class="panel-header"><div><h2>Laporan Sampah</h2><p>Monitoring dan audit laporan lintas sistem.</p></div></div>${toolbar('Cari ID/pelapor/lokasi...', '<select class="select"><option>Semua status</option></select><select class="select"><option>Semua tingkat</option></select>')}</section><section class="panel">${reportTable('admin')}</section>`;
    }
    if (kind === 'market') {
      return `<section class="panel"><div class="panel-header"><div><h2>Mini Market</h2><p>Monitoring produk seluruh seller.</p></div><span class="status-badge badge-neutral">Sumber: Static Frontend</span></div>${toolbar('Cari produk...', '<select class="select"><option>Semua kategori</option></select><select class="select"><option>Semua seller</option></select>')}</section><section class="panel">${productTable('admin')}</section>`;
    }
    if (kind === 'payments') {
      return `<div class="stat-grid">${statCard('Total Bukti Bayar', '24', 'Semua pembayaran masuk')}${statCard('Menunggu Verifikasi', '8', 'Perlu dicek admin')}${statCard('Terverifikasi', '14', 'Sudah diteruskan ke seller')}${statCard('Total Nilai', money(2450000), 'Akumulasi tagihan')}</div><section class="panel"><div class="panel-header"><div><h2>Verifikasi Pembayaran</h2><p>Cek bukti bayar QRIS dari user.</p></div></div>${table(['ID Pembayaran', 'Kode Pesanan', 'Pembeli', 'Total', 'Status Pembayaran', 'Status Pesanan', 'Aksi'], transactions.map((t, idx) => `<tr><td>PAY-${7000 + idx}</td><td>${t.id}</td><td>${text(t.pembeli)}</td><td>${money(t.total)}</td><td>${badge(idx === 0 ? 'menunggu' : 'terverifikasi')}</td><td>${badge(t.status)}</td><td><a class="btn btn-secondary" href="${link('admin', 'payment_verification_detail')}">Detail</a></td></tr>`))}</section>`;
    }
    if (kind === 'transactions') {
      return `<section class="panel"><div class="panel-header"><div><h2>Transaksi</h2><p>Pantau transaksi dan invoice platform.</p></div></div>${toolbar('Cari invoice/pembeli/seller...', '<select class="select"><option>Semua status</option></select>')}</section><section class="panel">${transactionTable('admin')}</section>`;
    }
    return '';
  }

  function reportTable(targetRole) {
    return table(['ID Laporan', 'Pelapor', 'Lokasi', 'Kecamatan', 'Tingkat', 'Status', 'Tanggal', 'Aksi'], reports.map((r) => `<tr><td>#${r.id}</td><td>${text(r.pelapor)}</td><td>${text(r.jalan)}</td><td>${text(r.kecamatan)}</td><td>${severityBadge(r.tingkat)}</td><td>${badge(r.status)}</td><td>${text(r.tanggal.slice(0, 10))}</td><td><a class="btn btn-secondary" href="${link(targetRole, 'laporan_detail')}">Detail</a></td></tr>`));
  }

  function productTable(targetRole) {
    return table(['ID Produk', 'Foto', 'Nama Produk', 'Seller', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'], products.map((p) => `<tr><td>${p.id}</td><td><img class="report-thumb" style="width:54px;height:54px;" src="assets/images/logo_reworth.jpeg" alt=""></td><td>${text(p.nama)}</td><td>${text(p.seller)}</td><td>${text(p.kategori)}</td><td>${money(p.harga)}</td><td>${p.stok}</td><td>${badge(p.status)}</td><td><a class="btn btn-secondary" href="${link(targetRole, 'product_detail')}">Detail</a></td></tr>`));
  }

  function transactionTable(targetRole) {
    if (targetRole !== 'admin') {
      return table(['Tanggal', 'Deskripsi', 'Tipe', 'Jumlah', 'Status'], transactions.map((t) => `<tr><td>${t.tanggal}</td><td>Saldo dari pesanan ${t.id}</td><td>Masuk</td><td>${money(t.total)}</td><td>${badge(t.status)}</td></tr>`));
    }

    return table(['ID Transaksi', 'Pembeli', 'Seller', 'Total', 'Status', 'Tanggal', 'Aksi'], transactions.map((t) => `<tr><td>${t.id}</td><td>${text(t.pembeli)}</td><td>${text(t.seller)}</td><td>${money(t.total)}</td><td>${badge(t.status)}</td><td>${t.tanggal}</td><td><a class="btn btn-secondary" href="${link(targetRole, 'transaksi_detail')}">Detail</a></td></tr>`));
  }

  function adminContent() {
    if (page === 'dashboard') return adminDashboard();
    if (page === 'users') return adminList('users');
    if (page === 'sellers') return adminList('sellers');
    if (page === 'laporan_sampah') return adminList('reports');
    if (page === 'mini_market') return adminList('market');
    if (page === 'payment_verifications') return adminList('payments');
    if (page === 'transaksi') return adminList('transactions');
    if (page === 'aktivitas') return `<section class="panel"><div class="panel-header"><div><h2>Aktivitas Sistem</h2><p>Audit trail aktivitas platform.</p></div></div>${toolbar('Cari aktivitas...', '<select class="select"><option>Semua tipe</option></select><select class="select"><option>Semua role</option></select>')}</section><section class="panel">${table(['Waktu', 'Aktor', 'Role', 'Aktivitas', 'Modul', 'Detail'], activities.map((a) => `<tr><td>${a.waktu}</td><td>${text(a.aktor)}</td><td>${badge(a.role)}</td><td>${text(a.aktivitas)}</td><td>${text(a.modul)}</td><td>${text(a.detail)}</td></tr>`))}</section>`;
    if (page === 'pengaturan') return settings('admin');
    if (page === 'user_detail') return detailPanel('Detail User', [['ID User', users[0].id], ['Nama', text(users[0].nama)], ['Email', text(users[0].email)], ['Role', badge(users[0].role)], ['Status', badge(users[0].status)], ['Total Poin', String(users[0].poin)]], 'admin', 'users');
    if (page === 'seller_detail') return detailPanel('Detail Seller', [['ID Seller', sellers[0].id], ['Nama Toko', text(sellers[0].toko)], ['Pemilik', text(sellers[0].pemilik)], ['Email', text(sellers[0].email)], ['Status Verifikasi', badge(sellers[0].verifikasi)], ['Status Toko', badge(sellers[0].status)]], 'admin', 'sellers');
    if (page === 'laporan_detail') return reportDetail('admin', 'laporan_sampah');
    if (page === 'product_detail') return productDetail('admin', 'mini_market');
    if (page === 'payment_verification_detail') return detailPanel('Detail Verifikasi Pembayaran', [['ID Pembayaran', 'PAY-7001'], ['Kode Pesanan', transactions[0].id], ['Pembeli', text(transactions[0].pembeli)], ['Total', money(transactions[0].total)], ['Status Pembayaran', badge('menunggu')], ['Status Pesanan', badge(transactions[0].status)]], 'admin', 'payment_verifications');
    if (page === 'transaksi_detail') return detailPanel('Detail Transaksi', [['ID Transaksi', transactions[0].id], ['Pembeli', text(transactions[0].pembeli)], ['Seller', text(transactions[0].seller)], ['Total', money(transactions[0].total)], ['Status', badge(transactions[0].status)], ['Tanggal', transactions[0].tanggal]], 'admin', 'transaksi');
    return adminDashboard();
  }

  function dlhDashboard() {
    const active = reports.filter((item) => ['menunggu', 'diproses'].includes(item.status));
    return `
      <section class="seller-hero">
        <div class="seller-hero-content"><h2>Monitoring Lingkungan Aktif</h2><p>Pantau laporan masyarakat dan tindak lanjut sampah secara real-time untuk lingkungan yang lebih bersih.</p><div class="hero-cta-row"><a class="btn btn-secondary" href="${link('dlh', 'peta_lokasi')}">Lihat Peta Monitoring</a><a class="btn btn-primary" href="${link('dlh', 'laporan')}">Verifikasi Laporan</a></div></div>
        <div class="seller-hero-ellipse seller-hero-ellipse-fill" aria-hidden="true"></div><div class="seller-hero-ellipse seller-hero-ellipse-ring" aria-hidden="true"></div><img class="seller-hero-illustration" src="assets/images/ilust_dlh.png" alt="Ilustrasi DLH ReWorth">
      </section>
      <div class="stat-grid">${statCard('Laporan Baru', reports.filter((r) => r.status === 'menunggu').length, 'Perlu verifikasi awal')}${statCard('Diproses', reports.filter((r) => r.status === 'diproses').length, 'Sedang ditangani petugas')}${statCard('Selesai', reports.filter((r) => r.status === 'selesai').length, 'Sudah ditindaklanjuti')}${statCard('Titik Sampah Aktif', active.length, 'Koordinat valid')}</div>
      <div class="two-col-grid"><section class="panel map-card"><div class="map-toolbar"><div class="panel-header" style="margin:0;"><div><h2>Peta Monitoring Ringkas</h2><p>Titik menunggu dan diproses.</p></div><a class="btn btn-secondary" href="${link('dlh', 'monitoring')}">Buka Monitoring</a></div></div><div class="map-canvas">${mapHtml(active)}</div></section><section class="panel"><div class="panel-header"><h2>Tingkat Keparahan</h2></div><div class="quick-cards"><article class="quick-card"><strong>2</strong><span>Ringan</span></article><article class="quick-card"><strong>1</strong><span>Sedang</span></article><article class="quick-card"><strong>2</strong><span>Parah</span></article></div><div class="map-legend" style="margin-top:14px;"><span><i class="dot dot-light"></i> Ringan</span><span><i class="dot dot-medium"></i> Sedang</span><span><i class="dot dot-high"></i> Parah</span></div></section></div>
      <section class="panel"><div class="panel-header"><div><h2>Laporan Terbaru</h2><p>Ringkasan laporan masuk dari masyarakat.</p></div><a class="btn btn-secondary" href="${link('dlh', 'laporan')}">Lihat Semua</a></div><div class="report-list">${reports.map(reportCard).join('')}</div></section>
    `;
  }

  function reportCard(r) {
    return `<article class="report-item"><img class="report-thumb" src="assets/images/logo_reworth.jpeg" alt="Foto laporan"><div><h3>#${r.id} - ${text(r.jalan)}</h3><p>${text(r.kelurahan)}, ${text(r.kecamatan)} | ${text(r.tanggal)}</p><div class="report-meta">${severityBadge(r.tingkat)}${badge(r.status)}<a class="btn btn-secondary" href="${link('dlh', 'laporan_detail')}">Detail</a></div></div></article>`;
  }

  function dlhContent() {
    if (page === 'dashboard') return dlhDashboard();
    if (page === 'monitoring') return `<section class="panel"><div class="panel-header"><div><h2>Monitoring</h2><p>Pantau laporan dan kondisi lingkungan secara real-time.</p></div></div>${toolbar('Cari lokasi atau ID laporan...', '<select class="select"><option>Semua tingkat</option></select><select class="select"><option>Semua status</option></select>')}</section><div class="split-grid"><section class="panel map-card"><div class="map-toolbar"><div class="map-legend"><span><i class="dot dot-light"></i> Ringan</span><span><i class="dot dot-medium"></i> Sedang</span><span><i class="dot dot-high"></i> Parah</span></div></div><div class="map-canvas">${mapHtml(reports)}</div></section><section class="panel"><div class="panel-header"><h2>Laporan Aktif</h2>${badge('diproses')}</div><div class="report-list">${reports.filter((r) => r.status !== 'selesai').map(reportCard).join('')}</div></section></div>`;
    if (page === 'laporan') return `<section class="panel"><div class="panel-header"><div><h2>Laporan Sampah</h2><p>Verifikasi dan kelola laporan masyarakat.</p></div></div>${toolbar('Cari ID, lokasi, pelapor...', '<select class="select"><option>Semua status</option></select><select class="select"><option>Semua tingkat</option></select>')}</section><section class="panel"><div class="tabs" style="margin-bottom:14px;"><a class="tab active">Semua</a><a class="tab">Menunggu</a><a class="tab">Diproses</a><a class="tab">Selesai</a><a class="tab">Ditolak</a></div>${reportTable('dlh')}</section>`;
    if (page === 'laporan_detail') return reportDetail('dlh', 'laporan');
    if (page === 'peta_lokasi') return `<section class="panel"><div class="panel-header"><div><h2>Peta Lokasi</h2><p>Lihat sebaran titik laporan sampah di wilayah kota.</p></div></div>${toolbar('Cari lokasi...', '<select class="select"><option>Semua tingkat</option></select><select class="select"><option>Status aktif</option></select>')}</section><section class="panel map-card"><div class="map-toolbar"><div class="quick-cards"><article class="quick-card"><strong>${reports.length}</strong><span>Total Titik</span></article><article class="quick-card"><strong>2</strong><span>Ringan</span></article><article class="quick-card"><strong>1</strong><span>Sedang</span></article><article class="quick-card"><strong>2</strong><span>Parah</span></article></div></div><div class="map-canvas" style="height:560px;">${mapHtml(reports)}</div></section>`;
    if (page === 'petugas') return `<section class="panel"><div class="panel-header"><div><h2>Petugas</h2><p>Kelola data petugas lapangan.</p></div><a class="btn btn-primary" href="${link('dlh', 'petugas_form')}">Tambah Petugas</a></div>${toolbar('Cari petugas...', '<select class="select"><option>Semua status</option></select><select class="select"><option>Semua tim</option></select>')}</section><section class="panel">${table(['Nama Petugas', 'Tim', 'Wilayah', 'Kontak', 'Status', 'Aksi'], officers.map((o) => `<tr><td>${text(o.nama)}</td><td>${text(o.tim)}</td><td>${text(o.wilayah)}</td><td>${text(o.kontak)}</td><td>${badge(o.status)}</td><td><a class="btn btn-secondary" href="${link('dlh', 'petugas_form')}">Edit</a></td></tr>`))}</section>`;
    if (page === 'petugas_form') return formPage('Tambah Petugas', 'Data petugas lapangan', [['Nama Petugas', 'Rudi Hartono'], ['Tim', 'Tim A'], ['Wilayah', 'Lowokwaru'], ['Kontak', '0812-1111-2222']], 'dlh', 'petugas');
    if (page === 'riwayat') return `<section class="panel"><div class="panel-header"><div><h2>Riwayat</h2><p>Laporan yang selesai atau ditolak.</p></div></div>${toolbar('Cari laporan...', '<select class="select"><option>Selesai</option></select>')}</section><section class="panel">${reportTable('dlh')}</section>`;
    if (page === 'pengaturan') return settings('dlh');
    if (page === 'reporters') return `<div class="stat-grid">${statCard('Total Pelapor Terdaftar', '128', 'Masyarakat')}${statCard('Pelapor Aktif', '96', 'Status aktif')}</div><section class="panel"><div class="panel-header"><div><h2>Daftar Pelapor Terdaftar</h2><p>Data masyarakat pelapor.</p></div></div>${table(['ID', 'Nama Pelapor', 'Email', 'Alamat', 'Total Laporan', 'Status'], users.slice(0, 4).map((u) => `<tr><td>${u.id}</td><td>${text(u.nama)}</td><td>${text(u.email)}</td><td>Bandung</td><td>${u.laporan} Laporan</td><td>${badge(u.status)}</td></tr>`))}</section>`;
    return dlhDashboard();
  }

  function sellerDashboard() {
    return `
      <section class="seller-hero"><div class="seller-hero-content"><h2>Eco Craft Aktif</h2><p>Kelola toko, produk, dan pesanan Anda langsung dari tampilan dashboard seller.</p><a class="btn btn-secondary" href="${link('seller', 'store_profile')}">Lihat Profil Toko</a></div><div class="seller-hero-ellipse seller-hero-ellipse-fill" aria-hidden="true"></div><div class="seller-hero-ellipse seller-hero-ellipse-ring" aria-hidden="true"></div><img class="seller-hero-illustration" src="assets/images/ilustrasi.png" alt="Ilustrasi seller ReWorth"></section>
      <div class="stat-grid">${statCard('Pendapatan Bersih', money(410000), 'Setelah fee platform checkout')}${statCard('Pesanan Baru', 2, 'Perlu diproses')}${statCard('Produk Aktif', 2, 'Tayang di market')}${statCard('Saldo Tersedia', money(410000), 'Net seller dari pesanan selesai')}</div>
      <div class="content-grid"><section class="panel"><div class="panel-header"><div><h2>Grafik Penjualan 30 Hari Terakhir</h2><p>Ringkasan akan bertambah seiring transaksi toko.</p></div></div><div class="chart-placeholder"><div><strong>Data transaksi seller sudah tersinkron</strong><p class="panel-subtitle">Grafik detail bisa ditambahkan setelah data real tersedia.</p></div></div></section><section class="panel"><div class="panel-header"><h2>Produk Perlu Perhatian</h2></div><div class="attention-list">${products.filter((p) => p.stok <= 9).map((p) => `<div class="attention-item"><div><strong>${text(p.nama)}</strong><p class="panel-subtitle">Stok tersisa ${p.stok}</p></div><a class="btn btn-secondary" href="${link('seller', 'product_detail')}">Cek</a></div>`).join('')}</div></section></div>
      <section class="panel"><div class="panel-header"><h2>Pesanan Terbaru</h2><a class="btn btn-secondary" href="${link('seller', 'orders')}">Lihat Semua</a></div>${sellerOrderTable()}</section>
    `;
  }

  function sellerOrderTable() {
    return table(['ID Pesanan', 'Pembeli', 'Tanggal', 'Status', 'Net Seller', 'Aksi'], sellerOrders.map((order) => `<tr><td>${order.id}</td><td>${text(order.pembeli)}</td><td>${order.tanggal}</td><td>${badge(order.status)}</td><td>${money(order.total)}</td><td><a class="btn btn-secondary" href="${link('seller', 'order_detail')}">Detail</a></td></tr>`));
  }

  function sellerContent() {
    if (page === 'dashboard') return sellerDashboard();
    if (page === 'products') return `<section class="panel"><div class="panel-header"><div><h2>Produk</h2><p>Kelola semua produk toko Anda.</p></div><a class="btn btn-primary" href="${link('seller', 'product_form')}">Tambah Produk</a></div>${toolbar('Cari produk', '<select class="select"><option>Semua kategori</option></select><select class="select"><option>Semua status</option></select>')}<div class="product-grid" style="margin-top:18px;">${products.map(productCard).join('')}</div></section>`;
    if (page === 'product_detail') return productDetail('seller', 'products');
    if (page === 'product_form') return formPage('Tambah Produk', 'Kelola informasi produk toko.', [['Nama Produk', products[0].nama], ['Kategori', products[0].kategori], ['Harga', money(products[0].harga)], ['Stok', String(products[0].stok)]], 'seller', 'products');
    if (page === 'orders') return `<section class="panel"><div class="panel-header"><div><h2>Pesanan</h2><p>Kelola semua pesanan toko Anda.</p></div></div><div class="tabs" style="margin-bottom:14px;"><a class="tab active">Semua</a><a class="tab">Diproses</a><a class="tab">Dikemas</a><a class="tab">Dikirim</a><a class="tab">Selesai</a></div>${sellerOrderTable()}</section>`;
    if (page === 'order_detail') return detailPanel('Detail Pesanan', [['ID Pesanan', sellerOrders[0].id], ['Pembeli', text(sellerOrders[0].pembeli)], ['Tanggal', sellerOrders[0].tanggal], ['Status', badge(sellerOrders[0].status)], ['Net Seller', money(sellerOrders[0].total)], ['Alamat', 'Jl. Soekarno Hatta No. 45']], 'seller', 'orders');
    if (page === 'customers') return `<div class="stat-grid">${statCard('Total Pelanggan', 3, 'Dari pesanan toko')}${statCard('Repeat Order', 1, 'Pelanggan dengan pesanan > 1')}${statCard('Total Pesanan', 4, 'Akumulasi order')}${statCard('Total Belanja', money(465000), 'Akumulasi penjualan')}</div><section class="panel"><div class="panel-header"><div><h2>Pelanggan</h2><p>Pembeli yang pernah bertransaksi dengan toko Anda.</p></div></div>${table(['Nama Pelanggan', 'Email', 'Jumlah Pesanan', 'Total Belanja', 'Terakhir Belanja'], users.slice(0, 3).map((u, idx) => `<tr><td>${text(u.nama)}</td><td>${text(u.email)}</td><td>${idx + 1}</td><td>${money((idx + 1) * 65000)}</td><td>2026-05-${30 - idx}</td></tr>`))}</section>`;
    if (page === 'transactions') return `<section class="balance-card"><span>Saldo Tersedia</span><strong>${money(410000)}</strong><button class="btn btn-secondary" type="button" disabled>Tarik Saldo</button></section><section class="panel"><div class="panel-header"><div><h2>Riwayat Transaksi</h2><p>Mutasi saldo dari pesanan selesai.</p></div></div>${transactionTable('seller')}</section>`;
    if (page === 'store_profile') return storeProfile();
    return sellerDashboard();
  }

  function productCard(p) {
    return `<article class="product-card"><div class="product-card-media" style="padding:0;overflow:hidden;"><img src="assets/images/logo_reworth.jpeg" alt="${text(p.nama)}" style="width:100%;height:100%;object-fit:cover;"></div><div class="product-card-body"><div class="panel-header" style="margin-bottom:10px;"><div><h3>${text(p.nama)}</h3><p>${text(p.kategori)}</p></div>${badge(p.status)}</div><div class="product-meta"><span>Harga<br><strong>${money(p.harga)}</strong></span><span>Stok<br><strong>${p.stok}</strong></span></div><div class="card-actions"><a class="btn btn-secondary" href="${link('seller', 'product_detail')}">Detail</a><a class="btn btn-secondary" href="${link('seller', 'product_form')}">Edit</a><button class="btn btn-danger" type="button">Hapus</button></div></div></article>`;
  }

  function productDetail(backRole, backPage) {
    const p = products[0];
    return detailPanel('Detail Produk', [['ID Produk', p.id], ['Nama Produk', text(p.nama)], ['Seller', text(p.seller)], ['Kategori', text(p.kategori)], ['Harga', money(p.harga)], ['Stok', String(p.stok)], ['Status', badge(p.status)]], backRole, backPage);
  }

  function reportDetail(backRole, backPage) {
    const r = reports[0];
    return detailPanel('Detail Laporan', [['ID Laporan', '#' + r.id], ['Pelapor', text(r.pelapor)], ['Lokasi', text(r.jalan)], ['Kecamatan', text(r.kecamatan)], ['Jenis Sampah', text(r.jenis)], ['Tingkat', severityBadge(r.tingkat)], ['Status', badge(r.status)], ['Deskripsi', text(r.deskripsi)]], backRole, backPage);
  }

  function formPage(title, subtitle, fields, backRole, backPage) {
    return `<section class="form-card"><div class="panel-header"><div><h2>${text(title)}</h2><p>${text(subtitle)}</p></div><a class="btn btn-secondary" href="${link(backRole, backPage)}">Batal</a></div><form class="form-stack" onsubmit="event.preventDefault()"><div class="form-grid">${fields.map(([name, value]) => `<label class="form-field"><span>${text(name)}</span><input value="${text(value)}"></label>`).join('')}</div><label class="form-field"><span>Catatan</span><textarea>Data ini hanya mock frontend statis.</textarea></label><div class="toolbar"><span></span><button class="btn btn-primary" type="submit">Simpan Perubahan</button></div></form></section>`;
  }

  function settings(kind) {
    const isSeller = kind === 'seller';
    const labels = isSeller ? ['Profil Toko', 'Alamat Toko', 'Rekening Bank', 'Pengiriman'] : kind === 'admin' ? ['Profil Admin', 'Profil Sistem', 'Notifikasi', 'Keamanan'] : ['Profil Instansi', 'Akun', 'Notifikasi', 'Keamanan'];
    return `<div class="settings-layout"><nav class="settings-tabs">${labels.map((item, idx) => `<a class="${idx === 0 ? 'active' : ''}" href="#">${text(item)}</a>`).join('')}</nav><form class="form-stack" onsubmit="event.preventDefault()"><section class="form-card"><div class="panel-header"><h2>${text(labels[0])}</h2></div><div class="form-grid"><label class="form-field"><span>Nama</span><input value="${isSeller ? 'Eco Craft' : profiles[kind].nama}"></label><label class="form-field"><span>Email</span><input value="${profiles[kind]?.email || 'seller@reworth.app'}"></label><label class="form-field"><span>Telepon</span><input value="0812-0000-0000"></label><label class="form-field"><span>Status</span><input value="Aktif"></label></div><label class="form-field" style="margin-top:16px;"><span>Deskripsi</span><textarea>Dashboard frontend statis ReWorth.</textarea></label></section><div class="toolbar"><span></span><button class="btn btn-primary" type="submit">Simpan Perubahan</button></div></form></div>`;
  }

  function storeProfile() {
    return settings('seller');
  }

  const content = role === 'admin' ? adminContent() : role === 'dlh' ? dlhContent() : sellerContent();
  document.getElementById('dashboard-root').innerHTML = shell(content);
})();
