import { columnsLain, Lain } from "@/components/layouts/table/columns-lain"
import { DataTable } from "@/components/layouts/table/data-table"
import { Card } from "@/components/ui/card";
import { verifySession } from "@/lib/dal";
import { Host } from "@/lib/host";

async function getDataLain(): Promise<Lain[]> {
    const sample_data = await fetch(`${Host}/api/zakat/rekomendasi`)
        const data = await sample_data.json()
        return data;
}

export default async function Page() {
    // await verifySession()
    const data = await getDataLain()
    return (
        <div className="container mx-auto gap-4 p-4 pt-0">
            <Card className="px-4">
                <div className="w-full font-bold text-2xl">Rekomendasi Jumlah Zakat Fitrah Setiap Individu</div>
                <DataTable columns={columnsLain} data={data} jenis="rekomendasi-fitrah" />
            </Card>
        </div>
    )
}
export const dynamic = "force-dynamic";
