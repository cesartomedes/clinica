<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject; 
use App\Notifications\ResetPasswordNotification;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * Atributos asignables en masa
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role' // 
    ];

    /**
     * Atributos ocultos en la serialización
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Atributos casteados
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Métodos requeridos por JWT
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    public function sendPasswordResetNotification($token)
{
    $this->notify(new ResetPasswordNotification($token));
}
}
