<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTicketRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:ticket_categories,id',
            'priority_id' => 'required|exists:priorities,id',
            'department_id' => 'nullable|exists:departments,id',
            'asset_id' => 'nullable|exists:assets,id',
            'due_at' => 'nullable|date',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240', // 10MB
        ];
    }
}
