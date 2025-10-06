<?php

namespace App\Models;

use App\Enums\OrderEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;
use function Webmozart\Assert\Tests\StaticAnalysis\boolean;

class Order extends Model
{
    protected $table = 'orders';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'email',
//        'user_id',
        'status',
        'total',
        'shipping_address',
        'review_status',
    ];

//    public function user():BelongsTo
//    {
//        return $this->belongsTo(User::class);
//    }

    public function payment():HasOne
    {
        return $this->hasOne(Payment::class);
    }

    public function products():BelongsToMany
    {
        return $this->belongsToMany(Product::class)
            ->using(OrderProduct::class)
            ->withPivot('quantity', 'price', 'total')
            ->withTimestamps();
    }

    public function details():HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }

    protected static function boot():void
    {
        parent::boot();
        static::creating(function (Order $model){
            if(empty($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    protected function casts(): array
    {
        return [
            'status'=>OrderEnum::class,
            'review_status'=>'boolean'
        ];
    }
}
