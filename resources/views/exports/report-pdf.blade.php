<!DOCTYPE html>
<html>
<head>
    <title>Laporan Aset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 10pt;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h2 {
            margin: 0;
            text-transform: uppercase;
        }
        .header p {
            margin: 5px 0;
            color: #666;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .summary-layout {
            border: none;
            margin-bottom: 20px;
        }
        .summary-layout td {
            border: none;
            padding: 0;
            vertical-align: top;
            width: 25%;
        }
        .summary-layout td + td {
            padding-left: 10px;
        }
        .summary-table th, .summary-table td {
            font-size: 9pt;
            padding: 4px 6px;
        }
        .footer {
            margin-top: 50px;
            text-align: right;
            font-style: italic;
            font-size: 9pt;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>Laporan Aset</h2>
        <p>Tanggal Ekspor: {{ date('d/m/Y') }}</p>
    </div>

    <table class="summary-layout">
        <tr>
            <td>
                <table class="summary-table">
                    <thead>
                        <tr>
                            <th colspan="2">Kategori</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Nama Kategori</th>
                            <th>Jumlah Unit</th>
                        </tr>
                        @foreach($categoryStats as $stat)
                        <tr>
                            <td>{{ $stat['category_name'] }}</td>
                            <td>{{ $stat['assets_count'] }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </td>
            <td>
                <table class="summary-table">
                    <thead>
                        <tr>
                            <th colspan="2">Lokasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Nama Lokasi</th>
                            <th>Jumlah Unit</th>
                        </tr>
                        @foreach($locationStats as $stat)
                        <tr>
                            <td>{{ $stat['location_name'] }}</td>
                            <td>{{ $stat['assets_count'] }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </td>
            <td>
                <table class="summary-table">
                    <thead>
                        <tr>
                            <th colspan="2">Kondisi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Kondisi</th>
                            <th>Jumlah</th>
                        </tr>
                        <tr>
                            <td>Baik</td>
                            <td>{{ $conditionStats['good'] }}</td>
                        </tr>
                        <tr>
                            <td>Rusak Ringan</td>
                            <td>{{ $conditionStats['minor_damage'] }}</td>
                        </tr>
                        <tr>
                            <td>Rusak Berat</td>
                            <td>{{ $conditionStats['major_damage'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td>
                <table class="summary-table">
                    <thead>
                        <tr>
                            <th colspan="2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Status</th>
                            <th>Jumlah</th>
                        </tr>
                        <tr>
                            <td>Tersedia</td>
                            <td>{{ $usageStats['available'] }}</td>
                        </tr>
                        <tr>
                            <td>Sedang Digunakan</td>
                            <td>{{ $usageStats['in_use'] }}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{{ $usageStats['total'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>

    <table>
        <thead>
            <tr>
                <th width="4%">No</th>
                <th width="10%">Kode Aset</th>
                <th width="16%">Nama Aset</th>
                <th width="12%">Kategori</th>
                <th width="12%">Lokasi</th>
                <th width="10%">Brand</th>
                <th width="12%">No. Seri</th>
                <th width="10%">Kondisi</th>
                <th width="10%">Status</th>
                <th width="10%">Tanggal Perolehan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($assets as $index => $asset)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $asset->asset_code }}</td>
                <td>{{ $asset->asset_name }}</td>
                <td>{{ $asset->category?->category_name ?? 'N/A' }}</td>
                <td>{{ $asset->location?->location_name ?? 'N/A' }}</td>
                <td>{{ $asset->brand ?? 'N/A' }}</td>
                <td>{{ $asset->serial_number ?? 'N/A' }}</td>
                <td>
                    @php
                        $conditionLabel = match($asset->condition) {
                            'good' => 'Baik',
                            'minor_damage' => 'Rusak Ringan',
                            'major_damage' => 'Rusak Berat',
                            default => ucwords(str_replace('_', ' ', $asset->condition))
                        };
                    @endphp
                    {{ $conditionLabel }}
                </td>
                <td>
                    @php
                        $statusLabel = match($asset->status) {
                            'available' => 'Tersedia',
                            'in-use' => 'Sedang Digunakan',
                            'maintenance' => 'Dalam Perbaikan',
                            'retired' => 'Afkir',
                            default => ucwords(str_replace('-', ' ', $asset->status))
                        };
                    @endphp
                    {{ $statusLabel }}
                </td>
                <td>{{ $asset->acquisition_date?->format('d/m/Y') ?? 'N/A' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Dicetak pada: {{ date('Y-m-d H:i:s') }}
    </div>
</body>
</html>