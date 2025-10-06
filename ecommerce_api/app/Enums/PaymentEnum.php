<?php

namespace App\Enums;

enum PaymentEnum:string
{
    case PENDING='pending';
    case COMPLETED='completed';
    case FAILED='failed';
    case REFUNDED='refunded';
    case CANCELLED='cancelled';
}
