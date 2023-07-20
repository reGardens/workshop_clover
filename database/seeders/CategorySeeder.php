<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // mass assingment (dia butuh fillablenya diisi fieldnya)
        Category::create([
            'title' => 'Ekonomi',
            'slug' => Str::slug('Ekonomi'),
        ]);

        // cara ke 2 (tidak butuh fillable diisi fieldnya)
        $category = new Category();
        $category->title = 'Politik';
        $category->slug = Str::slug('Politik');
        $category->save();
    }
}
