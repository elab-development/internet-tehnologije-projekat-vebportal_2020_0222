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
}
