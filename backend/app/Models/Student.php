<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_id', 
        'section_name',
        'name',
        'sexo',
        'edad',
        'fecha_nacimiento',
        'peso',
        'talla',
        'circunferencia_braquial',
        'grado',
        'matricula_v',
        'matricula_h',
        'matricula_total',
        'cedula_escolar',
        'docente',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function representative()
    {
        return $this->hasOne(Representative::class);
    }

    public function medicalRecord()
    {
        return $this->hasOne(MedicalRecord::class);
    }
}
