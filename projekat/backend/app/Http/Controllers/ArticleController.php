<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    
    public function index(){

        $articles = Article::all();

        if(!$articles){

            return response()->json(['status' => 'Neuspeh','poruka'=>'Ne postoje autori u sistemu!'],404);
        }

        return response()->json(['status' => 'Uspesan','clanci'=>$articles],200);

    }

}
