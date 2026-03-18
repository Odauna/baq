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
    // const sumzi = await fetch(`${Host}/api/dashboard/total`).then((res) => res.json())
    // console.log(`data: ${Object.values(sumzfb[0])}`)
    // console.log(`data: ${sumzi[0].amount_zfb}`)
    // const w01 = await fetch(`${Host}/api/dashboard/w`).then((res) => res.json())
    // console.log(`dataanggota: ${w01[0].amount_anggota}`)
    // const m01 = await fetch(`${Host}/api/dashboard/w/m`).then((res) => res.json())
    // console.log(`datamustahik:${m01[0] != undefined ? m01[0].amount_mustahik : 0}`)
    // const b01 = await fetch(`${Host}/api/dashboard/zi/blum`).then((res) => res.json())
    // console.log(`databelumzakat:${b01[0] != undefined ? b01[0].amount_belum_zakat : 0}`)
    // const zfb01 = await fetch(`${Host}/api/dashboard/zi/fb`).then((res) => res.json())
    // console.log(`datazfb: ${zfb01[0].amount_zfb != undefined ? zfb01[0].amount_zfb : 0}`)
    // const zfu01 = await fetch(`${Host}/api/dashboard/zi/fu`).then((res) => res.json())
    // console.log(`datazfu: ${zfu01[0].amount_zfu}`)
    // const zm01 = await fetch(`${Host}/api/dashboard/zi/m`).then((res) => res.json())
    // console.log(`datazm: ${zm01[0] != undefined ? zm01[0].amount_zm : 0}`)
    // const i01 = await fetch(`${Host}/api/dashboard/zi/i`).then((res) => res.json())
    // console.log(`datai: ${i01[0].amount_i}`)

    return (
        <div className="m-2">
            <Dashboard />
            {/* <CTotalZI total_fitrah_beras={sumzi[0].amount_zfb} total_fitrah_uang={sumzi[0].amount_zfu} total_mal={sumzi[0].amount_zm} total_infak={sumzi[0].amount_i} />
            <RCSZakatRT01 
                jkk={w01[0].amount_kk} 
                janggota={w01[0].amount_anggota} 
                jtanggungan={w01[0].amount_tanggungan}
                jmustahik={m01[0] != undefined ? m01[0].amount_mustahik : 0} 
                j_belum_zakat={b01[0] != undefined ? b01[0].amount_belum_zakat : 0}
                j_jiwa_fitrah_beras={zfb01[0] != undefined ? zfb01[0].amount_tanggungan_zfb : 0} 
                jfitrah_beras={zfb01[0] != undefined ? zfb01[0].amount_zfb : 0} 
                j_jiwa_fitrah_uang={zfu01[0] != undefined ? zfu01[0].amount_tanggungan_zfu : 0} 
                jfitrah_uang={zfu01[0] != undefined ? zfu01[0].amount_zfu : 0} 
                j_jiwa_mal={zm01[0] != undefined ? zm01[0].amount_tanggungan_zm : 0} 
                jmal={zm01[0] != undefined ? zm01[0].amount_zm : 0} 
                jinfak={i01[0].amount_i} 
            />
            <RCSPerkiraanSudahZakat sudah_zakat={1} belum_zakat={1} rt01={1} rt02={1} rt03={1} rt04={1} rt05={1} rt06={1} />
            <MultiE /> */}
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl  bg-muted/50 md:min-h-min" /> */}
        </div>
    )
}