<?php

namespace App\Models;

use App\Traits\GenerateSlug;
use Database\Factories\PostFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends Model implements HasMedia
{
    use HasFactory, GenerateSlug, InteractsWithMedia;

    protected $table = 'posts'; // optional
    // public const ImageBanner = 'banner';

    protected $fillable = [
        'title',
        'slug',
        'banner',
        'narasumber',
        'date',
        'description',
        'short_description'
    ];

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
