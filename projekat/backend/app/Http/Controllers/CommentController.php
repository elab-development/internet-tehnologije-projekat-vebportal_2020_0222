<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function index()
    {

        $comments = Comment::all();

        if (!$comments) {
            return response()->json(['status' => 'neuspeh', 'poruka' => 'Ne postoje komentari u sistemu!'], 400);
        }


        return response()->json(['status' => 'Uspesan', 'komentari' => $comments], 200);
    }

    public function store(Request $request){

        $request->validate([

            'text'=>'required|string',
            'user_id' => 'exists:users,user_id',
            'article_id' => 'exists:articles,article_id'

        ]);

        $comment = Comment::create([

            'text' => $request->text,
            'user_id'=> $request->user_id,
            'article_id'=>$request->article_id

        ]);


        return response()->json(['status' => 'Uspesan', 'komentar' => $comment],201);

    }



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
                'text' => $request['text'] == null ? $comments->text : $request->text,

            ]
        );

        return response()->json(['status' => 'Uspesan', 'comment' => $comments], 200);
    }

    public function destroy($id)
    {

        $comments = Comment::where('comment_id', $id)->first();

        if (!$comments) {

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav komentar u sistemu!'], 404);
        }

        $comments->delete();

        return response()->json(['status' => 'Uspesan'], 200);
    }

    public function getAllCommentsPagination(){

        $comments = Comment::paginate(10);

        return response()->json(['status'=> 'Uspesan', 'komentari' => $comments],200);
    }

    public function getAllCommentsByArticleId($id){

        $comments = Comment::where('article_id', $id)->with('articles','users')->get();

        if(!$comments){
            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav komentar u sistemu!'], 404);
        }

        return response()->json(['status'=> 'Uspesan', 'komentari' => $comments],200);
    }

    public function addPositiveVotes($id){

        $comment = Comment::where('comment_id',$id)->first();

        if(!$comment){

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav komentar u sistemu!'], 404);
        }
        $comment->positive_votes += 1;

        $comment->save();

        return response()->json(['status'=> 'Uspesan', 'komentari' => $comment],200);
    }

    public function addNegativeVotes($id){

        $comment = Comment::where('comment_id',$id)->first();

        if(!$comment){

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav komentar u sistemu!'], 404);
        }
        $comment->negative_votes += 1;

        $comment->save();

        return response()->json(['status'=> 'Uspesan', 'komentari' => $comment],200);
    }

    public function getCommentsWithMostPositiveVotes($id){

        $comments = Comment::where('article_id',$id)->with('users','articles')->orderByDesc('positive_votes')->get();

        if(!$comments){

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav komentar u sistemu!'], 404);
        }

        return response()->json(['status'=> 'Uspesan', 'komentari' => $comments],200);

    }

    public function getCommentsWithMostNegativeVotes($id){

        $comments = Comment::where('article_id',$id)->with('users','articles')->orderByDesc('negative_votes')->get();

        if(!$comments){

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav komentar u sistemu!'], 404);
        }

        return response()->json(['status'=> 'Uspesan', 'komentari' => $comments],200);

    }

    public function getCommentsByUserId($id){

        $comments = Comment::where('user_id',$id)->with('users','articles')->get();

        if(!$comments){

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoje takvi komentari u sistemu!'], 404);

        }

        return response()->json(['status'=> 'Uspesan', 'komentari' => $comments],200);

    }

    public function showCommentByUserAndArticle($article_id, $user_id){

        $comment = Comment::where('article_id',$article_id)->where('user_id',$user_id)->first();

        if(!$comment){

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav komentar u sistemu!'], 404);

        }

        return response()->json(['status'=> 'Uspesan', 'komentar' => $comment],200);

    }

}
