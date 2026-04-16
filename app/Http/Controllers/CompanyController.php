<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    //

    public function index()
    {

        $company = Company::first();

        return Inertia::render('Company/CompanyIndex', [
            'companyData' => $company,
        ]);
    }

    public function store(Request $request)
    {

        $validate = $request->validate([
            'complete_company_name' => 'required|string|max:255',
        ]);

        Company::create(
            [
                'complete_company_name' => $validate['complete_company_name'],
            ]
        );

        return to_route('company')->with('success', 'Perusahaan berhasil dibuat!');

    }

    public function update(Request $request, Company $company)
    {
        $validate = $request->validate([
            'complete_company_name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
        ]);

        $data = [
            'complete_company_name' => $validate['complete_company_name'],
        ];

        if ($request->hasFile('logo')) {
            if ($company->logo_path) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($company->logo_path);
            }
            $data['logo_path'] = $request->file('logo')->store('company-logos', 'public');
        }

        $company->update($data);

        return to_route('company')->with('success', 'Perusahaan berhasil diupdate!');
    }

    public function delete(Company $company)
    {

        $company->delete();

        return to_route('company')->with('success', 'Perusahaan berhasil dihapus!');
    }
}
