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
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')->constrained()->onDelete('cascade');
            // Tipe maintenance
            $table->enum('type', ['routine', 'repair', 'calibration','inspection']);
            // Tanggal
            $table->date('maintenance_date'); // kapan dikerjakan
            $table->date('maintenance_done_date')->nullable(); // kapan selesai (bisa beda hari)
            
            // Status
            $table->enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])
                  ->default('pending');
            
            // Detail pekerjaan
            $table->text('description'); // apa yang dikerjakan
            $table->text('note')->nullable(); // hasil/findings
            
            // Teknisi & Biaya
            $table->string('technician')->nullable(); // nama teknisi/vendor
            $table->decimal('cost', 12, 2)->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenances');
    }
};
