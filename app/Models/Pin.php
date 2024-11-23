<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pin extends Model
{
    use HasFactory;

    protected $table = 'pins';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'left_x',
        'left_y',
        'left_path',
        'right_x',
        'right_y',
        'right_path'
    ];

    public $incrementing = false;
    public $timestamps = false;
}