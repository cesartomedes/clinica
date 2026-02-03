<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Representative;

class RepresentativeController extends Controller
{
    public function index()
    {
        return response()->json(Representative::all());
    }

    public function show($id)
    {
        $rep = Representative::findOrFail($id);
        return response()->json($rep);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'name' => 'required|string|max:255',
            'cedula' => 'required|string|max:20',
            'telefono' => 'nullable|string|max:20',
            'direccion' => 'nullable|string|max:255',
        ]);

        $rep = Representative::create($validated);
        return response()->json($rep, 201);
    }

    public function update(Request $request, $id)
    {
        $rep = Representative::findOrFail($id);

        $validated = $request->validate([
            'student_id' => 'sometimes|exists:students,id',
            'name' => 'sometimes|string|max:255',
            'cedula' => 'sometimes|string|max:20',
            'telefono' => 'nullable|string|max:20',
            'direccion' => 'nullable|string|max:255',
        ]);

        $rep->update($validated);
        return response()->json($rep);
    }

    public function destroy($id)
    {
        $rep = Representative::findOrFail($id);
        $rep->delete();

        return response()->json(['message' => 'Representative deleted successfully']);
    }
}
