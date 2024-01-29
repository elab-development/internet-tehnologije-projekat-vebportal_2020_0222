<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Controller;
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



Route::get('/vrati',[ArticleController::class,'index']);

//rute vezane za autore

Route::get('/authors',[AuthorController::class,'index']);
Route::get('/authors/{id}',[AuthorController::class,'show']);

//rute vezane za komentare

Route::get('/comments',[CommentController::class,'index']);
Route::get('comments/{id}',[CommentController::class,'show']);
Route::post('/comments',[CommentController::class,'store']);
Route::put('/comments/{id}',[CommentController::class,'update']);
Route::delete('/comments',[CommentController::class,'destroy']);

//CRUD operacije vezane za clanke

Route::resource('articles', ArticleController::class);

//autentifikacija korisnika

    //registracija
Route::post('/registruj',[AuthController::class,'register']);

    //login
Route::post('/login',[AuthController::class,'login']);

    //logout
Route::post('/logout',[AuthController::class,'logout']);


//samo autentifikovani korisnici

Route::middleware('auth:sanctum')->group(function () {

    

});