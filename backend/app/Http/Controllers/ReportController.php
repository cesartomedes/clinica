<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use PDF;

class ReportController extends Controller
{
    public function vaccinationSheet()
    {
        $students = Student::with(['representative', 'medicalRecord', 'applications.vaccine'])->get();

        $pdf = PDF::loadView('reports.vaccination_sheet', compact('students'));
        return $pdf->download('registro_vacunacion.pdf');
    }
}
