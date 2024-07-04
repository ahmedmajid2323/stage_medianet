<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Entreprise;
use App\Models\Opportunities;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Event\ResponseEvent;

class UserController extends Controller
{
    public function profileUpdate(Request $request)
{

}


    public function opportunities()
{
    $entreprise = Entreprise::all();
    $opportunity = Opportunities::all();
    return response()->json([
        'entreprises'=>$entreprise ,
        'opportunities'=>$opportunity ,
    ]);
}


}
