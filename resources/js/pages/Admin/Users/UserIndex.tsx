import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    MoreHorizontalIcon,
    Pencil,
    Plus,
    SearchIcon,
    Trash,
    UserCircle,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/users',
    },
];

interface UserIndexProps {
    users: (User & { roles: { name: string }[] })[];
}

export default function UserIndex({ users }: UserIndexProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleDelete = () => {
        if (!selectedUser) return;

        router.delete(`/users/${selectedUser.id}`, {
            onStart: () => {
                toast.loading('Deleting user...');
            },
            onSuccess: () => {
                setShowDeleteDialog(false);
                setSelectedUser(null);
                toast.success('User deleted successfully!');
            },
            onError: () => {
                toast.error('Failed to delete user.');
            },
            onFinish: () => {
                toast.dismiss();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            <div className="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Manajemen User
                        </h1>
                        <p className="text-muted-foreground">
                            Kelola pengguna dan peran mereka dalam sistem.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <InputGroup className="max-w-md">
                        <InputGroupInput
                            placeholder="Cari user..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <InputGroupAddon align="inline-end">
                            {searchQuery ? (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4"
                                    onClick={() => setSearchQuery('')}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            ) : (
                                <SearchIcon className="h-4 w-4" />
                            )}
                        </InputGroupAddon>
                    </InputGroup>

                    <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href="/users/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah User
                        </Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-xl border bg-card/50 shadow-sm backdrop-blur-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">
                                    Avatar
                                </TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-24 text-center"
                                    >
                                        Data tidak ditemukan.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                                <UserCircle className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user.name}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles.map((role) => (
                                                    <Badge
                                                        key={role.name}
                                                        variant="secondary"
                                                        className="capitalize"
                                                    >
                                                        {role.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <MoreHorizontalIcon className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Aksi
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem
                                                        asChild
                                                        className="cursor-pointer"
                                                    >
                                                        <Link
                                                            href={`/users/${user.id}/edit`}
                                                        >
                                                            <Pencil className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="cursor-pointer text-destructive focus:text-destructive"
                                                        onSelect={() => {
                                                            setSelectedUser(
                                                                user,
                                                            );
                                                            setShowDeleteDialog(
                                                                true,
                                                            );
                                                        }}
                                                    >
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        Hapus
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus User?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus user{' '}
                            <strong>{selectedUser?.name}</strong>? Tindakan ini
                            tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
