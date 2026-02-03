<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\School;

class SchoolController extends Controller
{
    // Crear escuela
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:150',
                'code' => 'nullable|string|max:50',
                'municipio' => 'nullable|string|max:100',
                'parroquia' => 'nullable|string|max:100',
            ]);
    
            $school = School::create($validated);
    
            return response()->json([
                'message' => 'School created successfully',
                'data' => $school
            ], 201);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }
    }

    // Listar escuelas
    public function index()
    {
        $schools = School::all();
        return response()->json($schools);
    }

    // Mostrar escuela específica
    public function show($id)
    {
        $school = School::findOrFail($id);
        return response()->json($school);
    }
    public function destroy($id)
{
    $school = School::findOrFail($id);
    $school->delete();

    return response()->json(['message' => 'Escuela eliminada correctamente.']);
}
}
