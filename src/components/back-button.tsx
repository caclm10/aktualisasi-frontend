import { ArrowLeftIcon } from "lucide-react";

function BackButton({
    className,
    children,
    ...props
}: React.ComponentProps<typeof Link>) {
    return (
        <Link
            {...props}
            className={cn(
                "text-muted-foreground hover:text-foreground mb-3 inline-flex items-center gap-1 text-sm",
                className,
            )}
        >
            <ArrowLeftIcon className="size-4" />
            {children}
        </Link>
    );
}

export { BackButton };
