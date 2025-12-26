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
import { assets, assetsStore } from '@/routes';
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
        title: 'Add Asset',
        href: '#',
    },
];

type AssetsCreateProps = {
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

export default function AssetCreate({
    categories,
    locations,
}: AssetsCreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Asset" />

            <div className="container mx-auto max-w-4xl space-y-6 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.visit(assets().url)}
                    >
                        <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Tambah Asset Baru
                        </h1>
                        <p className="text-muted-foreground">
                            Isi informasi di bawah untuk menambhkan asset baru
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Asset Information</CardTitle>
                        <CardDescription>
                            Enter the details of the new asset
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="post"
                            action={assetsStore().url}
                            onSuccess={() => {
                                toast.success('Asset created successfully!');
                            }}
                            onError={() => {
                                toast.error(
                                    'Failed to create asset. Please check the form.',
                                );
                            }}
                        >
                            {({ errors, processing }) => (
                                <div className="space-y-6">
                                    {/* Asset Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="asset_name">
                                            Nama Asset{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="asset_name"
                                            name="asset_name"
                                            type="text"
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
                                                Kategori{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Select name="category_id" required>
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
                                                Lokasi{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Select name="location_id" required>
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
                                                Nomor Seri
                                            </Label>
                                            <Input
                                                id="serial_number"
                                                name="serial_number"
                                                type="text"
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
                                                Kondisi{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Select name="condition" required>
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
                                                        Bagus
                                                    </SelectItem>
                                                    <SelectItem value="minor_damage">
                                                        Sedikit Rusak
                                                    </SelectItem>
                                                    <SelectItem value="major_damage">
                                                        Rusak Total
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
                                                Tanggal Pembelian
                                            </Label>
                                            <Input
                                                id="acquisition_date"
                                                name="acquisition_date"
                                                type="date"
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
                                            Deskripsi
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
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
                                            Optional: Tambah informasi tambahan
                                            mengenai asset ini.
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
                                            Batal
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Membuat...'
                                                : 'Buat Asset'}
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
