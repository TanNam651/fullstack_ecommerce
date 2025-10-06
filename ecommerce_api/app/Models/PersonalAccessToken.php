<?php

namespace App\Models;


use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken as SanctumToken;

class PersonalAccessToken extends SanctumToken
{
    public $table = 'personal_access_tokens';
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function booted():void
    {
//        parent::boot();
        static::creating(function ($model) {
            if(empty($model->id)){
                $model->id = (string) Str::uuid();
            }
        });
    }

}
