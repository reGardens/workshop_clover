<?php

namespace App\Http\Requests\Backoffice\Access;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            'username' => ['nullable', 'string', 'unique:users,username,'.$this->user->id, 'max:256'],
            'email' => ['required', 'email', 'unique:users,email,'.$this->user->id, 'max:256'],
            'password' => [
                'nullable',
                'confirmed',
                'max:256',
            ],
            'password_confirmation' => [
                'nullable',
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
