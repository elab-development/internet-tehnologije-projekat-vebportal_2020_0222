<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['name', 'surname', 'username', 'email', 'password', 'reset_password_token', 'is_banned'];
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    protected $guarded = 'isAdmin';
    public $timestamps = false;


    public function comments()
    {

        return $this->hasMany(Comment::class);
    }
}
