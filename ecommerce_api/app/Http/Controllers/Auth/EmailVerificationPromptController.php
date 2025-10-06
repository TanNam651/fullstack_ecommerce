<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Show the email verification prompt page.
     */
    public function create(): JsonResponse
    {
        return response()->json([
            'message' => 'Email verification prompt',
        ]);
    }
    public function __invoke(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Email verification prompt',
        ]);
    }
}
