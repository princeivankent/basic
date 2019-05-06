<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// No auth required
Route::post('login', 'Auth\AuthController@login');
Route::post('register', 'Auth\AuthController@register');
// --

Route::group(['middleware' => ['auth:api']], function () {
    
});
