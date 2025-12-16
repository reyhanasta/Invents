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

export default function SimplePaginationExample({
    assets,
}: {
    assets: PaginationProps;
}) {
    return (
        <div>
            {assets.links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ?? '#'}
                    className={`${link.active ? 'mx-1 underline' : 'mx-1'} rounded-md border px-3 py-2 font-bold hover:bg-gray-200`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
