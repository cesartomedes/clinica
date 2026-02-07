<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('students', function (Blueprint $table) {
            //
            $table->string('grado', 50)->nullable();
            $table->integer('matricula_v')->nullable();
            $table->integer('matricula_h')->nullable();
            $table->integer('matricula_total')->nullable();
            $table->string('cedula_escolar', 50)->nullable();
            $table->string('docente', 150)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn(['grado','matricula_v','matricula_h','matricula_total','cedula_escolar','docente']);
        });
    }
};
