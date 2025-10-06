<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Review extends Model
{
    protected $table = 'reviews';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'id',
        'name',
        'email',
        'phone',
        'rating',
        'product_id',
        'review',
        'status',
        'parent_id',
        'created_at',
        'updated_at',
    ];

    public function product():BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function replies():HasMany
    {
        return $this->hasMany(Review::class, 'parent_id');
    }

    public function parent():BelongsTo
    {
        return $this->belongsTo(Review::class, 'parent_id');
    }

    protected static function boot():void
    {
        parent::boot();
        static::creating(function (Review $model){
            if(empty($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
