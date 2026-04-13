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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Role, User } from '@/types';
import { Form, Head, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

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
    // Get the first role name if it exists...
    const initialRole = user.roles?.[0]?.name || '';

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

                <Card className="border-none bg-card/50 shadow-xl backdrop-blur-sm">
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
                                toast.error(
                                    'Gagal memperbarui user. Cek kembali form Anda.',
                                );
                            }}
                            onFinish={() => {
                                toast.dismiss();
                            }}
                        >
                            {({ errors, processing }) => (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Nama Lengkap{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            defaultValue={user.name}
                                            required
                                            disabled={processing}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-destructive">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Email{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            defaultValue={user.email}
                                            required
                                            disabled={processing}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-destructive">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="password">
                                                Password (Opsional)
                                            </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Biarkan kosong untuk tetap"
                                                disabled={processing}
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-destructive">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation">
                                                Konfirmasi Password Baru
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                disabled={processing}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="role">
                                            Peran (Role){' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Select
                                            name="role"
                                            defaultValue={initialRole}
                                            required
                                        >
                                            <SelectTrigger
                                                disabled={processing}
                                                id="role"
                                            >
                                                <SelectValue placeholder="Pilih Peran" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem
                                                        key={role.id}
                                                        value={role.name}
                                                    >
                                                        <span className="capitalize">
                                                            {role.name}
                                                        </span>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.role && (
                                            <p className="text-sm text-destructive">
                                                {errors.role}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={processing}
                                            onClick={() =>
                                                router.visit('/users')
                                            }
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Menyimpan...'
                                                : 'Simpan Perubahan'}
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
