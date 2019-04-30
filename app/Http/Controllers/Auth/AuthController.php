<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        Validator::make($request->all(), [
            'name'     => 'required|min: 10',
            'email'    => 'required|email|min: 10',
            'password' => 'required|min: 10'
        ])->validate();

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
            
            $data = json_decode((string) $response->getBody(), true);
            
            // Email is unique so I chose it as identifier to query User instance
            $data['user'] = User::where(['email' => $credentials['email']])->first();

            return $data;
        } 
        catch (\GuzzleHttp\Exception\BadResponseException $e) {
            if ($e->getCode() === 400)
                return response()->json([
                    'message' => 'Invalid Request. Please enter a username or a password'
                ], $e->getCode());

            else if ($e->getCode() === 401)
                return response()->json([
                    'message' => 'Your credentials are incorrect. Please try again'
                ], $e->getCode());
                
            return response()->json([
                'message' => 'Something went wrong on the server'
            ], $e->getCode());
        }
    }
}
