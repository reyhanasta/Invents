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
import { helpdeskIndex, helpdeskStore } from '@/routes';
import { Asset, BreadcrumbItem, Priority, TicketCategory } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { ArrowLeft, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pusat Bantuan',
        href: helpdeskIndex().url,
    },
    {
        title: 'Buat Tiket',
        href: '#',
    },
];

interface CreateProps {
    categories: TicketCategory[];
    priorities: Priority[];
    assets: Asset[];
}

export default function Create({
    categories,
    priorities,
    assets,
}: CreateProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Tiket Baru" />

            <div className="container mx-auto max-w-2xl p-4 md:p-6 lg:p-8">
                <Button variant="ghost" className="mb-4 -ml-4" asChild>
                    <a href={helpdeskIndex().url}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </a>
                </Button>

                <Card className="border-none bg-card/50 shadow-xl backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Lapor Kendala
                        </CardTitle>
                        <CardDescription>
                            Isi formulir di bawah ini untuk mengirimkan
                            permintaan bantuan Anda.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            onSubmit={() => {
                                toast.loading('Mengirim tiket...');
                            }}
                            onSuccess={() => {
                                toast.success('Tiket berhasil dikirim');
                            }}
                            onError={() => {
                                toast.error(
                                    'Terjadi kesalahan. Mohon periksa kembali.',
                                );
                            }}
                            onFinish={() => {
                                toast.dismiss();
                            }}
                            action={helpdeskStore().url}
                            method="post"
                            className="space-y-6"
                        >
                            {({ processing }) => (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">
                                            Judul Permasalahan{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            placeholder="Contoh: Lampu Monitor Rusak atau Printer Macet"
                                            required
                                            disabled={processing}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="category_id">
                                                Kategori{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Select
                                                name="category_id"
                                                required
                                                disabled={processing}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Kategori" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((c) => (
                                                        <SelectItem
                                                            key={c.id}
                                                            value={c.id.toString()}
                                                        >
                                                            {c.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
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
                                                required
                                                disabled={processing}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Prioritas" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {priorities.map((p) => (
                                                        <SelectItem
                                                            key={p.id}
                                                            value={p.id.toString()}
                                                        >
                                                            {p.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="asset_id">
                                            Asset Terkait (Opsional)
                                        </Label>
                                        <Select
                                            name="asset_id"
                                            disabled={processing}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Asset jika ada" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {assets.map((a) => (
                                                    <SelectItem
                                                        key={a.id}
                                                        value={a.id.toString()}
                                                    >
                                                        {a.asset_code} -{' '}
                                                        {a.asset_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">
                                            Detail Deskripsi{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Jelaskan secara detail kendala yang Anda alami..."
                                            className="min-h-30"
                                            required
                                            disabled={processing}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="h-12 w-full text-lg shadow-lg"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        ) : (
                                            <Send className="mr-2 h-5 w-5" />
                                        )}
                                        Kirim Tiket
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
