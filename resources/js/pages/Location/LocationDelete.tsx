import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { locationsDelete } from '@/routes';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Location } from './LocationIndex';

type LocationDeleteProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    location: Location | null;
};

export default function LocationsDelete({
    open,
    onOpenChange,
    location,
}: LocationDeleteProps) {
    if (!location) return null;

    const handleDelete = () => {
        router.delete(locationsDelete(location.id).url, {
            onSuccess: () => {
                onOpenChange(false);
                toast.success('Location deleted successfully!');
            },
            onError: () => {
                toast.error('Failed to delete location. Please try again.');
            },
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apakah Anda yakin ingin menghapus kategori ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Anda akan menghapus kategori{' '}
                        <span className="font-semibold text-foreground">
                            "{location.location_name}"
                        </span>
                        {location.assets_count !== undefined &&
                            location.assets_count > 0 && (
                                <>
                                    {' '}
                                    yang memiliki{' '}
                                    <span className="font-semibold text-foreground">
                                        {location.assets_count} item
                                    </span>
                                </>
                            )}
                        . Tindakan ini tidak dapat dibatalkan dan akan menghapus
                        semua data terkait secara permanen.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onOpenChange(false)}>
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-white hover:bg-destructive/90"
                    >
                        Hapus
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
