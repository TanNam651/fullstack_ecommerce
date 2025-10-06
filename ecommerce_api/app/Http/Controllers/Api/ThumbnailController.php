<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ThumbnailRequest;
use App\Models\ProductThumbnail;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class ThumbnailController extends Controller
{
    public function create(ThumbnailRequest $request)
    {
        $request->validated();
        try{
            $thumbnail = ProductThumbnail::create($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Thumbnail created successfully',
                'data' => $thumbnail,
            ], 201);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create thumbnail',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
