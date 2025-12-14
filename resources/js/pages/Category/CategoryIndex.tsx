import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import {
    categories,
    categoriesCreate,
    categoriesDelete,
    categoriesEdit,
    categoriesShow,
} from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Eye, Package, Pencil, Plus, Trash } from 'lucide-react';
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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category list" />
            <div className="flex justify-end p-4">
                <Link href={categoriesCreate().url} as="button">
                    <Button
                        size="lg"
                        className="bg-primary text-white hover:bg-primary/90 hover:shadow-md"
                    >
                        <Plus /> Add Category
                    </Button>
                </Link>
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
                            <CardHeader className="space-y-3 pb-4">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-xl font-semibold">
                                        {category.name}
                                    </CardTitle>
                                    <span className="text-xs text-muted-foreground">
                                        #{category.id}
                                    </span>
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

                            <CardFooter className="flex gap-2 pt-4">
                                <Link
                                    as="button"
                                    href={categoriesShow(category.id).url}
                                    className="flex-1"
                                >
                                    <Button
                                        className="w-full"
                                        size="sm"
                                        variant="outline"
                                    >
                                        <Eye className="h-4 w-4" />
                                        View
                                    </Button>
                                </Link>
                                <Link
                                    as="button"
                                    href={categoriesEdit(category.id).url}
                                    className="flex-1"
                                >
                                    <Button
                                        className="w-full text-amber-400 hover:text-amber-300"
                                        size="sm"
                                        variant="outline"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Link
                                    as="button"
                                    href={categoriesDelete(category.id).url}
                                    method="delete"
                                >
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-destructive hover:bg-destructive hover:text-white"
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </AppLayout>
    );
}
