import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import {
    categories,
    categoriesDelete,
    categoriesEdit,
    categoriesStore,
} from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { MoreVerticalIcon, Package, Pencil, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category list',
        href: categories().url,
    },
];

type CategoryIndexProps = {
    categories: Array<{
        id: number;
        name: string;
        serial_number_needed: boolean;
        items_count: number;
    }>;
};

export default function CategoryIndex({ categories }: CategoryIndexProps) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category list" />
            <div className="flex justify-end p-4">
                <Button
                    size="lg"
                    className="bg-primary text-white hover:bg-primary/90 hover:shadow-md"
                    onClick={() => setShowCreateDialog(true)}
                >
                    <Plus /> Add Category
                </Button>
                <Dialog
                    open={showCreateDialog}
                    onOpenChange={setShowCreateDialog}
                >
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Category</DialogTitle>
                            <DialogDescription>
                                Tambahkan kategori baru ke dalam sistem
                                inventaris Anda.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup className="pb-3">
                            <Form
                                method="post"
                                action={categoriesStore().url}
                                onSuccess={() => {
                                    setShowCreateDialog(false);
                                    toast.success(
                                        'Category created successfully!',
                                    );
                                }}
                                onError={() => {
                                    toast.error(
                                        'Failed to create category. Please check the form.',
                                    );
                                }}
                            >
                                {({ errors, processing }) => (
                                    <Field>
                                        <FieldLabel htmlFor="name">
                                            Nama Kategori
                                        </FieldLabel>
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
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    className="border border-green-950 hover:border-green-700"
                                                    id="serial_number_needed"
                                                    name="serial_number_needed"
                                                    value="1"
                                                    disabled={processing}
                                                />
                                                <FieldLabel
                                                    htmlFor="serial_number_needed"
                                                    className="cursor-pointer text-sm font-normal"
                                                >
                                                    Butuh Nomor Seri ?
                                                </FieldLabel>
                                            </div>
                                            {errors.serial_number_needed && (
                                                <p className="text-sm text-destructive">
                                                    {
                                                        errors.serial_number_needed
                                                    }
                                                </p>
                                            )}
                                            <p className="text-xs text-muted-foreground">
                                                Centang jika kategori ini
                                                memerlukan nomor seri untuk
                                                setiap item
                                            </p>
                                        </div>
                                        <DialogFooter className="mt-4">
                                            <DialogClose asChild>
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setShowCreateDialog(
                                                            false,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                            >
                                                {processing
                                                    ? 'Creating...'
                                                    : 'Create'}
                                            </Button>
                                        </DialogFooter>
                                    </Field>
                                )}
                            </Form>
                        </FieldGroup>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => {
                    const stockStatus =
                        category.items_count === 0
                            ? 'empty'
                            : category.items_count < 10
                              ? 'low'
                              : category.items_count < 25
                                ? 'medium'
                                : 'good';

                    const stockColor = {
                        empty: 'bg-gray-100 text-gray-700 border-gray-200',
                        low: 'bg-red-50 text-red-700 border-red-200',
                        medium: 'bg-amber-50 text-amber-700 border-amber-200',
                        good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    }[stockStatus];

                    return (
                        <Card
                            key={category.id}
                            className="group overflow-hidden transition-all duration-200 hover:shadow-lg"
                        >
                            <CardHeader className="space-y-3 pb-2">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-xl font-semibold">
                                        {category.name}
                                    </CardTitle>
                                    <div className="flex items-end">
                                        <DropdownMenu modal={false}>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    aria-label="Open menu"
                                                    size="sm"
                                                >
                                                    <MoreVerticalIcon />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-fit"
                                                align="start"
                                                aria-label="Category actions"
                                            >
                                                <DropdownMenuLabel>
                                                    File Actions
                                                </DropdownMenuLabel>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onSelect={() =>
                                                            setShowEditDialog(
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        <Pencil /> Edit
                                                    </DropdownMenuItem>

                                                    <Link
                                                        href={
                                                            categoriesDelete(
                                                                category.id,
                                                            ).url
                                                        }
                                                        method="delete"
                                                    >
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <Trash /> Delete
                                                        </DropdownMenuItem>
                                                    </Link>
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Dialog
                                            open={showEditDialog}
                                            onOpenChange={setShowEditDialog}
                                        >
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Edit Category
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Provide a name for your
                                                        category. Click save
                                                        when you&apos;re done.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <FieldGroup className="pb-3">
                                                    <Form
                                                        method="post"
                                                        action={
                                                            categoriesEdit(
                                                                category.id,
                                                            ).url
                                                        }
                                                    >
                                                        {({
                                                            errors,
                                                            processing,
                                                        }) => (
                                                            <Field>
                                                                <FieldLabel htmlFor="name">
                                                                    Category
                                                                    Name
                                                                </FieldLabel>
                                                                <Input
                                                                    id="name"
                                                                    name="name"
                                                                    type="text"
                                                                    placeholder="e.g. Elektronik, Furniture, Kendaraan"
                                                                    aria-invalid={
                                                                        !!errors.name
                                                                    }
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                />
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            className="border border-green-950 hover:border-green-700"
                                                                            id="serial_number_needed"
                                                                            name="serial_number_needed"
                                                                            value="1"
                                                                            disabled={
                                                                                processing
                                                                            }
                                                                        />
                                                                        <FieldLabel
                                                                            htmlFor="serial_number_needed"
                                                                            className="cursor-pointer text-sm font-normal"
                                                                        >
                                                                            Butuh
                                                                            Nomor
                                                                            Seri
                                                                            ?
                                                                        </FieldLabel>
                                                                    </div>
                                                                    {errors.serial_number_needed && (
                                                                        <p className="text-sm text-destructive">
                                                                            {
                                                                                errors.serial_number_needed
                                                                            }
                                                                        </p>
                                                                    )}
                                                                    <p className="text-xs text-muted-foreground">
                                                                        Centang
                                                                        jika
                                                                        kategori
                                                                        ini
                                                                        memerlukan
                                                                        nomor
                                                                        seri
                                                                        untuk
                                                                        setiap
                                                                        item
                                                                    </p>
                                                                </div>
                                                            </Field>
                                                        )}
                                                    </Form>
                                                </FieldGroup>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>
                                                    <Button type="submit">
                                                        Create
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge
                                        variant={
                                            category.serial_number_needed
                                                ? 'default'
                                                : 'outline'
                                        }
                                        className="text-xs"
                                    >
                                        {category.serial_number_needed
                                            ? 'Serial Number Required'
                                            : 'No Serial Number'}
                                    </Badge>
                                </div>
                                <div
                                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${stockColor}`}
                                >
                                    <Package className="h-4 w-4" />
                                    <div className="flex flex-1 items-baseline gap-1">
                                        <span className="text-2xl font-bold">
                                            {category.items_count}
                                        </span>
                                        <span className="text-sm font-medium">
                                            Items in Stock
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    );
                })}
            </div>
        </AppLayout>
    );
}
