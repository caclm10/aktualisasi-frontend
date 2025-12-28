"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
    aktivitas: {
        label: "Aktivitas",
    },
    pemeliharaan: {
        label: "Pemeliharaan",
        color: "hsl(270, 70%, 50%)", // purple
    },
    perjalanan: {
        label: "Perjalanan",
        color: "hsl(210, 100%, 50%)", // blue
    },
} satisfies ChartConfig;

function DashboardChart() {
    const { activities, isLoading } = useActivities();

    // Group activities by month
    const chartData = useMemo(() => {
        if (!activities) return [];

        const monthlyData: Record<
            string,
            { month: string; pemeliharaan: number; perjalanan: number }
        > = {};

        const now = new Date();
        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthKey = date.toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
            });
            monthlyData[monthKey] = {
                month: monthKey,
                pemeliharaan: 0,
                perjalanan: 0,
            };
        }

        // Count activities per month
        activities.forEach((activity) => {
            const date = new Date(activity.performedAt);
            const monthKey = date.toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
            });

            if (monthlyData[monthKey]) {
                if (activity.category === "pemeliharaan") {
                    monthlyData[monthKey].pemeliharaan++;
                } else if (activity.category === "perjalanan") {
                    monthlyData[monthKey].perjalanan++;
                }
            }
        });

        return Object.values(monthlyData);
    }, [activities]);

    if (isLoading) {
        return (
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Aktivitas Aset</CardTitle>
                    <CardDescription>
                        Aktivitas pemeliharaan dan perjalanan 6 bulan terakhir
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <div className="flex h-[250px] w-full items-center justify-center">
                        <span className="text-muted-foreground">
                            Memuat data...
                        </span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Aktivitas Aset</CardTitle>
                <CardDescription>
                    <span className="hidden @[540px]/card:block">
                        Aktivitas pemeliharaan dan perjalanan 6 bulan terakhir
                    </span>
                    <span className="@[540px]/card:hidden">
                        6 bulan terakhir
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 12,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="fillPemeliharaan"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-pemeliharaan)"
                                    stopOpacity={1.0}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-pemeliharaan)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillPerjalanan"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-perjalanan)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-perjalanan)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                return value.split(" ")[0].slice(0, 3);
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Area
                            dataKey="perjalanan"
                            type="monotone"
                            fill="url(#fillPerjalanan)"
                            stroke="var(--color-perjalanan)"
                            stackId="a"
                        />
                        <Area
                            dataKey="pemeliharaan"
                            type="monotone"
                            fill="url(#fillPemeliharaan)"
                            stroke="var(--color-pemeliharaan)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export { DashboardChart };
