# Role-Based Access Control Implementation

I have implemented a role-based access control (RBAC) system using `spatie/laravel-permission`.

## Roles

Two roles have been created:

1.  **admin**: Has full access to all resources.
2.  **client**: Has access to everything EXCEPT:
    - `Company` settings
    - `Tickets` (Admin management view)

## Implementation Details

### Backend

1.  **Configuration**: Published Spatie Permission configuration and migrations.
2.  **Seeding**: Created and ran `RoleSeeder` to initialize `admin` and `client` roles.
3.  **User Model**: Added `HasRoles` trait to `App\Models\User`.
4.  **Middleware**: Registered `role` middleware alias in `bootstrap/app.php`.
5.  **Routes**: Protected `tickets` and `company` routes in `routes/web.php` using `middleware(['role:admin'])`.

### Frontend

1.  **Shared Data**: Updated `HandleInertiaRequests.php` to expose user roles to the frontend via `auth.user.roles`.
2.  **Types**: Updated `resources/js/types/index.d.ts` to include `roles?: string[]` in the `User` interface.
3.  **Sidebar**: Updated `resources/js/components/app-sidebar.tsx` to conditionally hide "Ticketing" and "Perusahaan" menu items based on the user's role.

## Usage

- **Assigning Roles**: Use `User::find($id)->assignRole('admin')` or `'client'`.
- **Testing**: Run `php artisan db:seed --class=RoleSeeder` (already done) to set up roles.
    - Default user (ID 1) is assigned `admin`.
    - A test client user `client@example.com` is created if it didn't exist.
