import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { dashboard, login } from '@/routes';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, LogIn } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface PublicLayoutProps {
    title?: string;
}

export default function PublicLayout({
    children,
    title,
}: PropsWithChildren<PublicLayoutProps>) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground">
            {title && <Head title={title} />}

            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <AppLogo />
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="gap-2"
                            >
                                <Link href={dashboard().url}>
                                    <LayoutDashboard className="size-4" />
                                    <span>Dashboard</span>
                                </Link>
                            </Button>
                        ) : (
                            <Button
                                asChild
                                variant="default"
                                size="sm"
                                className="gap-2"
                            >
                                <Link href={login().url}>
                                    <LogIn className="size-4" />
                                    <span>Masuk</span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="container mx-auto px-4 py-6 md:px-6 md:py-10">
                    {children}
                </div>
            </main>

            <footer className="border-t border-border/40 bg-muted/50 py-6">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row md:px-6 md:py-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()}{' '}
                        {import.meta.env.VITE_APP_NAME}. All rights reserved.
                    </p>
                </div>
            </footer>

            <Toaster />
        </div>
    );
}
