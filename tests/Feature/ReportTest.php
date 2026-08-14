<?php

use App\Models\Asset;
use App\Models\Category;
use App\Models\User;
use Database\Seeders\RoleSeeder;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

/**
 * Minimal stand-in for Barryvdh\DomPDF's Pdf::fake().
 *
 * The installed barryvdh/laravel-dompdf v3.1.2 does not ship the official
 * Pdf::fake() helper, so we bind a lightweight fake into the container under
 * the same 'dompdf.wrapper' key the facade resolves.
 */
class FakePdf
{
    public static array $views = [];

    public static array $downloads = [];

    public static function fake(): void
    {
        static::$views = [];
        static::$downloads = [];

        app()->instance('dompdf.wrapper', new static);
    }

    public function loadView(string $view, array $data = [], array $mergeData = [], ?string $encoding = null): self
    {
        static::$views[] = ['view' => $view, 'data' => $data];

        return $this;
    }

    public function setPaper($paper, string $orientation = 'portrait'): self
    {
        return $this;
    }

    public function download(string $filename = 'document.pdf')
    {
        static::$downloads[] = $filename;

        return response('fake pdf', 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename='.$filename,
        ]);
    }

    public static function assertViewIs(string $view): void
    {
        expect(static::$views)->not->toBeEmpty();
        expect(static::$views[0]['view'])->toBe($view);
    }

    public static function assertDownloaded(string $filename): void
    {
        expect(static::$downloads)->toContain($filename);
    }

    public static function assertViewHas(string $key, $value = null): void
    {
        expect(static::$views)->not->toBeEmpty();
        $data = static::$views[0]['data'];
        expect($data)->toHaveKey($key);

        if ($value instanceof Closure) {
            expect($value($data[$key]))->toBeTrue();
        } elseif ($value !== null) {
            expect($data[$key])->toBe($value);
        }
    }
}

beforeEach(function () {
    $this->seed(RoleSeeder::class);
    $this->user = User::factory()->create()->assignRole('admin');
    actingAs($this->user);
});

describe('Report Index', function () {
    it('renders the report page', function () {
        $response = get(route('reports'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Report/ReportIndex')
            ->has('categoryStats')
            ->has('locationStats')
            ->has('conditionStats')
            ->has('usageStats')
            ->has('assets')
            ->has('categories')
            ->has('locations')
        );
    });

    it('lists assets on the report page', function () {
        Asset::factory()->count(5)->create();

        $response = get(route('reports'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Report/ReportIndex')
            ->has('assets.data', 5)
        );
    });

    it('paginates assets on the report page', function () {
        Asset::factory()->count(20)->create();

        $response = get(route('reports'));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Report/ReportIndex')
            ->has('assets.data', 8)
            ->where('assets.total', 20)
        );
    });

    it('filters assets by search', function () {
        Asset::factory()->create(['asset_name' => 'Matching Asset']);
        Asset::factory()->create(['asset_name' => 'Other Asset']);

        $response = get(route('reports', ['search' => 'Matching']));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Report/ReportIndex')
            ->has('assets.data', 1)
            ->where('assets.data.0.asset_name', 'Matching Asset')
        );
    });

    it('filters assets by category', function () {
        $categoryA = Category::factory()->create();
        $categoryB = Category::factory()->create();

        Asset::factory()->create(['category_id' => $categoryA->id]);
        Asset::factory()->create(['category_id' => $categoryB->id]);

        $response = get(route('reports', ['category' => $categoryA->id]));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Report/ReportIndex')
            ->has('assets.data', 1)
            ->where('assets.data.0.category_id', $categoryA->id)
        );
    });

    it('filters assets by status', function () {
        Asset::factory()->available()->create();
        Asset::factory()->inUse()->create();

        $response = get(route('reports', ['status' => 'available']));

        $response->assertSuccessful();
        $response->assertInertia(fn ($page) => $page
            ->component('Report/ReportIndex')
            ->has('assets.data', 1)
            ->where('assets.data.0.status', 'available')
        );
    });
});

describe('Report Export', function () {
    it('downloads the report as a PDF', function () {
        FakePdf::fake();
        Asset::factory()->count(3)->create();

        $response = get(route('reports-export'));

        $response->assertSuccessful();
        FakePdf::assertViewIs('exports.report-pdf');
        FakePdf::assertDownloaded('laporan-aset-'.date('Ymd').'.pdf');
    });

    it('respects filters when exporting', function () {
        FakePdf::fake();
        $categoryA = Category::factory()->create();
        $categoryB = Category::factory()->create();

        Asset::factory()->create(['category_id' => $categoryA->id]);
        Asset::factory()->create(['category_id' => $categoryB->id]);

        $response = get(route('reports-export', ['category' => $categoryA->id]));

        $response->assertSuccessful();
        FakePdf::assertViewHas('assets', fn ($assets) => $assets->count() === 1 && $assets->first()->category_id === $categoryA->id);
    });
});
