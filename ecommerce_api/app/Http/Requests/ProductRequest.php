<?php

namespace App\Http\Requests;

use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $slugRules = [
        ];

        if($this->isMethod('post')){
            $slugRules[] = Rule::unique('products')->where(fn(Builder $query)=>$query->where('slug', $this->slug));

        }

        return [
            'name'=>'required|string|max:255',
//            'slug'=>Rule::unique('products')->where(function ($query)  {
//                return $query->where('slug', $this->slug);
//            }),
            'slug'=>$slugRules,
            'origin_price'=>'required|numeric',
            'sale_price'=>'required|numeric',
            'student_price'=>'nullable|numeric',
            'quantity'=>'required|integer',
            'description'=>'required|string',
            'is_featured'=>'required|boolean',
            'is_archived'=>'required|boolean',
            'in_order'=>'integer',
            'image_url'=>'nullable|string',
            'hover_image'=>'nullable|string',
            'thumbnails'=>'nullable|array',
            'category_id'=>[
                'required',
                'uuid',
                Rule::exists('categories', 'id')->where('is_last', true),
            ],
        ];
    }
}
