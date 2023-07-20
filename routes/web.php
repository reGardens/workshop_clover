<?php

use App\Http\Controllers\Front\LandingController;
use App\Http\Controllers\Front\RegisterController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * LANDING PAGE
 * route: /
 * name: landing
 */
Route::get('/', [LandingController::class, 'index'])->name('landing');

/**
 * CREATE CONTENT
 * route: /create
 * name: create.content
 */
Route::get('/create', [LandingController::class, 'create'])->name('create.content');

/**
 * CREATE CONTENT STORE
 * route: /create
 * name: create.content
 */
Route::post('/create', [LandingController::class, 'store'])->name('store.content');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';
