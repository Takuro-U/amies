<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run() {
        $permissions = [
            'admin' => Permission::create(['name' => 'admin']),
            'restaurant' => Permission::create(['name' => 'restaurant']),
            'student' => Permission::create(['name' => 'student']),
            'user' => Permission::create(['name' => 'user']),
        ];


        $roles = [
            'admin' => Role::create(['name' => 'admin']),
            'restaurant' => Role::create(['name' => 'restaurant']),
            'student' => Role::create(['name' => 'student']),
            'user' => Role::create(['name' => 'user']),
        ];

        $roles['admin']->givePermissionTo($permissions['admin']);
        $roles['restaurant']->givePermissionTo($permissions['restaurant']);
        $roles['student']->givePermissionTo($permissions['student']);
        $roles['user']->givePermissionTo($permissions['user']);        
    }
}
