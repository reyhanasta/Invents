import { Button } from '@/components/ui/button';
import { assetsCreate } from '@/routes';
import { Link } from '@inertiajs/react';
import { Package, Plus } from 'lucide-react';

type EmptySearchProps = {
    searchQuery?: string;
    params: string;
    handleClearSearch?: () => void;
};
export default function EmptySearch({
    searchQuery,
    params,
    handleClearSearch,
}: EmptySearchProps) {
    params = params.charAt(0).toUpperCase() + params.slice(1);
    return (
        <div className="flex min-h-100 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-6">
                <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
                {searchQuery ? 'Hasil tidak di temukan' : 'No Assets Yet'}
            </h3>
            <p className="mb-6 max-w-md text-sm text-muted-foreground">
                {searchQuery
                    ? `Tidak ada data "${params}" yang cocok dengan "${searchQuery}". Coba kata kunci lain.`
                    : 'Get started by adding your first asset'}
            </p>
            {searchQuery ? (
                <Button variant="outline" onClick={handleClearSearch}>
                    Hapus Pencarian
                </Button>
            ) : (
                <Link href={assetsCreate().url}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambahkan {params} Pertama
                    </Button>
                </Link>
            )}
        </div>
    );
}
