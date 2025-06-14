<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdherentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/adherents', [AdherentController::class, 'index'])->name('adherents.index');
    Route::get('/adherents/create', [AdherentController::class, 'create'])->name('adherents.create');
    Route::post('/adherents', [AdherentController::class, 'store'])->name('adherents.store');
    Route::delete('/adherents/{id}', [AdherentController::class, 'destroy'])->name('adherents.destroy');
    Route::get('/adherents/{id}/edit', [AdherentController::class, 'edit'])->name('adherents.edit');
    Route::put('/adherents/{id}', [AdherentController::class, 'update'])->name('adherents.update');
    Route::get('/adhesions', [App\Http\Controllers\AdhesionController::class, 'index'])->name('adhesions.index');
    Route::get('/adhesions/create', [App\Http\Controllers\AdhesionController::class, 'create'])->name('adhesions.create');
    Route::post('/adhesions', [App\Http\Controllers\AdhesionController::class, 'store'])->name('adhesions.store');
    Route::get('/adhesions/{id}/edit', [App\Http\Controllers\AdhesionController::class, 'edit'])->name('adhesions.edit');
    Route::put('/adhesions/{id}', [App\Http\Controllers\AdhesionController::class, 'update'])->name('adhesions.update');
    Route::delete('/adhesions/{id}', [App\Http\Controllers\AdhesionController::class, 'destroy'])->name('adhesions.destroy');
    Route::get('/types-adhesion', [App\Http\Controllers\TypeAdhesionController::class, 'index'])->name('types-adhesion.index');
    Route::get('/types-adhesion/create', [App\Http\Controllers\TypeAdhesionController::class, 'create'])->name('types-adhesion.create');
    Route::post('/types-adhesion', [App\Http\Controllers\TypeAdhesionController::class, 'store'])->name('types-adhesion.store');
    Route::get('/types-adhesion/{id}/edit', [App\Http\Controllers\TypeAdhesionController::class, 'edit'])->name('types-adhesion.edit');
    Route::put('/types-adhesion/{id}', [App\Http\Controllers\TypeAdhesionController::class, 'update'])->name('types-adhesion.update');
    Route::delete('/types-adhesion/{id}', [App\Http\Controllers\TypeAdhesionController::class, 'destroy'])->name('types-adhesion.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
