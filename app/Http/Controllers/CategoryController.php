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
        $categories = Category::all()->map(function ($category) {
            // Dummy stock count - will be replaced with real data later
            $category->items_count = rand(0, 50);
            return $category;
        });
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
        return Inertia::render('Category/CategoryCreate');
    }
    public function store(Request $request)
    {
         // Validate the request data
        $validatedData = $request->validate([
            // duplicate check on name
            'name' => 'required|string|max:255|unique:categories,name',
            'serial_number_needed' => 'nullable|boolean',
        ]);
        $validateSerialNumber = $request->has('serial_number_needed') ? true : false;
        // Create a new category
        try {
            $cats= Category::create([
                'name' => $validatedData['name'],
                'serial_number_needed' => $validateSerialNumber,
            ]);

            
            // Redirect to the categories index page with a success message
            return to_route('categories')->with('success', 'Category created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to create category: ' . $e->getMessage()])->withInput();
        }
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
