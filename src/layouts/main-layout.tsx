function MainLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    );
}

export { MainLayout };
