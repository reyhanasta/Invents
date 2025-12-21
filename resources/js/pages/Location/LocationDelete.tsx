type Location = {
    id: number;
    location_name: string;
    location_code: string;
    description: string;
};
type LocationDeleteProps = {
    open: boolean;
    openChange: (open: boolean) => void;
    location: Location | null;
};

export default function LocationDelete({
    open,
    openChange,
    location,
}: LocationDeleteProps) {
    return (
        <div>
            <h1>Location Delete Modal</h1>
        </div>
    );
}
