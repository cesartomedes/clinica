<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Representative;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::with('representative', 'school', 'medicalRecord')->get();
        return response()->json($students);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'school_id' => 'required|exists:schools,id',
            'section_name' => 'required|string|max:150',
            'name' => 'required|string|max:150',
            'sexo' => 'required|in:M,F',
            'edad' => 'required|integer',
            'fecha_nacimiento' => 'nullable|date',
            'peso' => 'nullable|numeric',
            'talla' => 'nullable|numeric',
            'circunferencia_braquial' => 'nullable|numeric',
    
            // Representante
            'representative.nombre' => 'required|string|max:150',
            'representative.cedula' => 'nullable|string|max:20',
            'representative.telefono' => 'nullable|string|max:20',
            'representative.direccion' => 'nullable|string',
            'representative.parentesco' => 'nullable|string|max:50',
    
            // Registro médico
            'medical_record.bucal' => 'required|boolean',
            'medical_record.caries' => 'required|boolean',
            'medical_record.dif_visual' => 'required|boolean',
            'medical_record.vacunado' => 'required|boolean',
            'medical_record.dosis' => 'nullable|string|max:50',
            'medical_record.desparasitado' => 'required|boolean',
            'medical_record.observaciones' => 'nullable|string|max:255',
        ]);
    
        // Crear estudiante
        $student = Student::create($validated);
    
        // Crear representante
        Representative::create([
            'student_id' => $student->id,
            ...$validated['representative']
        ]);
    
        // Crear registro médico
        MedicalRecord::create([
            'student_id' => $student->id,
            'bucal' => $validated['medical_record']['bucal'],
            'caries' => $validated['medical_record']['caries'],
            'dif_visual' => $validated['medical_record']['dif_visual'],
            'vacunado' => $validated['medical_record']['vacunado'],
            'dosis' => $validated['medical_record']['dosis'] ?? null,
            'desparasitado' => $validated['medical_record']['desparasitado'],
            'observaciones' => $validated['medical_record']['observaciones'] ?? null,
        ]);
    
        return response()->json([
            'message' => 'Alumno registrado correctamente',
            'student' => $student->load('representative', 'medicalRecord', 'school'),
        ]);
    }
    

    public function show($id)
    {
        $student = Student::with('representative', 'school', 'medicalRecord')->find($id);

        if (!$student) {
            return response()->json(['error' => 'Estudiante no encontrado'], 404);
        }

        return response()->json($student, 200);
    }
}
