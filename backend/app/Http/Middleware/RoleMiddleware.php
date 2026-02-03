<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     * Se puede usar en rutas como: ->middleware('role:super_admin') o 'role:admin,profesor'
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $roles)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'No autenticado'], Response::HTTP_UNAUTHORIZED);
        }

        // roles permitidos en la llamada
        $allowed = array_map('trim', explode(',', $roles));

        // si el usuario tiene la propiedad role (string) o roles (array) → adaptamos
        $userRole = $user->role ?? null;

        // Si tu modelo usa relaciones (roles many-to-many), adapta esta comprobación
        // por ejemplo: $user->roles()->pluck('name')->toArray()
        if (!$userRole) {
            // intenta comprobar relación many-to-many
            if (method_exists($user, 'roles')) {
                $userRoles = $user->roles()->pluck('name')->toArray();
                $has = count(array_intersect($allowed, $userRoles)) > 0;
            } else {
                $has = false;
            }
        } else {
            $has = in_array($userRole, $allowed);
        }

        if (!$has) {
            return response()->json(['message' => 'Acceso denegado: permisos insuficientes.'], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
