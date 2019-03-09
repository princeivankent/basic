<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = new User([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);

        $http = new \GuzzleHttp\Client;
        try {
            $response = $http->post(config('app.url') . '/oauth/token', [
                'form_params' => [
                    'grant_type'    => 'password',
                    'client_id'     => config('app.client_id'),
                    'client_secret' => config('app.client_secret'),
                    'username'      => $credentials['email'],
                    'password'      => $credentials['password']
                ],
            ]);
            return json_decode((string) $response->getBody(), true);
        } 
        catch (\GuzzleHttp\Exception\BadResponseException $e) {
            if ($e->getCode() === 400)
                return response()->json('Invalid Request. Please enter a username or a password', $e->getCode());
            else if ($e->getCode() === 401)
                return response()->json('Your credentials are incorrect. Please try again', $e->getCode());
                
            return response()->json('Something went wrong on the server', $e->getCode());
        }
    }
}
