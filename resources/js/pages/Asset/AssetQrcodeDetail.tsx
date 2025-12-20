import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { assets } from "@/routes";
import { type BreadcrumbItem } from "@/types";
import { router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assets',
        href: assets().url,
    },
];

export default function AssetQrcodeDetail() {
    return <AppLayout breadcrumbs={breadcrumbs}>
        <div className="container mx-auto space-y-6 p-2 md:p-4 lg:p-6">
            <div aria-label="header" className="flex justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    className="hover:no gap-3 text-sm text-muted-foreground"
                    onClick={() => router.visit(assets().url)}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>
        </div>
    </AppLayout>;
}