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


    public function show($id)
    {

        $comment = Comment::where('comment_id', $id)->first();

        if (!$comment) {

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji komentar u sistemu!'], 404);
        }

        return response()->json(['status' => 'Uspesan', 'komentar' => $comment], 200);
    }

    public function store(Request $request)
    {

        $request->validate([

            'text' => 'required|string',
            'user_id' => 'exists:users,user_id',
            'article_id' => 'exists:articles,article_id'

        ]);

        $comment = Comment::create([

            'text' => $request->text,
            'user_id' => $request->user_id,
            'article_id' => $request->article_id

        ]);


        return response()->json(['status' => 'Uspesan', 'komentar' => $comment], 201);
    }


    public function update(Request $request, $id)
    {

        $comment = Comment::where('comment_id', $id)->first();

        if (!$comment) {

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji komentar u sistemu!'], 404);
        }


        $request->validate([

            'text' => 'required|string',
            'user_id' => 'exists:users,user_id',
            'article_id' => 'exists:articles,article_id'

        ]);

        $comment->update([

            'text' => $request->input('text'),
            'user_id' => $request->input('user_id'),
            'article_id' => $request->input('article_id')


        ]);


        return response()->json(['status' => 'Uspesan', 'komentar' => $comment], 200);
    }


    public function destroy($id)
    {

        $comment = Comment::where('comment_id', $id)->first();

        if (!$comment) {

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji komentar u sistemu!'], 404);
        }

        $comment->delete();


        return response()->json(['status' => 'Uspesan', 'komentar' => $comment], 200);
    }
}
