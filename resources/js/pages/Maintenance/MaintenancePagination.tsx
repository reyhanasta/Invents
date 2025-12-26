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
import { MaintenancePaginationProps } from './MaintenanceIndex';

export default function MaintenancePagination({
    maintenance,
}: {
    maintenance: MaintenancePaginationProps;
}) {
    // Filter out "Previous" and "Next" text links
    const pageLinks = maintenance.links.filter(
        (link) =>
            link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;',
    );

    // Get previous and next links
    const previousLink = maintenance.links[0];
    const nextLink = maintenance.links[maintenance.links.length - 1];

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
                Menampilkan{' '}
                <span className="font-medium text-foreground">
                    {maintenance.from}
                </span>{' '}
                sampai{' '}
                <span className="font-medium text-foreground">
                    {maintenance.to}
                </span>{' '}
                dari{' '}
                <span className="font-medium text-foreground">
                    {maintenance.total}
                </span>{' '}
                hasil
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
                        if (
                            pageNumber === 0 ||
                            pageNumber > maintenance.last_page
                        ) {
                            return null;
                        }

                        // Smart pagination display logic
                        const shouldShow =
                            pageNumber === 1 ||
                            pageNumber === maintenance.last_page ||
                            (pageNumber >= maintenance.current_page - 1 &&
                                pageNumber <= maintenance.current_page + 1);

                        // Show ellipsis after current page range
                        const showEllipsisAfter =
                            pageNumber === maintenance.current_page + 1 &&
                            maintenance.current_page <
                                maintenance.last_page - 2 &&
                            pageNumber !== maintenance.last_page;

                        if (!shouldShow) {
                            return null;
                        }

                        return (
                            <div key={index} className="flex items-center">
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
}
