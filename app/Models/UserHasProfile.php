<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserHasProfile extends Model
{
    use HasFactory;

    protected $table = 'user_has_profile';

    protected $fillable = [
        'user_id',
        'nickname',
        'icon_path'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 