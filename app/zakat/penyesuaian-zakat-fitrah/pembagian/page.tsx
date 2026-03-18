import { columnsPembagianBeras, PembagianBeras } from "@/components/layouts/table/columns-pembagian";
import { DataTable } from "@/components/layouts/table/data-table";
import { Card } from "@/components/ui/card";
import { verifySession } from "@/lib/dal";
import { Host } from "@/lib/host";


async function getDataPembagianBeras(): Promise<PembagianBeras[]> {
    const sample_data = await fetch(`${Host}/api/zakat/pembagian`)
    const data = await sample_data.json()
    return data
}

export default async function Page() {
    // await verifySession()
    const data = await getDataPembagianBeras()
    return (
        <div className="container mx-auto gap-4 p-4 pt-0">
            <Card className="px-4">
                <div className="w-full font-bold text-2xl">Pembagian Beras Zakat Fitrah per Jumlah Anggota Keluarga</div>
                <DataTable columns={columnsPembagianBeras} data={data} jenis="pembagian-beras" />
            </Card>
        </div>
    )
}
export const dynamic = "force-dynamic";
