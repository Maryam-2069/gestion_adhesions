<?php

namespace App\Http\Controllers;

use App\Models\Adhesion;
use App\Models\Adherents;
use App\Models\TypeAdhesion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdhesionController extends Controller
{
public function index()
{
    $adhesions = Adhesion::with(['typeAdhesion', 'adherent'])->get()->map(function ($adhesion) {
        return [
            'id' => $adhesion->id,
            'type' => optional($adhesion->typeAdhesion)->nom ?? '—',
            'montant' => optional($adhesion->typeAdhesion)->prix ?? 0,
            'date_debut' => $adhesion->date_debut,
            'date_fin' => $adhesion->date_fin,
            'adherent_nom' => trim(optional($adhesion->adherent)->nom . ' - ' . optional($adhesion->adherent)->prenom) ?: '—',
        ];
    });

    return inertia('adhesions/index', compact('adhesions'));
}
 public function create()
{
    $adherents = Adherents::all();
    $typeAdhesions = TypeAdhesion::all(); 

    return Inertia::render('adhesions/create', [
        'adherents' => $adherents,
        'typeAdhesions' => $typeAdhesions,
    ]);
}

    public function store(Request $request)
    {
        $validate = $request->validate([
            'adherents_id' => 'required|exists:adherents,id',
            'type_adhesion_id' => 'required|exists:type_adhesions,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
        ]);

        Adhesion::create($validate);
        return redirect()->route('adhesions.index')->with('success', 'Adhesion créée avec succès.');
    }

public function edit(string $id)
{
    $adhesion = Adhesion::with('typeAdhesion', 'adherent')->findOrFail($id);

    $formattedAdhesion = [
        'id' => $adhesion->id,
        'type_adhesion_id' => $adhesion->type_adhesion_id,
        'adherents_id' => $adhesion->adherents_id,
        'date_debut' => $adhesion->date_debut,
        'date_fin' => $adhesion->date_fin,
    ];

    $adherents = Adherents::all();
    $types = TypeAdhesion::all();

    return Inertia::render('adhesions/edit', [
        'adhesion' => $formattedAdhesion,
        'adherents' => $adherents,
        'types' => $types,
    ]);
}


    public function update(Request $request, string $id)
    {
        $adhesion = Adhesion::findOrFail($id);

        $validate = $request->validate([
            'adherents_id' => 'required|exists:adherents,id',
            'type_adhesion_id' => 'required|exists:type_adhesions,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
        ]);

        $adhesion->update($validate);
        return redirect()->route('adhesions.index')->with('success', 'Adhesion mise à jour avec succès.');
    }

    public function destroy(string $id)
    {
        $adhesion = Adhesion::findOrFail($id);
        $adhesion->delete();
        return redirect()->route('adhesions.index')->with('success', 'Adhesion supprimée avec succès.');
    }
}
