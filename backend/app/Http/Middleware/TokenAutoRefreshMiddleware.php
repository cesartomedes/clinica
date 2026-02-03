<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;
use Exception;

class TokenAutoRefreshMiddleware
{
    /**
     * Umbral en segundos antes de expirar para refrescar automáticamente.
     * Ej: 300 => si faltan <= 5 minutos, generamos nuevo token.
     */
    protected $threshold = 300;

    public function handle(Request $request, Closure $next)
    {
        try {
            // Analiza el token, obtiene payload (throws si no hay token o inválido)
            $payload = JWTAuth::parseToken()->getPayload();
        } catch (Exception $e) {
            // si no hay token válido, dejamos que el flujo normal maneje 401
            return $next($request);
        }

        // exp es timestamp unix
        $exp = $payload->get('exp');
        $now = time();
        $timeLeft = $exp - $now;

        $response = $next($request);

        // Si el token está cerca de expirar, rotamos/refresh
        if ($timeLeft <= $this->threshold) {
            try {
                $newToken = JWTAuth::refresh(JWTAuth::getToken());

                // Incluir el token nuevo en header y en Body si JSON (opcional)
                $response->headers->set('X-Refreshed-Token', $newToken);

                // Si la respuesta es JSON, intentar añadir token al body bajo 'refreshed_token'
                if ($response instanceof \Illuminate\Http\JsonResponse) {
                    $data = $response->getData(true);
                    $data['refreshed_token'] = $newToken;
                    $response->setData($data);
                }
            } catch (Exception $e) {
                // Si falla refresh, no rompemos la respuesta original.
            }
        }

        return $response;
    }
}
