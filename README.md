# MUSE Prototype v1.2

## Mandiri Unified Sales Ecosystem
Platform Pengelolaan Pipeline Transaction Banking

---

## 🆕 Perubahan v1.2

### 1. Konsolidasi Menu (Menghilangkan Redundansi)
- **Sebelum**: Menu "Pipeline Board" dan "Leads" terpisah (redundan)
- **Sesudah**: Digabung menjadi satu menu **"Pipeline"** dengan toggle view:
  - **Kanban View**: Drag-drop workflow antar stage
  - **Tabel View**: List view dengan search dan filter

### 2. Analytics Line Chart
- Grafik trend sekarang menggunakan **line chart** (bukan bar chart)
- Visualisasi lebih jelas untuk melihat trend revenue dan frekuensi deal
- Komposisi pipeline dipindahkan ke halaman Analytics

### 3. Perbaikan Terminologi
- `Volume/Bulan` → `Frekuensi/Bulan` (jumlah transaksi)
- Konsisten dengan terminologi Bank Mandiri

### 4. Notification Bell
- Icon lonceng (🔔) SVG di header dengan dropdown
- Menampilkan 5 notifikasi terbaru
- Badge counter untuk unread notifications
- Tombol "Tandai dibaca"

### 5. Tariff Request Enhancement
- Halaman pengajuan tarif dengan BEP Calculator
- **Baru**: Menu "Lihat Status Pengajuan" untuk tracking
- Status: Pending → Review → Approved/Rejected

---

## 📁 Struktur File

```
muse-prototype/
├── index.html          # Entry point
├── css/
│   ├── variables.css   # Design tokens
│   ├── base.css        # Reset & utilities
│   ├── components.css  # Reusable components
│   ├── layout.css      # App shell, sidebar, header, notifications
│   └── pages.css       # Page-specific styles
└── js/
    ├── config.js       # Roles, menus, 44 users
    ├── data.js         # Sample data, analytics, tariff config
    ├── app.js          # Router, auth, UI helpers
    └── pages/
        ├── login.js        # 3-step login flow
        ├── dashboard.js    # KPI & summary
        ├── pipeline.js     # Kanban + Table view (consolidated)
        ├── leaderboard.js  # Gamification
        └── pages.js        # Analytics, tariff, others
```

---

## 🚀 Cara Menjalankan

### Opsi 1: Langsung Buka File
```
Double-click index.html
```

### Opsi 2: Local Server (Recommended)
```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# VS Code
Install "Live Server" extension
```

---

## 👥 Demo Users (44 Users)

| Role | Nama | Password |
|------|------|----------|
| Group Head | Fauziah Anna | demo |
| Sales Head (Corporate) | Ashadi Septiaji | demo |
| Sales Officer | Rizcky Chandrasanjaya | demo |
| Portfolio Head | Alfa Masjita | demo |
| Implementor | Dhandi Rizky | demo |

Password: `demo` atau `123456`

---

## 📊 Fitur Utama

### Pipeline (Consolidated)
- Toggle antara Kanban dan Tabel view
- Drag-drop untuk pindah stage (Kanban)
- Search dan filter (Tabel)
- Summary stats: Total, Live, Conversion Rate, Nilai

### Analytics
- KPI Summary: Revenue, Deals, Avg Size, Win Rate
- Komposisi Pipeline: Total, In Progress, Live, Dropped
- Analisis alasan Drop
- Line Chart trend 6 bulan
- Distribusi produk
- Top Performers
- Conversion Funnel

### Leaderboard & Gamification
- Ranking individual dan team
- Point system dengan bobot
- Badges & achievements
- Streak tracking

### Pengajuan Tarif
- Form pengajuan dengan BEP Calculator
- Trade-off analysis: Fee Lost vs NII dari komitmen Giro
- Recommendation: LAYAK / TIDAK LAYAK
- Tracking status pengajuan

### Notifikasi (Header)
- Icon bell dengan badge counter
- Dropdown panel dengan list notifikasi
- Mark all as read

---

## 🔧 Konfigurasi

### FTP Rate (Fund Transfer Pricing)
```javascript
// js/data.js
TARIFF_CONFIG.ftpRate = 0.04 // 4% per annum
```

### Produk & Tarif Normal
```javascript
// js/data.js
TARIFF_CONFIG.products = {
  'Payroll': { normalFee: 2500, unit: 'per karyawan/bulan' },
  'Cash Management': { normalFee: 5000, unit: 'per transaksi' },
  // ...
}
```

---

## 📱 Responsive Design

- Desktop: Full sidebar, 4-column grids
- Tablet: Collapsible sidebar, 2-column grids
- Mobile: Hidden sidebar, 1-column grids

---

## 📝 Notes

1. **Offline-capable**: Berjalan tanpa server (file:// protocol)
2. **No dependencies**: Vanilla HTML/CSS/JS
3. **Data lokal**: Semua data di-generate client-side
4. **Demo only**: Tidak terhubung ke backend

---

## 📋 Audit Compliance (v1.2)

| Issue | Status |
|-------|--------|
| Login page | ✅ Working |
| Line chart (bukan bar) | ✅ Implemented |
| Leads/Pipeline redundancy | ✅ Consolidated |
| Terminologi Frekuensi | ✅ Fixed |
| Tariff tracking | ✅ Added |
| Notification bell | ✅ Added with dropdown |

---

**Version**: 1.2  
**Last Updated**: January 2026  
**Author**: TBW Group - Bank Mandiri
