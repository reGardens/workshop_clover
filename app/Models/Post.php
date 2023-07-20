<?php

namespace App\Models;

use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = 'posts'; // optional

    // buat factory sumber faker data dummy
    protected static function newFactory()
    {
        return PostFactory::new();
    }

    // relasi-relasi
    // many to one
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    // many to many
    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }
}
