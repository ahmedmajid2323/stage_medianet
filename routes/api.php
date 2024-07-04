<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CVmaker;
use App\Http\Controllers\UserController;

//************************************AUTHENTICATION*************************************/
Route::post('/login', [AuthController::class ,'login']);
Route::post('/signup', [AuthController::class ,'SignUp']);
Route::post('/activation/{token}', [AuthController::class, 'activateAccount']);





Route::middleware('auth:sanctum')->group(function() {
    Route::post('/currentuser', [AuthController::class ,'currentuser']);

    Route::post('/updateprofile', [AuthController::class ,'update_profile']);

    Route::get('/get_resume', [CVmaker::class ,'get_cv']);
    Route::delete('/delete_cv/{id}', [CVmaker::class ,'delete_cv']);

//************************************CVmaker*************************************/
    Route::post('/create_cv',[CVmaker::class , 'create_cv']);

    Route::post('/inf_personnelle/{cv_id}',[CVmaker::class , 'personnelle']);
    Route::get('/get_inf_personnelle/{cv_id}',[CVmaker::class , 'get_personnelle']);

    Route::post('/experience/{cv_id}',[CVmaker::class , 'experience']);
    Route::get('/get_experience/{cv_id}',[CVmaker::class , 'get_experience']);

    Route::post('/project/{cv_id}',[CVmaker::class , 'project']);
    Route::get('/get_project/{cv_id}',[CVmaker::class , 'get_project']);

    Route::post('/certificat/{cv_id}',[CVmaker::class , 'certificat']);
    Route::get('/get_certificat/{cv_id}',[CVmaker::class , 'get_certificat']);

    Route::post('/competence/{cv_id}',[CVmaker::class , 'competence']);
    Route::get('/get_competence/{cv_id}',[CVmaker::class , 'get_competence']);


    Route::post('/profileUpdate', [UserController::class ,'profileUpdate']);
    Route::post('/opportunities', [UserController::class ,'opportunities']);
});

