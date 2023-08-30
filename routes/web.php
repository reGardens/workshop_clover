<?php

use App\Http\Controllers\Front\CardDetailController;
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

require __DIR__ . '/backoffice/web.php';

/**
 * LANDING PAGE
 * route: /
 * name: landing
 */
Route::get('/', [LandingController::class, 'index'])->name('landing');

/**
 * DETAIL PAGE
 * route: /detail-page
 * name: detail.page
 */
Route::get('/detail-page/{post}', [LandingController::class, 'detail'])->name('detail.page');

/**
 * CREATE CONTENT
 * route: /create
 * name: create.content
 */
Route::get('/create', [LandingController::class, 'create'])->name('create.content');

/**
 * CREATE CONTENT STORE
 * route: /create
 * name: store.content
 */
Route::post('/create', [LandingController::class, 'store'])->name('store.content');

/**
 * EDIT FORM
 * route: /card-edit
 * name: edit.form
 */
Route::get('/edit-form/{post}', [LandingController::class, 'edit'])->name('edit.form');

/**
 * UPDATE FORM
 * route: /edit-form
 * name: update.form
 */
Route::put('/edit-form/{post}', [LandingController::class, 'update'])->name('update.form');

/**
 * DESTROY FORM
 * route: /destroy-form
 * name: destroy.form
 */
Route::delete('/destroy-form/{post}', [LandingController::class, 'destroy'])->name('destroy.form');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';
