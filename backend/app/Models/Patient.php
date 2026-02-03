<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'birth_date',
        'gender',
        'address'
    ];

    // Relaciones
    public function applications()
    {
        return $this->hasMany(Application::class);
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
