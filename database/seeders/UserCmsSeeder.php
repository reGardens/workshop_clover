<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserCmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make Role and User as a Super Administrator
        $role_super = Role::firstOrCreate([
            'name' => 'Super Admin',
            'guard_name' => 'cms'
        ]);

        // super dapat semua permission
        $user_super = User::create([
            'email' => 'super@app.com',
            'username' => 'super',
            'name' => 'Super Administrator',
            'password' => bcrypt('super'),
        ]);
        $user_super->assignRole($role_super);

        // Make Role and User as an Administrator
        $role_admin = Role::firstOrCreate([
            'name' => 'Admin',
            'guard_name' => 'cms'
        ]);

        // tambahin permission disini sesuai module
        $role_admin->givePermissionTo([
            'user management',
            'permission management',
        ]);

        $user_admin = User::create([
            'email' => 'admin@app.com',
            'username' => 'admin',
            'name' => 'Administrator',
            'password' => bcrypt('admin'),
        ]);
        $user_admin->assignRole($role_admin);
    }
}
