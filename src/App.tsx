import { BrowserRouter, Navigate, Route, Routes } from "react-router";

function App() {
    return (
        <>
            <AppRoutes />

            <Toaster />
        </>
    );
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/assets" />} />

                <Route element={<AuthLayout />}>
                    <Route path="login" element={<LoginView />} />
                </Route>

                <Route element={<MainLayout />}>
                    <Route
                        path="dashboard"
                        element={<Navigate to="/assets" />}
                    />

                    <Route path="assets">
                        <Route index element={<AssetIndexView />} />
                        <Route path="create" element={<AssetCreateView />} />

                        <Route path=":id">
                            <Route index element={<AssetDetailView />} />
                            <Route path="edit" element={<AssetEditView />} />
                        </Route>
                    </Route>

                    <Route path="offices">
                        <Route index element={<OfficeIndexView />} />
                        <Route path="create" element={<OfficeCreateView />} />

                        <Route path=":id">
                            <Route index element={<OfficeDetailView />} />
                            <Route path="edit" element={<OfficeEditView />} />

                            <Route path="rooms">
                                <Route
                                    path="create"
                                    element={<RoomCreateView />}
                                />
                                <Route
                                    path=":roomId/edit"
                                    element={<RoomEditView />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>
    );
}

export { App };
