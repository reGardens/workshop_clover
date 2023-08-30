<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait GenerateSlug
{
    public function uniqueSlug(string $title): string
    {
        return $this->where('slug', Str::slug($title))->exists() ? Str::slug($title) . Str::random('2') : Str::slug($title);
    }
}
