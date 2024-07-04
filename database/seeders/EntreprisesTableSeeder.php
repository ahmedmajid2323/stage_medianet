<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class EntreprisesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Insert 50 fake records into the entreprises table
        for ($i = 0; $i < 50; $i++) {
            DB::table('entreprises')->insert([
                'description' => $faker->paragraph($nbSentences = 1, $variableNbSentences = true), // 3 sentences description
                'name' => $faker->company,
                'departments' => json_encode($faker->words(rand(3, 6))), // Array of random department names
                'email' => $faker->unique()->companyEmail,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
