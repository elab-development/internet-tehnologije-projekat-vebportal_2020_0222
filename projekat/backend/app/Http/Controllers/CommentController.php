<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function index()
    {

        echo 'Pocetak';
        $comments = Comment::all();

        if (!$comments) {

            echo 'Prazno';
            return response()->json(['status' => 'neuspeh', 'poruka' => 'Ne postoje komentari u sistemu!'], 400);
        }

        echo 'Prosao';
        return response()->json(['status' => 'Uspesan', 'komentari' => $comments], 200);
    }

   


    //prikazuje se odredjeni clanak

    public function show($id)
    {

        $comments = Comment::where('comment_id', $id)->first();

        if (!$$comments) {

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav komentar u sistemu!'], 404);
        }

        return response()->json(['status' => 'Uspesan', 'comment' => $article], 200);
    }


    public function update(Request $request, $id)
    {

        $comments = Comment::where('comment_id', $id)->first();

        if (!$comments) {

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav komentar u sistemu!'], 404);
        }

        $request->validate(
            [
                'text' => 'string'
            ]
        );

        $comments->update(
            [
                'text' => $request['text'] == null? $comments->text : $request->text,

            ]
            );

        return response()->json(['status' => 'Uspesan', 'comment' => $comments],200);
    }

    public function destroy($id){

        $comments = Comment::where('comment_id',$id)->first();

        if(!$comments){

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav komentar u sistemu!'],404);
        }

        $comments->delete();

        return response()->json(['status' => 'Uspesan'],200);

    }

   
}
