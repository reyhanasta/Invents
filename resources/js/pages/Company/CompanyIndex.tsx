import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { company, companyUpdate } from '@/routes';
import { BreadcrumbItem, Company } from '@/types';
import { Form, Head, Link, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Perusahaan',
        href: company().url,
    },
];

type CompanyProps = {
    companyData: Company;
};

export default function CompanyIndex({ companyData }: CompanyProps) {
    const [preview, setPreview] = useState<string | null>(
        companyData?.logo_path ? `/storage/${companyData.logo_path}` : null,
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Perusahaan" />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                <Card className="w-md">
                    <CardHeader>
                        <CardTitle>Informasi Perusahaan</CardTitle>
                        <CardDescription>
                            Data ini akan ditampilkan di seluruh aplikasi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="post"
                            action={companyUpdate(companyData.id).url}
                            onSuccess={() => {
                                toast.success('Perusahaan berhasil diupdate!');
                            }}
                            onError={() => {
                                toast.error(
                                    'Gagal mengupdate perusahaan. Silakan periksa formulir.',
                                );
                            }}
                        >
                            {({ errors, processing }) => (
                                <FieldGroup>
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="put"
                                    />
                                    <Field>
                                        <FieldLabel>Logo Perusahaan</FieldLabel>
                                        <div className="flex items-center gap-4">
                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="Company Logo Preview"
                                                    className="h-20 w-20 rounded-lg border object-contain shadow-sm"
                                                />
                                            ) : (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed bg-muted text-muted-foreground">
                                                    No Logo
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-2">
                                                <Input
                                                    type="file"
                                                    id="logo"
                                                    name="logo"
                                                    className="w-full max-w-xs"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    disabled={processing}
                                                />
                                                <span className="text-[12px] text-muted-foreground">
                                                    PNG, JPG, SVG (Max. 2MB)
                                                </span>
                                            </div>
                                        </div>
                                        {errors.logo && (
                                            <p className="text-sm text-destructive">
                                                {errors.logo}
                                            </p>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel>Nama Perusahaan</FieldLabel>
                                        <Input
                                            type="text"
                                            id="complete_company_name"
                                            name="complete_company_name"
                                            defaultValue={
                                                companyData?.complete_company_name
                                            }
                                            placeholder="e.g. PT. Invents"
                                            aria-invalid={
                                                !!errors.complete_company_name
                                            }
                                            disabled={processing}
                                            required
                                        />
                                        {errors.complete_company_name && (
                                            <p className="text-sm text-destructive">
                                                {errors.complete_company_name}
                                            </p>
                                        )}
                                    </Field>
                                    <div className="flex flex-row items-center justify-end gap-4 pt-4">
                                        <Link
                                            href={company().url}
                                            className="text-primary"
                                            as="button"
                                            onClick={() => {
                                                router.visit(company().url);
                                            }}
                                        >
                                            Batal
                                        </Link>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Updating...'
                                                : 'Update'}
                                        </Button>
                                    </div>
                                </FieldGroup>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
