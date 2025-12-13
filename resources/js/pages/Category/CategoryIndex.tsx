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
import { categories } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Eye, Pencil, Trash } from 'lucide-react';
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
        serial_number: string;
    }>;
};

export default function CategoryIndex({ categories }: CategoryIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category list" />
            <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <Card key={category.id}>
                        <CardHeader>
                            <CardTitle>{category.name}</CardTitle>
                            <CardDescription>
                                Serial Number: {category.serial_number}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                <p>Category ID: {category.id}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button className="text-sm" size="sm">
                                <Eye />
                                View
                            </Button>
                            <Button
                                className="bg-amber-500 text-sm text-white hover:bg-amber-400 hover:shadow-md"
                                size="sm"
                            >
                                <Pencil />
                                Edit
                            </Button>
                            <Button
                                className="bg-destructive-foreground text-sm text-white hover:bg-red-400 hover:shadow-md"
                                size="sm"
                            >
                                <Trash />
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
