<?php

use App\Models\Company;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

describe('Company Index', function () {
    it('can display company index page', function () {
        $company = Company::factory()->create();

        $response = $this->get(route('company'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Company/CompanyIndex')
            ->has('companyData')
        );
    });
});

describe('Company Store', function () {
    it('can create a new company', function () {
        $response = $this->post(route('company-store'), [
            'complete_company_name' => 'PT Test Company',
        ]);

        $response->assertRedirect(route('company'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('companies', [
            'complete_company_name' => 'PT Test Company',
        ]);
    });

    it('requires complete_company_name', function () {
        $response = $this->post(route('company-store'), []);

        $response->assertSessionHasErrors('complete_company_name');
    });
});

describe('Company Update', function () {
    it('can update company', function () {
        $company = Company::factory()->create();

        $response = $this->put(route('company-update', $company), [
            'complete_company_name' => 'PT Updated Company',
        ]);

        $response->assertRedirect(route('company'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('companies', [
            'id' => $company->id,
            'complete_company_name' => 'PT Updated Company',
        ]);
    });
});

describe('Company Delete', function () {
    it('can delete a company', function () {
        $company = Company::factory()->create();

        $response = $this->delete(route('company-delete', $company));

        $response->assertRedirect(route('company'));
        $response->assertSessionHas('success');
        $this->assertDatabaseMissing('companies', [
            'id' => $company->id,
        ]);
    });
});

describe('Company Authorization', function () {
    it('requires authentication', function () {
        auth()->logout();

        $this->get(route('company'))->assertRedirect(route('login'));
        $this->post(route('company-store'), [])->assertRedirect(route('login'));
    });
});
