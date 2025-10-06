<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function create(ProductRequest $request): JsonResponse
    {
        $validated = $request->validated();
        try {
            $product = Product::create($request->all());

            if (!empty($validated['thumbnails'])) {
                $order = 0;
                foreach ($validated['thumbnails'] as $thumbnail) {
                    $product->thumbnails()->create([
                        'thumbnail_url' => $thumbnail,
                        'order' => $order
                    ]);
                    $order++;
                }
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Product created successfully',
                'data' => $product,
            ], 201);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create product',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(ProductRequest $request, $slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();
        $validated = $request->validated();

        try {
            $product->thumbnails()->delete();
            $product->update($validated);

            if (!empty($validated['thumbnails'])) {
                $order = 0;
                foreach ($validated['thumbnails'] as $thumbnail) {
                    $product->thumbnails()->create([
                        'thumbnail_url' => $thumbnail,
                        'order' => $order
                    ]);
                    $order++;
                }
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Product updated successfully',
                'data' => $product,
            ]);

        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update product',
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function getListProducts(): JsonResponse
    {
        try {
            $product = Product::with('category')->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Products retrieved successfully',
                'data' => $product,
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve products',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getProductsByParams(Request $request): JsonResponse
    {

        $category = $request->query('category');
        $brand = $request->query('brand');
        $price_ranges = $request->query('price_range');

        $products =Product::query()->select(['products.id', 'products.name', 'products.is_featured', 'products.is_archived','products.slug', 'products.quantity', 'products.hover_image', 'products.image_url', 'products.origin_price', 'products.sale_price', 'products.student_price', 'products.category_id']);

        if (!empty($category)) {
            $lastCategory = DB::table('categories')->where('slug', $category)->first();
            if (!$lastCategory) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Category not found',
                ],400);
            }
            $categories = DB::select("WITH RECURSIVE category_tree AS (
                SELECT id, name, parent_id, slug, is_last FROM categories WHERE id = ?
                UNION ALL
                SELECT c.id, c.name, c.parent_id, c.slug, c.is_last FROM categories c INNER JOIN category_tree ct ON c.parent_id = ct.id
            )
            SELECT * FROM category_tree WHERE is_last = TRUE
            ", [$lastCategory->id]);

            $categoryIds = array_map(fn($category) => $category->id, $categories);

            $products =  $products->join('categories', 'products.category_id', '=', 'categories.id')->whereIn('category_id', $categoryIds);
        }

        if(!empty($brand)&& !in_array("default", $brand)) {
            $products = $products->when($brand, function ($query) use ($brand) {
                $query->whereIn('categories.slug', $brand);
            });
        }

        if (!empty($price_ranges)&&!in_array("default", $price_ranges)) {
            $products->where(function ($query) use ($price_ranges) {
                foreach ($price_ranges as $price_range) {
                    [$min, $max] = explode('-', $price_range);
                    $query->orWhereBetween('sale_price', [(int)$min, (int)$max]);
                }
            });
        }
        $products = $products->get();
        return response()->json([
            'status' => 'success',
            'products' => $products,
        ]);
    }

    public function getProductBySlug($slug): JsonResponse
    {
        try {
            $product = Product::where('slug', $slug)->with('thumbnails')->firstOrFail();
            $categories = DB::select("WITH RECURSIVE category_parent AS (
            SELECT id, name, parent_id, slug, is_last, created_at, updated_at FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id, c.name, c.parent_id, c.slug, c.is_last, c.created_at, c.updated_at FROM categories c INNER JOIN category_parent cp ON cp.parent_id = c.id
            )
            SELECT * FROM category_parent
            ", [$product->category_id]);
            $product['categories'] = $categories;
            return response()->json([
                'status' => 'success',
                'message' => 'Product retrieved successfully',
                'data' => $product,

            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve product',
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found',
            ], 404);
        }
    }

    public function getProductBySearch(Request $request): JsonResponse
    {
        $search = $request->query("search");
        if (!empty($search)) {
            $search = "+". str_replace(' ', '+', $search).'*';
            $products =  Product::whereRaw(
                "MATCH (name) AGAINST (? IN BOOLEAN MODE)",[$search]
            )->get();
            $total = Product::whereRaw(
                "MATCH (name) AGAINST (? IN BOOLEAN MODE)", [$search]
            )->count();
            return response()->json([
                'status' => 'success',
                'message' => 'Products retrieved successfully',
                'products' => $products,
                'total' => $total,
            ],200);
        }
        return response()->json([
            'status' => 'error',
            'message' => 'No search terms were found',

        ],404);
    }
}
