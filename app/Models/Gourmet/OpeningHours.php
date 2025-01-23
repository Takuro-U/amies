<?php

namespace App\Models\Gourmet;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpeningHours extends Model
{
    use HasFactory;

    protected $table = 'opening_hours';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'restaurant_id',
        'day_id',
        'open',
        'close',
        'is_open'
    ];

    public $incrementing = false;
    public $timestamps = false;
}