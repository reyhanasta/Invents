<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    //

    public function index(){
       
        return Inertia::render('Company/CompanyIndex');
    }
    public function store(){
       
        return Inertia::render('Company/CompanyCreate');
    }
    public function update(){
       
        return Inertia::render('Company/CompanyEdit');
    }
    public function delete(){
       
        return Inertia::render('Company/CompanyDelete');
    }
    
}
