<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Sync existing data to status column
        \Illuminate\Support\Facades\DB::table('assets')->where('is_used', true)->update(['status' => 'in-use']);
        \Illuminate\Support\Facades\DB::table('assets')->where('is_used', false)->update(['status' => 'available']);

        Schema::table('assets', function (Blueprint $table) {
            $table->dropIndex(['is_used']);
            $table->dropColumn('is_used');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assets', function (Blueprint $table) {
            $table->boolean('is_used')->default(false)->after('condition')->index();
        });

        // Restore data based on status
        \Illuminate\Support\Facades\DB::table('assets')->where('status', 'in-use')->update(['is_used' => true]);
        \Illuminate\Support\Facades\DB::table('assets')->where('status', 'available')->update(['is_used' => false]);
    }
};
