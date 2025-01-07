<?php

namespace App\Models\Gourmet;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $table = 'restaurants';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'name',
        'area_id',
        'tell',
        'price_max',
        'price_min',
        'description'
    ];

    public $incrementing = false;
    public $timestamps = false;
}