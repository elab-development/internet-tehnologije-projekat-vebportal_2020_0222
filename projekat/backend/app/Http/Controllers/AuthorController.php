<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{

    public function index()
    {

        $authors = Author::all();

        if (!$authors) {

            return response()->json(['status' => 'neuspeh', 'poruka' => 'Ne postoje autori u sistemu!'], 400);
        }

        return response()->json(['status' => 'Uspesan', 'autori' => $authors], 200);
    }

    public function show($id)
    {

        $author = Author::where('author_id', $id)->first();

        if (!$author) {


            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji autor u sistemu!'], 404);
        }

        return response()->json(['status' => 'Uspesan', 'autor' => $author], 200);
    }


    
}
