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
import { tickets, ticketsUpdate } from '@/routes';
import {
    Asset as AssetType,
    BreadcrumbItem,
    Department,
    Priority,
    Ticket,
    TicketCategory,
} from '@/types';
import { Form, Head } from '@inertiajs/react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs = (ticket: Ticket): BreadcrumbItem[] => [
    {
        title: 'Tickets',
        href: tickets().url,
    },
    {
        title: ticket.ticket_code,
        href: '#',
    },
    {
        title: 'Ubah Tiket',
        href: '#',
    },
];

interface TicketEditProps {
    ticket: Ticket;
    categories: TicketCategory[];
    priorities: Priority[];
    departments: Department[];
    assets: AssetType[];
}

export default function Edit({
    ticket,
    categories,
    priorities,
    departments,
    assets,
}: TicketEditProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(ticket)}>
            <Head title={`Ubah Tiket - ${ticket.ticket_code}`} />

            <div className="container mx-auto max-w-4xl space-y-6 p-4 md:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Ubah Tiket
                        </h1>
                        <p className="text-muted-foreground">
                            Perbarui informasi tiket{' '}
                            <span className="font-mono font-medium text-primary">
                                {ticket.ticket_code}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <Card className="border-none bg-card/50 shadow-xl backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Informasi Tiket</CardTitle>
                        <CardDescription>
                            Perbarui detail tiket di bawah ini
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="put"
                            action={ticketsUpdate(ticket.id).url}
                            onStart={() => {
                                toast.loading('Sedang memperbarui tiket...');
                            }}
                            onSuccess={() => {
                                toast.success('Tiket berhasil diperbarui!');
                            }}
                            onError={() => {
                                toast.error(
                                    'Gagal memperbarui tiket. Silakan periksa kembali form Anda.',
                                );
                            }}
                            onFinish={() => {
                                toast.dismiss();
                            }}
                        >
                            {({ errors, processing }) => (
                                <div className="space-y-6">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">
                                            Judul Tiket{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            defaultValue={ticket.title}
                                            placeholder="Contoh: Laptop mati total"
                                            aria-invalid={!!errors.title}
                                            disabled={processing}
                                            required
                                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-destructive">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">
                                            Deskripsi Detail{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            defaultValue={ticket.description}
                                            placeholder="Jelaskan masalah Anda secara detail..."
                                            rows={5}
                                            aria-invalid={!!errors.description}
                                            disabled={processing}
                                            required
                                            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-destructive">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Category & Priority */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="category_id">
                                                Kategori{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                name="category_id"
                                                defaultValue={ticket.category_id.toString()}
                                            >
                                                <SelectTrigger
                                                    aria-invalid={
                                                        !!errors.category_id
                                                    }
                                                    disabled={processing}
                                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                                >
                                                    <SelectValue placeholder="Pilih kategori" />
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
                                                                {category.name}
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
                                            <Label htmlFor="priority_id">
                                                Prioritas{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                name="priority_id"
                                                defaultValue={ticket.priority_id.toString()}
                                            >
                                                <SelectTrigger
                                                    aria-invalid={
                                                        !!errors.priority_id
                                                    }
                                                    disabled={processing}
                                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                                >
                                                    <SelectValue placeholder="Pilih prioritas" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {priorities.map(
                                                        (priority) => (
                                                            <SelectItem
                                                                key={
                                                                    priority.id
                                                                }
                                                                value={priority.id.toString()}
                                                            >
                                                                {priority.name}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.priority_id && (
                                                <p className="text-sm text-destructive">
                                                    {errors.priority_id}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Asset Selection */}
                                    <div className="space-y-2">
                                        <Label htmlFor="asset_id">
                                            Asset Terkait (Opsional)
                                        </Label>
                                        <Select
                                            name="asset_id"
                                            defaultValue={ticket.asset_id?.toString()}
                                        >
                                            <SelectTrigger
                                                aria-invalid={!!errors.asset_id}
                                                disabled={processing}
                                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                            >
                                                <SelectValue placeholder="Pilih asset jika ada" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value=" ">
                                                    None
                                                </SelectItem>
                                                {assets.map((asset) => (
                                                    <SelectItem
                                                        key={asset.id}
                                                        value={asset.id.toString()}
                                                    >
                                                        {asset.asset_name} (
                                                        {asset.asset_code})
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

                                    {/* Department & Due Date */}
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="department_id">
                                                Departemen Tujuan (Opsional)
                                            </Label>
                                            <Select
                                                name="department_id"
                                                defaultValue={
                                                    ticket.department_id?.toString() ||
                                                    ''
                                                }
                                            >
                                                <SelectTrigger
                                                    aria-invalid={
                                                        !!errors.department_id
                                                    }
                                                    disabled={processing}
                                                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                                >
                                                    <SelectValue placeholder="Pilih departemen" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value=" ">
                                                        None
                                                    </SelectItem>
                                                    {departments.map((dept) => (
                                                        <SelectItem
                                                            key={dept.id}
                                                            value={dept.id.toString()}
                                                        >
                                                            {dept.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.department_id && (
                                                <p className="text-sm text-destructive">
                                                    {errors.department_id}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="due_at">
                                                Batas Waktu (Opsional)
                                            </Label>
                                            <Input
                                                id="due_at"
                                                name="due_at"
                                                type="datetime-local"
                                                defaultValue={
                                                    ticket.due_at
                                                        ? new Date(
                                                              ticket.due_at,
                                                          )
                                                              .toISOString()
                                                              .slice(0, 16)
                                                        : ''
                                                }
                                                aria-invalid={!!errors.due_at}
                                                disabled={processing}
                                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                            />
                                            {errors.due_at && (
                                                <p className="text-sm text-destructive">
                                                    {errors.due_at}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-4 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={processing}
                                            onClick={() =>
                                                window.history.back()
                                            }
                                            className="hover:bg-accent/50"
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="min-w-32 bg-primary shadow-lg shadow-primary/20 hover:bg-primary/90"
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Memperbarui...
                                                </>
                                            ) : (
                                                'Simpan Perubahan'
                                            )}
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
