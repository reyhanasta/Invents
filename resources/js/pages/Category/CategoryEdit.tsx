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
import { categoriesUpdate } from '@/routes';
import { Form } from '@inertiajs/react';
import { toast } from 'sonner';

type Category = {
    id: number;
    name: string;
    serial_number_needed: boolean;
};

type CategoriesEditProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: Category | null;
};

export default function CategoriesEdit({
    open,
    onOpenChange,
    category,
}: CategoriesEditProps) {
    if (!category) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>
                        Update kategori yang sudah ada. Klik save untuk
                        menyimpan perubahan.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup className="pb-3">
                    <Form
                        method="PUT"
                        action={categoriesUpdate(category.id).url}
                        onSuccess={() => {
                            onOpenChange(false);
                            toast.success('Category updated successfully!');
                        }}
                        onError={() => {
                            toast.error(
                                'Failed to update category. Please check the form.',
                            );
                        }}
                    >
                        {({ errors, processing }) => (
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Nama Kategori
                                </FieldLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    defaultValue={category.name}
                                    placeholder="e.g. Elektronik, Furniture, Kendaraan"
                                    aria-invalid={!!errors.name}
                                    disabled={processing}
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            className="border border-green-950 hover:border-green-700"
                                            id="serial_number_needed"
                                            name="serial_number_needed"
                                            value="1"
                                            defaultChecked={
                                                category.serial_number_needed
                                            }
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
                                        {processing ? 'Saving...' : 'Save'}
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
