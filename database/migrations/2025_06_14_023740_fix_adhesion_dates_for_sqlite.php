<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // SQLite stores dates as TEXT, so we need to ensure proper format
        Schema::table('adhesions', function (Blueprint $table) {
            // For SQLite, we'll keep them as string but ensure format
            $table->string('date_debut', 10)->change(); // YYYY-MM-DD format
            $table->string('date_fin', 10)->change();   // YYYY-MM-DD format
        });

        // Update existing data to ensure proper format
        DB::table('adhesions')->whereNotNull('date_debut')->update([
            'date_debut' => DB::raw("date(date_debut)"),
            'date_fin' => DB::raw("date(date_fin)")
        ]);
    }

    public function down(): void
    {
        // No need to change back as string is the default for SQLite
    }
};