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
import { type BreadcrumbItem, Role } from '@/types';
import { Form, Head, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/users',
    },
    {
        title: 'Tambah User',
        href: '#',
    },
];

interface UserCreateProps {
    roles: Role[];
}

export default function UserCreate({ roles }: UserCreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah User" />

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
                            Tambah User Baru
                        </h1>
                        <p className="text-muted-foreground">
                            Isi informasi di bawah untuk menambahkan pengguna
                            baru ke sistem.
                        </p>
                    </div>
                </div>

                <Card className="border-none bg-card/50 shadow-xl backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Informasi Akun</CardTitle>
                        <CardDescription>
                            Pastikan email yang dimasukkan valid dan unik.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="post"
                            action="/users"
                            onStart={() => {
                                toast.loading('Membuat user...');
                            }}
                            onSuccess={() => {
                                router.visit('/users');
                                toast.success('User berhasil dibuat!');
                            }}
                            onError={() => {
                                toast.error(
                                    'Gagal membuat user. Cek kembali form Anda.',
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
                                            placeholder="Masukkan nama lengkap"
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
                                            placeholder="email@example.com"
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
                                                Password{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
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
                                                Konfirmasi Password{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                required
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
                                        <Select name="role" required>
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
                                                : 'Simpan User'}
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
