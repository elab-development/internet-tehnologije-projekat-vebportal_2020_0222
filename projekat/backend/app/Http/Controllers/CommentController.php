<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    
    public function index(){

        $comments = Comment::all();

        if(!$comments){

            return response()->json(['status' => 'neuspeh', 'poruka' => 'Ne postoje komentari u sistemu!'],400);
        }

        return response()->json(['status' => 'Uspesan','komentari'=>$comments],200);

    }


}
