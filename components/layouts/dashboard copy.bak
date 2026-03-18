"use client"

import React from "react"
import { BCCustomLabel } from "./zakat/dashboard/chart/bar/custom-label"
import { BCMixed } from "./zakat/dashboard/chart/bar/mixed"
import { PCDonutText } from "./zakat/dashboard/chart/pie/donut-text"
import { RCSZakatRT01 } from "./zakat/dashboard/chart/radial/s-zakat-rt01"
import { RCSZakatRT02 } from "./zakat/dashboard/chart/radial/s-zakat-rt02"
import { RCSZakatRT03 } from "./zakat/dashboard/chart/radial/s-zakat-rt03"
import { RCSZakatRT04 } from "./zakat/dashboard/chart/radial/s-zakat-rt04"
import { RCSZakatRT05 } from "./zakat/dashboard/chart/radial/s-zakat-rt05"
import { RCSZakatRT06 } from "./zakat/dashboard/chart/radial/s-zakat-rt06"
import { RCSPerkiraanSudahZakat } from "./zakat/dashboard/chart/radial/s-perkiraan-sudahzakat"
import { PieDonutText } from "./zakat/dashboard/chart/pie/dwt-e"
import { CTotalZI } from "./zakat/dashboard/card/c-total-zi"
import { LCZakatFitrahBeras } from "./zakat/dashboard/chart/line/l-zf-beras"
import { LCZakatFitrahUang } from "./zakat/dashboard/chart/line/l-zf-uang"
import { LCZakatMal } from "./zakat/dashboard/chart/line/l-zmal"
import { LCInfak } from "./zakat/dashboard/chart/line/l-infak"
import { MultiE } from "./zakat/dashboard/chart/bar/multi-e"

export function Dashboard() {
    return (
        <div className="m-2">
            <CTotalZI />
            <LCZakatFitrahBeras />
            <LCZakatFitrahUang />
            <LCZakatMal />
            <LCInfak />
            {/* <BCCustomLabel />
            <BCMixed />
            <PCDonutText />
            <PieDonutText /> */}
            <div className="flex flex-wrap">
                <RCSZakatRT01 />
                <RCSZakatRT02 />
                <RCSZakatRT03 />
                <RCSZakatRT04 />
                <RCSZakatRT05 />
                <RCSZakatRT06 />
            </div>
            <div className="flex flex-wrap">
                <RCSPerkiraanSudahZakat />
                <MultiE />
            </div>
        </div>
    )
}