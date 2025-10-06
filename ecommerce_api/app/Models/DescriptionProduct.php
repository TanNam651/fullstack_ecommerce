<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class DescriptionProduct extends Model
{
    protected $table = 'description_products';
    protected $keyType = 'string';
    public $incrementing = false;

    public function products():BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    protected static function boot():void
    {
        parent::boot();
        static::creating(function (DescriptionProduct $model){
            if(empty($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
