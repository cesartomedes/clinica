<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MedicalRecord;

class MedicalRecordController extends Controller
{
    public function index()
    {
        return response()->json(MedicalRecord::with('student')->get());
    }

    public function show($id)
    {
        $record = MedicalRecord::with('student')->findOrFail($id);
        return response()->json($record);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'bucal_caries' => 'nullable|boolean',
            'visual_difficulty' => 'nullable|boolean',
            'notes' => 'nullable|string',
        ]);

        $record = MedicalRecord::create($validated);
        return response()->json($record, 201);
    }

    public function update(Request $request, $id)
    {
        $record = MedicalRecord::findOrFail($id);

        $validated = $request->validate([
            'student_id' => 'sometimes|exists:students,id',
            'bucal_caries' => 'nullable|boolean',
            'visual_difficulty' => 'nullable|boolean',
            'notes' => 'nullable|string',
        ]);

        $record->update($validated);
        return response()->json($record);
    }

    public function destroy($id)
    {
        $record = MedicalRecord::findOrFail($id);
        $record->delete();
        return response()->json(['message' => 'Medical record deleted successfully']);
    }
}
