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
    pemeliharaan: {
        label: "Pemeliharaan",
        color: "var(--chart-1)",
    },
    perjalanan: {
        label: "Perjalanan",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

function DashboardChart() {
    const { activities } = useActivities();

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
            const date = new Date(activity.createdAt);
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Aktivitas Aset</CardTitle>
                <CardDescription>
                    Aktivitas pemeliharaan dan perjalanan 6 bulan terakhir
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) =>
                                value.split(" ")[0].slice(0, 3)
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
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
                                    stopOpacity={0.8}
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
                        <Area
                            dataKey="perjalanan"
                            type="natural"
                            fill="url(#fillPerjalanan)"
                            fillOpacity={0.4}
                            stroke="var(--color-perjalanan)"
                            stackId="a"
                        />
                        <Area
                            dataKey="pemeliharaan"
                            type="natural"
                            fill="url(#fillPemeliharaan)"
                            fillOpacity={0.4}
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
