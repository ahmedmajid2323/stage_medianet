<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opportunities extends Model
{
    use HasFactory;

    protected $fillable = [
       'entreprise ','type','skills_required','description','contact'
    ];

}
