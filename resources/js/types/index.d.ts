import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    roles?: Role[];
    role_names?: string[];
    [key: string]: unknown;
}

export type CategoryProps = {
    id: number;
    category_name: string;
    prefix_code: string;
};

export type LocationProps = {
    id: number;
    location_name: string;
};

export type Asset = {
    id: number;
    asset_name: string;
    asset_code: string;
    category: CategoryProps;
    location: LocationProps;
    brand?: string;
    serial_number?: string;
    condition: string;
    status: 'available' | 'in-use' | 'maintenance' | 'retired';
    acquisition_date?: string;
    description?: string;
};

export type Maintenance = {
    id: number;
    asset: Asset;
    asset_id: number;
    type: 'routine' | 'repair' | 'inspection' | 'calibration';
    description: string;
    maintenance_date: string;
    maintenance_done_date: string;
    technician: string;
    cost?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    notes?: string;
};

export type Company = {
    id: number;
    complete_company_name: string;
    short_company_name?: string;
    address?: string;
    logo_path?: string;
    created_at?: string;
    updated_at?: string;
};

export type TicketCategory = {
    id: number;
    name: string;
    description?: string;
    is_active: boolean;
};

export type Priority = {
    id: number;
    name: string;
    level: number;
    response_target_minutes?: number;
    resolve_target_minutes?: number;
};

export type Department = {
    id: number;
    name: string;
};

export type TicketComment = {
    id: number;
    ticket_id: number;
    user_id: number;
    user?: User;
    message: string;
    is_internal: boolean;
    created_at: string;
    updated_at: string;
};

export type TicketAttachment = {
    id: number;
    ticket_id: number;
    uploaded_by: number;
    uploader?: User;
    file_name: string;
    file_path: string;
    file_size?: number;
    mime_type?: string;
    created_at: string;
    updated_at: string;
};

export type TicketStatusLog = {
    id: number;
    ticket_id: number;
    from_status?: string | null;
    to_status: string;
    changed_by: number;
    changer?: User;
    note?: string | null;
    created_at: string;
    updated_at: string;
};

export type Ticket = {
    id: number;
    ticket_code: string;
    title: string;
    description: string;
    reporter_id: number;
    reporter?: User;
    assigned_to?: number;
    assignee?: User;
    category_id: number;
    category?: TicketCategory;
    priority_id: number;
    priority?: Priority;
    department_id?: number | null;
    department?: Department;
    asset_id?: number; // Added
    asset?: Asset; // Added
    status:
        | 'open'
        | 'triaged'
        | 'in_progress'
        | 'pending'
        | 'resolved'
        | 'closed'
        | 'rejected';
    source: string;
    due_at?: string | null;
    resolved_at?: string | null;
    closed_at?: string | null;
    created_at: string;
    updated_at: string;
    comments?: TicketComment[];
    attachments?: TicketAttachment[];
    status_logs?: TicketStatusLog[];
};
