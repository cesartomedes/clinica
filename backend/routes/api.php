<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\VaccineController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\StudentController;

/*
|--------------------------------------------------------------------------|
| API Routes
|--------------------------------------------------------------------------|
*/

Route::group(['prefix' => 'auth'], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
});

// Rutas protegidas
Route::middleware(['auth:api','token.refresh'])->group(function () {

    // Usuarios solo Super Admin
    Route::get('/admin/users', function () {
        return \App\Models\User::all();
    })->middleware('role:superadmin');
// Editar usuario - solo Super Admin
Route::put('/admin/users/{id}', function($id, Request $request) {
    $request->validate([
        'name' => 'required|string|max:100',
        'email' => 'required|string|email|unique:users,email,' . $id,
        'role' => 'required|string|in:superadmin,admin,profesor',
    ]);

    $user = \App\Models\User::findOrFail($id);
    $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'role' => $request->role,
    ]);

    return response()->json($user, 200);
})->middleware('role:superadmin');

// Eliminar usuario - solo Super Admin
Route::delete('/admin/users/{id}', function($id) {
    $user = \App\Models\User::findOrFail($id);
    $user->delete();

    return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
})->middleware('role:superadmin');

    // CRUD vacunas y pacientes
    Route::apiResource('vaccines', VaccineController::class)->middleware('role:super_admin,admin');
    Route::apiResource('patients', PatientController::class)->middleware('role:super_admin,admin');

    // CRUD aplicaciones de vacunas
    Route::apiResource('applications', ApplicationController::class)
        ->middleware('role:profesional_salud,admin,superadmin');

    // Historial de vacunación de un paciente específico
    Route::get('patients/{patient}/history', [ApplicationController::class, 'history'])
        ->middleware('role:profesional_salud,admin,superadmin');

    // Mis aplicaciones
    Route::get('my/applications', function(Request $request) {
        return \App\Models\Application::where('user_id', $request->user()->id)->get();
    })->middleware('role:profesional_salud,admin,superadmin');

    // Generar PDF del registro de vacunación
    Route::get('reports/vaccination-sheet', [ReportController::class, 'vaccinationSheet'])
        ->middleware('role:superadmin,admin,profesional_salud');
});
Route::prefix('schools')->group(function () {
    Route::get('/', [SchoolController::class, 'index']);
    Route::get('/{id}', [SchoolController::class, 'show']);
    Route::post('/', [SchoolController::class, 'store']);
    Route::delete('/{id}', [SchoolController::class, 'destroy']);

});
// Rutas de estudiantes (solo admin o superadmin)
Route::middleware(['auth:api', 'token.refresh', 'role:superadmin,admin'])->group(function() {
    Route::apiResource('students', StudentController::class);
});


