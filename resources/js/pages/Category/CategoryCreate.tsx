import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { categoriesStore } from '@/routes';
import { Form } from '@inertiajs/react';
import { toast } from 'sonner';

type CategoriesCreateProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function CategoriesCreate({
    open,
    onOpenChange,
}: CategoriesCreateProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Category</DialogTitle>
                    <DialogDescription>
                        Tambahkan kategori baru ke dalam sistem inventaris Anda.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup className="pb-3">
                    <Form
                        method="post"
                        action={categoriesStore().url}
                        onSuccess={() => {
                            onOpenChange(false);
                            toast.success('Category created successfully!');
                        }}
                        onError={() => {
                            toast.error(
                                'Failed to create category. Please check the form.',
                            );
                        }}
                    >
                        {({ errors, processing }) => (
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Nama Kategori
                                </FieldLabel>
                                <Input
                                    id="category_name"
                                    name="category_name"
                                    type="text"
                                    placeholder="e.g. Elektronik, Furniture, Kendaraan"
                                    aria-invalid={!!errors.category_name}
                                    disabled={processing}
                                />
                                {errors.category_name && (
                                    <p className="text-sm text-destructive">
                                        {errors.category_name}
                                    </p>
                                )}
                                <FieldLabel htmlFor="prefix_code">
                                    Kode Prefix (3 karakter)
                                </FieldLabel>
                                <Input
                                    id="prefix_code"
                                    name="prefix_code"
                                    type="text"
                                    placeholder="e.g. ELK, FRN, KND"
                                    maxLength={3}
                                    aria-invalid={!!errors.prefix_code}
                                    disabled={processing}
                                    className="uppercase"
                                />
                                {errors.prefix_code && (
                                    <p className="text-sm text-destructive">
                                        {errors.prefix_code}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Kode 3 huruf untuk kategori ini (otomatis
                                    uppercase)
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            className="border border-green-950 hover:border-green-700"
                                            id="serial_number_needed"
                                            name="serial_number_needed"
                                            value="1"
                                            disabled={processing}
                                        />
                                        <FieldLabel
                                            htmlFor="serial_number_needed"
                                            className="cursor-pointer text-sm font-normal"
                                        >
                                            Butuh Nomor Seri ?
                                        </FieldLabel>
                                    </div>
                                    {errors.serial_number_needed && (
                                        <p className="text-sm text-destructive">
                                            {errors.serial_number_needed}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        Centang jika kategori ini memerlukan
                                        nomor seri untuk setiap item
                                    </p>
                                </div>
                                <DialogFooter className="mt-4">
                                    <DialogClose asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() => onOpenChange(false)}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create'}
                                    </Button>
                                </DialogFooter>
                            </Field>
                        )}
                    </Form>
                </FieldGroup>
            </DialogContent>
        </Dialog>
    );
}
