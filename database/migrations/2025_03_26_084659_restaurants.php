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
            $table->id();
            $table->bigInteger('user_id')->unique('uid_unique');
            $table->boolean('public');
            $table->string('name', 32);
            $table->string('tell', 16);
            $table->string('address');
            $table->integer('area_id');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->integer('price_max')->nullable();
            $table->integer('price_min')->nullable();
            $table->integer('capacity')->nullable();
            $table->string('description');
            $table->string('reservation');
            $table->string('charter');
            $table->string('parking');
            $table->string('smoking');

            //$table->primary(['id']);
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
