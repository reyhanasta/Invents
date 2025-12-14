<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class CategoryController extends Controller
{
    //

    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Category/CategoryIndex', [
            'categories' => $categories,
        ]);
    }
    public function show($id)
    {
        dd('show', $id);
        $categories = Category::findOrFail($id);
        return Inertia::render('Category/CategoryIndex', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        dd('create');
        return Inertia::render('Category/CategoryCreate');
    }

    public function edit(Category $category)
    {
        dd('edit', $category);
        return Inertia::render('Category/CategoryEdit', [
            'category' => $category,
        ]);
    }

    public function delete(Category $category)
    {
        dd('delete');
    }
}
