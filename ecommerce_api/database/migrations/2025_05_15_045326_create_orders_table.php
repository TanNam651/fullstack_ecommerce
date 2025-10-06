<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\OrderEnum;
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('email');
//            $table->foreignUuid('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->enum('status', array_column(OrderEnum::cases(), 'value'))->default(OrderEnum::PENDING->value);
            $table->bigInteger('total')->default(0);
            $table->string('shipping_address');
            $table->boolean('review_status')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
