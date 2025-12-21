<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    //
    public function index()
    {
        //
        $locations = Location::withCount('assets')->get();
        return Inertia::render('Location/LocationIndex', [
            'locations' => $locations,
        ]);
    }

    

    public function store(Request $request){
        
        $validatedData = $request->validate([
            'location_name' => 'required|string|max:255|unique:locations,location_name',
            'location_code' => 'required|string|size:3|unique:locations,location_code',
        ]);

        try{
            Location::create([
                'location_name' => $validatedData['location_name'],
                'location_code' => $validatedData['location_code'],
            ]);

            return to_route('locations')->with('success', 'Location created successfully.');
        }catch(\Exception $e){
            return redirect()->back()->withErrors(['error' => 'Failed to create location: '.$e->getMessage()])->withInput();
        }

    }
    public function update(Location $location, Request $request){
        
        $validatedData = $request->validate([
            'location_name' => 'required|string|max:255|unique:locations,location_name,'.$location->id,
            'location_code' => 'required|string|size:3|unique:locations,location_code,'.$location->id,
        ]);

        try{
            $location->update([
                'location_name' => $validatedData['location_name'],
                'location_code' => $validatedData['location_code'],
            ]);

            return to_route('locations')->with('success', 'Location updated successfully.');
        }catch(\Exception $e){
            return redirect()->back()->withErrors(['error' => 'Failed to update location: '.$e->getMessage()])->withInput();
        }
    }

    public function delete(Location $location){
        try{
            $location->delete();
            return to_route('locations')->with('success', 'Location deleted successfully.');
        }catch(\Exception $e){
            return redirect()->back()->withErrors(['error' => 'Failed to delete location: '.$e->getMessage()])->withInput();
        }

    }
}
