<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Str;

class OrderProduct extends Pivot
{
    protected $table = 'order_product';
    protected $keyType = 'string';
    public $incrementing = false;

    protected static function boot():void
    {
        parent::boot();
        static::creating(function (OrderProduct $model){
            if(empty($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
