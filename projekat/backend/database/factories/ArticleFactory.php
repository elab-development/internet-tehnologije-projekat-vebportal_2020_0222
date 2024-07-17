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
        $categoryImageMap = [
            1 => 'images/nba.png',
            2 => 'images/1720918075.png',
            3 => 'images/1720937563.png'
        ];

        $author = Author::inRandomOrder()->first();
        $category = Category::inRandomOrder()->first();

        $imagePath = $categoryImageMap[$category->category_id] ?? 'images/default.jpg';

        return [
            'title' => $this->faker->sentence($nbWords = 6, $variableNbWords = true), 
            'content' => $this->faker->realText($maxNbChars = 200, $indexSize = 2), 
            'publishing_date' => $this->faker->date(),
            'author_id' => $author->author_id,
            'category_id' => $category->category_id,
            'image_path' => $imagePath,
        ];
    }
}
