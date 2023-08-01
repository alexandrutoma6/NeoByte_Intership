<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    protected $fillable = ['title', 'description']; // Allow mass assignment for title and description fields

    // Establishing the one-to-many relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}