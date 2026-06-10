const ROUTES = {
  'welcome': '/pages/welcome.html',
  'login': '/pages/login.html',
  'register': '/pages/register.html',
  'home': '/pages/home.html',
  'report': '/pages/report.html',
  'report-history': '/pages/report-history.html',
  'market': '/pages/market.html',
  'product-detail': '/pages/product-detail.html',
  'wishlist': '/pages/wishlist.html',
  'cart': '/pages/cart.html',
  'checkout': '/pages/checkout.html',
  'qris-payment': '/pages/qris-payment.html',
  'order-history': '/pages/order-history.html',
  'profile': '/pages/profile.html',
  'profile-edit': '/pages/profile-edit.html',
  'address': '/pages/address.html',
  'payment-method': '/pages/payment-method.html',
  'bank-account-detail': '/pages/bank-account-detail.html',
  'rewards': '/pages/rewards.html',
  'seller-registration': '/pages/seller-registration.html',
  'seller-application': '/pages/seller-application.html',
  'seller-application-detail': '/pages/seller-application-detail.html',
  'notifications': '/pages/notifications.html'
};

const API_BASE = '/backend/api';

async function loadPartial(root) {
  const partialUrl = root.dataset.partial;
  if (!partialUrl) {
    return;
  }

  if (root.children.length > 0 || root.textContent.trim() !== '') {
    return;
  }

  const response = await fetch(partialUrl, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load ${partialUrl}`);
  }

  root.innerHTML = await response.text();
}

async function fetchApiJson(endpoint) {
  if (window.location.protocol === 'file:') {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      cache: 'no-store',
      credentials: 'same-origin',
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn(`API unavailable: ${endpoint}`, error);
    return null;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatRelativeTime(value) {
  const timestamp = new Date(value);
  if (Number.isNaN(timestamp.getTime())) {
    return '';
  }

  const diff = Date.now() - timestamp.getTime();
  const minutes = Math.max(1, Math.round(diff / 60000));
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.round(hours / 24);
  return `${days} hari lalu`;
}

function setInteractive(element, handler) {
  if (!element) {
    return;
  }

  element.style.cursor = 'pointer';
  element.setAttribute('role', 'button');
  if (!element.hasAttribute('tabindex')) {
    element.tabIndex = 0;
  }
  element.addEventListener('click', (event) => {
    event.preventDefault();
    handler(event);
  });
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handler(event);
    }
  });
}

function go(path) {
  window.location.href = path;
}

function bind(page, selector, path) {
  document.querySelectorAll(selector).forEach((el) => {
    setInteractive(el, () => go(path));
  });
}

function bindElement(element, path) {
  setInteractive(element, () => go(path));
}

function bindPageNavigation(page) {
  const nav = {
    welcome: [
      ['.pill-button', ROUTES.login],
      ['.auth-link strong', ROUTES.register],
    ],
    login: [
      ['.button--neon', ROUTES.home],
      ['.auth-link strong', ROUTES.register],
    ],
    register: [
      ['.button--neon', ROUTES.home],
      ['.auth-link strong', ROUTES.login],
    ],
    home: [
      ['.banner', ROUTES.report],
      ['.point-card', ROUTES.rewards],
      ['.point-card__button', ROUTES.rewards],
      ['.feature-grid .feature-card:nth-child(1)', ROUTES.report],
      ['.feature-grid .feature-card:nth-child(2)', ROUTES.market],
      ['.feature-card', ROUTES.report],
      ['.product-strip .product-card', ROUTES['product-detail']],
      ['.product-strip .product-card:nth-child(1)', ROUTES['product-detail']],
      ['.product-strip .product-card:nth-child(2)', ROUTES['product-detail']],
      ['.product-card__cart', ROUTES.cart],
      ['.nav-shell__item:nth-child(1)', ROUTES.home],
      ['.nav-shell__item:nth-child(2)', ROUTES.report],
      ['.nav-shell__item:nth-child(3)', ROUTES.market],
      ['.nav-shell__item:nth-child(4)', ROUTES.profile],
      ['.icon-chip', ROUTES.notifications],
    ],
    report: [
      ['.back-button', ROUTES.home],
      ['.button--neon', ROUTES['report-history']],
      ['.nav-shell__item:nth-child(1)', ROUTES.home],
      ['.nav-shell__item:nth-child(2)', ROUTES.report],
      ['.nav-shell__item:nth-child(3)', ROUTES.market],
      ['.nav-shell__item:nth-child(4)', ROUTES.profile],
    ],
    market: [
      ['.back-button', ROUTES.home],
      ['.hero-brand .icon-chip:nth-child(1)', ROUTES.wishlist],
      ['.hero-brand .icon-chip:nth-child(2)', ROUTES.cart],
      ['.banner', ROUTES['seller-registration']],
      ['.banner__cta', ROUTES['seller-registration']],
      ['.wishlist-grid .wishlist-card:nth-child(1)', ROUTES['product-detail']],
      ['.wishlist-grid .wishlist-card:nth-child(2)', ROUTES['product-detail']],
      ['.nav-shell__item:nth-child(1)', ROUTES.home],
      ['.nav-shell__item:nth-child(2)', ROUTES.report],
      ['.nav-shell__item:nth-child(3)', ROUTES.market],
      ['.nav-shell__item:nth-child(4)', ROUTES.profile],
    ],
    'product-detail': [
      ['.button--light', ROUTES.cart],
      ['.button--neon', ROUTES.checkout],
    ],
    wishlist: [
      ['.back-button', ROUTES.market],
    ],
    cart: [
      ['.back-button', ROUTES.market],
      ['.button--light', ROUTES.checkout],
    ],
    checkout: [
      ['.back-button', ROUTES.cart],
      ['.summary-card:nth-child(1)', ROUTES.address],
      ['.summary-card:nth-child(2)', ROUTES['payment-method']],
      ['.summary-card:nth-child(3)', ROUTES['payment-method']],
      ['.button--neon', ROUTES['qris-payment']],
    ],
    'qris-payment': [
      ['.back-button', ROUTES.checkout],
      ['.button--ghost', ROUTES.market],
    ],
    'order-history': [
      ['.back-button', ROUTES.profile],
      ['.order-item', ROUTES['qris-payment']],
    ],
    profile: [
      ['.back-button', ROUTES.home],
      ['.menu-item:nth-child(1)', ROUTES.rewards],
      ['.menu-item:nth-child(2)', ROUTES['order-history']],
      ['.menu-item:nth-child(3)', ROUTES['report-history']],
      ['.menu-item:nth-child(4)', ROUTES['payment-method']],
      ['.menu-item:nth-child(5)', ROUTES.address],
      ['.menu-item:nth-child(6)', ROUTES['profile-edit']],
      ['.menu-item:nth-child(7)', ROUTES['seller-application-detail']],
      ['.menu-item:nth-child(8)', ROUTES.login],
      ['.nav-shell__item:nth-child(1)', ROUTES.home],
      ['.nav-shell__item:nth-child(2)', ROUTES.report],
      ['.nav-shell__item:nth-child(3)', ROUTES.market],
      ['.nav-shell__item:nth-child(4)', ROUTES.profile],
    ],
    'profile-edit': [
      ['.back-button', ROUTES.profile],
      ['.button--neon', ROUTES.profile],
    ],
    address: [
      ['.back-button', ROUTES.profile],
      ['.address-item', ROUTES['profile-edit']],
      ['.floating-cta', ROUTES.address],
    ],
    'payment-method': [
      ['.back-button', ROUTES.profile],
      ['.bank-item', ROUTES['bank-account-detail']],
      ['.floating-cta', ROUTES['bank-account-detail']],
    ],
    'bank-account-detail': [
      ['.back-button', ROUTES['payment-method']],
      ['.button--ghost', ROUTES['payment-method']],
    ],
    rewards: [
      ['.back-button', ROUTES.profile],
      ['.reward-item', ROUTES.rewards],
    ],
    'seller-registration': [
      ['.back-button', ROUTES.profile],
      ['.button--neon', ROUTES['seller-application-detail']],
    ],
    'seller-application': [
      ['.back-button', ROUTES.profile],
      ['.summary-card:nth-child(1)', ROUTES['payment-method']],
      ['.summary-card:nth-child(2)', ROUTES['seller-registration']],
    ],
    'seller-application-detail': [
      ['.back-button', ROUTES.profile],
      ['.button--neon', ROUTES['seller-registration']],
    ],
    notifications: [
      ['.back-button', ROUTES.home],
    ],
    'report-history': [
      ['.back-button', ROUTES.profile],
      ['.order-item', ROUTES.report],
    ],
  };

  (nav[page] || []).forEach(([selector, path]) => bind(page, selector, path));

  if (page === 'home') {
    const actions = document.querySelectorAll('.section-row__action');
    bindElement(actions[0], ROUTES.market);
    bindElement(actions[1], ROUTES['report-history']);
  }

  if (page === 'product-detail') {
    const backs = document.querySelectorAll('.top-row .back-button');
    bindElement(backs[0], ROUTES.market);
    bindElement(backs[1], ROUTES.wishlist);
  }
}

function getFallbackArtClass(index) {
  return ['art-shell', 'art-enzyme', 'art-trash'][index % 3];
}

function getFallbackThumbClass(index) {
  return ['thumb--shell', 'thumb--enzyme', 'thumb--bag'][index % 3];
}

function renderProductStrip(products) {
  return products
    .map((product, index) => {
      const imageStyle = product.gambar_url
        ? ` style="background-image:url(${JSON.stringify(product.gambar_url)});background-size:cover;background-position:center;"`
        : '';
      const fallbackClass = getFallbackArtClass(index);

      return `
            <div class="product-card" data-product-id="${escapeHtml(product.id_produk ?? index)}">
              <div class="product-card__art ${fallbackClass}"${imageStyle}></div>
              <p class="product-card__title">${escapeHtml(product.nama_produk ?? 'Produk')}</p>
              <p class="product-card__price">${formatCurrency(product.harga ?? 0)}</p>
              <div class="product-card__cart">🛒</div>
            </div>`;
    })
    .join('');
}

function renderMarketGrid(products) {
  return products
    .map((product, index) => {
      const thumbClass = getFallbackThumbClass(index);
      const imageStyle = product.gambar_url
        ? ` style="background-image:url(${JSON.stringify(product.gambar_url)});background-size:cover;background-position:center;"`
        : '';

      return `
            <div class="wishlist-card" data-product-id="${escapeHtml(product.id_produk ?? index)}">
              <div class="wishlist-item__art thumb ${thumbClass}"${imageStyle}>
                <div class="wishlist-item__favorite">♥</div>
              </div>
              <div class="wishlist-card__body">
                <p class="item-title">${escapeHtml(product.nama_produk ?? 'Produk')}</p>
                <p class="mini-store mini-store--dark">🏪 ${escapeHtml(product.nama_toko ?? 'Toko ReWorth')}</p>
                <div class="price-row">
                  <p class="item-price">${formatCurrency(product.harga ?? 0)}</p>
                  <div class="circle-button" style="background:#e8eed8;color:#193226;font-size:18px;">🛒</div>
                </div>
              </div>
            </div>`;
    })
    .join('');
}

function renderActivityRows(orders) {
  if (!orders.length) {
    return '';
  }

  return orders
    .slice(0, 2)
    .map((order, index) => {
      const status = String(order.status_pesanan ?? 'Pesanan baru');
      const time = formatRelativeTime(order.tanggal_pesanan);
      const total = formatCurrency(order.total_bayar ?? 0);
      const icon = index === 0 ? '🛍' : '⌛';
      return `
            <div class="activity-row">
              <div class="activity-row__icon">${icon}</div>
              <div>
                <p class="activity-row__title">${escapeHtml(status)}</p>
                <p class="activity-row__text">${escapeHtml(order.kode_pesanan ?? 'Transaksi mini market')}</p>
              </div>
              <div class="activity-row__value">${escapeHtml(total)}</div>
              <div class="activity-row__time">${escapeHtml(time || 'baru saja')}</div>
            </div>`;
    })
    .join('');
}

function renderRewardItems(items) {
  return items
    .map((item, index) => {
      const gradient =
        index % 2 === 0
          ? 'linear-gradient(145deg,#e5f0db,#bfd6ac)'
          : 'linear-gradient(145deg,#f0eadb,#d9d3b0)';
      return `
            <div class="reward-item" style="background:${gradient}; color:#20372e;">
              <div class="summary-row">
                <div style="display:flex;gap:12px;align-items:center;">
                  <div class="icon-chip" style="background:#fff;color:#1f5e23;">🎁</div>
                  <div>
                    <p class="item-title" style="color:#193226;">${escapeHtml(item.title ?? 'Reward')}</p>
                    <p class="item-subtitle" style="color:rgba(25,50,38,.70);">${escapeHtml(item.status ?? 'Hadiah populer')}</p>
                  </div>
                </div>
                <span class="badge badge--success" style="background:#1f5e23;color:#fff;">${escapeHtml(item.cost ?? 0)} poin</span>
              </div>
            </div>`;
    })
    .join('');
}

async function hydrateHome(root) {
  const data = await fetchApiJson('home.php');
  if (!data?.ok) {
    return;
  }

  if (data.user?.nama) {
    const nameEl = root.querySelector('.hero-copy .name');
    if (nameEl) {
      nameEl.textContent = data.user.nama;
    }
  }

  const pointValue = root.querySelector('.point-card__value');
  if (pointValue) {
    pointValue.textContent = String(data.user?.poin ?? 0);
  }

  const pointSub = root.querySelector('.point-card__sub');
  if (pointSub) {
    pointSub.textContent = `${data.report_count ?? 0} laporan tervalidasi`;
  }

  const pointButton = root.querySelector('.point-card__button');
  if (pointButton) {
    pointButton.textContent = 'Tukar Poin';
  }

  const missionStat = root.querySelector('.mission-card__stat');
  if (missionStat) {
    const reportCount = Number(data.report_count ?? 0);
    missionStat.textContent = reportCount > 0 ? '1/1' : '0/1';
  }

  const strip = root.querySelector('.product-strip');
  if (strip && Array.isArray(data.featured_products) && data.featured_products.length > 0) {
    strip.innerHTML = renderProductStrip(data.featured_products);
  }

  const activityCard = root.querySelector('.activity-card');
  if (activityCard && Array.isArray(data.recent_orders) && data.recent_orders.length > 0) {
    activityCard.innerHTML = renderActivityRows(data.recent_orders);
  }
}

function bindMarketSort(root, products) {
  const chips = Array.from(root.querySelectorAll('.sort-chips .chip'));
  if (!chips.length) {
    return;
  }

  const sorters = {
    terlaris: (a, b) => Number(b.stok ?? 0) - Number(a.stok ?? 0),
    termurah: (a, b) => Number(a.harga ?? 0) - Number(b.harga ?? 0),
    terbaru: (a, b) => new Date(b.created_at ?? 0) - new Date(a.created_at ?? 0),
    'stok tersedia': (a, b) => Number(b.stok ?? 0) - Number(a.stok ?? 0),
  };

  const grid = root.querySelector('.wishlist-grid');
  if (!grid) {
    return;
  }

  const applySort = (label) => {
    chips.forEach((chip) => chip.classList.remove('is-active'));
    const activeChip = chips.find((chip) => chip.textContent.trim().toLowerCase() === label);
    if (activeChip) {
      activeChip.classList.add('is-active');
    }

    const sorted = [...products];
    const sorter = sorters[label];
    if (sorter) {
      sorted.sort(sorter);
    }
    grid.innerHTML = renderMarketGrid(sorted);
    bindMarketGrid(root);
  };

  chips.forEach((chip) => {
    setInteractive(chip, () => applySort(chip.textContent.trim().toLowerCase()));
  });
}

function bindMarketGrid(root) {
  root.querySelectorAll('.wishlist-card').forEach((card) => {
    setInteractive(card, () => go(ROUTES['product-detail']));
  });

  root.querySelectorAll('.circle-button').forEach((button) => {
    setInteractive(button, () => go(ROUTES.cart));
  });
}

async function hydrateMarket(root) {
  const data = await fetchApiJson('market.php');
  if (!data?.ok) {
    return;
  }

  if (data.products?.length) {
    const grid = root.querySelector('.wishlist-grid');
    if (grid) {
      grid.innerHTML = renderMarketGrid(data.products);
      bindMarketGrid(root);
      bindMarketSort(root, data.products);
    }
  }

  const nameEl = root.querySelector('.hero-copy .name');
  if (nameEl && data.products?.length) {
    nameEl.textContent = 'Fatma';
  }
}

async function hydrateProfile(root) {
  const data = await fetchApiJson('profile.php');
  const profile = data?.profile;
  if (!profile) {
    return;
  }

  const nameEl = root.querySelector('.profile-top__name');
  if (nameEl) {
    nameEl.textContent = profile.nama_lengkap ?? profile.nama ?? nameEl.textContent;
  }

  const emailEl = root.querySelector('.profile-top__email');
  if (emailEl && profile.email) {
    emailEl.textContent = profile.email;
  }

  const stats = root.querySelectorAll('.stat-card__value');
  if (stats[0]) {
    stats[0].textContent = String(profile.total_poin ?? 0);
  }
  if (stats[1]) {
    stats[1].textContent = String(profile.total_laporan_valid ?? 0);
  }

  const sellerBadge = root.querySelector('.menu-item:nth-child(7) .badge');
  if (sellerBadge && profile.status_pengajuan_seller) {
    sellerBadge.textContent = String(profile.status_pengajuan_seller);
  }
}

async function hydrateRewards(root) {
  const data = await fetchApiJson('rewards.php');
  if (!data?.ok) {
    return;
  }

  const pointValue = root.querySelector('.point-card__value');
  if (pointValue) {
    pointValue.textContent = String(data.points ?? 0);
  }

  const list = root.querySelector('.reward-list');
  if (list && Array.isArray(data.items)) {
    list.innerHTML = renderRewardItems(data.items);
  }
}

async function hydrateNotifications(root) {
  const data = await fetchApiJson('notifications.php');
  if (!data?.ok) {
    return;
  }

  const list = root.querySelector('.cart-list');
  if (!list) {
    return;
  }

  const rows = [];
  for (const report of data.reports ?? []) {
    rows.push({
      icon: report.status_laporan?.toLowerCase().includes('diterima') ? '✓' : '⏲',
      title: report.status_laporan ?? 'Laporan',
      body: [report.jalan, report.kelurahan, report.kecamatan].filter(Boolean).join(', '),
      meta: report.poin_diberikan ? `+${report.poin_diberikan} poin` : 'Sedang diproses',
      time: formatRelativeTime(report.waktu_lapor),
    });
  }

  for (const order of data.orders ?? []) {
    rows.push({
      icon: '🛍',
      title: order.status_pesanan ?? 'Update pesanan',
      body: order.kode_pesanan ?? 'Pesanan terbaru Anda',
      meta: formatCurrency(order.total_bayar ?? 0),
      time: formatRelativeTime(order.tanggal_pesanan),
    });
  }

  if (!rows.length) {
    return;
  }

  list.innerHTML = rows
    .map(
      (row, index) => `
        <div class="notification-card" data-notification-index="${index}">
          <div class="notification-card__icon">${escapeHtml(row.icon)}</div>
          <div>
            <p class="notification-card__title">${escapeHtml(row.title)}</p>
            <p class="notification-card__body">${escapeHtml(row.body)}</p>
            <div class="notification-card__meta">
              <span class="meta-pill">${escapeHtml(row.meta)}</span>
              <span class="meta-time">${escapeHtml(row.time || '')}</span>
            </div>
          </div>
        </div>`
    )
    .join('');

  list.querySelectorAll('.notification-card').forEach((card, index) => {
    setInteractive(card, () => {
      if (index < (data.reports ?? []).length) {
        go(ROUTES['report-history']);
      } else {
        go(ROUTES['order-history']);
      }
    });
  });
}

function hydrateProductDetail(root) {
  const tabs = Array.from(root.querySelectorAll('.tabs .tab'));
  tabs.forEach((tab) => {
    setInteractive(tab, () => {
      tabs.forEach((item) => item.classList.remove('is-active'));
      tab.classList.add('is-active');
    });
  });
}

function hydrateCart(root) {
  const items = Array.from(root.querySelectorAll('.cart-item'));
  const footerTotal = root.querySelector('.cart-footer__total');
  const footerMeta = root.querySelector('.cart-footer__meta');

  const recalc = () => {
    let total = 0;
    let selectedCount = 0;
    let itemCount = 0;

    items.forEach((item) => {
      const checked = item.querySelector('.checkbox');
      const selected = checked?.classList.contains('checkbox--checked');
      const priceText = item.querySelector('.item-price')?.textContent ?? 'Rp 0';
      const quantity = Number(item.querySelector('.stepper__value')?.textContent ?? 1);
      const price = Number(priceText.replace(/[^\d]/g, ''));
      itemCount += quantity;
      if (selected) {
        selectedCount += 1;
        total += price * quantity;
      }
    });

    if (footerTotal) {
      footerTotal.textContent = formatCurrency(total);
    }
    if (footerMeta) {
      footerMeta.textContent = `${selectedCount} produk dipilih - ${itemCount} item`;
    }
  };

  items.forEach((item) => {
    const checkbox = item.querySelector('.checkbox');
    const minus = item.querySelector('.stepper__button--white');
    const plus = item.querySelector('.stepper__button--mint');
    const valueEl = item.querySelector('.stepper__value');

    if (checkbox) {
      setInteractive(checkbox, () => {
        checkbox.classList.toggle('checkbox--checked');
        recalc();
      });
    }

    if (minus && valueEl) {
      setInteractive(minus, () => {
        const next = Math.max(1, Number(valueEl.textContent ?? 1) - 1);
        valueEl.textContent = String(next);
        recalc();
      });
    }

    if (plus && valueEl) {
      setInteractive(plus, () => {
        const next = Number(valueEl.textContent ?? 1) + 1;
        valueEl.textContent = String(next);
        recalc();
      });
    }
  });

  recalc();
}

function renderAddressItems(addresses) {
  return addresses
    .map((item) => {
      const name = item.nama_penerima || 'Pengguna ReWorth';
      const phone = item.no_hp || item.nomor_hp || '-';
      const body = [
        item.jalan,
        item.kelurahan,
        item.kecamatan,
        item.kota,
        item.provinsi,
      ]
        .filter(Boolean)
        .join(', ');
      const marker = item.patokan ? `<br>Patokan: ${escapeHtml(item.patokan)}` : '';

      return `
        <div class="address-item">
          <div class="address-item__header">
            <div>
              <p class="address-item__name">${escapeHtml(name)}</p>
              <p class="address-item__phone">${escapeHtml(phone)}</p>
            </div>
            <span class="badge badge--dark">${item.alamat_utama || item.is_default || item.utama ? 'Utama' : 'Alamat'}</span>
          </div>
          <p class="address-item__body">${escapeHtml(body)}${marker}</p>
        </div>`;
    })
    .join('');
}

function renderBankItems(cards) {
  return cards
    .map((item) => `
      <div class="bank-item">
        <div class="bank-item__header">
          <div style="display:flex;gap:12px;align-items:center;">
            <div class="bank-item__logo">▣</div>
            <div>
              <p class="bank-item__name">${escapeHtml(item.nama_bank || 'Bank')}</p>
              <p class="bank-item__number">•••• •••• ${escapeHtml(item.last4_digit || '0000')}</p>
            </div>
          </div>
          <span class="badge badge--success">${item.kartu_utama ? 'Utama' : 'Aktif'}</span>
        </div>
      </div>`)
    .join('');
}

function renderOrderHistoryItems(orders) {
  return orders
    .map((order) => `
      <div class="order-item">
        <div class="order-item__row">
          <div class="thumb thumb--shell"></div>
          <div>
            <p class="item-title">${escapeHtml(order.kode_pesanan || 'Pesanan')}</p>
            <p class="item-subtitle">${escapeHtml(order.status_pesanan || 'Status pesanan')}</p>
            <div class="chip is-active" style="display:inline-flex;margin-top:8px;">${escapeHtml(order.status_pesanan || 'Aktif')}</div>
          </div>
          <div style="text-align:right;">
            <p class="item-price">${formatCurrency(order.total_bayar ?? 0)}</p>
            <p class="price-sub">${escapeHtml(formatRelativeTime(order.tanggal_pesanan) || '')}</p>
          </div>
        </div>
        <div class="button button--neon" style="min-height:54px;">Lihat Detail Lengkap ▾</div>
      </div>`)
    .join('');
}

function renderReportHistoryItems(reports) {
  return reports
    .map((report) => `
      <div class="order-item">
        <div class="order-item__row">
          <div class="thumb thumb--bag"></div>
          <div>
            <p class="item-title">${escapeHtml(report.status_laporan || 'Laporan')}</p>
            <p class="item-subtitle">${escapeHtml([report.jalan, report.kelurahan, report.kecamatan].filter(Boolean).join(', '))}</p>
            <div class="chip is-active" style="display:inline-flex;margin-top:8px;">${escapeHtml(report.status_laporan || 'Aktif')}</div>
          </div>
          <div style="text-align:right;">
            <p class="item-price">${report.poin_diberikan ? `+${escapeHtml(report.poin_diberikan)} poin` : '0 poin'}</p>
            <p class="price-sub">${escapeHtml(formatRelativeTime(report.waktu_lapor) || '')}</p>
          </div>
        </div>
        <div class="button button--neon" style="min-height:52px;">Lihat Detail Lengkap ▾</div>
      </div>`)
    .join('');
}

async function hydrateAddress(root) {
  const data = await fetchApiJson('addresses.php');
  const list = root.querySelector('.address-list');
  if (list && Array.isArray(data?.addresses) && data.addresses.length > 0) {
    list.innerHTML = renderAddressItems(data.addresses);
  }
}

async function hydratePaymentMethod(root) {
  const data = await fetchApiJson('payments.php');
  const list = root.querySelector('.bank-list');
  if (list && Array.isArray(data?.payment_cards) && data.payment_cards.length > 0) {
    list.innerHTML = renderBankItems(data.payment_cards);
  }
}

async function hydrateOrderHistory(root) {
  const data = await fetchApiJson('orders.php');
  const list = root.querySelector('.order-list');
  if (list && Array.isArray(data?.orders) && data.orders.length > 0) {
    list.innerHTML = renderOrderHistoryItems(data.orders);
  }
}

async function hydrateReportHistory(root) {
  const data = await fetchApiJson('notifications.php');
  const list = root.querySelector('.order-list');
  if (list && Array.isArray(data?.reports) && data.reports.length > 0) {
    list.innerHTML = renderReportHistoryItems(data.reports);
  }
}

async function hydrateSellerApplication(root) {
  const data = await fetchApiJson('seller.php');
  const applications = Array.isArray(data?.applications) ? data.applications : [];
  if (!applications.length) {
    return;
  }

  const latest = applications[0];
  const status = String(latest.status_pengajuan ?? latest.status ?? 'Pending');
  const sellerText = root.querySelector('.seller-card__text');
  const badge = root.querySelector('.seller-card .badge');
  const nameEl = root.querySelector('.menu-item__title');

  if (nameEl && latest.nama_toko_usulan) {
    nameEl.textContent = latest.nama_toko_usulan;
  }
  if (sellerText) {
    sellerText.textContent = `Status: ${status}`;
  }
  if (badge) {
    badge.textContent = status;
  }
}

async function init() {
  const root = document.getElementById('page-root');
  if (!root) {
    return;
  }

  await loadPartial(root);

  const page = document.body.dataset.page || 'welcome';
  document.title = document.body.dataset.title || document.title;
  await (async () => {
    switch (page) {
      case 'home':
        await hydrateHome(root);
        break;
      case 'market':
        await hydrateMarket(root);
        break;
      case 'profile':
        await hydrateProfile(root);
        break;
      case 'rewards':
        await hydrateRewards(root);
        break;
      case 'notifications':
        await hydrateNotifications(root);
        break;
      case 'address':
        await hydrateAddress(root);
        break;
      case 'payment-method':
        await hydratePaymentMethod(root);
        break;
      case 'order-history':
        await hydrateOrderHistory(root);
        break;
      case 'report-history':
        await hydrateReportHistory(root);
        break;
      case 'seller-application':
        await hydrateSellerApplication(root);
        break;
      case 'product-detail':
        hydrateProductDetail(root);
        break;
      case 'cart':
        hydrateCart(root);
        break;
      default:
        break;
    }
  })();
  bindPageNavigation(page);
}

window.addEventListener('DOMContentLoaded', () => {
  init().catch((error) => {
    console.error(error);
    const root = document.getElementById('page-root');
    if (root) {
      root.innerHTML = '<div style="padding:24px;color:#fff;font-family:Poppins,sans-serif;">Gagal memuat halaman.</div>';
    }
  });
});
