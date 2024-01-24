<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

     protected $fillable = ['name','coach','category_id'];
     protected $table = ['teams'];
     protected $primary_key = 'team_id';

     public function categories(){

        $this->belongsTo(Category::class,'category_id');
     }

     public function results1(){


        return $this->hasMany(Team::class,'team1_id');
     }

     public function results2(){


        return $this->hasMany(Team::class,'team2_id');
     }




}
