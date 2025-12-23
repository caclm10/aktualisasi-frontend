import { Outlet } from "react-router";

function AuthLayout() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-slate-100 to-slate-200 p-4">
            <div className="w-full max-w-md shadow-lg">
                <Outlet />
            </div>
        </div>
    );
}

export { AuthLayout };
