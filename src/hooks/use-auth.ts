interface UseAuthProps {
    middleware?: "guest" | "auth";
    redirectIfAuthenticated?: string;
}

export const useAuth = ({ middleware = "auth" }: UseAuthProps = {}) => {
    const {
        data: user,
        error,
        mutate,
    } = useSWR("/api/user", () =>
        http.get("/api/user").then((res) => res.data.data as User | null),
    );

    const navigate = useNavigate();

    async function login(data: LoginInput) {
        try {
            await http.get("/sanctum/csrf-cookie");

            await http.post("/api/login", data);

            await mutate();

            navigate("/dashboard");
        } catch (error) {
            if (isHttpError(error)) {
                if (error.response?.status === 422) {
                    throw new ValidationError(error.response?.data.data);
                }
            }

            throw error;
        }
    }

    async function logout() {
        if (!error) {
            await http.delete("/api/logout").then(() => mutate());
        }

        await mutate(null, { revalidate: false });

        navigate("/login");
    }

    useEffect(() => {
        if (middleware === "guest" && user) {
            navigate("/dashboard");
        }

        if (middleware === "auth" && error) {
            logout();
        }
    }, [user, error]);

    return {
        user,
        login,
        logout,
    };
};
