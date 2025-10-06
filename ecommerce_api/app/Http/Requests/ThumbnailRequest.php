<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ThumbnailRequest extends FormRequest
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
        $urlRules = [
            'required',
            'string',
        ];

        if($this->isMethod('post')){
            $urlRules[] = Rule::unique("product_thumbnails")->where(fn($query)=>$query->where('product_id', $this->product_id)->where('order', $this->order));
        }
        return [
            'product_id'=>'required|uuid|exists:products,id',
            'thumbnail_url' => $urlRules,
            'order' => 'required|integer',
        ];
    }
}
