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
}
