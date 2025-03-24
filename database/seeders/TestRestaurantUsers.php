<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Gourmet\Restaurant;
use Illuminate\Support\Facades\Hash;

class TestRestaurantUsers extends Seeder
{
    public function run(): void
    {
        for ($index = 1; $index <= 10; $index++) {
            $user = User::create([
                'name' => '飲食店之介その' . $index,
                'email' => 'restaurant' . $index . '@example.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            $user->assignRole('restaurant');
            $user->assignRole('user');

            $restaurant = Restaurant::create([
                'user_id' => $user->id,
                'public' => 1,
                'name' => '三ツ星和風イタリアン U･S･A' . $index . '号店',
                'address' => 'ほげほげ' . $index . '丁目',
                'area_id' => 0,
                'tell' => '0120-000-000',
                'price_min' => 1000,
                'price_max' => 3000,
                'capacity' => 10,
                'description' => '',
                'reservation' => '',
                'parking' => '',
                'smoking' => '',
            ]);
        }
    }
}
