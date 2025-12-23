import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant?: 'default' | 'primary' | 'success' | 'warning';
}

export function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    variant = 'default',
}: StatCardProps) {
    const variantStyles = {
        default: 'bg-card',
        primary: 'bg-primary-light',
        success: 'bg-success/10',
        warning: 'bg-warning/10',
    };

    const iconStyles = {
        default: 'bg-muted text-muted-foreground',
        primary: 'bg-primary text-primary-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
    };

    return (
        <div
            className={cn(
                'rounded-xl border border-border p-6 shadow-sm',
                variantStyles[variant],
            )}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        {title}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-foreground">
                        {value}
                    </p>
                    {trend && (
                        <p
                            className={cn(
                                'mt-2 text-sm',
                                trend.isPositive
                                    ? 'text-success'
                                    : 'text-destructive',
                            )}
                        >
                            {trend.isPositive ? '+' : ''}
                            {trend.value}% from last month
                        </p>
                    )}
                </div>
                <div
                    className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-xl',
                        iconStyles[variant],
                    )}
                >
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
