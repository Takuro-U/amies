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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->bigInteger('id', true)->unique('id_unique');
            $table->bigInteger('user_id')->unique('uid_unique');
            $table->boolean('public');
            $table->string('name', 32);
            $table->string('address');
            $table->integer('area_id');
            $table->string('tell', 16);
            $table->integer('price_max')->nullable();
            $table->integer('price_min')->nullable();
            $table->integer('capacity')->nullable();
            $table->string('description');
            $table->string('parking');
            $table->string('smoking');
            $table->string('reservation');

            $table->primary(['id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
