<?php

namespace App\Http\Controllers;

use App\Models\TypeAdhesion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypeAdhesionController extends Controller
{
  public function index()
{
    $types = TypeAdhesion::all();

    return Inertia::render('types-adhesion/index', [
        'type_adhesions' => $types,
    ]);
}


    public function create()
    {
        return Inertia::render('types-adhesion/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'duree' => 'required|integer|min:1',
            'prix' => 'required|numeric|min:0',
        ]);

        TypeAdhesion::create($validated);

        return redirect()->route('types-adhesion.index')->with('success', 'Type créé avec succès');
    }

 public function edit($id)
{
    $typeAdhesion = TypeAdhesion::findOrFail($id);

    return Inertia::render('types-adhesion/edit', [
        'typeAdhesion' => $typeAdhesion
    ]);
}
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'duree' => 'required|integer|min:1',
            'prix' => 'required|numeric|min:0',
        ]);

        $type = TypeAdhesion::findOrFail($id);
        $type->update($validated);

        return redirect()->route('types-adhesion.index')->with('success', 'Type mis à jour avec succès');
    }
    public function destroy($id)
    {
        $type = TypeAdhesion::findOrFail($id);
        $type->delete();

        return redirect()->route('types-adhesion.index')->with('success', 'Type supprimé avec succès');
    }
}
