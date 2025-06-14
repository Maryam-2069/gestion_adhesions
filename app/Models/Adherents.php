<?php

namespace App\Models;
use App\Models\Adhesion;
use Illuminate\Database\Eloquent\Model;

class Adherents extends Model
{
   protected $fillable = [
        'nom',
        'prenom',
        'email',
        'cin',
        'telephone',
    ];

public function adhesions()
{
    return $this->hasMany(Adhesion::class, 'adherents_id');
}
}
