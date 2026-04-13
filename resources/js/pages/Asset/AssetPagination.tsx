import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { Link } from '@inertiajs/react';

type Links = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationProps = {
    links: Links[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};

export const AssetPagination = ({ assets }: { assets: PaginationProps }) => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Info */}
            <div className="text-sm text-muted-foreground">
                Menampilkan <span className="font-medium text-foreground">{assets.from}</span> sampai{' '}
                <span className="font-medium text-foreground">{assets.to}</span> dari{' '}
                <span className="font-medium text-foreground">{assets.total}</span> hasil
            </div>

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    {assets.links.map((link, index) => {
                        const isPrevious = link.label.includes('Previous') || link.label.includes('pagination.previous');
                        const isNext = link.label.includes('Next') || link.label.includes('pagination.next');

                        // Handle Previous Button
                        if (isPrevious) {
                            return (
                                <PaginationItem key={index}>
                                    {link.url ? (
                                        <Link href={link.url} preserveScroll>
                                            <PaginationPrevious />
                                        </Link>
                                    ) : (
                                        <PaginationPrevious className="pointer-events-none opacity-50" />
                                    )}
                                </PaginationItem>
                            );
                        }

                        // Handle Next Button
                        if (isNext) {
                            return (
                                <PaginationItem key={index}>
                                    {link.url ? (
                                        <Link href={link.url} preserveScroll>
                                            <PaginationNext />
                                        </Link>
                                    ) : (
                                        <PaginationNext className="pointer-events-none opacity-50" />
                                    )}
                                </PaginationItem>
                            );
                        }

                        // Handle Ellipsis
                        if (link.label === '...') {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        // Handle Page Numbers
                        return (
                            <PaginationItem key={index}>
                                {link.url ? (
                                    <Link href={link.url} preserveScroll>
                                        <PaginationLink isActive={link.active}>
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </PaginationLink>
                                    </Link>
                                ) : (
                                    <PaginationLink isActive={link.active} className="pointer-events-none opacity-50">
                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        );
                    })}
                </PaginationContent>
            </Pagination>
        </div>
    );
};
