# MUSE MVP v2.3 — Complete Role-Based Access Control

## 🆕 Perubahan dari v2.2

### 1. Login 2-Step untuk Prototype
- **Step 1:** Pilih Role (klik untuk expand)
- **Step 2:** Pilih User dalam role tersebut

Memudahkan demo ke stakeholder dengan fokus pada role, bukan nama individu.

### 2. Role Baru

| Role | Nama Sample | Fungsi |
|------|-------------|--------|
| **TL Implementor** | Dedi Kurniawan, Arief Harmano, Ferry Hadi Irawan | Assign mandate ke Implementor |
| **Implementor** | Dhandi Rizky, Ghani Casyidi, Indah S, Gery S, Riza A | Eksekusi + Update Live + Sales side job |
| **Onboarding Clerk** | Pratiwi Herdyaningsih | Cek kelengkapan dokumen mandate |

### 3. Menu/Page Baru

| Menu | Role | Fungsi |
|------|------|--------|
| **Onboarding Queue** | Onboarding Clerk | Cek dokumen, lolos/return ke sales |
| **Assign Mandate** | TL Implementor | Assign mandate ke implementor |
| **Implementation Queue** | Implementor, TL | View & update progress mandate |

---

## 📊 Complete Access Matrix

| Menu | GH TBW | Sales Head | Sales Officer | Implementor | Portfolio Head | Portfolio Officer | TL Impl | Onboarding |
|------|:------:|:----------:|:-------------:|:-----------:|:--------------:|:-----------------:|:-------:|:----------:|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Pipeline | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Leads | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Leaderboard | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Reports | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lead Assignment | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Pengajuan Tarif | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Analisa Tarif | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Approval Tarif | ✅ >50% | ✅ ≤50% | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Monitor Tarif | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Mandate Tracking | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Onboarding Queue | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Assign Mandate | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Implementation | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Upload Leads | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |

---

## 🔄 Mandate Workflow (Complete)

```
┌─────────────────┐
│  Sales Officer  │ → Won Deal + Upload Docs
│  / Implementor  │
└────────┬────────┘
         │ Release Mandate
         ▼
┌─────────────────┐
│Onboarding Clerk │ → Cek Kelengkapan Dokumen
│(Pratiwi)        │
└────────┬────────┘
    ┌────┴────┐
    │ Lolos?  │
    └────┬────┘
  Ya     │     Tidak
         │        ↓
         │    Return ke Sales (perbaiki)
         ↓
┌─────────────────┐
│ TL Implementor  │ → Assign ke Implementor
│(Dedi/Arief/Ferry│
└────────┬────────┘
         ↓
┌─────────────────┐
│  Implementor    │ → Eksekusi Implementasi
│(Dhandi/Ghani/..)│
└────────┬────────┘
         │ Upload Berita Acara
         ▼
      ✅ LIVE
```

---

## 🔄 Tariff Workflow

```
Sales Officer → Portfolio Officer (Layer 1) → Portfolio Head (Layer 2)
                                                      ↓
                                              ┌───────┴───────┐
                                              │   Discount?   │
                                              └───────┬───────┘
                                               ≤50%   │   >50%
                                                      │
                                          ┌───────────┼───────────┐
                                          ▼           │           ▼
                                    Sales Head        │      GH TBW
                                    (or GH RM         │      Final
                                     Regional CEO)    │      Approval
                                          │           │           │
                                          ▼           │           ▼
                                       APPROVED ◄─────┴────► APPROVED
```

---

## 👥 TBW Organization (43 Users)

### Executive (1)
- **Fauziah Anna** - Group Head (SVP) - Observer + Final Approval

### Sales Line (22)
**Sales Heads VP (3):**
- Ashadi Septiaji (Corporate Sales 1)
- Febriano YY Kolanus (Commercial Sales)
- R Yuniarti Siddik (Kelembagaan & FI Sales)

**Sales Officers (19):**
- Corporate: Rizcky, Asih, Miranti, Jimmy, Irlanda
- Commercial: Ning, Nico, Kevin, Fitriyah, Andika, Fakhri, Lily
- Kelembagaan: Ronald, Omar, Dwi Eka, Ardhian, Alia, Bambang, Yohana

### Portfolio Line (9)
**Portfolio Heads VP (3):**
- Alfa Masjita (Corporate)
- Sholeh Syuhada (Commercial)
- Ario Muhammad (SME)

**Portfolio Officers (6):**
- Edwin, Bella (Corporate)
- Dicky, Dwi Anita, Bianca (Commercial)
- Seth (SME)

### Implementation Line (8)
**Team Leaders (3):**
- Dedi Kurniawan (Corporate)
- Arief Harmano (Commercial)
- Ferry Hadi Irawan (Kelembagaan)

**Implementors (5):**
- Dhandi Rizky, Ghani Casyidi (Corporate)
- Indah Sulistyorini, Gery Setiaji (Commercial)
- Riza Ariawan (Kelembagaan)

### Onboarding Line (1)
**Clerk:**
- Pratiwi Herdyaningsih

---

## 🧪 Testing Scenarios

### Scenario 1: Onboarding Clerk
1. Login: Step 1 → Onboarding → Step 2 → Pratiwi
2. Menu: Dashboard, Reports, **Onboarding Queue**
3. Cek dokumen mandate yang masuk
4. Loloskan atau Return ke Sales

### Scenario 2: TL Implementor
1. Login: Step 1 → Implementation → Step 2 → Dedi Kurniawan
2. Menu: Dashboard, Reports, **Assign Mandate**, Implementation
3. Lihat tim implementor dengan load masing-masing
4. Assign mandate yang sudah lolos verifikasi

### Scenario 3: Implementor
1. Login: Step 1 → Implementation → Step 2 → Dhandi Rizky
2. Menu: Dashboard, Pipeline, Leads, Leaderboard, Reports, Pengajuan Tarif, Mandate Tracking, **Implementation**
3. Akses sama dengan Sales Officer + Implementation Queue
4. Bisa update mandate ke Live dengan Berita Acara

### Scenario 4: Sales Officer
1. Login: Step 1 → Sales → Step 2 → Rizcky
2. Menu: Dashboard, Pipeline, Leads, Leaderboard, Reports, Pengajuan Tarif, Mandate Tracking
3. Release mandate ke Onboarding

### Scenario 5: Sales Head VP
1. Login: Step 1 → Sales → Step 2 → Ashadi Septiaji
2. Menu: Dashboard, Pipeline, Leads, Leaderboard, Reports, **Lead Assignment**, **Approval Tarif (≤50%)**, Monitor Tarif, Mandate Tracking
3. Assign leads ke tim, approve tarif

### Scenario 6: GH TBW (Observer)
1. Login: Step 1 → Executive → Step 2 → Fauziah Anna
2. Menu: Dashboard, Leaderboard, Reports, **Approval Tarif (>50%)**
3. Observer mode - tidak akses operational

---

## 🔑 Password

Gunakan salah satu:
- `demo`
- `123456`

---

## 🚀 Cara Menjalankan

1. Extract `MUSE_MVP_v2.3_CompleteRBAC.zip`
2. Buka `index.html` di browser
3. **Step 1:** Pilih Role yang ingin di-demo
4. **Step 2:** Pilih User dalam role tersebut
5. Masukkan password dan login
6. Perhatikan menu yang berbeda berdasarkan role

---

## 📝 Production Notes

Di production:
- Login menggunakan Active Directory Bank Mandiri
- Role melekat di user profile AD
- Tidak perlu pilih role manual
- Single Sign-On (SSO) enabled

---

© 2026 Transaction Banking Wholesale Group - Bank Mandiri
