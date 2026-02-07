<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class BackupController extends Controller
{
    /**
     * Crear respaldo de la base de datos
     */
    public function backup()
    {
        $db = config('database.connections.mysql');
    
        // Carpeta interna de backups
        $backupFolder = storage_path('app/backups');
        if (!file_exists($backupFolder)) {
            mkdir($backupFolder, 0755, true);
        }
    
        $filename = 'backup_' . now()->format('Y-m-d_H-i-s') . '.sql';
        $path = $backupFolder . DIRECTORY_SEPARATOR . $filename;
    
        // Carpeta Downloads del usuario Windows
        $downloadsFolder = getenv('USERPROFILE') . DIRECTORY_SEPARATOR . 'Downloads';
        if (!file_exists($downloadsFolder)) {
            mkdir($downloadsFolder, 0755, true);
        }
        $downloadPath = $downloadsFolder . DIRECTORY_SEPARATOR . $filename;
    
        $mysqldump = env('MYSQL_DUMP_PATH');
    
        if (!file_exists($mysqldump)) {
            Log::error('mysqldump no encontrado', ['path' => $mysqldump]);
            return response()->json(['message' => 'mysqldump no encontrado'], 500);
        }
    
        $passwordPart = $db['password'] ? "-p{$db['password']}" : "";
    
        // Comando seguro para Windows usando cmd /c
        $command = "cmd /c \"{$mysqldump} -h127.0.0.1 -P{$db['port']} -u{$db['username']} {$passwordPart} {$db['database']} > \"{$path}\"\"";
    
        // Ejecutar el backup
        exec($command, $output, $return_var);
    
        if ($return_var !== 0) {
            Log::error('Error al crear respaldo', ['output' => $output]);
            return response()->json([
                'message' => 'Error al crear el respaldo',
                'output' => $output
            ], 500);
        }
    
        // Copiar también a Downloads
        copy($path, $downloadPath);
    
        Log::info('Respaldo creado', [
            'file' => $filename,
            'storage_path' => $path,
            'downloads_path' => $downloadPath,
            'user_id' => auth()->id(),
        ]);
    
        // Retornar descarga desde storage (opcional, siempre queda en Downloads)
        return response()->download($path)->deleteFileAfterSend(false);
    }
    

    /**
     * Restaurar base de datos desde respaldo
     */
    public function restore(Request $request)
    {
        $db = config('database.connections.mysql');
        $mysql = env('MYSQL_PATH');
    
        if (!file_exists($mysql)) {
            Log::error('mysql no encontrado', ['path' => $mysql]);
            return response()->json(['message' => 'mysql no encontrado'], 500);
        }
    
        // Verificar si hay usuarios activos
        if ($this->hasActiveSessions()) {
            return response()->json([
                'message' => 'No se puede restaurar: hay usuarios activos en el sistema'
            ], Response::HTTP_CONFLICT);
        }
    
        // 1️⃣ Usar archivo subido por request si existe
        if ($request->hasFile('backup')) {
            $file = $request->file('backup');
            $path = $file->getRealPath();
        } else {
            // 2️⃣ Si no hay archivo subido, buscar el último backup en Downloads
            $downloadsFolder = getenv('USERPROFILE') . DIRECTORY_SEPARATOR . 'Downloads';
            $files = glob($downloadsFolder . DIRECTORY_SEPARATOR . 'backup_*.sql');
    
            if (empty($files)) {
                return response()->json([
                    'message' => 'No se encontró ningún backup en Downloads'
                ], 404);
            }
    
            // Tomar el backup más reciente
            rsort($files);
            $path = $files[0];
        }
    
        $passwordPart = $db['password'] ? "-p{$db['password']}" : "";
    
        // Comando para restaurar en Windows usando cmd /c y redirección <
        $command = "cmd /c \"{$mysql} -h127.0.0.1 -P{$db['port']} -u{$db['username']} {$passwordPart} {$db['database']} < \"{$path}\"\"";
    
        exec($command, $output, $return_var);
    
        if ($return_var !== 0) {
            Log::error('Error al restaurar respaldo', [
                'output' => $output,
                'path' => $path,
                'user_id' => auth()->id(),
            ]);
    
            return response()->json([
                'message' => 'Error al restaurar la base de datos',
                'output' => $output
            ], 500);
        }
    
        Log::warning('Base de datos restaurada', [
            'file' => basename($path),
            'user_id' => auth()->id(),
            'ip' => $request->ip(),
        ]);
    
        return response()->json([
            'message' => 'Base de datos restaurada correctamente',
            'restored_from' => $path
        ]);
    }
    

    /**
     * Verificar si hay sesiones activas
     */
    private function hasActiveSessions(): bool
    {
        return DB::table('personal_access_tokens')
            ->where('last_used_at', '>=', now()->subMinutes(5))
            ->exists();
    }
}
