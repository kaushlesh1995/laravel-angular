<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'UserController@login');
    
    Route::post('signup', 'UserController@signup');
    Route::post('update', 'UserController@update');
  
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('getData', 'UserController@index');
        Route::get('allData', 'UserController@getUser');
        Route::get('logout', 'UserController@logout');
        Route::get('user', 'UserController@user');
    });
});
