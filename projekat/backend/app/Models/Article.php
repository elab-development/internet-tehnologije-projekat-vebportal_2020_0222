<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;


    protected $fillable = ['title','content','publishing_date','author_id','category_id'];
    protected $table = 'articles';
    protected $primaryKey = 'article_id';
    public $timestamps = false;

    public function authors(){

        return $this->belongsTo(Author::class,'author_id');

    }

    public function categories(){


        return $this->belongsTo(Category::class,'category_id');
    }

    public function comments(){


        return $this->hasMany(Comment::class);
    }
}
