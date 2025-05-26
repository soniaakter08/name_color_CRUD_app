<?php

use App\Http\Controllers\Api\NameColorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\WordController;
use Illuminate\Support\Facades\Http;



//this gives api endpoints
Route::apiResource('name-colors', NameColorController::class);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/words', [WordController::class, 'index']);
Route::post('/words', [WordController::class, 'store']);
Route::get('/proxy/finnfast', function () {
    $response = Http::withHeaders([
        'x-api-key' => env('FINNFAST_API_KEY'),
        'Accept' => 'application/json',
    ])->get('https://finnfast.fi/api/words', [
        'limit' => 1000,
        'page' => 10,
        'all' => false,
    ]);

    return response()->json($response->json());
});
