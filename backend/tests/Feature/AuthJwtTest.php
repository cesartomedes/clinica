<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\RefreshToken;
use Illuminate\Support\Facades\Hash;

class AuthJwtTest extends TestCase
{
    /** @test */
    public function register_login_and_refresh()
    {
        // Crear usuario
        $user = \App\Models\User::factory()->create([
            'password' => bcrypt('secret123') // contraseña hasheada
        ]);
    
        // Login para obtener access token y refresh token
        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'secret123'
        ]);
    
        $loginResponse->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'refresh_token',
            ]);
    
        $refreshToken = $loginResponse['refresh_token'];
        $userId = $user->id;
    
        // Hacer request a refresh token
        $refreshResponse = $this->postJson('/api/auth/refresh', [
            'refresh_token' => $refreshToken,
            'user_id' => $userId,
        ]);
    
        $refreshResponse->assertStatus(200)
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);
    }
}    
