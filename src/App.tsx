import { BrowserRouter, Route, Routes } from "react-router";

function App() {
    return (
        <>
            <AppRoutes />
        </>
    );
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="login" element={<LoginView />} />
                </Route>

                <Route element={<MainLayout />}>
                    <Route path="assets" element={<AssetIndexView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export { App };
