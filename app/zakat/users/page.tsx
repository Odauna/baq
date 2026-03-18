import { columnsUsers, Users } from "@/components/layouts/zakat/users/columns";
import { DataTable } from "@/components/layouts/table/data-table";
import { Card } from "@/components/ui/card";
import { Host } from "@/lib/host";
import { verifySession } from "@/lib/dal";

async function getData(): Promise<Users[]> {
    const sample_data = await fetch(`${Host}/api/zakat/users`)
    const data = await sample_data.json()
    return data
}

export default async function Page() {
    // await verifySession()
    const data = await getData();
    return (
        <>
        <div className="container mx-auto gap-4 p-4 pt-0">
            <Card className="px-4">
                <div className="w-full font-bold text-2xl">Users</div>
                <DataTable columns={columnsUsers} data={data} jenis="users" />
            </Card>
        </div>
        </>
    )
}