<!DOCTYPE html>
<html>
<head>
    <title>Laporan Data Aset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 11pt;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
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
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .footer {
            margin-top: 50px;
            text-align: right;
            font-style: italic;
            font-size: 9pt;
            color: #777;
        }
        .badge {
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9pt;
        }
        .good { color: #059669; }
        .minor_damage { color: #d97706; }
        .major_damage { color: #dc2626; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Laporan Data Aset</h2>
        <p>Tanggal Ekspor: {{ date('d/m/Y') }}</p>
    </div>
 
    <table>
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="15%">Kode Aset</th>
                <th width="20%">Nama Aset</th>
                <th width="15%">Kategori</th>
                <th width="15%">Lokasi</th>
                <th width="15%">Kondisi</th>
                <th width="15%">Status</th>
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
                <td>
                    @php
                        $conditionLabel = match($asset->condition) {
                            'good' => 'Baik',
                            'minor_damage' => 'Rusak Ringan',
                            'major_damage' => 'Rusak Berat',
                            default => ucwords(str_replace('_', ' ', $asset->condition))
                        };
                    @endphp
                    <span class="{{ $asset->condition }}">{{ $conditionLabel }}</span>
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
            </tr>
            @endforeach
        </tbody>
    </table>
 
    <div class="footer">
        Dicetak pada: {{ date('Y-m-d H:i:s') }}
    </div>
</body>
</html>
