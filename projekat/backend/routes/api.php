<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;

use App\Http\Controllers\CommentController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\MailController;
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

//articles
Route::get('/articles/latest', [ArticleController::class, 'getLatestArticle']);
Route::get('/vrati', [ArticleController::class, 'index']);
Route::get('/articles/vrati', [ArticleController::class, 'getArticleByName']);
Route::get('/articles/paginate', [ArticleController::class, 'getAllArticlePagination']);
Route::resource('/articles', ArticleController::class);
Route::get('/articles/category/{id}', [ArticleController::class, 'getArticlesByCategory']);
Route::post('/articles/search',[ArticleController::class,'searchArticles']);

//authors
Route::get('/authors/{id}', [AuthorController::class, 'show']);
Route::get('/authors', [AuthorController::class, 'index']);
Route::resource('authors', AuthorController::class);
Route::get('/paginate/authors', [AuthorController::class, 'getAllAuthorsPagination']);

//categories
Route::resource('categories', CategoryController::class);

//comments
Route::get('/comments/byArticleId/{id}', [CommentController::class, 'getAllCommentsByArticleId']);
Route::get('/comments/mostPositive/{id}', [CommentController::class, 'getCommentsWithMostPositiveVotes']);
Route::get('/comments/mostNegative/{id}', [CommentController::class, 'getCommentsWithMostNegativeVotes']);
Route::get('/paginate/comments', [CommentController::class, 'getAllCommentsPagination']);
Route::get('/comments/check/{article_id}/{user_id}',[CommentController::class, 'showCommentByUserAndArticle']);

//registracija i login
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);


//Mejl
Route::post('/mail',[MailController::class, 'sendWelcomeEmail']);

//Api
Route::get("/rapid/{tournament_id}/{season_id}",[ApiController::class, 'getStandings']);

//ulogovani korisnici
Route::middleware(['auth:sanctum', 'user'])->group(function () {
    //Route::post('/comments', [CommentController::class, 'store']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/comments', [CommentController::class, 'store']);
    Route::patch('/comments/negativeVotes/{id}', [CommentController::class, 'addNegativeVotes']);
    Route::patch('/comments/positiveVotes/{id}', [CommentController::class, 'addPositiveVotes']);
});

//Admini
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/comments', [CommentController::class, 'index']);
    Route::get('/comments/byUserId/{id}', [CommentController::class, 'getCommentsByUserId']);
    Route::patch('user/banUser/{id}', [UserController::class, 'banUser']);
    Route::delete('/comments/{id}',[CommentController::class, 'destroy']);
});
