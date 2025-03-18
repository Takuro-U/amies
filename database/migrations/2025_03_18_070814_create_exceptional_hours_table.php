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
        Schema::create('exceptional_hours', function (Blueprint $table) {
            $table->integer('id')->primary();
            $table->integer('restaurant_id');
            $table->date('date');
            $table->time('open')->nullable();
            $table->time('close')->nullable();
            $table->boolean('is_open')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exceptional_hours');
    }
};
