<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class ArticleController extends Controller
{

    public function index()
    {

        $articles = Article::paginate(10);

        if ($articles->isEmpty()) {

            return response()->json(['status' => 'Neuspeh', 'poruka' => 'Ne postoje clanci u sistemu!'], 404);
        }

        return response()->json(['status' => 'Uspesan', 'clanci' => $articles], 200);
    }

    // kreira se jedan clanak
    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'publishing_date' => 'required|date',
            'author_id' => 'exists:authors,author_id',
            'category_id' => 'exists:categories,category_id'

        ]);



        $article = Article::create([

            'title' => $request->title,
            'content' => $request->content,
            'publishing_date' => $request->publishing_date,
            'author_id' => $request->author_id,
            'category_id' => $request->category_id
        ]);

        return response()->json(['status' => 'Uspesan', 'clanci' => $article], 201);
    }


    //prikazuje se odredjeni clanak

    public function show($id)
    {

        $article = Article::where('article_id', $id)->first();

        if (!$article) {

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav clanak u sistemu!'], 404);
        }

        return response()->json(['status' => 'Uspesan', 'article' => $article], 200);
    }


    public function update(Request $request, $id)
    {

        $article = Article::where('article_id', $id)->first();

        if (!$article) {

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav clanak u sistemu!'], 404);
        }

        $request->validate(
            [
                'title' => 'string',
                'content' => 'string',
                'publishing_date' => 'date',
            ]
        );

        $article->update(
            [
                'title' => $request['title'] == null? $article->title : $request->title,
                'content' => $request['content'] == null? $article->content : $request->content,
                'publishing_date' => $article->publishing_date,


            ]
            );

        return response()->json(['status' => 'Uspesan', 'article' => $article],200);
    }

    public function destroy($id){

        $article = Article::where('article_id',$id)->first();

        if(!$article){

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav clanak u sistemu!'],404);
        }

        $article->delete();

        return response()->json(['status' => 'Uspesan'],200);

    }
}
