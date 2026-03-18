import { Distribusi, columnsDistribusi } from "@/components/layouts/table/columns-distribusi";
import { columnsDistribusiDusun } from "@/components/layouts/table/columns-distribusi-dusun";
import { columnsPengeluaranInfak } from "@/components/layouts/table/columns-pengeluaran-infak";
import { DataTable } from "@/components/layouts/table/data-table";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { verifySession } from "@/lib/dal";
import { Host } from "@/lib/host";
import { cookies } from "next/headers";

async function getData(params: string): Promise<Distribusi[]> {
    const sample_data = await fetch(`${Host}/api/zakat/distribusi?area=${params}`)
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
    const data = await getData(param!);
    if (param === "Pengeluaran Infak") {
        return (
            <div className="container mx-auto gap-4 p-4 pt-0">
                <Card className="px-4">
                    <div className="w-full font-bold text-2xl">Distribusi (Pengeluaran Infak)</div>
                    <DataTable columns={columnsPengeluaranInfak} data={data} jenis="distribusi" />
                </Card>
            </div>
        )
    } else if (param === "Dusun") {
        return (
            <div className="container mx-auto gap-4 p-4 pt-0">
                <Card className="px-4">
                    <div className="w-full font-bold text-2xl">Distribusi Zakat Fitrah (Beras) Dusun</div>
                    <DataTable columns={columnsDistribusiDusun} data={data} jenis="distribusi" />
                </Card>
            </div>
        )
    } else {
        return (
            <div className="container mx-auto gap-4 p-4 pt-0">
                <Card className="px-4">
                    <div className="w-full font-bold text-2xl">Distribusi Zakat ({param})</div>
                    <DataTable columns={columnsDistribusi} data={data} jenis="distribusi" />
                </Card>
            </div>
        )
    }
}