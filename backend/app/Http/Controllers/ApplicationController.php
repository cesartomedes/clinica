<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Patient;
use App\Models\Vaccine;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = Application::with(['patient', 'vaccine', 'user'])->get();
        return response()->json($applications);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'vaccine_id' => 'required|exists:vaccines,id',
            'user_id' => 'required|exists:users,id',
            'dose_number' => 'required|integer|min:1',
            'application_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $application = Application::create($validated);

        return response()->json([
            'message' => 'Application created successfully',
            'data' => $application->load(['patient', 'vaccine', 'user'])
        ], 201);
    }

    public function show(Application $application)
    {
        return response()->json($application->load(['patient', 'vaccine', 'user']));
    }

    public function update(Request $request, Application $application)
    {
        $validated = $request->validate([
            'dose_number' => 'sometimes|integer|min:1',
            'application_date' => 'sometimes|date',
            'notes' => 'nullable|string',
        ]);

        $application->update($validated);

        return response()->json([
            'message' => 'Application updated successfully',
            'data' => $application->load(['patient', 'vaccine', 'user'])
        ]);
    }
    public function history($patient_id)
{
    // Verificar que el paciente exista
    $patient = \App\Models\Patient::find($patient_id);
    if (!$patient) {
        return response()->json(['message' => 'Patient not found'], 404);
    }

    // Traer todas las aplicaciones de vacunas del paciente con detalles
    $applications = \App\Models\Application::with(['vaccine', 'user'])
        ->where('patient_id', $patient_id)
        ->orderBy('application_date', 'desc')
        ->get();

    return response()->json([
        'patient' => $patient,
        'applications' => $applications
    ]);
}

    public function destroy(Application $application)
    {
        $application->delete();

        return response()->json(['message' => 'Application deleted successfully'], 204);
    }

}
