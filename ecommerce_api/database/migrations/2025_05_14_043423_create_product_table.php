<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->boolean("is_featured")->default(false);
            $table->boolean("is_archived")->default(false);
            $table->bigInteger('origin_price')->default(0);
            $table->bigInteger('sale_price')->default(0);
            $table->bigInteger('student_price')->default(0);
            $table->integer('quantity')->default(0);
            $table->integer('in_order')->default(0);
            $table->string('image_url')->nullable();
            $table->string('hover_image')->nullable();
            $table->longText('description')->nullable();
            $table->timestamps();
        });
//        Add FULLTEXT index
        DB::statement('ALTER TABLE products ADD FULLTEXT text_index (name)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
