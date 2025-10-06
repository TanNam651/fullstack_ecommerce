<?php

namespace App\Enums;

enum PaymentMethodEnum:string
{
    case CASH='cash';
    case VNPAY='vnpay';
}
