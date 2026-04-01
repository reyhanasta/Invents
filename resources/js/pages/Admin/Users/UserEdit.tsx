import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, User, Role } from '@/types';
import { Form, Head, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/users',
    },
    {
        title: 'Edit User',
        href: '#',
    },
];

interface UserEditProps {
    user: User & { roles: Role[] };
    roles: Role[];
}

export default function UserEdit({ user, roles }: UserEditProps) {
    const [selectedRoles, setSelectedRoles] = useState<string[]>(
        user.roles?.map((r) => r.name) || []
    );

    const handleRoleChange = (roleName: string, checked: boolean) => {
        if (checked) {
            setSelectedRoles([...selectedRoles, roleName]);
        } else {
            setSelectedRoles(selectedRoles.filter((r) => r !== roleName));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User - ${user.name}`} />

            <div className="container mx-auto max-w-2xl space-y-6 p-4 md:p-6 lg:p-8">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.visit('/users')}
                    >
                        <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Edit User
                        </h1>
                        <p className="text-muted-foreground">
                            Perbarui informasi akun dan peran pengguna.
                        </p>
                    </div>
                </div>

                <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Informasi Akun</CardTitle>
                        <CardDescription>
                            Kosongkan password jika tidak ingin mengubahnya.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="put"
                            action={`/users/${user.id}`}
                            onStart={() => {
                                toast.loading('Memperbarui user...');
                            }}
                            onSuccess={() => {
                                router.visit('/users');
                                toast.success('User berhasil diperbarui!');
                            }}
                            onError={() => {
                                toast.error('Gagal memperbarui user. Cek kembali form Anda.');
                            }}
                            onFinish={() => {
                                toast.dismiss();
                            }}
                        >
                            {({ errors, processing }) => (
                                <div className="space-y-6">
                                    {/* Sync roles state to form */}
                                    {selectedRoles.map((roleName) => (
                                        <input key={roleName} type="hidden" name="roles[]" value={roleName} />
                                    ))}

                                    <div className="space-y-2">
                                        <Label htmlFor="name">Nama Lengkap <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            defaultValue={user.name}
                                            required
                                            disabled={processing}
                                        />
                                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            defaultValue={user.email}
                                            required
                                            disabled={processing}
                                        />
                                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="password">Password (Opsional)</Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Biarkan kosong untuk tetap"
                                                disabled={processing}
                                            />
                                            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation">Konfirmasi Password Baru</Label>
                                            <Input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                disabled={processing}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Peran (Roles) <span className="text-destructive">*</span></Label>
                                        <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
                                            {roles.map((role) => (
                                                <div key={role.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`role-${role.id}`}
                                                        checked={selectedRoles.includes(role.name)}
                                                        onCheckedChange={(checked) => handleRoleChange(role.name, !!checked)}
                                                        disabled={processing}
                                                    />
                                                    <Label
                                                        htmlFor={`role-${role.id}`}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                                                    >
                                                        {role.name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.roles && <p className="text-sm text-destructive">{errors.roles}</p>}
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={processing}
                                            onClick={() => router.visit('/users')}
                                        >
                                            Batal
                                        </Button>
                                        <Button type="submit" disabled={processing || selectedRoles.length === 0}>
                                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
