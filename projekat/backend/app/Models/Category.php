<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];
    protected $table = 'categories';
    protected $primaryKey = 'category_id';
    public $timestamps = false;

    public function articles(){

        return $this->hasMany(Article::class);

    }

}
