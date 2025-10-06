<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ResendMailController;
use App\Models\User;
use App\Models\VerifyEmailToken;
use Illuminate\Auth\Events\Registered;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        try{
            $request->validate([
                'email' => 'required|email|max:255',
                'password' => 'required|string|min:8|max:255'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation Error',
                'message' => $e->validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Invalid Credentials'
            ], 401);
        }
        if ($user->email_verified_at == null) {
            return response()->json([
                'error' => 'Email not verified'
            ], 401);
        }

        Auth::login($user);
        $token = $user->createToken('auth_token',['*'],now()->addMinutes(50))->plainTextToken;
        return response()->json(array(
            'success' => 'Login Success',
            'user'=>$user
        ), 200)->header('Authorization', 'Bearer '.$token)
            ->cookie('auth_token', $token, 50, '/', 'localhost', false, true, false, 'Lax');
    }

    public function authenticated(Request $request):JsonResponse
    {
        $token = $request->user()->currentAccessToken();
        if(!$token|| $token && $token->expires_at && now()->greaterThan($token->expires_at)){
            return response()->json([
                'error' => 'Token expired'
            ], 401);

        }
        $token->expires_at = now()->addMinutes(50);
        $token->save();
        return response()->json([
            'user'=>$request->user(),

            'token_name'=>$token->name,
            'success'=> "Authenticated",
        ], 200);

    }

    public function getUser(Request $request): JsonResponse
    {
     $user = User::where('id',$request->user_id)->first();
     return response()->json([
         'user'=>$user,
     ]);
    }

    public function logout(Request $request): JsonResponse{
//        Auth::logout();
        $request->user()->currentAccessToken()->delete();
        return response()->json(array(
            'success' => 'Logout Success',
        ), 200);
    }

    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => ['required', 'confirmed', Rules\Password::defaults()]
        ]);
        try {
            $existingUser = User::where('email', $request->email)->first();

            if ($existingUser && $existingUser->email_verified_at != null) {
                return response()->json([
                    'error' => 'Email already exists',
                ], 409);
            } elseif ($existingUser && $existingUser->email_verified_at == null) {
                $existingUser->delete();
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            event(new Registered($user));

            //Send email verification
            $token = random_int(100000, 999999);

            $verifyData = [
                'to' => $request->email,
                'subject' => 'Email Verification',
                'code' => $token,
            ];

            // check existing token from email
            $existingToken = VerifyEmailToken::where('email', $request->email)->first();
            if ($existingToken) {
                $existingToken->delete();
            }

            $verify = VerifyEmailToken::create([
                'email' => $request->email,
                'token' => $token,
                'expire_at' => now()->addMinutes(5),
            ]);
            app(ResendMailController::class)->sendEmailWithData($verifyData);

            if ($user && $verify) {
                return response()->json(array(
                    'success' => 'Confirmation email sent',
                    'id_verify' => $verify->id,
                ), 200);
            } else {
                return response()->json(array(
                    'error' => 'Registration Failed',
                ), 500);
            }
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Error occurred while registering user',
            ], 500);
        }


    }

    public function verify(Request $request): JsonResponse
    {
        $request->validate([
            'token' => 'required|string|max:255',
            'id'=>'required|string',
        ]);
        try{
            $existingToken = VerifyEmailToken::where('id', $request->id)->first();
            if (!$existingToken || $existingToken->token != $request->token) {
                return response()->json([
                    'error' => 'Token does not exist'
                ], 401);
            }
            $hasExpired = $existingToken->expire_at < now();
            if ($hasExpired) {
                return response()->json([
                    'error' => 'Token has expired'
                ], 401);
            }

            $existingUser = User::where('email', $existingToken->email)->first();
            if(!$existingUser){
                return response()->json([
                    'error' => 'Email does not exist'
                ], 404);
            }

            $existingUser->email_verified_at = now();
            $existingUser->save();
            $existingToken->delete();
            return response()->json([
                'message' => 'Email verified successfully',
                'user' => $existingUser
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Error occurred while verifying email',
            ], 500);
        }
    }

    public function getVerifyExpired($id):JsonResponse
    {

        $expire_at = VerifyEmailToken::where('id', $id)->first()->expire_at;
        return response()->json([
            'expire_at' => $expire_at,
        ]);
    }

    public function profile(Request $request): JsonResponse
    {

        if ($request->user()) {
            return response()->json(array(
                'message' => 'User Profile',
                'user' => $request->user(),
            ), 200);

        } else {
            return response()->json(array(
                'message' => 'User not found',
            ), 404);
        }
    }
}
