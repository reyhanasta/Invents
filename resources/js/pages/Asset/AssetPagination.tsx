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

type PaginationProps = {
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};

export const AssetPagination = ({
    links,
    current_page,
    last_page,
    total,
    from,
    to,
}: PaginationProps) => {
    // Filter out "Previous" and "Next" text links
    const pageLinks = links.filter(
        (link) =>
            link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;',
    );

    // Get previous and next links
    const previousLink = links[0];
    const nextLink = links[links.length - 1];

    // Parse page number from label
    const getPageNumber = (label: string): number => {
        const cleaned = label.replace(/[^0-9]/g, '');
        const parsed = parseInt(cleaned, 10);
        return isNaN(parsed) ? 0 : parsed;
    };

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Info */}
            <div className="text-sm text-muted-foreground">
                Showing{' '}
                <span className="font-medium text-foreground">{from}</span> to{' '}
                <span className="font-medium text-foreground">{to}</span> of{' '}
                <span className="font-medium text-foreground">{total}</span>{' '}
                results
            </div>

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    {/* Previous Button */}
                    <PaginationItem>
                        {previousLink.url ? (
                            <Link href={previousLink.url} preserveScroll>
                                <PaginationPrevious />
                            </Link>
                        ) : (
                            <PaginationPrevious className="pointer-events-none opacity-50" />
                        )}
                    </PaginationItem>

                    {/* Page Numbers */}
                    {pageLinks.map((link, index) => {
                        const pageNumber = getPageNumber(link.label);

                        // Skip invalid page numbers
                        if (pageNumber === 0 || pageNumber > last_page)
                            return null;

                        // Smart pagination display logic
                        const shouldShow =
                            pageNumber === 1 ||
                            pageNumber === last_page ||
                            (pageNumber >= current_page - 1 &&
                                pageNumber <= current_page + 1);

                        // Show ellipsis before current page range
                        const showEllipsisBefore =
                            pageNumber === current_page - 1 &&
                            current_page > 3 &&
                            pageNumber !== 1;

                        // Show ellipsis after current page range
                        const showEllipsisAfter =
                            pageNumber === current_page + 1 &&
                            current_page < last_page - 2 &&
                            pageNumber !== last_page;

                        if (!shouldShow) return null;

                        return (
                            <div key={index} className="flex items-center">
                                {showEllipsisBefore && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    {link.url ? (
                                        <Link href={link.url} preserveScroll>
                                            <PaginationLink
                                                isActive={link.active}
                                            >
                                                {pageNumber}
                                            </PaginationLink>
                                        </Link>
                                    ) : (
                                        <PaginationLink isActive={link.active}>
                                            {pageNumber}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>

                                {showEllipsisAfter && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                            </div>
                        );
                    })}

                    {/* Next Button */}
                    <PaginationItem>
                        {nextLink.url ? (
                            <Link href={nextLink.url} preserveScroll>
                                <PaginationNext />
                            </Link>
                        ) : (
                            <PaginationNext className="pointer-events-none opacity-50" />
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
