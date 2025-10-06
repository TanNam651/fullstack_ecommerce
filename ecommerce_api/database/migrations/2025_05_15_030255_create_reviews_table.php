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
        Schema::create('reviews', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('product_id')->references('id')->on('products')->onDelete('cascade');
//            $table->foreignUuid('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('email');
            $table->string('name');
            $table->string('status');
            $table->string('phone');
            $table->integer('rating')->default(0);
            $table->text('review')->nullable();
            $table->foreignUuid('parent_id')->nullable()->references('id')->on('reviews')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
