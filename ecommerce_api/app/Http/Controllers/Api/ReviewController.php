<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Models\Review;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function create(ReviewRequest $request):JsonResponse
    {
        $validated = $request->validated();
        try {
            $review = Review::create($validated);

            return response()->json([
                'success' => "Get review successfully",
                'reviews' => $review,
            ], 201);
        } catch (QueryException $e){
            return response()->json([
                'error' => "Retrieving review failed",
                'message' => $e->getMessage()
            ]);
        }
    }
    public function getReviews():JsonResponse
    {
        try {
            $reviews = Review::all();
            return response()->json([
                'success' => true,
                'reviews' => $reviews,
            ]);
        } catch (QueryException $e){
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ],200);
        }
    }
}
