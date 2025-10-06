<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Product extends Model
{
    // define table name
    protected $table = 'products';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'slug',
        'is_featured',
        'is_archived',
        'origin_price',
        'sale_price',
        'student_price',
        'quantity',
        'category_id',
        'in_order',
        'image_url',
        'hover_image',
        'description',
    ];

    public function category():BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

//    Accessor and Mutator for root_category
    public function rootCategory():Attribute
    {
       return Attribute::get(function (){
           $category = $this->category;
           while ($category && $category->parent_id){
               $category = $category->parent;
           }
           return $category;
       });
    }

    public function specification():HasMany
    {
        return $this->hasMany(Specification::class);
    }

//    public function description():HasMany
//    {
//        return $this->hasMany(DescriptionProduct::class);
//    }

    public function thumbnails():HasMany
    {
        return $this->hasMany(ProductThumbnail::class);
    }

    public function orders():BelongsToMany
    {
        return $this->belongsToMany(Order::class)
            ->using(OrderProduct::class)
            ->withPivot('quantity', 'price', 'total')
            ->withTimestamps();
    }


    protected static function boot():void
    {
        parent::boot();
        static::creating(function (Product $model){
            if(empty($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
    protected function casts(): array{
        return [
            'is_featured' => 'boolean',
            'is_archived' => 'boolean',
            'origin_price' => 'integer',
            'sale_price' => 'integer',
            'student_price' => 'integer',
            'quantity' => 'integer',
            'in_order' => 'integer',
        ];
    }
}
