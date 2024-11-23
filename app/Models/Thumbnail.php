<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thumbnail extends Model
{
    use HasFactory;

    protected $table = 'thumbnails';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'name',
        'x',
        'y',
        'z',
        'width',
        'height',
        'rot',
        'path',
        'url'
    ];

    public $incrementing = false;
    public $timestamps = false;
}