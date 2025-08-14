<?php

namespace App\Models;

use App\Models\Adherents;
use App\Models\TypeAdhesion;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Adhesion extends Model
{
    protected $fillable = [
        'adherents_id',
        'type_adhesion_id',
        'date_debut',
        'date_fin',
    ];

    // Remove the casts that were causing timezone issues
    // protected $casts = [
    //     'date_debut' => 'date:Y-m-d',
    //     'date_fin' => 'date:Y-m-d',
    // ];

    // Updated date accessors for clean display format
    public function getDateDebutAttribute($value)
    {
        if (!$value) return null;
        
        // Parse the database value and return formatted date
        return Carbon::parse($value)->format('d-m-Y');
    }

    public function getDateFinAttribute($value)
    {
        if (!$value) return null;
        
        // Parse the database value and return formatted date
        return Carbon::parse($value)->format('d-m-Y');
    }

    // Keep mutators for proper database storage
    public function setDateDebutAttribute($value)
    {
        if (!$value) {
            $this->attributes['date_debut'] = null;
            return;
        }
        
        // Store in database as Y-m-d format
        $this->attributes['date_debut'] = Carbon::parse($value)->format('Y-m-d');
    }

    public function setDateFinAttribute($value)
    {
        if (!$value) {
            $this->attributes['date_fin'] = null;
            return;
        }
        
        // Store in database as Y-m-d format
        $this->attributes['date_fin'] = Carbon::parse($value)->format('Y-m-d');
    }

    // Add methods to get raw database values when needed (for forms)
    public function getDateDebutRawAttribute()
    {
        return $this->attributes['date_debut'] ?? null;
    }

    public function getDateFinRawAttribute()
    {
        return $this->attributes['date_fin'] ?? null;
    }

    // Relationships
    public function typeAdhesion()
    {
        return $this->belongsTo(TypeAdhesion::class);
    }

    public function adherent()
    {
        return $this->belongsTo(Adherents::class, 'adherents_id');
    }

    // Status methods using raw database values to avoid formatting issues
    public function isActive()
    {
        $now = Carbon::now()->format('Y-m-d');
        $debut = $this->attributes['date_debut'] ?? null;
        $fin = $this->attributes['date_fin'] ?? null;
                
        return $debut && $fin && $debut <= $now && $fin >= $now;
    }

    public function isExpired()
    {
        $now = Carbon::now()->format('Y-m-d');
        $fin = $this->attributes['date_fin'] ?? null;
                
        return $fin && $fin < $now;
    }

    public function remainingDays()
    {
        if ($this->isExpired()) {
            return 0;
        }
                
        $fin = $this->attributes['date_fin'] ?? null;
        return $fin ? Carbon::now()->diffInDays(Carbon::parse($fin)) : 0;
    }
}