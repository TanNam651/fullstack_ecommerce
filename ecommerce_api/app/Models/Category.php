<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $table = 'categories';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'is_last',
    ];

    public function product():HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function parent():BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id')->with('parent');
    }

    public function childrens():HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')->with('childrens');
    }

    protected function casts(): array
    {
        return [
            'is_last'=>'boolean'
        ];
    }

    protected static function boot():void
    {
        parent::boot();
        static::creating(function (Category $category){
            if(empty($category->{$category->getKeyName()})){
                $category->{$category->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
