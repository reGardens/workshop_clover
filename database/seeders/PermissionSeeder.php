<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create([
            'name' => 'user management',
            'guard_name' => 'cms'
        ]);
        Permission::create([
            'name' => 'permission management',
            'guard_name' => 'cms'
        ]);
        Permission::create([
            'name' => 'role management',
            'guard_name' => 'cms'
        ]);
    }
}
