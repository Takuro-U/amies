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
        Schema::create('opening_hours', function (Blueprint $table) {
            $table->integer('id')->primary();
            $table->integer('restaurant_id');
            $table->integer('day_id');
            $table->tinyInteger('is_open')->nullable();
            $table->time('open')->nullable();
            $table->time('close')->nullable();
            $table->time('open2')->nullable();
            $table->time('close2')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opening_hours');
    }
};
