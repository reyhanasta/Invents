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
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import AppLayout from '@/layouts/app-layout';
import { categories } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    BadgeCheckIcon,
    MoreVerticalIcon,
    Package,
    Pencil,
    Plus,
    SearchIcon,
    Trash,
} from 'lucide-react';
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
        category_name: string;
        prefix_code: string;
        serial_number_needed: boolean;
        items_count: number;
    }>;
};

export default function CategoryIndex({ categories }: CategoryIndexProps) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<
        CategoryIndexProps['categories'][0] | null
    >(null);

    // Filter categories based on search query
    const filteredCategories = categories.filter((category) => {
        const query = searchQuery.toLowerCase();
        return (
            category.category_name.toLowerCase().includes(query) ||
            category.prefix_code.toLowerCase().includes(query)
        );
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category list" />
            <div className="flex justify-between gap-2 p-4">
                <InputGroup className="w-96">
                    <InputGroupInput
                        aria-label="search"
                        className=""
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                </InputGroup>
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
            ) : filteredCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="mb-4 rounded-full bg-muted p-6">
                        <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-2xl font-semibold">
                        Tidak Ada Hasil
                    </h3>
                    <p className="mb-6 max-w-md text-muted-foreground">
                        Tidak ada kategori yang cocok dengan pencarian "
                        <span className="font-semibold">{searchQuery}</span>".
                        Coba kata kunci lain.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => setSearchQuery('')}
                    >
                        Clear Search
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCategories.map((category) => {
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
                                        <div className="flex min-w-0 flex-1 gap-2">
                                            {/* <div className="mb-4 flex flex-2 items-center gap-2"></div> */}
                                            <CardTitle className="truncate text-xl font-semibold">
                                                {category.category_name}{' '}
                                            </CardTitle>
                                            {/* <Badge
                                                variant="outline"
                                                className="font-mono text-sm text-secondary-foreground"
                                            >
                                                <BadgeCheckIcon className="mr-1 inline-block h-4 w-4" />
                                                {category.prefix_code}
                                            </Badge> */}
                                        </div>
                                        <div className="flex shrink-0 items-end">
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
                                            variant="outline"
                                            className="flex-2 font-mono text-sm text-secondary-foreground"
                                        >
                                            <BadgeCheckIcon className="mr-1 inline-block h-4 w-4" />
                                            {category.prefix_code}
                                        </Badge>
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
