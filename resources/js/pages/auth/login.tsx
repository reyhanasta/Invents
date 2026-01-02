import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { Form, Head } from '@inertiajs/react';
import { Box } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({ status, canRegister }: LoginProps) {
    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <div className="hidden h-full w-full content-center bg-primary px-26 pr-36 text-lg text-primary-foreground lg:block">
                <div key="body" className="flex flex-col gap-5">
                    <div
                        key="judul"
                        className="flex flex-row items-center gap-4"
                    >
                        <Box
                            size={70}
                            className="rounded-2xl border border-white/50 bg-white/20 p-4 dark:border-primary-foreground/50"
                        />
                        <span className="text-4xl font-extrabold">Invents</span>
                    </div>
                    <h1 className="text- font-sans text-4xl font-bold">
                        Kelola Aset Anda dengan Mudah
                    </h1>
                    <p>
                        {' '}
                        System manajemen aset modern untuk melacak, memantau,
                        dan mengelola semua aset perusahaan Anda dalam satu
                        platform.
                    </p>
                    <div className="flex flex-col gap-2 px-4">
                        <li>Pelacakan aset real-time</li>
                        <li>Manajemen pemeliharaan terjadwal</li>
                        <li>Laporan dan analitik lengkap</li>
                    </div>
                </div>
            </div>
            <div className="flex min-h-screen items-center justify-center lg:min-h-0">
                <AuthLayout
                    title="Selamat Datang"
                    description="Masuk ke akun anda untuk melanjutkan"
                >
                    <Head title="Log in" />

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        {/*<div className="flex items-center">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="ml-auto text-sm"
                                                    tabIndex={5}
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>*/}
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="Password"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                        />
                                        <Label htmlFor="remember">
                                            Remember me
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-4 w-full"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner />}
                                        Masuk
                                    </Button>
                                </div>

                                {canRegister && (
                                    <div className="text-center text-sm text-muted-foreground">
                                        Belum punya akun?{' '}
                                        <TextLink
                                            className="text-primary"
                                            href={register()}
                                            tabIndex={5}
                                        >
                                            Daftar Sekarang
                                        </TextLink>
                                    </div>
                                )}
                            </>
                        )}
                    </Form>

                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}
                </AuthLayout>
            </div>
        </div>
    );
}
