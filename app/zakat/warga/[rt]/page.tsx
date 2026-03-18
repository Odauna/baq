import { DataWarga, columnsWarga } from "@/components/layouts/table/columns-warga";
import { DataTable } from "@/components/layouts/table/data-table";
import { Card } from "@/components/ui/card";
import { verifySession } from "@/lib/dal";
import { Host } from "@/lib/host";
import { cookies } from "next/headers";

let rt: string | undefined = undefined

async function getData(): Promise<DataWarga[]> {
    const cookieStored = await cookies();
    const rtw = cookieStored.get('parameter');
    rt = rtw?.value
    // const header_l = headers()
    // const path = await header_l.get('param')
    const sample_data = await fetch(`${Host}/api/zakat/warga?rt=${rtw?.value}`);
    const data = await sample_data.json()
    return data;
}

export default async function Page() {
    // await verifySession()
    const data = await getData();
    return (
        <>
        <div className="container mx-auto gap-4 p-4 pt-0">
            <Card className="px-4">
                <div className="w-full font-bold text-2xl">Pengumpulan Zakat & Infak RT.{rt}</div>
                <DataTable columns={columnsWarga} data={data} jenis="warga" />
            </Card>
        </div>
        </>
    )
}
export const dynamic = "force-dynamic";
