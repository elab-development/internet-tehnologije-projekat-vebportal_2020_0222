<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/vrati',[ArticleController::class,'index']);

//CRUD operacije vezane za clanke

Route::resource('articles', ArticleController::class);
Route::resource('authors', AuthorController::class);
Route::resource('categories',CategoryController::class);
Route::put('izmeniKomentar/{id}',[CommentController::class,'update']);
Route::post('kreirajKomentar',[CommentController::class,'store']);