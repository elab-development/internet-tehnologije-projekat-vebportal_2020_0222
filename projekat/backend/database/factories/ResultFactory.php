<?php

namespace Database\Factories;

use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Result>
 */
class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
            'team1_id' => Team::inRandomOrder()->first()->team_id,
            'team2_id' => Team::inRandomOrder()->first()->team_id,
            'points_team1' => $this->faker->numberBetween(55, 110),
            'points_team2' => $this->faker->numberBetween(55, 110),

        ];
    }
}
