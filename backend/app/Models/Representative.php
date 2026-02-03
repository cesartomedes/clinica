<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Representative extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'nombre',
        'cedula',
        'telefono',
        'direccion',
        'parentesco'
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
