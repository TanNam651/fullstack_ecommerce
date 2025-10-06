<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;


/*
AUTH Routes
*/
Route::prefix('auth')->group(function (){
    Route::post('/login',[AuthController::class, 'login']);
    Route::post('/register',[AuthController::class, 'register']);
    Route::post('/verify-email',[AuthController::class, 'verify']);
    Route::get('/verify-token/{id}',[AuthController::class,'getVerifyExpired']);
    Route::get('/user', [AuthController::class,'getUser']);

    Route::middleware(['auth:sanctum'])->group(function (){
    Route::get('/logout',[AuthController::class, 'logout']);
    Route::get('/user',[AuthController::class, 'profile']);
    Route::get('/authenticated',[AuthController::class, 'authenticated']);
    // Route::get('/refresh-token',[AuthController::class, 'refreshToken']);
    // Route::post('/order',[\App\Http\Controllers\Api\OrderController::class, 'create']);
    });
});



//Route::get('/authenticated',[AuthController::class, 'authenticated']);

//Route::post('/sendmail',[ResendMailController::class, 'send'])->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);

Route::post('/category',[\App\Http\Controllers\Api\CategoryController::class, 'create']);
Route::get('/category',[\App\Http\Controllers\Api\CategoryController::class, 'getListCategories']);
Route::get('/category/{id}',[\App\Http\Controllers\Api\CategoryController::class, 'getCategoryById']);
Route::get('/category/parent/{id}',[\App\Http\Controllers\Api\CategoryController::class, 'getListParentCategoriesWithId']);
Route::put('/category/{id}',[\App\Http\Controllers\Api\CategoryController::class, 'update']);
Route::delete('/category/{id}',[\App\Http\Controllers\Api\CategoryController::class, 'delete']);
Route::get('/category/query-params/get-query',[\App\Http\Controllers\Api\CategoryController::class, 'getCategoryByParams']);
Route::get('/category-all',[\App\Http\Controllers\Api\CategoryController::class, 'getAllCategories']);

Route::post('/product',[\App\Http\Controllers\Api\ProductController::class, 'create']);
Route::get('/product',[\App\Http\Controllers\Api\ProductController::class, 'getListProducts']);
Route::put('/product/{slug}',[\App\Http\Controllers\Api\ProductController::class, 'update']);
Route::get('/product/slug/{slug}',[\App\Http\Controllers\Api\ProductController::class, 'getProductBySlug']);
Route::get('/product/query-params/get-query',[\App\Http\Controllers\Api\ProductController::class, 'getProductsByParams']);
Route::get('/product/search',[\App\Http\Controllers\Api\ProductController::class, 'getProductBySearch']);
Route::post('/thumbnail',[\App\Http\Controllers\Api\ThumbnailController::class, 'create']);

Route::get('/order',[\App\Http\Controllers\Api\OrderController::class, 'getOrders']);
Route::post('/order',[\App\Http\Controllers\Api\OrderController::class, 'create']);
Route::get('/order/{id}',[\App\Http\Controllers\Api\OrderController::class, 'getOrderDetails']);
Route::get('/order-status',[\App\Http\Controllers\Api\OrderController::class, 'getListOrderStatus']);

Route::get('/payment-status', [\App\Http\Controllers\Api\PaymentController::class, 'getListPaymentStatus']);
Route::put('/payment-return', [\App\Http\Controllers\Api\PaymentController::class, 'vnpayReturn']);

Route::post('/review',[\App\Http\Controllers\Api\ReviewController::class, 'create']);
Route::get('/review',[\App\Http\Controllers\Api\ReviewController::class, 'getReviews']);



Route::get('/test', function () {
    return response()->json([
        'message' => 'Hello, a!'
    ]);
});


