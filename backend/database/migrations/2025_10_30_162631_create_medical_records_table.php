<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->boolean('bucal')->default(false);
            $table->boolean('caries')->default(false);
            $table->boolean('dif_visual')->default(false);
            $table->boolean('vacunado')->default(false);
            $table->string('dosis', 50)->nullable();
            $table->boolean('desparasitado')->default(false);
            $table->text('observaciones')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
