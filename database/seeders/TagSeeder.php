<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tag::create([
            'title' => 'hewan',
            'slug' => Str::slug('hewan'),
        ]);
        Tag::create([
            'title' => 'makanan',
            'slug' => Str::slug('makanan'),
        ]);
        Tag::create([
            'title' => 'minuman',
            'slug' => Str::slug('minuman'),
        ]);
    }
}
