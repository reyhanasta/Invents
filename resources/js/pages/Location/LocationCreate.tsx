import { Button } from '@/components/ui/button';
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
import { locationsStore } from '@/routes';
import { Form } from '@inertiajs/react';
import { toast } from 'sonner';

type LocationsCreateProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function LocationsCreate({
    open,
    onOpenChange,
}: LocationsCreateProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Create Location</DialogTitle>
                    <DialogDescription>
                        Tambahkan lokasi baru ke dalam sistem inventaris Anda.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup className="pb-3">
                    <Form
                        method="post"
                        action={locationsStore().url}
                        onSuccess={() => {
                            onOpenChange(false);
                            toast.success('Location created successfully!');
                        }}
                        onError={() => {
                            toast.error(
                                'Failed to create location. Please check the form.',
                            );
                        }}
                    >
                        {({ errors, processing }) => (
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Nama Lokasi
                                </FieldLabel>
                                <Input
                                    id="location_name"
                                    name="location_name"
                                    type="text"
                                    placeholder="e.g. IGD, Ruang Server, Ruang Rapat"
                                    aria-invalid={!!errors.location_name}
                                    disabled={processing}
                                />
                                {errors.location_name && (
                                    <p className="text-sm text-destructive">
                                        {errors.location_name}
                                    </p>
                                )}
                                <FieldLabel htmlFor="code">
                                    Kode Prefix (3 karakter)
                                </FieldLabel>
                                <Input
                                    id="location_code"
                                    name="location_code"
                                    type="text"
                                    placeholder="IGD, RKM, APT"
                                    maxLength={3}
                                    aria-invalid={!!errors.location_code}
                                    disabled={processing}
                                    className="uppercase"
                                />
                                {errors.location_code && (
                                    <p className="text-sm text-destructive">
                                        {errors.location_code}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Kode 3 huruf untuk kategori ini (otomatis
                                    uppercase)
                                </p>

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
