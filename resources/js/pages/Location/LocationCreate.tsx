type LocationCreateProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function LocationCreate({
    open,
    onOpenChange,
}: LocationCreateProps) {
    return (
        <div>
            <h1>Location Create Modal</h1>
        </div>
    );
}
