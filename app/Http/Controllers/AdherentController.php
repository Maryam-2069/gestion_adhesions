<?php

namespace App\Http\Controllers;

use App\Models\Adherents;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Exception;

class AdherentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $adherents = Adherents::all();
        return Inertia::render('adherents/index', compact('adherents'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('adherents/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:adherents,email',
            'cin' => 'required|string|max:20|unique:adherents,cin',
            'telephone' => 'required|string|max:15',
        ]);

        Adherents::create($validated);
        return redirect()->route('adherents.index')->with('success', 'Adhérent créé avec succès.');   
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $adherent = Adherents::findOrFail($id);
        return Inertia::render('adherents/edit', compact('adherent'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $adherent = Adherents::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:adherents,email,' . $adherent->id,
            'cin' => 'required|string|max:20|unique:adherents,cin,' . $adherent->id,
            'telephone' => 'required|string|max:15',
        ]);

        $adherent->update($validated);
        return redirect()->route('adherents.index')->with('success', 'Adhérent mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();
            
            $adherent = Adherents::findOrFail($id);
            
            // Check if adherent has adhesions
            $adhesionsCount = $adherent->adhesions()->count();
            
            // Log for debugging
            \Log::info("Deleting adherent {$id} with {$adhesionsCount} adhesions");
            
            // Delete the adherent (should cascade delete adhesions if properly configured)
            $adherent->delete();
            
            DB::commit();
            
            return redirect()->route('adherents.index')->with('success', 'Adhérent supprimé avec succès.');
            
        } catch (Exception $e) {
            DB::rollback();
            
            // Log the error for debugging
            \Log::error("Error deleting adherent {$id}: " . $e->getMessage());
            
            return redirect()->route('adherents.index')->with('error', 'Erreur lors de la suppression: ' . $e->getMessage());
        }
    }
}