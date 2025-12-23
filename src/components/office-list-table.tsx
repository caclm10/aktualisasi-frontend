import { Building2Icon, EyeIcon } from "lucide-react";

interface OfficeListTableProps {
    data?: Office[];
}

function OfficeListTable({ data = [] }: OfficeListTableProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Building2Icon className="text-muted-foreground size-5" />

                    <CardTitle>Daftar Kantor</CardTitle>
                </div>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow head>
                            <TableHead className="w-12">No</TableHead>
                            <TableHead>Nama Kantor</TableHead>
                            <TableHead>PIC</TableHead>
                            <TableHead>Kontak</TableHead>
                            <TableHead className="w-20 pr-0 text-center">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-muted-foreground py-8 text-center"
                                >
                                    Tidak ada kantor yang ditemukan
                                </TableCell>
                            </TableRow>
                        )}

                        {data.length > 0 &&
                            data.map((office, index) => (
                                <TableRow key={office.id} body>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell>
                                        <span className="font-medium">
                                            {office.name}
                                        </span>
                                    </TableCell>

                                    <TableCell>{office.picName}</TableCell>

                                    <TableCell>
                                        <code className="text-muted-foreground font-mono text-xs">
                                            {office.picContact}
                                        </code>
                                    </TableCell>

                                    <TableCell className="pr-0 text-center">
                                        <Link
                                            to={`/offices/${office.id}`}
                                            title="Lihat Detail"
                                            className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors"
                                        >
                                            <EyeIcon className="size-4" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export { OfficeListTable };
