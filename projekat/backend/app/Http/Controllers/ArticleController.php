<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{

    //vraca sve clanke zajedno sa njihovim autorima i kategorijama i brojem komentara za taj clanak, sortirani prema ID clanka
    public function index()
    {

        $articles = Article::with(['authors', 'categories'])->orderByDesc('article_id')->paginate(5);

        if (!$articles) {

            return response()->json(['status' => 'Neuspeh', 'poruka' => 'Ne postoje clanci u sistemu!'], 404);
        }

        foreach ($articles as $article) {
            $article->image_url = url($article->image_path); 
            $comments = Comment::where('article_id',$article['article_id'])->get()->count();
            $article->number_of_comments = $comments;
        }

        return response()->json(['status' => 'Uspesan', 'clanci' => $articles,], 200);
    }

    //cuvanje novog clanka u bazi
    public function store(Request $request)
    {

        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'publishing_date' => 'required|date',
            'author_id' => 'exists:authors,author_id',
            'category_id' => 'exists:categories,category_id',
            'image' => 'required|mimes:jpg,jpeg,png|max:2048'
        ]);

        $image_path = null;

        if ($request->file('image')) {

            $image_name  = time() . '.' . $request->image->getClientOriginalExtension();
            $request->image->move(public_path('images'), $image_name);
            $image_path = 'images/' . $image_name;
        }

        $article = Article::create([

            'title' => $request->title,
            'content' => $request->content,
            'publishing_date' => $request->publishing_date,
            'author_id' => $request->author_id,
            'category_id' => $request->category_id,
            'image_path' => $image_path
        ]);

        return response()->json(['status' => 'Uspesan', 'clanci' => $article], 201);
    }

    //prikazivanje clanka koji ima zadati ID
    public function show($id)
    {

        $article = Article::where('article_id', $id)->with(['authors','categories'])->first();

        if (!$article) {

            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takav clanak u sistemu!'], 404);
        }

        $article->image_url = url($article->image_path); 

      

        return response()->json(['status' => 'Uspesan', 'article' => $article], 200);
    }

    //brisanje clanka sa tacno zadatim ID
    public function destroy($id){

        $article = Article::where('article_id',$id)->first();

        if(!$article){

            return response()->json(['status'=>'Neuspesan', 'poruka' => 'Ne postoji takav clanak u sistemu!'],404);

        }

        $articles = Article::where('image_path',$article->image_path)->get();
        $duzina = sizeof($articles);
        if($duzina<2){
            $image_path = $article->image_path;
            Storage::disk('public')->delete($image_path);
        }
        $article->delete();

        return response()->json(['status' => 'Uspesan']);

    }

    //vraca sve clanke, ali kroz paginaciju
    public function getAllArticlePagination()
    {

        $articles = Article::paginate(10);

        return response()->json(['status' => 'Uspesan', 'clanci' => $articles]);
    }

    //vraca poslednji objavljeni clanak
    public function getLatestArticle()
    {

        $article = Article::with(['authors', 'categories'])->orderBy('publishing_date', 'desc')->first();

        if (!$article) {
            return response()->json(['status' => 'Neuspeh', 'poruka' => 'Ne postoje clanci u sistemu!'], 404);
        }

        return  response()->json(['status' => 'Uspesan', 'clanak' => $article]);
    }

    //vraca sve clanke zajedno sa njihovim autorom i kategorijom, prema ID kategorije, takodje paginacija
    public function getArticlesByCategory($id)
    {

        $articles = Article::where('category_id', $id)->with(['authors', 'categories'])->orderByDesc('article_id')->paginate(5);

        if (!$articles) {
            return response()->json(['status' => 'Neuspeh', 'poruka' => 'Ne postoje clanci u sistemu!'], 404);
        }
        foreach ($articles as $article) {
            $article->image_url = url($article->image_path); 
            $comments = Comment::where('article_id',$article['article_id'])->get()->count();
            $article->number_of_comments = $comments;
        }

        return  response()->json(['status' => 'Uspesan', 'clanci' => $articles]);
    }

    //pretraga clanaka po naslovu
    public function searchArticles(Request $request){

        $search = $request->input('search');

        $articles = Article::where('title','like','%' . $search.'%')->with(['authors','categories'])->get();

        if($articles->isEmpty()){

            return response()->json(['status' => 'Neuspeh', 'poruka' => 'Ne postoje clanci u sistemu!'], 404);

        }

        foreach ($articles as $article) {
            $article->image_url = url($article->image_path); 
            $comments = Comment::where('article_id',$article['article_id'])->get()->count();
            $article->number_of_comments = $comments;
        }


        return  response()->json(['status' => 'Uspesan', 'clanci' => $articles]);
        
    }
}
