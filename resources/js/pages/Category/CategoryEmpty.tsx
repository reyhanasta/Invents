import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { FolderOpen, Plus } from 'lucide-react';

type CategoriesCreateProps = {
    onOpenChange: (open: boolean) => void;
};
export default function CategoryEmpty({ onOpenChange }: CategoriesCreateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <Empty className="border border-dashed">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <FolderOpen />
                    </EmptyMedia>
                    <EmptyTitle>Belum Ada Kategori</EmptyTitle>
                    <EmptyDescription>
                        Mulai dengan menambahkan kategori pertama Anda untuk
                        mengorganisir inventaris dengan lebih baik.
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button
                        size="lg"
                        onClick={() => onOpenChange(true)}
                        className="bg-primary text-white hover:bg-primary/90"
                    >
                        <Plus className="mr-2" /> Tambah Kategori Pertama
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    );
}
