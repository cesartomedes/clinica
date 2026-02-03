<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'bucal',
        'caries',
        'dif_visual',
        'vacunado',
        'dosis',
        'desparasitado',
        'observaciones'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
