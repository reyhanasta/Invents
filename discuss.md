## Plan: Add User Roles & Authorization (Admin, Management, Client)

This plan details how to add three user roles (admin, management, client) and implement Laravel authorization using policies and middleware. The goal is to restrict access to features based on user roles, following the requirements below. The implementation is designed for junior programmers or less advanced AI models, with clear, step-by-step instructions and best practices.

### Roles & Permissions

- **admin**: Full access to all features.
- **management**: All features except user management.
- **client**: Can view asset/category/location, create maintenance records, use ticketing, and print labels.

### Authorization Approach

- Use Laravel Policies for fine-grained authorization.
- Use route middleware (`can:`) for policy checks.
- Use camelCase for all function and variable names.

---

**Steps**

1. **Define Roles**
    - Update the roles list in the database (migration or seeder) to include `admin`, `management`, and `client`.
    - If using a roles package (e.g., spatie/laravel-permission), update the roles in the seeder.

2. **Assign Roles to Users**
    - Update user creation logic and/or user management UI to allow assigning one of the three roles to each user.
    - Ensure existing users are assigned a default role (e.g., `admin`).

3. **Create/Update Policies**
    - For each model (Asset, Category, Location, Maintenance, Ticket, etc.), create or update a Policy class in `app/Policies/`.
    - Define methods in camelCase (e.g., `view`, `update`, `create`, `delete`).
    - In each method, check the user's role and return `true` or `false` based on the permissions matrix above.

4. **Register Policies**
    - Register the policies in `app/Providers/AuthServiceProvider.php` if not already registered.

5. **Apply Middleware to Routes**
    - Update routes in `routes/web.php` (or other route files) to use the `can:` middleware.
    - Example:  
      `Route::put('assets/{asset}', [AssetController::class, 'update'])->name('assets-update')->can('update', 'asset');`
    - Repeat for all relevant routes, matching the permissions for each role.

6. **Test Authorization**
    - Manually test each role to ensure permissions are enforced correctly.
    - Optionally, write feature tests in `tests/Feature/` to automate permission checks.

7. **UI Feedback**
    - Update the frontend to hide or disable UI elements (buttons, links) for actions the current user cannot perform, based on their role.

---

**Verification**

- Check that users with each role can only access the features allowed for their role.
- Attempt restricted actions as each role and confirm access is denied.
- Run automated tests (if available) to verify authorization logic.
- Review code to ensure camelCase naming is used for all functions and variables.

---

**Decisions**

- Used Laravel Policies for authorization logic.
- Used `can:` middleware for route protection.
- Used Spatie Roles and Permission best practice.
- Used Laravel Wayfinder best practice on routing.
- Chose camelCase for all function and variable names.
- Provided clear, step-by-step instructions for junior-level implementation.