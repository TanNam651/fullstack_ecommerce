<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentEnum;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->enum('payment_method',array_column(PaymentMethodEnum::cases(), 'value'))->default(PaymentMethodEnum::CASH->value);
            $table->string('transaction_id')->nullable();
            $table->enum('status', array_column(PaymentEnum::cases(), 'value'))->default(PaymentEnum::PENDING->value);
            $table->bigInteger('amount')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
