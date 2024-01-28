<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['text','user_id','article_id'];
    protected $table = 'comments';
    protected $primaryKey = 'comment_id';
    public $timestamps = false;

    public function users(){

        return $this->belongsTo(User::class,'user_id');
    }

    public function articles(){


        return $this->belongsTo(Article::class,'article_id');
    }


}
