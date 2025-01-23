<?php

namespace App\Models\Gourmet;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExceptionalHours extends Model
{
    use HasFactory;

    protected $table = 'exceptional_hours';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'restaurant_id',
        'date',
        'open',
        'close',
        'is_open'
    ];

    public $incrementing = false;
    public $timestamps = false;
}