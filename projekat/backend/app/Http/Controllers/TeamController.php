<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    

    public function index(){

        $teams = Team::all();

        if(!$teams){

            return response()->json(['status' => 'neuspeh', 'poruka' => 'Ne postoje timovi u sistemu!'],400);
        }

        return response()->json(['status' => 'Uspesan','timovi'=>$teams],200);

    }
}
