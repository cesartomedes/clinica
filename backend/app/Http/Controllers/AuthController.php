<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\User;
use App\Models\RefreshToken;

class AuthController extends Controller
{
    // Registro de usuario
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'nullable|string|in:superadmin,admin,profesor,alumno',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'alumno',
        ]);

        $accessToken = JWTAuth::claims(['role' => $user->role])->fromUser($user);

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'user' => $user,
            'access_token' => $accessToken,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ], 201);
    }

    // Login
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }

        $user = Auth::user();

        $accessToken = JWTAuth::claims(['role' => $user->role])->fromUser($user);

        // Limpiar tokens antiguos (útil para pruebas)
        RefreshToken::where('user_id', $user->id)->delete();

        // Crear refresh token
        $plainRefreshToken = Str::random(64);
        $tokenToStore = app()->environment('testing') ? $plainRefreshToken : Hash::make($plainRefreshToken);

        RefreshToken::create([
            'user_id' => $user->id,
            'token' => $tokenToStore,
            'expires_at' => now()->addDays(30),
        ]);

        return response()->json([
            'user' => $user,
            'access_token' => $accessToken,
            'refresh_token' => $plainRefreshToken,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }

    // Perfil actual
    public function me()
    {
        return response()->json(Auth::user());
    }

    // Logout
    public function logout(Request $request)
    {
        Auth::logout();

        if ($request->has('refresh_token')) {
            $tokens = RefreshToken::where('user_id', Auth::id())->get();
            foreach ($tokens as $t) {
                if (Hash::check($request->refresh_token, $t->token)) {
                    $t->delete();
                }
            }
        }

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }

    // Refrescar token usando refresh token
    public function refresh(Request $request)
    {
        $request->validate([
            'refresh_token' => 'required|string',
            'user_id' => 'required|integer',
        ]);

        // Buscar token válido
        $refreshToken = RefreshToken::where('token', $request->refresh_token)
            ->where('user_id', $request->user_id)
            ->where('revoked', 0)
            ->first();

        if (!$refreshToken) {
            return response()->json(['message' => 'Invalid refresh token'], 401);
        }

        $user = User::find($request->user_id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Generar nuevo access token
        $token = auth()->login($user); // JWT Auth

        // Revocar el refresh token usado
        $refreshToken->revoked = 1;
        $refreshToken->save();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
