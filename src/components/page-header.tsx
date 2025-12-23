import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode; // Ini yang bikin tombolnya optional
    className?: string; // Opsional: untuk atur margin jika perlu
}

function PageHeader({
    title,
    description,
    action,
    className,
}: PageHeaderProps) {
    return (
        <div
            className={cn("mb-6 flex items-center justify-between", className)}
        >
            <div>
                <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                {description && (
                    <p className="text-muted-foreground">{description}</p>
                )}
            </div>

            {/* Render bagian kanan hanya jika prop 'action' diberikan */}
            {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
    );
}

export { PageHeader };
