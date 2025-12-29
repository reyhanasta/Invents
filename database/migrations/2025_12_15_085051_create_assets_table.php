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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('location_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('asset_code')->unique();
            $table->string('asset_name')->index();
            $table->string('brand')->nullable();
            $table->string('serial_number')->nullable();
            $table->enum('condition', ['good', 'minor_damage', 'major_damage'])->default('good')->index();
            $table->enum('status', ['available', 'in-use', 'maintenance', 'retired'])->default('available')->index();
            $table->date('acquisition_date')->nullable();
            $table->text('description')->nullable();
            $table->string('photo')->nullable();
            $table->date('last_maintanance_date')->nullable();
            $table->softDeletes();
            $table->timestamps();
            
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
