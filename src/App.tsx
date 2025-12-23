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
                    <Route path="assets" element={<AssetIndexView />} />

                    <Route path="offices">
                        <Route index element={<OfficeIndexView />} />
                        <Route path="create" element={<OfficeCreateView />} />
                        <Route path=":id" element={<OfficeDetailView />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>
    );
}

export { App };
