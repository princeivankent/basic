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
    Route::get('todos', 'TodoController@index');
    Route::get('todos/{id}', 'TodoController@show');
    Route::post('todos', 'TodoController@store');
    Route::put('todos/{id}', 'TodoController@update');
    Route::delete('todos/{id}', 'TodoController@destroy');
});