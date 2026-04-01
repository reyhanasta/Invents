<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    //

    public function index(){

       $company = Company::first();
       return Inertia::render('Company/CompanyIndex', [
           'companyData' => $company
       ]);
    }
    public function store(Request $request){
       
       $validate = $request->validate([
           'complete_company_name' => 'required|string|max:255',
       ]);
       
       Company::create(
            [
                'complete_company_name' => $validate['complete_company_name'],
            ]
        );

        return to_route('company')->with('success','Perusahaan berhasil dibuat!');
       
    }
    public function update(Request $request, Company $company){
       
       $validate = $request->validate([
           'complete_company_name' => 'required|string|max:255',
       ]);
       
       $company->update(
            [
                'complete_company_name' => $validate['complete_company_name'],
            ]
        );

        return to_route('company')->with('success','Perusahaan berhasil diupdate!');
       
    }
    public function delete(Company $company){
       
        $company->delete();

        return to_route('company')->with('success','Perusahaan berhasil dihapus!');
    }
    
}
