<?php

namespace App\Enums;

enum OrderEnum:string
{
    case PENDING='pending';
    case PROCESSING='processing';
    case COMPLETED='completed';
    case CANCELLED='cancelled';
    case REFUNDED='refunded';


}
