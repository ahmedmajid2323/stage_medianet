<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\email_verification;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(LoginRequest $request){

        $credentiels = $request->only('email', 'password');
        if (! Auth::attempt($credentiels)){
            return response()->json([
                'error' => 'Wrong credentials!'], 422);
        };
        
        $user = Auth::user();

        if ($user->activation == 0) {
            return response()->json(['error' => 'The account not activated'], 422);
        }

        $token = $user->createToken('main')->plainTextToken ;
        return response()->json([
            'token'=>$token,
            'user'=>$user
        ]);
    }

    public function activateAccount($token)
    {
        $user = User::where('token_email', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid verification token.'], 400);
        }

        $user->activation = 1;
        $user->token_email = null;
        $user->save();

        return response()->json(['message' => 'Account successfully verified!'], 200);
    }


    public function SignUp(SignupRequest $request){

        $data = $request->validated();
        $token = Str::random(60) ;

        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password']),
            'token_email' => $token,
        ]);

        $verificationUrl = url('http://localhost:5173/welcome/'.$user->token_email);  
     // pass the parameter to VerifyMail
        Mail::to($user->email)->send(new email_verification($verificationUrl , $user->name));

        return response()->json([
            'token'=>$token ,
            'user'=>$user ,
            'verify'=>$verificationUrl
        ],201);
        
    }

    public function currentuser(){

        $user = Auth::user();
        return response()->json([
            'user'=>$user ,
        ]);
    }

    public function update_profile(Request $request){
        $profile_data = $request->validate([
            'aboutme'=>'nullable',
            'address'=>'nullable',
            'etablishment'=>'nullable',
            'phone'=>'nullable',
            'profession'=>'nullable',
            'skills'=>'nullable'
        ]) ;
        $user = Auth::user();
    
        $user->about_me = $profile_data['aboutme'] ;
        $user->address = $profile_data['address'] ;
        $user->etablishment = $profile_data['etablishment'] ;
        $user->phone = $profile_data['phone'] ;
        $user->profession = $profile_data['profession'] ;
        if (empty($user->skills)) {
            $user->skills = json_encode($profile_data['skills']);
        }else{
            $skills = json_decode($user->skills) ;
            foreach ($profile_data['skills'] as $skill) {
                $skills[] = $skill;
            }
            $user->skills = json_encode($skills) ;
        } ;
        $user->save() ;
       
    }
}
