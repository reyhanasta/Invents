import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { categories, categoriesCreate, categoriesStore } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Category',
        href: categoriesCreate().url,
    },
];

export default function CategoriesCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Category" />
            <div className="flex items-start justify-center p-4 md:p-6">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Add a new category
                        </CardTitle>
                        <CardDescription>
                            Tambahkan kategori baru ke dalam sistem inventaris
                            Anda.
                        </CardDescription>
                    </CardHeader>
                    <Form method="post" action={categoriesStore().url}>
                        {({ errors, processing }) => (
                            <>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Nama Kategori{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="e.g. Elektronik, Furniture, Kendaraan"
                                            aria-invalid={!!errors.name}
                                            disabled={processing}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-destructive">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                className="border border-green-950 hover:border-green-700"
                                                id="serial_number_needed"
                                                name="serial_number_needed"
                                                value="1"
                                                disabled={processing}
                                            />
                                            <Label
                                                htmlFor="serial_number_needed"
                                                className="cursor-pointer text-sm font-normal"
                                            >
                                                Butuh Nomor Seri ?
                                            </Label>
                                        </div>
                                        {errors.serial_number_needed && (
                                            <p className="text-sm text-destructive">
                                                {errors.serial_number_needed}
                                            </p>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            Centang jika kategori ini memerlukan
                                            nomor seri untuk setiap item
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                        disabled={processing}
                                    >
                                        <Link href={categories().url}>
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? 'Saving...'
                                            : 'Create Category'}
                                    </Button>
                                </CardFooter>
                            </>
                        )}
                    </Form>
                </Card>
            </div>
        </AppLayout>
    );
}
