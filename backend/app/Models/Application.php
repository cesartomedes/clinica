<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'vaccine_id',
        'user_id',
        'dose_number',
        'application_date',
        'notes'
    ];

    // Relaciones
    public function student() {
        return $this->belongsTo(Student::class);
    }
    
    public function vaccine()
    {
        return $this->belongsTo(Vaccine::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
