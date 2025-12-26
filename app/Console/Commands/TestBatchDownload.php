<?php

namespace App\Console\Commands;

use App\Models\Asset;
use App\Models\Category;
use App\Models\Location;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class TestBatchDownload extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:batch-download {--user_id=1}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test batch download PDF generation';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing batch download PDF generation...');

        // Create test user if not exists
        $user = User::find($this->option('user_id'));
        if (!$user) {
            $user = User::factory()->create();
            $this->info("Created test user with ID: {$user->id}");
        }

        // Create test data
        $category = Category::firstOrCreate(
            ['category_name' => 'Test Category'],
            ['prefix_code' => 'TST', 'serial_number_needed' => false]
        );
        $location = Location::firstOrCreate(
            ['location_name' => 'Test Location'],
            []
        );

        $assets = collect();
        for ($i = 1; $i <= 6; $i++) {
            $assets->push(Asset::create([
                'asset_name' => 'Test Asset ' . $i,
                'asset_code' => 'TST' . now()->format('His') . str_pad($i, 3, '0', STR_PAD_LEFT),
                'category_id' => $category->id,
                'location_id' => $location->id,
                'condition' => 'good',
                'brand' => 'Test Brand',
                'serial_number' => 'SN' . str_pad($i, 3, '0', STR_PAD_LEFT),
            ]));
        }

        $this->info("Created {$assets->count()} test assets");

        // Simulate the request
        $assetIds = $assets->pluck('id')->toArray();

        $this->info("Testing PDF generation with asset IDs: " . implode(', ', $assetIds));

        try {
            // Create a test request to the controller method
            $request = new \Illuminate\Http\Request();
            $request->merge([
                'asset_ids' => json_encode($assetIds), // Send as JSON string like frontend
                'label_size' => '60x40',
            ]);

            // Call the controller method directly
            $controller = new \App\Http\Controllers\AssetController();
            $response = $controller->batchDownloadLabels($request);

            $this->info('PDF generation successful');

            // Check response
            if ($response->getStatusCode() === 200) {
                $content = $response->getContent();
                $contentLength = strlen($content);

                $this->info("Response status: {$response->getStatusCode()}");
                $this->info("Content length: {$contentLength} bytes");
                $this->info("Content-Type: " . $response->headers->get('Content-Type'));
                $this->info("Content-Disposition: " . $response->headers->get('Content-Disposition'));

                // Check if content starts with PDF header
                if (strpos($content, '%PDF-') === 0) {
                    $this->info('✅ PDF content appears valid (starts with %PDF-)');

                    // Save to file for inspection
                    $filename = storage_path('app/public/test-batch-download.pdf');
                    file_put_contents($filename, $content);
                    $this->info("PDF saved to: {$filename}");

                } else {
                    $this->error('❌ PDF content does not appear valid');
                    $this->error('First 100 characters: ' . substr($content, 0, 100));
                }

            } else {
                $this->error("❌ Unexpected response status: {$response->getStatusCode()}");
                $this->error('Response: ' . $response->getContent());
            }

        } catch (\Exception $e) {
            $this->error('❌ Error during PDF generation:');
            $this->error($e->getMessage());
            $this->error('File: ' . $e->getFile() . ':' . $e->getLine());
        }

        return Command::SUCCESS;
    }
}
