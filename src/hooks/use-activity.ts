export function useActivities() {
    const {
        data: activities,
        error,
        isLoading,
        mutate,
    } = useSWR("/api/activities", () =>
        http.get("/api/activities").then((res) => res.data.data as Activity[]),
    );

    return {
        activities,
        error,
        isLoading,
        mutate,
    };
}

export function useAssetActivities(assetId: string) {
    const {
        data: activities,
        error,
        isLoading,
        mutate,
    } = useSWR(`/api/assets/${assetId}/activities`, () =>
        http
            .get(`/api/assets/${assetId}/activities`)
            .then((res) => res.data.data as Activity[]),
    );

    return {
        activities,
        error,
        isLoading,
        mutate,
    };
}
