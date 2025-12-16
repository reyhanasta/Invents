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
import { categoriesDelete } from '@/routes';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';

type Category = {
    id: number;
    category_name: string;
    prefix_code: string;
    items_count?: number;
};

type CategoriesDeleteProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: Category | null;
};

export default function CategoriesDelete({
    open,
    onOpenChange,
    category,
}: CategoriesDeleteProps) {
    if (!category) return null;

    const handleDelete = () => {
        router.delete(categoriesDelete(category.id).url, {
            onSuccess: () => {
                onOpenChange(false);
                toast.success('Category deleted successfully!');
            },
            onError: () => {
                toast.error('Failed to delete category. Please try again.');
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
                            "{category.category_name}"
                        </span>
                        {category.items_count !== undefined &&
                            category.items_count > 0 && (
                                <>
                                    {' '}
                                    yang memiliki{' '}
                                    <span className="font-semibold text-foreground">
                                        {category.items_count} item
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
