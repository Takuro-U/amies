<?php

namespace App\Models\Gourmet;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantGenres extends Model
{
    use HasFactory;

    protected $table = 'restaurant_genres';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'restaurant_id',
        'genre_id'
    ];

    public $incrementing = false;
    public $timestamps = false;
}