<?php

namespace App\Models;

use App\Models\Adherents;
use App\Models\TypeAdhesion;
use Illuminate\Database\Eloquent\Model;

class Adhesion extends Model
{
    protected $fillable = [
        'adherents_id',
        'type_adhesion_id',
        'date_debut',
        'date_fin',
    ];
    public function typeAdhesion()
    {
        return $this->belongsTo(TypeAdhesion::class);
    }

    public function adherent()
    {
        return $this->belongsTo(Adherents::class , 'adherents_id');
    }
}
