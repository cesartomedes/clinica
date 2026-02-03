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
            $table->dropConstrainedForeignId('section_id');
            $table->string('section_name', 150)->after('school_id');
        });
    }
    
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn('section_name');
            $table->foreignId('section_id')->constrained()->cascadeOnDelete();
        });
    }
    
};
