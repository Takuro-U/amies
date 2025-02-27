<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserHasNickname extends Model
{
    use HasFactory;

    protected $table = 'user_has_nickname';

    protected $fillable = [
        'user_id',
        'nickname'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 