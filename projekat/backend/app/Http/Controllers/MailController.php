<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail as MailFacade;
use App\Mail\Mail;

class MailController extends Controller
{
    
    public function sendWelcomeEmail(Request $request)
{
    $name = $request->name;
    $email = $request->email;

    MailFacade::to($email)->send(new Mail($name,$email));

    return response()->json(['poruka' =>'Uspelo'],200);
} 

}
