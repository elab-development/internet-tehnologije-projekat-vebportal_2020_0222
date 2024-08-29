<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StatsController extends Controller
{
    public function getNumberOfArticlesPerCategory(){

        $nba = Article::where('category_id',1)->count();
        $evroliga = Article::where('category_id',2)->count();
        $evrokup = Article::where('category_id',3)->count();

        return response()->json(['nba'=>$nba, 'evroliga'=>$evroliga, 'evrokup'=>$evrokup],200);

    }

    public function getNumberOfUsers(){

        $broj_korisnika = User::count();

        return response()->json(['broj_korisnika'=>$broj_korisnika],200);

    }

    public function getNumberOfAdmins(){

        $broj_admina = User::where('isAdmin',true)->count();

        return response()->json(['broj_admina'=>$broj_admina],200);

    }


    public function getNumberOfCommentsByCategory(){

        $nba = 0;
        $evroliga = 0;
        $evrokup = 0;
        $articles = Article::all();

        foreach($articles as $article){

            $comments = Comment::where('article_id',$article['article_id'])->get()->count();

            if($article->category_id == 1){
                $nba+=$comments;
            }
            else if($article->category_id == 2){
                $evroliga+=$comments;
            }
            else{
                $evrokup+=$comments;
            }

        }

        return response()->json(['nba'=>$nba, 'evroliga'=>$evroliga, 'evrokup'=>$evrokup],200);

    }

}
