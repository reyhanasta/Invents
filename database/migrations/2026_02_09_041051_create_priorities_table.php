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
        Schema::create('priorities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('level'); // 1-5
            $table->unsignedInteger('response_target_minutes')->nullable();
            $table->unsignedInteger('resolve_target_minutes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('priorities');
    }
};
