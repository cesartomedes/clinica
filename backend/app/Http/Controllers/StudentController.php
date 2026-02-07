<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    // 🔹 Listar todos los estudiantes
    public function index()
    {
        $students = Student::with('representative', 'medicalRecord', 'school')->get();
        return response()->json($students);
    }

    // 🔹 Registrar estudiante
    public function store(Request $request)
    {
        $validated = $request->validate([
            // 🔹 Datos del estudiante
            'school_id' => 'required|exists:schools,id',
            'section_name' => 'required|string|max:150',
            'name' => 'required|string|max:150',
            'sexo' => 'required|in:M,F',
            'edad' => 'required|integer',
            'fecha_nacimiento' => 'nullable|date',
            'peso' => 'nullable|numeric',
            'talla' => 'nullable|numeric',
            'circunferencia_braquial' => 'nullable|numeric',
            'grado' => 'nullable|string|max:50',
            'matricula_v' => 'nullable|integer',
            'matricula_h' => 'nullable|integer',
            'matricula_total' => 'nullable|integer',
            'cedula_escolar' => 'nullable|string|max:50',
            'docente' => 'nullable|string|max:150',

            // 🔹 Representante
            'representative.nombre' => 'required|string|max:150',
            'representative.cedula' => 'nullable|string|max:20',
            'representative.telefono' => 'nullable|string|max:20',
            'representative.direccion' => 'nullable|string',
            'representative.parentesco' => 'nullable|string|max:50',

            // 🔹 Registro médico
            'medical_record.bucal' => 'nullable|boolean',
            'medical_record.caries' => 'nullable|boolean',
            'medical_record.dif_visual' => 'nullable|boolean',
            'medical_record.vacunado' => 'nullable|boolean',
            'medical_record.desparasitado' => 'nullable|boolean',
            'medical_record.dosis' => 'nullable|string|max:50',
            'medical_record.observaciones' => 'nullable|string|max:255',
        ]);

        // 🔹 Crear estudiante (solo campos del modelo Student)
        $studentData = collect($validated)->except(['representative', 'medical_record'])->toArray();
        $student = Student::create($studentData);

        // 🔹 Crear relaciones
        $student->representative()->create($validated['representative']);
        $student->medicalRecord()->create($validated['medical_record']);

        return response()->json([
            'message' => 'Alumno registrado correctamente',
            'student' => $student->load('representative', 'medicalRecord', 'school'),
        ]);
    }

    // 🔹 Mostrar estudiante específico
    public function show($id)
    {
        $student = Student::with('representative', 'medicalRecord', 'school')->find($id);

        if (!$student) {
            return response()->json(['message' => 'Estudiante no encontrado'], 404);
        }

        return response()->json(['data' => $student]);
    }

    // 🔹 Actualizar estudiante
    public function update(Request $request, $id)
    {
        $student = Student::with('representative', 'medicalRecord')->find($id);

        if (!$student) {
            return response()->json(['message' => 'Estudiante no encontrado'], 404);
        }

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
            'grado' => 'nullable|string|max:50',
            'matricula_v' => 'nullable|integer',
            'matricula_h' => 'nullable|integer',
            'matricula_total' => 'nullable|integer',
            'cedula_escolar' => 'nullable|string|max:50',
            'docente' => 'nullable|string|max:150',

            'representative.nombre' => 'required|string|max:150',
            'representative.cedula' => 'nullable|string|max:20',
            'representative.telefono' => 'nullable|string|max:20',
            'representative.direccion' => 'nullable|string',
            'representative.parentesco' => 'nullable|string|max:50',

            'medical_record.bucal' => 'nullable|boolean',
            'medical_record.caries' => 'nullable|boolean',
            'medical_record.dif_visual' => 'nullable|boolean',
            'medical_record.vacunado' => 'nullable|boolean',
            'medical_record.desparasitado' => 'nullable|boolean',
            'medical_record.dosis' => 'nullable|string|max:50',
            'medical_record.observaciones' => 'nullable|string|max:255',
        ]);

        $studentData = collect($validated)->except(['representative', 'medical_record'])->toArray();
        $student->update($studentData);

        // 🔹 Actualizar o crear relaciones
        $student->representative
            ? $student->representative->update($validated['representative'])
            : $student->representative()->create($validated['representative']);

        $student->medicalRecord
            ? $student->medicalRecord->update($validated['medical_record'])
            : $student->medicalRecord()->create($validated['medical_record']);

        return response()->json([
            'message' => 'Estudiante actualizado correctamente',
            'student' => $student->fresh()->load('representative', 'medicalRecord', 'school'),
        ]);
    }

    // 🔹 Eliminar estudiante
    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json(['message' => 'Estudiante no encontrado'], 404);
        }

        $student->medicalRecord?->delete();
        $student->representative?->delete();
        $student->delete();

        return response()->json(['message' => 'Estudiante eliminado correctamente'], 200);
    }
}
