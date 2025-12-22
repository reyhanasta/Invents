import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { locations } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Box,
    MapPin,
    MoreVerticalIcon,
    Package,
    Pencil,
    Plus,
    SearchIcon,
    Trash,
} from 'lucide-react';
import { useState } from 'react';
import Create from './LocationCreate';
import Delete from './LocationDelete';
import Edit from './LocationEdit';
import LocationEmpty from './LocationEmpty';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Location list',
        href: locations().url,
    },
];

export type Location = {
    id: number;
    location_name: string;
    location_code: string;
    description: string;
    assets_count: number;
};

type LocationIndexProps = {
    locations: Array<Location>;
};
export default function LocationIndex({ locations }: LocationIndexProps) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<
        LocationIndexProps['locations'][0] | null
    >(null);
    // Filter locations based on search query
    const filteredLocations = locations.filter((location) => {
        const query = searchQuery.toLowerCase();
        return location.location_name.toLowerCase().includes(query);
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Location lists" />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Location
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your asset location
                        </p>
                    </div>
                </div>
                {/* Search Bar */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
                        <InputGroup className="max-w-md flex-1">
                            <InputGroupInput
                                aria-label="search"
                                placeholder="Search by name or prefix code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <InputGroupAddon>
                                <SearchIcon />
                            </InputGroupAddon>
                        </InputGroup>
                        {searchQuery && (
                            <div className="text-sm text-muted-foreground">
                                {filteredLocations.length} of {locations.length}{' '}
                                locations
                            </div>
                        )}
                    </div>
                    <Button
                        size="lg"
                        className="w-full bg-primary text-white hover:bg-primary/90 sm:w-auto"
                        onClick={() => setShowCreateDialog(true)}
                    >
                        <Plus className="h-4 w-4" />
                        <span className="ml-2">Add Location</span>
                    </Button>
                </div>
                <Create
                    open={showCreateDialog}
                    onOpenChange={setShowCreateDialog}
                />
                <Edit
                    open={showEditDialog}
                    onOpenChange={setShowEditDialog}
                    location={selectedLocation}
                />
                <Delete
                    open={showDeleteDialog}
                    onOpenChange={setShowDeleteDialog}
                    location={selectedLocation}
                />
                {locations.length === 0 ? (
                    <LocationEmpty onOpenChange={setShowCreateDialog} />
                ) : filteredLocations.length === 0 ? (
                    <div className="flex min-h-100 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <div className="mb-4 rounded-full bg-muted p-6">
                            <Package className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">
                            No Results Found
                        </h3>
                        <p className="mb-6 max-w-md text-sm text-muted-foreground">
                            No categories match your search for{' '}
                            <span className="font-semibold">
                                "{searchQuery}"
                            </span>
                            . Try a different keyword.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setSearchQuery('')}
                        >
                            Clear Search
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                        {filteredLocations.map((location) => {
                            return (
                                <Card
                                    key={location.id}
                                    className="rounded-lg border bg-card p-2 transition-all hover:border-primary/50 hover:shadow-sm"
                                >
                                    <div className="flex flex-row">
                                        <div className="my-auto flex rounded-2xl bg-primary/10 p-4">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex flex-1 flex-col pl-3">
                                            <CardHeader className="flex flex-row p-0">
                                                <CardTitle className="self-center justify-self-end text-sm">
                                                    {location.location_name}
                                                </CardTitle>
                                                <CardAction className="ml-auto justify-self-end">
                                                    <DropdownMenu modal={false}>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
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
                                                                        setSelectedLocation(
                                                                            location,
                                                                        );
                                                                        setShowEditDialog(
                                                                            true,
                                                                        );
                                                                    }}
                                                                >
                                                                    <Pencil />{' '}
                                                                    Edit
                                                                </DropdownMenuItem>

                                                                <DropdownMenuItem
                                                                    className="cursor-pointer"
                                                                    onSelect={() => {
                                                                        setSelectedLocation(
                                                                            location,
                                                                        );
                                                                        setShowDeleteDialog(
                                                                            true,
                                                                        );
                                                                    }}
                                                                >
                                                                    <Trash />{' '}
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuGroup>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </CardAction>
                                            </CardHeader>

                                            <CardContent className="justify-start p-0">
                                                <CardDescription>
                                                    <Box className="mr-2 inline-block h-4 w-4 align-text-bottom" />
                                                    {location.assets_count}{' '}
                                                    Assets
                                                </CardDescription>
                                            </CardContent>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
