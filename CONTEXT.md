# Inventaris Aset (Invents)

Inventory management application for tracking company assets — their condition, lifecycle status, maintenance records, and related helpdesk tickets.

## Language

**Asset**:
A physical item tracked by the company's inventory. Identified by an asset code and described by name, brand, serial number, category, location, condition, status, acquisition date, and description.
_Avoid_: Item, equipment, barang

**Asset Code**:
The unique identifier of an asset, generated from its category's prefix code plus a zero-padded sequence number (e.g., `LPT0001`).

**Category**:
A classification of assets used to group them and to generate asset codes via its prefix code.
_Avoid_: Type, group

**Location**:
The physical place where an asset is situated.
_Avoid_: Room, place

**Condition**:
The physical state of an asset: `good` (Baik), `minor_damage` (Rusak Ringan), or `major_damage` (Rusak Berat).

**Status**:
The lifecycle state of an asset: `available` (Tersedia), `in-use` (Sedang Digunakan), `maintenance` (Dalam Perbaikan), or `retired` (Afkir). A status is distinct from deletion — a retired asset is still recorded but out of service.
_Avoid_: is_used, deleted

**Retired (Afkir)**:
A lifecycle status meaning the asset is out of service but still recorded. Not the same as (soft) deletion.
_Avoid_: Sudah Dihapus, deleted

**Maintenance**:
A service or repair record performed on an asset.

**Ticket**:
A helpdesk ticket that may reference an asset.

**Laporan Aset (Asset Report)**:
The analytics page showing inventory summaries (by category, location, condition, and usage) plus a detailed, filterable listing of assets.

**Ekspor (Export)**:
Downloading report or asset data as a file (PDF or Excel). The report PDF mirrors the currently applied filters.