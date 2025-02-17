<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menus extends Model
{
    use HasFactory;

    protected $table = 'restaurant_auth';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'password_hash'
    ];

    public $incrementing = false;
    public $timestamps = false;
}