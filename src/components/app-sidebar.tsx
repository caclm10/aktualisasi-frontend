import {
    Building2Icon,
    ChevronsUpDownIcon,
    HistoryIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    NetworkIcon,
    ServerIcon,
    UserCircleIcon,
} from "lucide-react";

const menuItems = [
    {
        title: "Applications",
        items: [
            {
                icon: LayoutDashboardIcon,
                title: "Dashboard",
                to: "/dashboard",
            },
            {
                icon: Building2Icon,
                title: "Kantor",
                to: "/offices",
            },
            {
                icon: ServerIcon,
                title: "Aset",
                to: "/assets",
            },
            {
                icon: HistoryIcon,
                title: "Aktivitas",
                to: "/activities",
            },
        ],
    },
];

function AppSidebar() {
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            render={<Link to="/dashboard" />}
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <NetworkIcon className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    SIM-JARI
                                </span>
                                <span className="truncate text-xs">
                                    Sistem Informasi Manajemen Jaringan &
                                    Inventaris
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <AppSidebarNav />
            </SidebarContent>

            <SidebarFooter>
                <AppSidebarNavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

function AppSidebarNav() {
    const location = useLocation();
    return (
        <>
            {menuItems.map((item) => (
                <SidebarGroup key={item.title}>
                    <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {item.items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        isActive={location.pathname.startsWith(
                                            item.to,
                                        )}
                                        render={<Link to={item.to} />}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
        </>
    );
}

function AppSidebarNavUser() {
    const isMobile = useIsMobile();
    const { user, logout } = useAuth();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            />
                        }
                    >
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage alt={user?.name} />
                            <AvatarFallback className="rounded-lg">
                                {user?.name.split(" ")[0][0]}
                                {user?.name.split(" ")[1][0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {user?.name}
                            </span>
                            <span className="truncate text-xs">
                                {user?.email}
                            </span>
                        </div>
                        <ChevronsUpDownIcon className="ml-auto size-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage alt={user?.name} />
                                        <AvatarFallback className="rounded-lg">
                                            {user?.name.split(" ")[0][0]}
                                            {user?.name.split(" ")[1][0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {user?.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user?.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <UserCircleIcon />
                                Account
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOutIcon />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

export { AppSidebar };
