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
import { maintenances, maintenancesUpdate } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Maintenance',
        href: maintenances().url,
    },
    {
        title: 'Edit Maintenance',
        href: '#',
    },
];

type Asset = {
    id: number;
    asset_name: string;
    asset_code: string;
};

type Maintenance = {
    id: number;
    asset: Asset;
    asset_id: number;
    type: 'routine' | 'repair' | 'inspection' | 'calibration';
    description: string;
    maintenance_date: string;
    maintenance_done_date?: string | null;
    technician?: string | null;
    cost?: string | null;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    note?: string | null;
};

type MaintenanceEditProps = {
    maintenance: Maintenance;
    assets: Array<{
        id: number;
        asset_name: string;
        asset_code: string;
    }>;
};

export default function MaintenanceEdit({
    maintenance,
    assets,
}: MaintenanceEditProps) {
    // Format date for input fields (YYYY-MM-DD)
    const formatDateForInput = (dateString: string | null | undefined) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Maintenance #${maintenance.id}`} />

            <div className="container mx-auto max-w-4xl space-y-6 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.visit(maintenances().url)}
                    >
                        <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Edit Maintenance
                        </h1>
                        <p className="text-muted-foreground">
                            Update the information for maintenance record #{maintenance.id}
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Maintenance Information</CardTitle>
                        <CardDescription>
                            Update the details of the maintenance record
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="put"
                            action={maintenancesUpdate(maintenance.id).url}
                            onSuccess={() => {
                                toast.success(
                                    'Maintenance updated successfully!',
                                );
                                router.visit(maintenances().url);
                            }}
                            onError={() => {
                                toast.error(
                                    'Failed to update maintenance. Please check the form.',
                                );
                            }}
                        >
                            {({ errors, processing }) => (
                                <div className="space-y-6">
                                    {/* Asset Selection */}
                                    <div className="space-y-2">
                                        <Label htmlFor="asset_id">
                                            Asset{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Select
                                            name="asset_id"
                                            defaultValue={maintenance.asset_id.toString()}
                                            required
                                        >
                                            <SelectTrigger
                                                aria-invalid={!!errors.asset_id}
                                                disabled={processing}
                                            >
                                                <SelectValue placeholder="Select asset" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {assets.map((asset) => (
                                                    <SelectItem
                                                        key={asset.id}
                                                        value={asset.id.toString()}
                                                    >
                                                        [{asset.asset_code}]{' '}
                                                        {asset.asset_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.asset_id && (
                                            <p className="text-sm text-destructive">
                                                {errors.asset_id}
                                            </p>
                                        )}
                                    </div>

                                    {/* Type & Status */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="type">
                                                Maintenance Type{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                name="type"
                                                defaultValue={maintenance.type}
                                                required
                                            >
                                                <SelectTrigger
                                                    aria-invalid={!!errors.type}
                                                    disabled={processing}
                                                >
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="routine">
                                                        Rutin
                                                    </SelectItem>
                                                    <SelectItem value="repair">
                                                        Perbaikan
                                                    </SelectItem>
                                                    <SelectItem value="inspection">
                                                        Inspeksi
                                                    </SelectItem>
                                                    <SelectItem value="calibration">
                                                        Kalibrasi
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.type && (
                                                <p className="text-sm text-destructive">
                                                    {errors.type}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="status">
                                                Status
                                            </Label>
                                            <Select
                                                name="status"
                                                defaultValue={maintenance.status}
                                            >
                                                <SelectTrigger
                                                    aria-invalid={
                                                        !!errors.status
                                                    }
                                                    disabled={processing}
                                                >
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">
                                                        Pending
                                                    </SelectItem>
                                                    <SelectItem value="in_progress">
                                                        Sedang Berjalan
                                                    </SelectItem>
                                                    <SelectItem value="completed">
                                                        Selesai
                                                    </SelectItem>
                                                    <SelectItem value="cancelled">
                                                        Cancel
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.status && (
                                                <p className="text-sm text-destructive">
                                                    {errors.status}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="maintenance_date">
                                                Maintenance Date{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                id="maintenance_date"
                                                name="maintenance_date"
                                                type="date"
                                                defaultValue={formatDateForInput(
                                                    maintenance.maintenance_date,
                                                )}
                                                aria-invalid={
                                                    !!errors.maintenance_date
                                                }
                                                disabled={processing}
                                                required
                                            />
                                            {errors.maintenance_date && (
                                                <p className="text-sm text-destructive">
                                                    {errors.maintenance_date}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="maintenance_done_date">
                                                Done Date
                                            </Label>
                                            <Input
                                                id="maintenance_done_date"
                                                name="maintenance_done_date"
                                                type="date"
                                                defaultValue={formatDateForInput(
                                                    maintenance.maintenance_done_date,
                                                )}
                                                aria-invalid={
                                                    !!errors.maintenance_done_date
                                                }
                                                disabled={processing}
                                            />
                                            {errors.maintenance_done_date && (
                                                <p className="text-sm text-destructive">
                                                    {
                                                        errors.maintenance_done_date
                                                    }
                                                </p>
                                            )}
                                            <p className="text-xs text-muted-foreground">
                                                Optional: Date when maintenance
                                                was completed
                                            </p>
                                        </div>
                                    </div>

                                    {/* Technician & Cost */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="technician">
                                                Technician
                                            </Label>
                                            <Input
                                                id="technician"
                                                name="technician"
                                                type="text"
                                                defaultValue={
                                                    maintenance.technician || ''
                                                }
                                                placeholder="e.g. John Doe"
                                                aria-invalid={
                                                    !!errors.technician
                                                }
                                                disabled={processing}
                                            />
                                            {errors.technician && (
                                                <p className="text-sm text-destructive">
                                                    {errors.technician}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="cost">Cost</Label>
                                            <Input
                                                id="cost"
                                                name="cost"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                defaultValue={
                                                    maintenance.cost || ''
                                                }
                                                placeholder="0.00"
                                                aria-invalid={!!errors.cost}
                                                disabled={processing}
                                            />
                                            {errors.cost && (
                                                <p className="text-sm text-destructive">
                                                    {errors.cost}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">
                                            Description{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            defaultValue={maintenance.description}
                                            placeholder="Describe what maintenance work needs to be done..."
                                            rows={4}
                                            aria-invalid={!!errors.description}
                                            disabled={processing}
                                            required
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-destructive">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Notes */}
                                    <div className="space-y-2">
                                        <Label htmlFor="note">Notes</Label>
                                        <Textarea
                                            id="note"
                                            name="note"
                                            defaultValue={maintenance.note || ''}
                                            placeholder="Additional notes, findings, or results..."
                                            rows={3}
                                            aria-invalid={!!errors.note}
                                            disabled={processing}
                                        />
                                        {errors.note && (
                                            <p className="text-sm text-destructive">
                                                {errors.note}
                                            </p>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            Optional: Add findings or results
                                            from the maintenance
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={processing}
                                            onClick={() =>
                                                router.visit(maintenances().url)
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

