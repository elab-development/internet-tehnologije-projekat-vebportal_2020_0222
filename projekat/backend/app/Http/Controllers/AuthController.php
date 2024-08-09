<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use PhpParser\Node\Stmt\TryCatch;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $data = $request->validate([

            'name' => 'required|string',
            'surname' => 'required|string',
            'username' => 'required|string|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string'


        ]);



        $user = User::create([

            'name' => $data['name'],
            'surname' => $data['surname'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'isAdmin' => false


        ]);

        $token = $user->createToken('token')->plainTextToken;

        return response()->json(['status' => 'Uspesan', 'korisnik' => $user], 200);
    }


    public function login(Request $request)
    {

        if($request->is_banned){
            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Korisnik je banovan'], 404);
        }

        $data = $request->validate([

            'email' => 'required|string',
            'password' => 'required|string'

        ]);

        $user = User::where('email', $data['email'])->first();


        if (!$user || !Hash::check($data['password'], $user->password)) {


            return response()->json(['status' => 'Neuspesan', 'poruka' => 'Neuspesno logovanje'], 404);
        }


        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'korisnik' => $user,
            'token' => $token,
        ], 200);
    }

    public function logout(Request $request)
    {

        $request->user()->tokens()->delete();

        return response()->json([
            'poruka' => 'Korisnik izlogovan'
        ], 200);
    }
}
