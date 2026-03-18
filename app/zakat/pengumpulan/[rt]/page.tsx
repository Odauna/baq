import { Pengumpulan, columnsPengumpulan } from "@/components/layouts/table/columns-pengumpulan";
import { columnsTimbang, Timbang } from "@/components/layouts/table/columns-timbang";
import { DataTable } from "@/components/layouts/table/data-table";
import { Card } from "@/components/ui/card";
import { verifySession } from "@/lib/dal";
import { Host } from "@/lib/host";
import { cookies } from "next/headers";
async function getData(param: string): Promise<Pengumpulan[]> {
    const sample_data = await fetch(`${Host}/api/zakat/pengumpulan?rt=${param}`);
    // const data = await JSON.parse(JSON.stringify(sample_data))
    const data = await sample_data.json()
    return data;
}

async function getDataTimbang(): Promise<Timbang[]> {
    const sample_data = await fetch(`${Host}/api/zakat/timbangan`)
    // const data = await JSON.parse(JSON.stringify(sample_data))
    const data = await sample_data.json()
    return data;
}

async function getParams() {
    const cookieStored = await cookies()
    const params = cookieStored.get('parameter')
    return params?.value
}

export default async function Page() {
    // await verifySession()
    const param = await getParams()
    let data = null
    if (param === "Timbangan") {
        data = await getDataTimbang();
        return (
            <>
            <div className="container mx-auto gap-4 p-4 pt-0">
                <Card className="px-4">
                    <div className="w-full font-bold text-2xl">Nominal Timbang Pengumpulan Zakat Fitrah Beras</div>
                    <DataTable columns={columnsTimbang} data={data} jenis="timbangan" />
                </Card>
            </div>
            </>
        )
    } else {
        data = await getData(param!);
        return (
            <>
            <div className="container mx-auto gap-4 p-4 pt-0">
                <Card className="px-4">
                    <div className="w-full font-bold text-2xl">Pengumpulan Zakat & Infak RT.{param}</div>
                    <DataTable columns={columnsPengumpulan} data={data} jenis="pengumpulan" />
                </Card>
            </div>
            </>
        )
    }
    // return (
    //     <>
    //     <div className="container mx-auto gap-4 p-4 pt-0">
    //         {param === "Tambahan" ? (
    //             <DataTable columns={columnsLain} data={data!} jenis="tambahan" />
    //         ) : (
    //             <DataTable columns={columnsPengumpulan} data={data} jenis="pengumpulan" />
    //         )}
    //     </div>
    //     </>
    // )
}
export const dynamic = "force-dynamic";
