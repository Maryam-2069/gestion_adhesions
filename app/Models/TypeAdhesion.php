<?php

namespace App\Models;
use App\Models\Adhesion;
use Illuminate\Database\Eloquent\Model;

class TypeAdhesion extends Model
{
     protected $fillable = ['nom', 'duree', 'prix'];

     public function adhesions()
        {
            return $this->hasMany(Adhesion::class);
        }
}
