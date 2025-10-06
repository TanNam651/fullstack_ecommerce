<?php

namespace App\Http\Requests;

use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
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
        $nameRules = [
            'required',
            'string',
            'max:255',
        ];

        $slugRules = [
            'nullable',
            'string',
            'max:255',
        ];

        if($this->isMethod('post')){
            $nameRules[] = Rule::unique('categories')->where(fn(Builder $query)=>$query->where('name', $this->name)->where('parent_id', $this->parent_id));

            $slugRules[] = Rule::unique('categories')->where(fn(Builder $query)=>$query->where('slug', $this->slug));
        }



//        if($this->slug !== '/') {
//            $slugRules[] = Rule::unique('categories')->where(fn(Builder $query)=>$query->where('slug', $this->slug));
//        }

        return [
            'name'=>$nameRules,
            'slug'=>$slugRules,
            'parent_id'=>'nullable|uuid|exists:categories,id',
            'is_last'=>'nullable|boolean',
        ];
    }
}
