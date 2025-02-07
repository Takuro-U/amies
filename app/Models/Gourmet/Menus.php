<?php

namespace App\Models\Gourmet;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menus extends Model
{
    use HasFactory;

    protected $table = 'menus';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'parent_id',
        'category_id',
        'name',
        'price',
        'description',
        'img_path'
    ];

    public $incrementing = false;
    public $timestamps = false;
}