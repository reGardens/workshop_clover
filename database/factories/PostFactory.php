<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'title' => fake()->title(),
            'slug' => fake()->slug(),
            'banner' => fake()->sha1(),
            'narasumber' => fake()->firstName(),
            'date' => fake()->date(),
            'description' => fake()->paragraph(),
            'short_description' => fake()->sentence($nb = 3, $asText = false),
        ];
    }
}
