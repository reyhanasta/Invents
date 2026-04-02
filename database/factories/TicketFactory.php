<?php

namespace Database\Factories;

use App\Models\Asset;
use App\Models\Department;
use App\Models\Priority;
use App\Models\Ticket;
use App\Models\TicketCategory;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ticket_code' => 'TKT-'.strtoupper($this->faker->unique()->lexify('?????')),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'reporter_id' => User::factory(),
            'assigned_to' => User::factory(),
            'category_id' => TicketCategory::factory(),
            'priority_id' => Priority::factory(),
            'department_id' => Department::factory(),
            'asset_id' => Asset::factory(),
            'status' => $this->faker->randomElement(['open', 'triaged', 'in_progress', 'pending', 'resolved', 'closed', 'rejected']),
            'source' => $this->faker->randomElement(['web', 'mobile', 'email', 'phone']),
            'due_at' => $this->faker->dateTimeBetween('now', '+1 month'),
        ];
    }
}
