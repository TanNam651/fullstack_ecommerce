<?php

namespace App\Models;

use App\Enums\PaymentEnum;
use App\Enums\PaymentMethodEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Payment extends Model
{
    protected $table = 'payments';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'order_id',
        'payment_method',
        'transaction_id',
        'status',
        'amount',
    ];

    public function order():BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    protected static function boot():void
    {
        parent::boot();
        static::creating(function (Payment $model){
            if(empty($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    protected function casts(): array
    {
        return [
            'payment_method'=>PaymentMethodEnum::class,
            'status'=>PaymentEnum::class,
        ];
    }
}
