<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'manufacturer',
        'doses_required'
    ];

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
