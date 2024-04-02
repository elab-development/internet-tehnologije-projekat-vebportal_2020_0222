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


    public function store(Request $request){

        $request->validate([

            'name'=>'required|string',
            'surname'=>'required|string'

        ]);

        $author = Author::create(
            [
                'name'=>$request->name,
                'surname'=>$request->surname
            ]);
                
            return response()->json(['status'=>'Uspesan','clanci'=>$author],201);
        }

    
    public function show($id){

        $author = Author::where('author_id',$id)->first();

        if(!$author){

            return response()->json(['status' => 'Neuspesan', 'poruka'=> 'Ne postoji takav autor u sistemu!'],404);

        }

        return response()->json(['status'=>'Uspesan','author' => $author],200);

    }

    public function update(Request $request, $id){

        $author = Author::where('author_id',$id)->first();

        if(!$author){

            return response()->json(['status'=>'Neuspesan', 'poruka' => 'Ne postoji takav autor u sistemu!'],404);

        }

        $request->validate(
            [
                'name' => 'string',
                'surname' => 'string'
            ]
            );

        $author->update([

            'name' => $request['name'] == null ? $author->name : $request->name,
            'surname' => $request['surname'] == null ? $author->surname : $request->surname

        ]);

        return response()->json(['status'=>'Uspesan','author' => $author],200);

    }

    public function destroy($id){

        $author = Author::where('author_id',$id)->first();

        if(!$author){

            return response()->json(['status'=>'Neuspesan', 'poruka' => 'Ne postoji takav autor u sistemu!'],404);

        }

        $author->delete();

        return response()->json(['status' => 'Uspesan']);

    }

    


}
