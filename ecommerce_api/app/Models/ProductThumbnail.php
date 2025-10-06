<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class ProductThumbnail extends Model
{
    protected $table = 'product_thumbnails';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'product_id',
        'thumbnail_url',
        'order',
    ];

    public function product():BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    protected static function boot():void
    {
        parent::boot();
        static::creating(function (ProductThumbnail $model){
            if(empty($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
