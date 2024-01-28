<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class ResultController extends Controller
{
    public function index(){

        $results = Result::all();

        if(!$results){

            return response()->json(['status' => 'neuspeh', 'poruka' => 'Ne postoje rezultati u sistemu!'],400);
        }

        return response()->json(['status' => 'Uspesan','rezultati'=>$results],200);

    }
}
