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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Perusahaan" />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                <Card className="w-sm">
                    <CardHeader>
                        <CardTitle>Informasi Perusahaan</CardTitle>
                        <CardDescription>
                            Data ini akan ditampilkan di seluruh aplikasi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="put"
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
