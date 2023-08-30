<?php

namespace App\Http\Requests\Backoffice\Profile;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'regex:/^[a-zA-Z0-9.,?\-!"\s\']+$/'],
            'avatar' => request()->avatar ? ['required', 'image', 'mimes:jpg,jpeg,png', 'max:1024'] : '',
        ];
    }
}
