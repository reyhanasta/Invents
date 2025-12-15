import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { categories } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { MoreVerticalIcon, Package, Pencil, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import Create from './CategoryCreate';
import Delete from './CategoryDelete';
import Edit from './CategoryEdit';
import CategoryEmpty from './CategoryEmpty';
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
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<
        CategoryIndexProps['categories'][0] | null
    >(null);

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
            </div>
            <Create
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
            />
            <Edit
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
                category={selectedCategory}
            />
            <Delete
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                category={selectedCategory}
            />
            {categories.length === 0 ? (
                <CategoryEmpty onOpenChange={setShowCreateDialog} />
            ) : (
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
                                                            onSelect={() => {
                                                                setSelectedCategory(
                                                                    category,
                                                                );
                                                                setShowEditDialog(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            <Pencil /> Edit
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            className="cursor-pointer"
                                                            onSelect={() => {
                                                                setSelectedCategory(
                                                                    category,
                                                                );
                                                                setShowDeleteDialog(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            <Trash /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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
            )}
        </AppLayout>
    );
}
