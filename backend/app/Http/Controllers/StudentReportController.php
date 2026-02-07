<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use PDF;

class StudentReportController extends Controller
{
    public function download($id){
        $student = Student::with([
            'school',
            'section',
            'representative',
            'medicalRecord'
        ])->findOrFail($id);

        $pdf = PDF::loadView('pdf.student', compact('student'))
        ->setPaper('a4', 'portrait');

    return $pdf->download('reporte_estudiante_'.$student->id.'.pdf');

    }

}
