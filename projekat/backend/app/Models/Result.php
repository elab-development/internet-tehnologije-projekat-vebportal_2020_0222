<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = ['team1_id','team2_id','points_team1','points_team2'];
    protected $table = 'results';
    protected $primary_key = 'result_id';

    public function teams1(){

        return $this->belongsTo(Team::class,'team1_id');

    }

    public function teams2(){

        return $this->belongsTo(Team::class,'team2_id');
    }
}
