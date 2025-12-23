function Table({ className, ...props }: React.ComponentProps<"table">) {
    return (
        <div className="overflow-x-auto">
            <table className={cn("w-full", className)} {...props} />
        </div>
    );
}

function TableHeader(props: React.ComponentProps<"thead">) {
    return <thead {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
    return <th className={cn("pr-4 pb-3", className)} {...props} />;
}

interface TableRowProps extends React.ComponentProps<"tr"> {
    head?: boolean;
    body?: boolean;
}
function TableRow({
    className,
    head = false,
    body = false,
    ...props
}: TableRowProps) {
    return (
        <tr
            className={cn(
                head &&
                    "border-border text-muted-foreground border-b text-left text-xs font-medium tracking-wider uppercase",
                body && "group hover:bg-muted/50",
            )}
            {...props}
        />
    );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
    return (
        <tbody className={cn("divide-border divide-y", className)} {...props} />
    );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
    return <td className={cn("py-3 pr-4", className)} {...props} />;
}

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
