# 🧪 Rencana Debugging & Pembuatan Test Lengkap

> **Tujuan**: Pastikan SEMUA fitur punya test yang benar, tidak ada bug tersembunyi, dan semua test berjalan hijau (pass).
> **Tools**: Pest (Laravel testing framework)
> **Bahasa**: Ditulis supaya mudah dipahami oleh junior programmer dan AI

---

## 📊 Ringkasan Status Test Saat Ini

### ✅ Fitur yang SUDAH Punya Test

| No | Fitur | File Test | Jumlah Test | Status |
|----|-------|-----------|-------------|--------|
| 1 | Asset CRUD | `tests/Feature/AssetTest.php` | ~30 test | ✅ Lengkap |
| 2 | Category CRUD | `tests/Feature/CategoryTest.php` | ~20 test | ✅ Lengkap |
| 3 | Location CRUD | `tests/Feature/LocationTest.php` | ~18 test | ✅ Lengkap |
| 4 | Maintenance CRUD | `tests/Feature/MaintenanceTest.php` | ~22 test | ✅ Lengkap |
| 5 | Company CRUD | `tests/Feature/CompanyTest.php` | ~6 test | ⚠️ Kurang lengkap |
| 6 | Dashboard | `tests/Feature/DashboardTest.php` | 2 test | ⚠️ Minimal |
| 7 | Authentication | `tests/Feature/Auth/AuthenticationTest.php` | 5 test | ✅ Cukup |
| 8 | Registration | `tests/Feature/Auth/RegistrationTest.php` | 2 test | ⚠️ Minimal |
| 9 | Password Reset | `tests/Feature/Auth/PasswordResetTest.php` | 5 test | ✅ Cukup |
| 10 | Email Verification | `tests/Feature/Auth/EmailVerificationTest.php` | 5 test | ✅ Lengkap |
| 11 | Password Confirm | `tests/Feature/Auth/PasswordConfirmationTest.php` | 2 test | ✅ Cukup |
| 12 | Password Update | `tests/Feature/Settings/PasswordUpdateTest.php` | 3 test | ✅ Cukup |
| 13 | Profile Update | `tests/Feature/Settings/ProfileUpdateTest.php` | 5 test | ✅ Lengkap |
| 14 | 2FA Settings | `tests/Feature/Settings/TwoFactorAuthenticationTest.php` | 4 test | ✅ Cukup |
| 15 | 2FA Challenge | `tests/Feature/Auth/TwoFactorChallengeTest.php` | 2 test | ✅ Cukup |
| 16 | Verification Notif | `tests/Feature/Auth/VerificationNotificationTest.php` | 2 test | ✅ Cukup |
| 17 | RBAC Permission | `tests/Feature/RBACPermissionTest.php` | 5 test | ⚠️ Kurang lengkap |
| 18 | User Management | `tests/Feature/Admin/UserManagementTest.php` | 7 test | ⚠️ Kurang lengkap |

### ❌ Fitur yang BELUM Punya Test (HARUS DIBUAT)

| No | Fitur | Controller | Prioritas |
|----|-------|-----------|-----------|
| 1 | **Ticket CRUD (Admin)** | `TicketController.php` | 🔴 Tinggi |
| 2 | **Ticket Service** | `TicketService.php` | 🔴 Tinggi |
| 3 | **Helpdesk (Client)** | `HelpdeskController.php` | 🔴 Tinggi |
| 4 | **Asset Detail / Show** | `AssetController@show` | 🟡 Sedang |
| 5 | **Asset QR Code Detail** | `AssetController@qrcodeDetail` | 🟡 Sedang |
| 6 | **Asset Print Label** | `AssetController@printLabel` | 🟡 Sedang |
| 7 | **Asset Search** | `AssetController@index` (search query) | 🟡 Sedang |

---

## 🐛 Bug & Masalah yang Ditemukan

### BUG-01: Test yang User-nya Tidak Punya Role (Penting!)
- **File**: `AssetTest.php`, `CategoryTest.php`, `LocationTest.php`, `MaintenanceTest.php`, `CompanyTest.php`
- **Masalah**: Test membuat user TANPA role, tapi routes dilindungi oleh Policy.
  - Contoh: `AssetPolicy@create` hanya mengizinkan role `management` atau `admin`.
  - Test sekarang bisa pass karena policy `before()` return `true` untuk `admin`, TAPI user test TIDAK punya role admin.
  - Ini berarti test bisa FAIL jika policy benar-benar diterapkan.
- **Solusi**: Setiap test harus seed `RoleSeeder` dan assign role ke user test.
- **Dampak**: ⚠️ Test mungkin pass sekarang tapi akan fail di production jika policy berubah.

### BUG-02: Duplicate Factory File
- **File**: `database/factories/MaintananceFactory.php` (typo) dan `MaintenanceFactory.php`
- **Masalah**: Ada 2 factory file untuk Maintenance. Yang satu typo (Maintanance).
- **Solusi**: Hapus `MaintananceFactory.php` (yang typo).

### BUG-03: TicketFactory Kosong
- **File**: `database/factories/TicketFactory.php`
- **Masalah**: Factory definition kosong (`return []`). Tidak bisa dipakai untuk membuat test data.
- **Solusi**: Isi dengan data default yang valid.

### BUG-04: CompanyTest - Route ada di middleware `role:admin|management`
- **File**: `CompanyTest.php`
- **Masalah**: Company routes dilindungi oleh middleware `role:admin|management`, tapi test user tidak punya role.
- **Solusi**: Seed RoleSeeder dan assign role ke user test.

### BUG-05: AssetController@printLabel - Potensi Error Null
- **File**: `AssetController.php` line 149
- **Masalah**: `Company::first()->complete_company_name` akan error jika tidak ada company di database.
  - Ini karena `Company::first()` bisa return `null`, lalu akses `->complete_company_name` menyebabkan error.
- **Solusi**: Gunakan null-safe operator: `Company::first()?->complete_company_name ?? 'N/A'`

### BUG-06: LocationTest - Redundant `uses(RefreshDatabase::class)`
- **File**: `LocationTest.php`, `MaintenanceTest.php`
- **Masalah**: `uses(RefreshDatabase::class)` sudah di-set di `Pest.php` untuk semua test di folder `Feature`.
  - Ini tidak menyebabkan error, tapi redundant (tidak perlu).
- **Solusi**: Hapus `uses(RefreshDatabase::class)` dari file test individual.

### BUG-07: MaintenanceTest - Menggunakan `Maintenance::truncate()`
- **File**: `MaintenanceTest.php`
- **Masalah**: Menggunakan `truncate()` secara manual, yang tidak diperlukan karena `RefreshDatabase` sudah reset database.
  - `truncate()` juga bisa gagal jika ada foreign key constraint.
- **Solusi**: Hapus semua `Maintenance::truncate()` call.

---

## 📋 Rencana Kerja (Step by Step)

### FASE 1: Fix Bug yang Ada ✏️

> Perbaiki masalah di test yang sudah ada sebelum membuat test baru.

- [ ] **1.1** Hapus `MaintananceFactory.php` (file typo duplicate)
- [ ] **1.2** Hapus `uses(RefreshDatabase::class)` dari `LocationTest.php` dan `MaintenanceTest.php` (sudah ada di `Pest.php`)
- [ ] **1.3** Hapus semua `Maintenance::truncate()` dari `MaintenanceTest.php`
- [ ] **1.4** Fix `AssetController@printLabel` - tambahkan null-safe operator untuk Company
- [ ] **1.5** Fix user test yang tidak punya role di test yang sudah ada:
  - `AssetTest.php` → user harus punya role (admin/management)
  - `CategoryTest.php` → user harus punya role (admin/management)
  - `LocationTest.php` → user harus punya role (admin/management)
  - `MaintenanceTest.php` → user harus punya role (admin/management)
  - `CompanyTest.php` → user harus punya role (admin/management)
- [ ] **1.6** Jalankan test yang sudah ada, pastikan semua PASS:
  ```bash
  php artisan test --compact
  ```

### FASE 2: Lengkapi TicketFactory 🏭

> Factory harus lengkap sebelum bisa membuat test.

- [ ] **2.1** Isi `TicketFactory.php` dengan data default:
  ```php
  // Data yang dibutuhkan:
  // - ticket_code: generate unik (format: TCK-YYYY-XXXXXX)
  // - title: faker sentence
  // - description: faker paragraph
  // - reporter_id: User factory
  // - category_id: TicketCategory factory (HARUS BUAT factory ini juga)
  // - priority_id: Priority factory (HARUS BUAT factory ini juga)
  // - status: default 'open'
  // - source: default 'web'
  ```
- [ ] **2.2** Buat `TicketCategoryFactory.php` (belum ada)
- [ ] **2.3** Buat `PriorityFactory.php` (belum ada)
- [ ] **2.4** Buat `DepartmentFactory.php` (belum ada)

### FASE 3: Buat Test untuk Ticket (Admin) 🎫

> File: `tests/Feature/TicketTest.php`
> Controller: `TicketController.php`
> Fitur: CRUD tiket oleh admin/management

- [ ] **3.1** Test Index:
  - admin & management bisa lihat halaman daftar tiket
  - halaman menampilkan data tiket dengan relasi (reporter, assignee, category, priority)
  - search berfungsi (cari berdasarkan ticket_code, title, description)
  - pagination berfungsi (10 per halaman)
  - client TIDAK bisa akses (403)

- [ ] **3.2** Test Create/Store:
  - admin & management bisa akses halaman create
  - bisa buat tiket baru dengan data valid
  - ticket_code ter-generate otomatis (format: TCK-YYYY-XXXXXX)
  - status default = 'open'
  - status log tercatat (TicketStatusLog dibuat)
  - validasi: title required, description required, category_id required & exists, priority_id required & exists
  - validasi: department_id optional tapi harus exists jika diisi
  - validasi: asset_id optional tapi harus exists jika diisi

- [ ] **3.3** Test Show:
  - admin & management bisa lihat detail tiket
  - data tiket lengkap dengan relasi (reporter, assignee, category, priority, department, asset, comments, attachments, statusLogs)
  - 404 jika tiket tidak ditemukan

- [ ] **3.4** Test Edit/Update:
  - admin & management bisa edit tiket
  - bisa update data tiket
  - validasi sama seperti store
  - 404 jika tiket tidak ditemukan

- [ ] **3.5** Test Delete:
  - admin & management bisa hapus tiket
  - tiket terhapus dari database
  - 404 jika tiket tidak ditemukan

- [ ] **3.6** Test Assign:
  - admin & management bisa assign tiket ke user lain
  - validasi: assigned_to wajib dan harus user yang ada
  - status otomatis berubah ke 'triaged' jika sebelumnya 'open'
  - status TIDAK berubah jika bukan 'open'

- [ ] **3.7** Test Change Status:
  - admin & management bisa ubah status tiket
  - validasi status transition (hanya transisi yang valid yang diizinkan):
    - open → triaged, rejected
    - triaged → in_progress, pending
    - in_progress → pending, resolved
    - pending → in_progress, resolved
    - resolved → closed
  - transisi TIDAK valid harus gagal (contoh: open → closed)
  - resolved_at ter-set saat status = resolved
  - closed_at ter-set saat status = closed

- [ ] **3.8** Test Add Comment:
  - admin & management bisa tambah komentar
  - komentar tersimpan di database
  - validasi: message wajib
  - bisa set is_internal (internal comment)

### FASE 4: Buat Test untuk TicketService 🔧

> File: `tests/Unit/TicketServiceTest.php`
> Service: `TicketService.php`
> Fitur: Business logic tiket (terpisah dari controller)

- [ ] **4.1** Test create():
  - membuat tiket baru dengan data valid
  - ticket_code unik dan format benar
  - status log dibuat saat tiket baru

- [ ] **4.2** Test assign():
  - assign tiket ke user
  - auto-triaged jika status = open
  - TIDAK auto-triaged jika status bukan open

- [ ] **4.3** Test changeStatus():
  - setiap transisi valid berhasil
  - setiap transisi TIDAK valid throw DomainException
  - resolved_at di-set saat resolved
  - closed_at di-set saat closed

- [ ] **4.4** Test addComment():
  - komentar tersimpan  
  - is_internal flag berfungsi

- [ ] **4.5** Test generateTicketCode():
  - format benar: TCK-YYYY-XXXXXX
  - auto-increment berjalan

### FASE 5: Buat Test untuk Helpdesk (Client) 🆘

> File: `tests/Feature/HelpdeskTest.php`
> Controller: `HelpdeskController.php`
> Fitur: Client membuat dan melihat tiket sendiri

- [ ] **5.1** Test Index:
  - user hanya bisa lihat tiket MILIKNYA sendiri (filtered by reporter_id)
  - search berfungsi
  - pagination berfungsi

- [ ] **5.2** Test Create/Store:
  - user bisa buat tiket baru
  - reporter_id otomatis diisi dari user yang login
  - source otomatis = 'web_helpdesk'
  - redirect ke halaman show tiket setelah berhasil

- [ ] **5.3** Test Show:
  - user bisa lihat detail tiketnya sendiri
  - user TIDAK bisa lihat tiket orang lain (403)
  - komentar internal TIDAK ditampilkan (hanya is_internal = false)

- [ ] **5.4** Test Add Comment:
  - user bisa tambah komentar di tiketnya sendiri
  - user TIDAK bisa komentar di tiket orang lain (403)
  - komentar selalu non-internal (is_internal = false)

### FASE 6: Buat Test untuk Asset Detail, QR Code, dan Print Label 🏷️

> File: `tests/Feature/AssetTest.php` (tambahkan describe baru)
> Controller: `AssetController.php`

- [ ] **6.1** Test Asset Detail (show):
  - user bisa lihat detail asset
  - menampilkan categoryName dan locationName
  - 404 jika asset tidak ditemukan

- [ ] **6.2** Test Asset QR Code Detail:
  - halaman bisa diakses TANPA login (route tanpa middleware auth)
  - menampilkan data asset dengan category, location, dan maintenance
  - maintenance diurutkan berdasarkan tanggal terbaru
  - maksimal 10 maintenance record

- [ ] **6.3** Test Asset Print Label:
  - user harus login
  - menampilkan data asset, category, location, dan company name
  - TIDAK error jika company belum ada

- [ ] **6.4** Test Asset Search:
  - bisa search berdasarkan asset_name
  - bisa search berdasarkan asset_code
  - bisa search berdasarkan category_name (via relasi)
  - search empty menampilkan semua data

### FASE 7: Perkuat Test yang Sudah Ada (Tambah Coverage) 💪

> Tambahkan test yang kurang di file yang sudah ada.

- [ ] **7.1** `CompanyTest.php` - Tambahkan:
  - validasi update (field required, max length)
  - test 404 jika update/delete company yang tidak ada
  - test company name max length
  - test multiple companies

- [ ] **7.2** `DashboardTest.php` - Tambahkan:
  - test dashboard menampilkan komponen Inertia yang benar
  - test dashboard menampilkan data yang diharapkan (jika ada)

- [ ] **7.3** `RegistrationTest.php` - Tambahkan:
  - validasi: name required
  - validasi: email required, format email valid, unique
  - validasi: password required, min 8, confirmed
  - test registrasi gagal jika email sudah dipakai
  - test registrasi gagal jika password tidak cocok

- [ ] **7.4** `RBACPermissionTest.php` - Tambahkan:
  - test akses semua route per role (admin, management, client)
  - test client TIDAK bisa akses category CRUD
  - test client TIDAK bisa akses location CRUD
  - test client TIDAK bisa akses maintenance create/update/delete
  - test management bisa akses semua fitur kecuali user management

- [ ] **7.5** `UserManagementTest.php` - Tambahkan:
  - validasi: name required, email required & unique
  - validasi: password min 8, confirmed
  - validasi: role required & must exist
  - test admin TIDAK bisa hapus dirinya sendiri (jika ada logic ini)
  - test update tanpa mengubah password

### FASE 8: Jalankan Semua Test & Verifikasi 🏁

- [ ] **8.1** Jalankan semua test:
  ```bash
  php artisan test --compact
  ```
- [ ] **8.2** Pastikan semua test PASS (tidak ada FAIL atau ERROR)
- [ ] **8.3** Jalankan Pint untuk format kode:
  ```bash
  vendor/bin/pint --dirty
  ```
- [ ] **8.4** Review hasil test dan catat jika ada issue baru

---

## 📁 Daftar File Test (Setelah Selesai)

```
tests/
├── Pest.php                                    ← Config Pest (sudah ada)
├── TestCase.php                                ← Base test case (sudah ada)
├── Feature/
│   ├── AssetTest.php                           ← Update: tambah show, qrcode, print
│   ├── CategoryTest.php                        ← Update: fix role user
│   ├── CompanyTest.php                         ← Update: tambah validation test
│   ├── DashboardTest.php                       ← Update: tambah Inertia assertion
│   ├── LocationTest.php                        ← Update: fix role user, hapus redundant
│   ├── MaintenanceTest.php                     ← Update: fix role, hapus truncate
│   ├── RBACPermissionTest.php                  ← Update: tambah coverage per role
│   ├── TicketTest.php                          ← BARU: test ticket admin CRUD  
│   ├── HelpdeskTest.php                        ← BARU: test helpdesk client
│   ├── Admin/
│   │   └── UserManagementTest.php              ← Update: tambah validation test
│   ├── Auth/
│   │   ├── AuthenticationTest.php              ← Sudah cukup
│   │   ├── EmailVerificationTest.php           ← Sudah cukup
│   │   ├── PasswordConfirmationTest.php        ← Sudah cukup
│   │   ├── PasswordResetTest.php               ← Sudah cukup
│   │   ├── RegistrationTest.php                ← Update: tambah validation test
│   │   ├── TwoFactorChallengeTest.php          ← Sudah cukup
│   │   └── VerificationNotificationTest.php    ← Sudah cukup
│   └── Settings/
│       ├── PasswordUpdateTest.php              ← Sudah cukup
│       ├── ProfileUpdateTest.php               ← Sudah cukup
│       └── TwoFactorAuthenticationTest.php     ← Sudah cukup
└── Unit/
    ├── ExampleTest.php                         ← Sudah ada
    └── TicketServiceTest.php                   ← BARU: test business logic
```

---

## 📎 Catatan Penting

1. **Selalu seed `RoleSeeder`** di `beforeEach` jika test membutuhkan akses ke route yang dilindungi policy/role.
2. **Gunakan factory** untuk membuat data test, bukan manual insert.
3. **Jangan pakai `truncate()`** - pakai `RefreshDatabase` dari Pest.php yang sudah di-set.
4. **Test harus independen** - setiap test tidak boleh bergantung pada test lain.
5. **Gunakan `describe()` blocks** untuk mengelompokkan test yang terkait.
6. **Gunakan Pest function imports** seperti `use function Pest\Laravel\get;` untuk code yang lebih bersih.
7. **File factory yang typo** (`MaintananceFactory.php`) harus dihapus.

---

## ⏰ Estimasi Waktu per Fase

| Fase | Deskripsi | Estimasi |
|------|-----------|----------|
| 1 | Fix Bug yang Ada | 30 menit |
| 2 | Lengkapi Factory | 30 menit |
| 3 | Test Ticket (Admin) | 2 jam |
| 4 | Test TicketService (Unit) | 1 jam |
| 5 | Test Helpdesk (Client) | 1 jam |
| 6 | Test Asset Detail/QR/Label | 1 jam |
| 7 | Perkuat Test yang Ada | 1 jam |
| 8 | Verifikasi Final | 30 menit |
| **Total** | | **~7.5 jam** |
