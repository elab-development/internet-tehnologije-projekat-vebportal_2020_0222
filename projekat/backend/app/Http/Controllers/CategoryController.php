<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){

        $categories = Category::all();

        if(!$categories){

            return response()->json(['status' => 'neuspeh', 'poruka' => 'Ne postoje kategorije u sistemu!'],400);
        }

        return response()->json(['status' => 'Uspesan','kategorije'=>$categories],200);

    }

    public function store(Request $request){

        $request->validate([

            'name' => 'required|string'

        ]);

        $categories = Category::create([

            'name' => $request->name

        ]);

        return response()->json(['status' => 'Uspesan', 'kategorije' => $categories],200);

    }

    public function show($id){

        $categories = Category::where('category_id',$id)->first();

        if(!$categories){
            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takva kategorija u sistemu!'],404);
        }

        return response()->json(['status' => 'Uspesan', 'kategorije' => $categories],200);


    }

    public function update(Request $request, $id){

        $categories = Category::where('category_id',$id)->first();

        if(!$categories){
            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takva kategorija u sistemu!'],404);
        }

        $request->validate([

            'name' => 'string'

        ]);

        $categories->update([

            'name' => $request['name'] == null? $categories->name : $request->name

        ]);

        return response()->json(['status' => 'Uspesan', 'kategorije' => $categories],200);

    }

    public function destroy($id){

        $categories = Category::where('category_id',$id)->first();

        if(!$categories){
            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Ne postoji takva kategorija u sistemu!'],404);
        }

        $categories->delete();

        return response()->json(['status' => 'Uspesan'],200);

    }


}
