<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $fillable = ['name','surname'];
    protected $table = 'authors';
    protected $primary_key = 'id';


    public function articles(){


        return $this->hasMany(Article::class);
    }
    
}
