type Location = {
    id: number;
    location_name: string;
    location_code: string;
    description: string;
};

type LocationEditProps = {
    open: boolean;
    openChange: (open: boolean) => void;
    location: Location | null;
};

export default function LocationEdit({
    open,
    openChange,
    location,
}: LocationEditProps) {
    return (
        <div>
            <h1>Location Edit Modal</h1>
        </div>
    );
}
