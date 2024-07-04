<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CV extends Model
{
    use HasFactory;

    protected $fillable = [
        'user',
        'personnelle',
        'projet',
        'certificat',
        'experience',
        'competence',
    ];
}
