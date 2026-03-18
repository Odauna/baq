import { CTotalZI } from "@/components/layouts/zakat/dashboard/card/c-total-zi";
import { MultiE } from "@/components/layouts/zakat/dashboard/chart/bar/multi-e";
import { RCSPerkiraanSudahZakat } from "@/components/layouts/zakat/dashboard/chart/radial/s-perkiraan-sudahzakat";
import { RCSZakatRT01 } from "@/components/layouts/zakat/dashboard/chart/radial/s-zakat-rt01";
import { Dashboard } from "@/components/layouts/dashboard";
import { Host } from "@/lib/host";
import React from "react";
import { verifySession } from "@/lib/dal";

interface TZI {
    id: string,
    amount_zfb: number,
    amount_zfu: number,
    amount_zm: number,
    amount_i: number
}

export default async function Page() {
    await verifySession()
    return (
        <div className="m-2">
            <Dashboard />
        </div>
    )
}