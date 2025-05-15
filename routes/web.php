<?php

use App\Http\Controllers\NameController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [NameController::class, 'index'])->name('name.index');
Route::post('/store', [NameController::class, 'store'])->name('name.store');
Route::get('/edit/{id}', [NameController::class, 'edit'])->name('name.edit');
Route::patch('/update/{id}', [NameController::class, 'update'])->name('name.update');
// Route::patch('/delete/{id}', [NameController::class, 'delete'])->name('name.delete');
Route::delete('/name/{id}', [NameController::class, 'destroy'])->name('name.destroy');
