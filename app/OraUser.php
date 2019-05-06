<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class OraUser extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name', 'username', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function findForPassport($username)
    {
        // $this refers to Model
        return $this->where('username', $username)->first();
    }
}
