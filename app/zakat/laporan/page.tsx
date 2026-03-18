import { LaporanZI } from "@/components/layouts/table/laporan-zi";
import { verifySession } from "@/lib/dal";
import { PZIRT } from "@/lib/laporan";

export default async function Page() {
    // await verifySession()
    // let sumpzirt01: string[]
    // sumpzirt01 = await PZIRT('01')
    // console.log(sumpzirt01)
    return (
        <>
        <LaporanZI />
        </>
    )
}