<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;

use App\Http\Controllers\CommentController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Models\Article;
use App\Models\Author;
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

Route::get('/articles/latest',[ArticleController::class, 'getLatestArticle']);
Route::get('/vrati', [ArticleController::class, 'index']);
Route::get('/articles/vrati', [ArticleController::class, 'getArticleByName']);
Route::get('/articles/paginate',[ArticleController::class,'getAllArticlePagination']);
//rute vezane za autore

//Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{id}', [AuthorController::class, 'show']);
Route::get('/authors', [AuthorController::class, 'index']);


//CRUD operacije vezane za clanke
Route::resource('/articles', ArticleController::class);
Route::get('/articles/category/{id}', [ArticleController::class, 'getArticlesByCategory']);

Route::resource('authors', AuthorController::class);
Route::resource('categories', CategoryController::class);
Route::put('izmeniKomentar/{id}', [CommentController::class, 'update']);
Route::post('kreirajKomentar', [CommentController::class, 'store']);
Route::get('/comments/byArticleId/{id}', [CommentController::class, 'getAllCommentsByArticleId']);
//registracija i login
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::put('/comments/{id}', [CommentController::class, 'update']);
Route::post('/comments', [CommentController::class, 'store']);
//samo autentifikovani korisnici

/* Route::middleware('auth:sanctum')->group(function () {


    //rute vezane za komentare

    Route::get('/comments', [CommentController::class, 'index']);
    Route::get('comments/{id}', [CommentController::class, 'show']);
    Route::post('/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments', [CommentController::class, 'destroy']);
    

    Route::post('/auth/logout', [AuthController::class, 'logout']);
}); */

//ovde treba da se radi

Route::patch('/comments/negativeVotes/{id}',[CommentController::class, 'addNegativeVotes']);
Route::patch('/comments/positiveVotes/{id}',[CommentController::class, 'addPositiveVotes']);
Route::get('/paginate/comments',[CommentController::class,'getAllCommentsPagination']);
Route::get('/paginate/authors',[AuthorController::class,'getAllAuthorsPagination']);
Route::get('/teamByName',[TeamController::class, 'findByName']);
Route::get('/nonadmins',[UserController::class,'getNonAdmins']);


Route::middleware(['auth:sanctum', 'user'])->group(function () {
    //Route::post('/comments', [CommentController::class, 'store']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
});

// Rute za administratore
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/comments', [CommentController::class, 'index']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
});