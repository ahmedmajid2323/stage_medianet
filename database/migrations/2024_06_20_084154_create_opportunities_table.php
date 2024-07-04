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
        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->string('entreprise')->nullable();
            $table->string('type')->nullable();
            $table->json('skills_required')->nullable();
            $table->string('description')->nullable();
            $table->json('application')->nullable();
            $table->string('contact')->nullable();
            $table->string('departement')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opportunities');
    }
};
