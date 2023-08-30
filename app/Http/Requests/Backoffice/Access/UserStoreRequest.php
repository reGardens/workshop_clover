<?php

namespace App\Http\Requests\Backoffice\Access;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UserStoreRequest extends FormRequest
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
            'avatar' => request()->avatar ? ['required', 'image', 'mimes:png', 'max:1024'] : '',
            'name' => ['required', 'max:256', 'regex:/^[a-zA-Z0-9.,?\-!"\s\']+$/'],
            'username' => ['nullable', 'string', 'unique:users,username', 'max:256'],
            'email' => ['required', 'email', 'unique:users,email', 'max:256'],
            'password' => [
                'required',
                'confirmed',
                'max:256',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
            'password_confirmation' => [
                'required',
                'max:256',
            ],
            'roles' => [
                'required',
                'array',
                'exists:roles,name'
            ],
        ];
    }
}
