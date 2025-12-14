import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { Eye, Pencil, Plus, Trash } from 'lucide-react';
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
            <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <Card
                        key={category.id}
                        className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <CardHeader>
                            <CardTitle>{category.name}</CardTitle>
                            <CardDescription>
                                <p>Category ID: {category.id}</p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                <p>
                                    {' '}
                                    {category.serial_number_needed
                                        ? 'Yes'
                                        : 'No'}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Link
                                as="button"
                                href={categoriesShow(category.id).url}
                            >
                                <Button
                                    className="text-sm hover:shadow-sm"
                                    size="sm"
                                    variant="outline"
                                >
                                    <Eye />
                                    View
                                </Button>
                            </Link>
                            <Link
                                as="button"
                                href={categoriesEdit(category.id).url}
                            >
                                <Button
                                    className="bg-amber-500 text-sm text-white hover:bg-amber-400 hover:shadow-md"
                                    size="sm"
                                >
                                    <Pencil />
                                    Edit
                                </Button>
                            </Link>
                            <Link
                                as="button"
                                href={categoriesDelete(category.id).url}
                                method="delete"
                            >
                                <Button
                                    className="bg-destructive text-sm text-white hover:bg-destructive/90 hover:shadow-md"
                                    size="sm"
                                >
                                    <Trash />
                                    Delete
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
