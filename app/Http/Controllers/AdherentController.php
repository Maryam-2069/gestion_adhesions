<?php

namespace App\Http\Controllers;

use App\Models\Adherents;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdherentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $adherents = Adherents::all();
        return Inertia::render('adherents/index',compact('adherents'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('adherents/create', );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $validate = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:adherents,email',
            'cin' => 'required|string|max:20|unique:adherents,cin',
            'telephone' => 'required|string|max:15',
        ]);

        Adherents::create($validate);
        return redirect()->route('adherents.index')->with('success', 'Adherent created successfully.');   
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

        $validate = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:adherents,email,' . $adherent->id,
            'cin' => 'required|string|max:20|unique:adherents,cin,' . $adherent->id,
            'telephone' => 'required|string|max:15',
        ]);

        $adherent->update($validate);
        return redirect()->route('adherents.index')->with('success', 'Adherent updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $adherent = Adherents::findOrFail($id);
        $adherent->delete();
        return redirect()->route('adherents.index')->with('success', 'Adherent deleted successfully.');
    }
}
