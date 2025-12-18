import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { assets, assetsUpdate } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: assets().url,
    },
    {
        title: 'Edit Asset',
        href: '#',
    },
];

type Asset = {
    id: number;
    asset_name: string;
    asset_code: string;
    category_id: number;
    location_id: number;
    brand?: string;
    serial_number?: string;
    condition: string;
    acquisition_date?: string;
    description?: string;
};

type AssetsEditProps = {
    asset: Asset;
    categories: Array<{
        id: number;
        category_name: string;
        prefix_code: string;
    }>;
    locations: Array<{
        id: number;
        location_name: string;
    }>;
};

export default function AssetEdit({
    asset,
    categories,
    locations,
}: AssetsEditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${asset.asset_name}`} />

            <div className="container mx-auto max-w-4xl space-y-6 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.visit(assets().url)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Edit Asset
                        </h1>
                        <p className="text-muted-foreground">
                            Update the information for {asset.asset_name} (
                            {asset.asset_code})
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Asset Information</CardTitle>
                        <CardDescription>
                            Update the details of the asset
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="put"
                            action={assetsUpdate(asset.id).url}
                            onSuccess={() => {
                                toast.success('Asset updated successfully!');
                            }}
                            onError={() => {
                                toast.error(
                                    'Failed to update asset. Please check the form.',
                                );
                            }}
                        >
                            {({ errors, processing }) => (
                                <div className="space-y-6">
                                    {/* Asset Code (Read-only) */}
                                    <div className="space-y-2">
                                        <Label htmlFor="asset_code">
                                            Asset Code
                                        </Label>
                                        <Input
                                            id="asset_code"
                                            value={asset.asset_code}
                                            className="font-mono"
                                            disabled
                                            readOnly
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Asset code is automatically
                                            generated and cannot be changed
                                        </p>
                                    </div>

                                    {/* Asset Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="asset_name">
                                            Asset Name{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="asset_name"
                                            name="asset_name"
                                            type="text"
                                            defaultValue={asset.asset_name}
                                            placeholder="e.g. Dell Laptop XPS 15"
                                            aria-invalid={!!errors.asset_name}
                                            disabled={processing}
                                            required
                                        />
                                        {errors.asset_name && (
                                            <p className="text-sm text-destructive">
                                                {errors.asset_name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Category & Location */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="category_id">
                                                Category{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                name="category_id"
                                                defaultValue={asset.category_id.toString()}
                                                required
                                            >
                                                <SelectTrigger
                                                    aria-invalid={
                                                        !!errors.category_id
                                                    }
                                                    disabled={processing}
                                                >
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={category.id.toString()}
                                                            >
                                                                [
                                                                {
                                                                    category.prefix_code
                                                                }
                                                                ]{' '}
                                                                {
                                                                    category.category_name
                                                                }
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.category_id && (
                                                <p className="text-sm text-destructive">
                                                    {errors.category_id}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="location_id">
                                                Location{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                name="location_id"
                                                defaultValue={asset.location_id.toString()}
                                                required
                                            >
                                                <SelectTrigger
                                                    aria-invalid={
                                                        !!errors.location_id
                                                    }
                                                    disabled={processing}
                                                >
                                                    <SelectValue placeholder="Select location" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {locations.map(
                                                        (location) => (
                                                            <SelectItem
                                                                key={
                                                                    location.id
                                                                }
                                                                value={location.id.toString()}
                                                            >
                                                                {
                                                                    location.location_name
                                                                }
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.location_id && (
                                                <p className="text-sm text-destructive">
                                                    {errors.location_id}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Brand & Serial Number */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="brand">Brand</Label>
                                            <Input
                                                id="brand"
                                                name="brand"
                                                type="text"
                                                defaultValue={asset.brand || ''}
                                                placeholder="e.g. Dell, HP, Logitech"
                                                aria-invalid={!!errors.brand}
                                                disabled={processing}
                                            />
                                            {errors.brand && (
                                                <p className="text-sm text-destructive">
                                                    {errors.brand}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="serial_number">
                                                Serial Number
                                            </Label>
                                            <Input
                                                id="serial_number"
                                                name="serial_number"
                                                type="text"
                                                defaultValue={
                                                    asset.serial_number || ''
                                                }
                                                placeholder="e.g. SN123456789"
                                                aria-invalid={
                                                    !!errors.serial_number
                                                }
                                                disabled={processing}
                                                className="font-mono"
                                            />
                                            {errors.serial_number && (
                                                <p className="text-sm text-destructive">
                                                    {errors.serial_number}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Condition & Acquisition Date */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="condition">
                                                Condition{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                name="condition"
                                                defaultValue={asset.condition}
                                                required
                                            >
                                                <SelectTrigger
                                                    aria-invalid={
                                                        !!errors.condition
                                                    }
                                                    disabled={processing}
                                                >
                                                    <SelectValue placeholder="Select condition" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="good">
                                                        Good
                                                    </SelectItem>
                                                    <SelectItem value="minor_damage">
                                                        Minor Damage
                                                    </SelectItem>
                                                    <SelectItem value="major_damage">
                                                        Major Damage
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.condition && (
                                                <p className="text-sm text-destructive">
                                                    {errors.condition}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="acquisition_date">
                                                Acquisition Date
                                            </Label>
                                            <Input
                                                id="acquisition_date"
                                                name="acquisition_date"
                                                type="date"
                                                defaultValue={
                                                    asset.acquisition_date || ''
                                                }
                                                aria-invalid={
                                                    !!errors.acquisition_date
                                                }
                                                disabled={processing}
                                            />
                                            {errors.acquisition_date && (
                                                <p className="text-sm text-destructive">
                                                    {errors.acquisition_date}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            defaultValue={
                                                asset.description || ''
                                            }
                                            placeholder="Additional notes or description about the asset..."
                                            rows={4}
                                            aria-invalid={!!errors.description}
                                            disabled={processing}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-destructive">
                                                {errors.description}
                                            </p>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            Optional: Add any additional
                                            information about this asset
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={processing}
                                            onClick={() =>
                                                router.visit(assets().url)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Saving...'
                                                : 'Save Changes'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
