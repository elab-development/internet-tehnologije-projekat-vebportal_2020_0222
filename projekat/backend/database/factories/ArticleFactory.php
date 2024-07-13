<?php

namespace Database\Factories;

use App\Models\Author;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
            'title' => $this->faker->text(),
            'content' => $this->faker->paragraph(),
            'publishing_date' => $this->faker->date(),
            'author_id' => Author::inRandomOrder()->first()->author_id,
            'category_id' => Category::inRandomOrder()->first()->category_id,
            'image_path'=> $this->faker->text()
        ];
    }
}
