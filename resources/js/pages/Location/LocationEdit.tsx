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
import { locationsUpdate } from '@/routes';
import { Form } from '@inertiajs/react';
import { toast } from 'sonner';
import { Location } from './LocationIndex';

type LocationsEditProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    location: Location | null;
};

export default function LocationsEdit({
    open,
    onOpenChange,
    location,
}: LocationsEditProps) {
    if (!location) return null;
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Edit Location</DialogTitle>
                    <DialogDescription>
                        Update lokasi yang sudah ada. Klik save untuk menyimpan
                        perubahan.
                    </DialogDescription>
                </DialogHeader>
                <FieldGroup className="pb-3">
                    <Form
                        method="PUT"
                        action={locationsUpdate(location.id).url}
                        onSuccess={() => {
                            onOpenChange(false);
                            toast.success('Location updated successfully!');
                        }}
                        onError={() => {
                            toast.error(
                                'Failed to update location. Please check the form.',
                            );
                        }}
                    >
                        {({ errors, processing }) => (
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Nama Kategori
                                </FieldLabel>
                                <Input
                                    id="location_name"
                                    name="location_name"
                                    type="text"
                                    defaultValue={location.location_name}
                                    placeholder="e.g. Elektronik, Furniture, Kendaraan"
                                    aria-invalid={!!errors.location_name}
                                    disabled={processing}
                                />
                                {errors.location_name && (
                                    <p className="text-sm text-destructive">
                                        {errors.location_name}
                                    </p>
                                )}
                                <FieldLabel htmlFor="location_code">
                                    Kode Prefix (3 karakter)
                                </FieldLabel>
                                <Input
                                    id="location_code"
                                    name="location_code"
                                    type="text"
                                    defaultValue={location.location_code}
                                    placeholder="e.g. ELK, FRN, KND"
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
