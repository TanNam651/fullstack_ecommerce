<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class VerifyEmailToken extends Model
{

    // define the table name
    protected $table = 'verify_user_tokens';
    // protected $table = 'verify_token';
    protected $fillable = ['token', 'email', 'expire_at'];

    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'expire_at' => 'datetime',
    ];

    protected static function boot():void
    {
        parent::boot();
        static ::creating( function (VerifyEmailToken $model){
            if(empty($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}
