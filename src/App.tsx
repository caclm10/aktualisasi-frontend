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
            </Routes>
        </BrowserRouter>
    );
}

export { App };
