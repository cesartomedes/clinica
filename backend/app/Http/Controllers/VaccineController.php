<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vaccine;

class VaccineController extends Controller
{
    public function index()
    {
        return response()->json(Vaccine::all());
    }

    public function show($id)
    {
        $vaccine = Vaccine::findOrFail($id);
        return response()->json($vaccine);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'manufacturer' => 'nullable|string|max:255',
            'doses_required' => 'required|integer|min:1',
        ]);

        $vaccine = Vaccine::create($validated);
        return response()->json($vaccine, 201);
    }

    public function update(Request $request, $id)
    {
        $vaccine = Vaccine::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'manufacturer' => 'nullable|string|max:255',
            'doses_required' => 'sometimes|integer|min:1',
        ]);

        $vaccine->update($validated);
        return response()->json($vaccine);
    }

    public function destroy($id)
    {
        $vaccine = Vaccine::findOrFail($id);
        $vaccine->delete();
        return response()->json(['message' => 'Vaccine deleted successfully']);
    }
}
