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
        Schema::table('user_has_profile', function (Blueprint $table) {
            $table->foreign(['user_id'], 'user_has_nickname_user_id_foreign')->references(['id'])->on('users')->onUpdate('no action')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_has_profile', function (Blueprint $table) {
            $table->dropForeign('user_has_nickname_user_id_foreign');
        });
    }
};
