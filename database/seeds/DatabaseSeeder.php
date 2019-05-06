<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        DB::table('users')->insert([
            'name'       => 'Administrator',
            'email'      => 'admin@gmail.com',
            'password'   => bcrypt('admin123'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('ora_users')->insert([
            'name'       => 'Administrator',
            'username'   => 'admin',
            'password'   => bcrypt('admin123'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
