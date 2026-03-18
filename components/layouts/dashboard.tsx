"use client"

import { CKonversiFitrahUang } from "./zakat/dashboard/card/c-konversi-fitrah-uang"
import { CTotalFitrah } from "./zakat/dashboard/card/c-total-fitrah"
import { CTotalFitrahBeras } from "./zakat/dashboard/card/c-total-fitrah-beras-"
import { CTotalFitrahUang } from "./zakat/dashboard/card/c-total-fitrah-uang"
// import React from "react"
import { CTotalZI } from "./zakat/dashboard/card/c-total-zi"
import { RCSPerkiraanSudahZakat } from "./zakat/dashboard/chart/radial/s-perkiraan-sudahzakat"
import { RCSZIMeja1 } from "./zakat/dashboard/chart/radial/s-zi-meja-1"
import { RCSZIMeja2 } from "./zakat/dashboard/chart/radial/s-zi-meja-2"
import { RCSZIMeja3 } from "./zakat/dashboard/chart/radial/s-zi-meja-3"
import { RCSZIMeja4 } from "./zakat/dashboard/chart/radial/s-zi-meja-4"

export function Dashboard() {
    return (
        <div className="m-2">
            <div className="flex items-stretch md:flex-wrap w-full gap-3">
                <CTotalFitrahBeras />
                <CKonversiFitrahUang />
                <CTotalFitrah />
                {/* <CTotalFitrahUang /> */}
                <CTotalZI />
            </div>
            <div className="flex flex-wrap w-full gap-3">
                {/* <RCSPerkiraanSudahZakat /> */}
                <RCSZIMeja1 />
                <RCSZIMeja2 />
                <RCSZIMeja3 />
                <RCSZIMeja4 />
            </div>
        </div>
    )
}