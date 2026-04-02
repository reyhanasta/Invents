# Feature Plan: Export Assets

Branch: `export-features`

## Goal

Tambahkan tombol **Export** di halaman Asset Index yang memungkinkan user mengunduh data aset dalam format **Excel** atau **PDF**.

Kolom yang diekspor:
- Kode Aset (`asset_code`)
- Nama Aset (`asset_name`)
- Kategori (`category.category_name`)
- Lokasi / Posisi (`location.location_name`)
- Kondisi (`condition`)

---

## Packages yang Akan Digunakan

| Package | Fungsi | Status |
|---------|--------|--------|
| `maatwebsite/laravel-excel` | Generate file Excel (.xlsx) | ❌ Belum ada, perlu install |
| `barryvdh/laravel-dompdf` | Generate file PDF | ✅ Sudah ada |

---

## Rencana Implementasi

### Step 1 — Install Laravel Excel

```bash
composer require maatwebsite/excel
```

### Step 2 — Buat Export Class (Backend)

Buat file: `app/Exports/AssetsExport.php`

Class ini mendefinisikan kolom apa saja yang akan masuk ke file Excel.
Menggunakan fitur **FromQuery** + **WithHeadings** dari Laravel Excel.

### Step 3 — Tambah Method Export di Controller

Di `AssetController.php`, tambah method `export()`:
- Terima query param `?format=excel` atau `?format=pdf`
- Jika Excel → return `Excel::download(new AssetsExport, 'assets.xlsx')`
- Jika PDF → buat View Blade, render dengan DomPDF, return download

### Step 4 — Buat Blade View untuk PDF

Buat file: `resources/views/exports/assets-pdf.blade.php`

Layout tabel HTML sederhana yang akan di-render oleh DomPDF.
Menampilkan: No, Kode, Nama, Kategori, Lokasi, Kondisi.

### Step 5 — Tambah Route Export

Di `routes/web.php`:
```php
Route::get('assets/export', [AssetController::class, 'export'])
    ->name('assets-export')
    ->can('viewAny', Asset::class);
```

> ⚠️ Route ini harus diletakkan **SEBELUM** `assets/{asset}/...` agar tidak bentrok.

### Step 6 — Update Frontend (AssetIndex.tsx)

Tambah tombol **Export** di header sebelah tombol "Tambah Aset".
Tombol ini membuka **DropdownMenu** kecil dengan pilihan:
- 📊 Export Excel
- 📄 Export PDF

Klik langsung trigger download via `window.open(url)` (tidak perlu Inertia).

### Step 7 — Tulis Tests

Buat test di `tests/Feature/AssetTest.php`:
- Export Excel mengembalikan file `.xlsx` dengan Content-Type yang benar
- Export PDF mengembalikan file `.pdf` dengan Content-Type yang benar
- User tanpa akses tidak bisa export (401/403)

---

## Struktur File

```
app/
  Exports/
    AssetsExport.php          ← [BARU] Class export Excel
  Http/
    Controllers/
      AssetController.php     ← [EDIT] Tambah method export()

resources/
  views/
    exports/
      assets-pdf.blade.php    ← [BARU] Template PDF

  js/
    pages/
      Asset/
        AssetIndex.tsx        ← [EDIT] Tambah tombol Export + Dropdown

routes/
  web.php                     ← [EDIT] Tambah route assets-export

tests/
  Feature/
    AssetTest.php             ← [EDIT] Tambah test export
```

---

## Detail Kolom Export

| Header di File | Field di Database |
|----------------|-------------------|
| No | (nomor urut otomatis) |
| Kode Aset | `asset_code` |
| Nama Aset | `asset_name` |
| Kategori | `category.category_name` |
| Lokasi | `location.location_name` |
| Kondisi | `condition` (good / minor_damage / major_damage) |

---

## Checklist Pengerjaan

- [x] Install `maatwebsite/excel`
- [x] Buat `AssetsExport.php`
- [x] Tambah method `export()` di `AssetController`
- [x] Buat Blade view `assets-pdf.blade.php`
- [x] Tambah route `assets-export` di `web.php`
- [x] Update `AssetIndex.tsx` — tombol Export + Dropdown
- [x] Tulis Pest tests untuk export Excel & PDF
- [x] Jalankan `vendor/bin/pint --dirty`
- [x] Jalankan `php artisan test --compact`
- [x] Jalankan `npm run build`
