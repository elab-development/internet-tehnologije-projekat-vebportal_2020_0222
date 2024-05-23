<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    
    public function index(){

        $users = User::all();

        if(!$users){

            return response()->json(['status' => 'neuspeh', 'poruka' => 'Ne postoje korisnici u sistemu!'],400);
        }

        return response()->json(['status' => 'Uspesan','korisnici'=>$users],200);

    }


    public function getNonAdmins(){

        $nonAdmins = User::where('isAdmin',false)->get();

        if(!$nonAdmins){

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoje korisnici koji nisu admini!'],400);
        }

        return response()->json(['status' => 'Uspesan', 'korisnici' => $nonAdmins],200);


    }

}
