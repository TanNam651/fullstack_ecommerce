<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

//use Illuminate\Support\Facades\Request;

class CategoryController extends Controller
{
    public function create(CategoryRequest $request)
    {
       $validated = $request->validated();
        try {
            $category = Category::create($validated);
            return response()->json([
                'status' => 'success',
                'message' => 'Category created successfully',
                'data' => $category,
            ], 201);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(CategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validated();
        try{
            $category->update($validated);
            return response()->json([
                'status' => 'success',
                'message' => 'Category updated successfully',
                'data' => $category,
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function delete($id)
    {
        $category = Category::findOrFail($id);
        if(!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found',
            ], 404);
        }
        try {
            $category->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Category deleted successfully',
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getListCategories():JsonResponse
    {
        try{

            $category = Category::all();
            return response()->json([
                'status' => 'success',
                'message' => 'Categories fetched successfully',
                'data' => $category,
            ], 200);
        }catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch categories',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getAllCategories():JsonResponse
    {
        try {
            $categories = Category::whereNull('parent_id')->with('childrens')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Categories fetched successfully',
                'data' => $categories,
            ], 200);

        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch categories',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getCategoryById($id):JsonResponse
    {
        try {
            $category = Category::where('id', $id)->first();
            if(!$category) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Category not found',
                    'data'=>[]
                ], 200);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Category fetched successfully',
                'data' => $category,
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getCategoryByParams(Request $request):JsonResponse
    {
        $query = Category::query();
        if($request->has('name') && $request->query('name') != '' ) {
            $query->where('name', $request->query('name'));
        }
        if($request->has('slug') && $request->query('slug') != '') {
            $query->where('slug', $request->query('slug'));
        }
        if($request->filled('is_last') && $request->query('is_last') !== null) {
            $isLast = filter_var($request->query('is_last'), FILTER_VALIDATE_BOOLEAN);
            $query->where('is_last', $isLast);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Category fetched su',
            'data' => $query->get(),
        ], 200);
    }

    public function getListParentCategoriesWithId($id):JsonResponse
    {
        $category = Category::where('id', $id)->with('parent')->first();

        return response()->json([
            'status' => 'success',
            'message' => 'Categories fetched successfully',
            'data' => $category,
        ], 200);
    }

}
