<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Specification extends Model
{
    protected $table = 'specifications';
    protected $keyType = 'string';
    public $incrementing = false;

    public function product():BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    protected static function boot():void
    {
        parent::boot();
        static::creating(function (Specification $model){
            if(empty($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }
}
