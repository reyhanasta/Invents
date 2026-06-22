<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTicketRequest extends FormRequest
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
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category_id' => 'sometimes|required|exists:ticket_categories,id',
            'priority_id' => 'sometimes|required|exists:priorities,id',
            'department_id' => 'nullable|exists:departments,id',
            'asset_id' => 'nullable|exists:assets,id',
            'due_at' => 'nullable|date',
        ];
    }
}
