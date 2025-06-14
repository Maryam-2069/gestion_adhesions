<?php

namespace App\Http\Controllers;

use App\Models\Adhesion;
use App\Models\Adherents;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalAdherents = Adherents::count();
        $totalAdhesions = Adhesion::count();

        $totalMontant = Adhesion::with('typeAdhesion')->get()->sum(function ($adhesion) {
            return optional($adhesion->typeAdhesion)->prix ?? 0;
        });

        $recentAdhesions = Adhesion::with(['adherent', 'typeAdhesion'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($adhesion) {
                return [
                    'id' => $adhesion->id,
                    'adherent' => optional($adhesion->adherent)->nom . ' ' . optional($adhesion->adherent)->prenom,
                    'type' => optional($adhesion->typeAdhesion)->nom,
                    'prix' => optional($adhesion->typeAdhesion)->prix,
                    'date_debut' => $adhesion->date_debut,
                ];
            });

        return Inertia::render('dashboard', [
            'totalAdherents' => $totalAdherents,
            'totalAdhesions' => $totalAdhesions,
            'totalMontant' => $totalMontant,
            'recentAdhesions' => $recentAdhesions,
        ]);
    }
}
