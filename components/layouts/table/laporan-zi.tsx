// @ts-nocheck
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { Host } from "@/lib/host"
import { PZIRT } from "@/lib/laporan"
import React, { useRef } from "react"
import { useReactToPrint } from "react-to-print"
// import "../../style/table-laporan.css"
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useSumZI(rt: '01' | '02' | '03' | '04' | '05' | '06') {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/pengumpulan/zi-rt?rt=${rt}`, fetcher)
    return {
        pzirt: data,
        pzirtIsLoading: isLoading,
        pzirtIsError: error
    }
}

function SumRT01() {
    const {pzirt, pzirtIsLoading} = useSumZI('01')
    if (pzirtIsLoading) return <td colSpan={5} className="border border-gray-300">"Sedang memuat..."</td>
    console.log(pzirt)
    return (
        <>
        <td className="border border-gray-300">
            <p className="px-1">1</p>
        </td>
        <td className="border border-gray-300 font-semibold">RT.01</td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((pzirt[0].amount_zfb).toFixed(2)))} kg` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zfu)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zm)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_i)}` : '-'}
            </p>
        </td>
        </>
    )
}

function SumRT02() {
    const {pzirt, pzirtIsLoading} = useSumZI('02')
    if (pzirtIsLoading) return <td colSpan={5} className="border border-gray-300">"Sedang memuat..."</td>
    console.log(pzirt)
    return (
        <>
        <td className="border border-gray-300">
            <p className="px-1">2</p>
        </td>
        <td className="border border-gray-300 font-semibold">RT.02</td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((pzirt[0].amount_zfb).toFixed(2)))} kg` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zfu)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zm)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_i)}` : '-'}
            </p>
        </td>
        </>
    )
}

function SumRT03() {
    const {pzirt, pzirtIsLoading} = useSumZI('03')
    if (pzirtIsLoading) return <td colSpan={5} className="border border-gray-300">"Sedang memuat..."</td>
    console.log(pzirt)
    return (
        <>
        <td className="border border-gray-300">
            <p className="px-1">3</p>
        </td>
        <td className="border border-gray-300 font-semibold">RT.03</td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((pzirt[0].amount_zfb).toFixed(2)))} kg` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zfu)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zm)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_i)}` : '-'}
            </p>
        </td>
        </>
    )
}

function SumRT04() {
    const {pzirt, pzirtIsLoading} = useSumZI('04')
    if (pzirtIsLoading) return <td colSpan={5} className="border border-gray-300">"Sedang memuat..."</td>
    console.log(pzirt)
    return (
        <>
        <td className="border border-gray-300">
            <p className="px-1">4</p>
        </td>
        <td className="border border-gray-300 font-semibold">RT.04</td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((pzirt[0].amount_zfb).toFixed(2)))} kg` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zfu)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zm)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_i)}` : '-'}
            </p>
        </td>
        </>
    )
}

function SumRT05() {
    const {pzirt, pzirtIsLoading} = useSumZI('05')
    if (pzirtIsLoading) return <td colSpan={5} className="border border-gray-300">"Sedang memuat..."</td>
    console.log(pzirt)
    return (
        <>
        <td className="border border-gray-300">
            <p className="px-1">5</p>
        </td>
        <td className="border border-gray-300 font-semibold">RT.05</td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((pzirt[0].amount_zfb).toFixed(2)))} kg` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zfu)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zm)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_i)}` : '-'}
            </p>
        </td>
        </>
    )
}

function SumRT06() {
    const {pzirt, pzirtIsLoading} = useSumZI('06')
    if (pzirtIsLoading) return <td colSpan={5} className="border border-gray-300">"Sedang memuat..."</td>
    console.log(pzirt)
    return (
        <>
        <td className="border border-gray-300">
            <p className="px-1">6</p>
        </td>
        <td className="border border-gray-300 font-semibold">RT.06</td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((pzirt[0].amount_zfb).toFixed(2)))} kg` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zfu)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_zm)}` : '-'}
            </p>
        </td>
        <td className="border border-gray-300">
            <p className="px-1">
                {pzirt[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(pzirt[0].amount_i)}` : '-'}
            </p>
        </td>
        </>
    )
}

let total_zfb = 0
const total_zfu = 0
let total_zm = 0
let total_i = 0

function SumZI() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/pengumpulan/total`, fetcher)
    let convertUang = 0
    let newberas = ''
    console.log(data)
    if (error) {console.error(error)}
    if (isLoading) return <tr className="even:bg-blue-50"><td colSpan={4}>"Sedang memuat..."</td></tr>
    return (
        <>
        <tr className="bg-amber-200">
            <td className="border border-gray-300 text-center" colSpan={2}>Jumlah</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].amount_zfb).toFixed(2))) : 0} kg
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    Rp{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format(data[0][0].amount_zfu) : 0}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    Rp{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format(data[0][0].amount_zm) : 0}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    Rp{data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format(data[0][0].amount_i) : 0}
                </p>
            </td>
        </tr>
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300 text-center" colSpan={2}>Total Beras</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].amount_zfb).toFixed(2))) : 0} kg
                </p>
            </td>
            <td className="border border-gray-300" colSpan={3}></td>
        </tr>
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300 text-center" colSpan={2}>Wajib Zakat Fitrah (Beras)</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[4][0] != undefined && data[0][0] ? new Intl.NumberFormat("id-ID").format(parseFloat(Number(data[4][0].jiwa * data[3][0].nominal).toFixed(2))) : 0} kg
                </p>
            </td>
            <td className="border border-gray-300" colSpan={3}></td>
        </tr>
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300 text-center" colSpan={2}>Selisih Total dengan Wajib Zakat Fitrah (Beras)</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined && data[0][0] ? new Intl.NumberFormat("id-ID").format(parseFloat(Number(data[0][0].amount_zfb - (data[4][0].jiwa * data[3][0].nominal)).toFixed(2))) : 0} kg
                </p>
            </td>
            <td className="border border-gray-300" colSpan={3}></td>
        </tr>
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300 text-center" colSpan={2}>Konversi Fitrah Uang ke Beras (Rp{data[2][0].nominal} = {data[3][0].nominal} kg)</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? new Intl.NumberFormat("id-ID").format(parseFloat(data[0][0].amount_zfb.toFixed(2))) : 0} kg
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined && data[2][0] != undefined && data[3][0] != undefined ? (
                        convertUang = data[0][0].amount_zfu / data[2][0].nominal * data[3][0].nominal,
                        newberas = convertUang.toFixed(2),
                        new Intl.NumberFormat("id-ID").format(parseFloat(newberas))
                    ) : 0} kg
                </p>
            </td>
            <td className="border border-gray-300" colSpan={2}></td>
        </tr>
        <tr className="bg-amber-300">
            <td className="border border-gray-300 text-center font-bold" colSpan={2}>Total</td>
            <td className="border border-gray-300">
                <p className="px-1 font-semibold">
                    {data[0][0] != undefined ? (total_zfb = (data[0][0].amount_zfb + convertUang).toFixed(2), 
                    new Intl.NumberFormat("id-ID").format(total_zfb)) : total_zfb = 0} kg
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1 font-semibold">
                    Rp0
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1 font-semibold">
                    Rp{data[0][0] != undefined ? (total_zm = data[0][0].amount_zm,
                        new Intl.NumberFormat("id-ID").format(total_zm)
                    ) : 0}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1 font-semibold">
                    Rp{data[0][0] != undefined ? (total_i = data[0][0].amount_i,
                        new Intl.NumberFormat("id-ID").format(total_i)
                    ) : 0}
                </p>
            </td>
        </tr>
        </>
    )
}

function DusunRT01() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/dusun?rt=01`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return <tr className="even:bg-blue-50"><td>Loading...</td></tr>
    return (
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300 text-right">.a</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    RT. 01
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-' }
                </p>
            </td>
        </tr>
    )
}

function DusunRT02() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/dusun?rt=02`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return <tr className="even:bg-blue-50"><td>Loading...</td></tr>
    return (
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300 text-right">.b</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    RT. 02
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-' }
                </p>
            </td>
        </tr>
    )
}

function DusunRT03() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/dusun?rt=03`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return <tr className="even:bg-blue-50"><td>Loading...</td></tr>
    return (
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300 text-right">.c</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    RT. 03
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-' }
                </p>
            </td>
        </tr>
    )
}

function DusunRT04() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/dusun?rt=04`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return <tr className="even:bg-blue-50"><td>Loading...</td></tr>
    return (
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300 text-right">.d</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    RT. 04
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-' }
                </p>
            </td>
        </tr>
    )
}

function DusunRT05() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/dusun?rt=05`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return <tr className="even:bg-blue-50"><td>Loading...</td></tr>
    return (
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300 text-right">.e</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    RT. 05
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-' }
                </p>
            </td>
        </tr>
    )
}

function DusunRT06() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/dusun?rt=06`, fetcher)
    if (error) {console.error(error)}
    if (isLoading) return <tr className="even:bg-blue-50"><td>Loading...</td></tr>
    return (
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300 text-right">.f</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    RT. 06
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-' }
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-' }
                </p>
            </td>
        </tr>
    )
}

function LuarDusun() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/lain?area=${'Luar Dusun'}`, fetcher)
    if (isLoading) return <tr className="even:bg-blue-50"><td>Loading...</td></tr>
    return (
        <>
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300">
                <p className="px-1">
                    2
                </p>
            </td>
            <td className="border border-gray-300 font-semibold">Luar Dusun</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-'}
                </p>
            </td>
        </tr>
        </>
    )
}

function AmalUsaha() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/lain?area=${'Amal Usaha'}`, fetcher)
    if (isLoading) return <tr className="even:bg-blue-50"><td colSpan={5}>Loading...</td></tr>
    return (
        <>
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300">
                <p className="px-1">
                    3
                </p>
            </td>
            <td className="border border-gray-300 font-semibold">Amal Usaha</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-'}
                </p>
            </td>
        </tr>
        </>
    )
}

function PengajuanProposal() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/lain?area=Pengajuan Proposal`, fetcher)
    if (isLoading) return <tr className="even:bg-blue-50"><td colSpan={5}>Loading...</td></tr>
    return (
        <>
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300">
                <p className="px-1">
                    4
                </p>
            </td>
            <td className="border border-gray-300 font-semibold">Pengajuan Proposal</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-'}
                </p>
            </td>
        </tr>
        </>
    )
}

function AktivisMasjid() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/lain?area=${'Aktivis Masjid'}`, fetcher)
    if (isLoading) return <tr className="even:bg-blue-50"><td colSpan={5}>Loading...</td></tr>
    return (
        <>
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300">
                <p className="px-1">
                    5
                </p>
            </td>
            <td className="border border-gray-300 font-semibold">Aktivis Masjid</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-'}
                </p>
            </td>
        </tr>
        </>
    )
}

function Amil() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/lain?area=${'Amil'}`, fetcher)
    if (isLoading) return <tr className="even:bg-blue-50"><td colSpan={5}>Loading...</td></tr>
    return (
        <>
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300">
                <p className="px-1">
                    6
                </p>
            </td>
            <td className="border border-gray-300 font-semibold">Amil</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? `${new Intl.NumberFormat("id-ID").format(parseFloat((data[0][0].jumlah_salur_zfb).toFixed(2)))} kg` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[1][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[1][0].jumlah_salur_zfu)}` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[2][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[2][0].jumlah_salur_zm)}` : '-'}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[3][0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[3][0].jumlah_salur_i)}` : '-'}
                </p>
            </td>
        </tr>
        </>
    )
}


function PengeluaranInfak() {
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/infak`, fetcher)
    if (isLoading) return <tr className="even:bg-blue-50"><td colSpan={5}>Loading...</td></tr>
    return (
        <>
        <tr className="even:bg-blue-50">
            <td className="border border-gray-300">
                <p className="px-1">
                    5
                </p>
            </td>
            <td className="border border-gray-300 font-semibold" colSpan={4}>Pengeluaran Infak</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0] != undefined ? `Rp${new Intl.NumberFormat("id-ID").format(data[0].jumlah_salur_i)}` : '-'}
                </p>
            </td>
        </tr>
        </>
    )
}

function Total() {
    let salur_fb = 0
    let salur_fu = 0
    let salur_m = 0
    let salur_i = 0
    const {data, error, isLoading} = useSWR(`${Host}/api/zakat/laporan/penyaluran/total`, fetcher)
    if (isLoading) return <tr className="even:bg-blue-50"><td colSpan={5}>Loading...</td></tr>
    return (
        <>
        <tr className="bg-cyan-200">
            <td className="border border-gray-300 text-center font-bold" colSpan={2}>Jumlah</td>
            <td className="border border-gray-300">
                <p className="px-1">
                    {data[0][0] != undefined ? (salur_fb = data[0][0].jumlah_salur_zfb,
                        new Intl.NumberFormat("id-ID").format(parseFloat(salur_fb.toFixed(2)))
                    ) : salur_fb = 0} kg
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    Rp{data[1][0] != undefined ? (salur_fu = data[1][0].jumlah_salur_zfu,
                        new Intl.NumberFormat("id-ID").format(salur_fu)
                    ) : salur_fu = 0}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    Rp{data[2][0] != undefined ? (salur_m = data[2][0].jumlah_salur_zm,
                        new Intl.NumberFormat("id-ID").format(salur_m)
                    ) : salur_m = 0}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1">
                    Rp{data[3][0] != undefined ? (salur_i = data[3][0].jumlah_salur_i,
                        new Intl.NumberFormat("id-ID").format(salur_i)
                    ) : salur_i = 0}
                </p>
            </td>
        </tr>
        <tr className="bg-cyan-300">
            <td className="border border-gray-300 text-center font-bold" colSpan={2}>Total</td>
            <td className="border border-gray-300">
                <p className="px-1 font-semibold">
                    {new Intl.NumberFormat("id-ID").format(parseFloat((total_zfb - salur_fb).toFixed(2)))} kg
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1 font-semibold">
                    Rp{new Intl.NumberFormat("id-ID").format(total_zfu - salur_fu)}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1 font-semibold">
                    Rp{new Intl.NumberFormat("id-ID").format(total_zm - salur_m)}
                </p>
            </td>
            <td className="border border-gray-300">
                <p className="px-1 font-semibold">
                    Rp{new Intl.NumberFormat("id-ID").format(total_i - salur_i)}
                </p>
            </td>
        </tr>
        </>
    )
}

export function LaporanZI({
}) {
    const contentRef = useRef(null)
    const handlePrint = useReactToPrint({ contentRef })
    return (
        <>
        {/* <div> */}
            <Card className="px-4 mx-4">
                <Button onClick={() => handlePrint()}>Print</Button>
                {/* <div > */}
                    <div ref={contentRef} className="items-center justify-center mx-auto px-4 w-full">
                        <table className="border-collapse border-2 border-solid border-gray-500 w-full border-spacing-1">
                            <caption className="py-4">
                                <p className="font-bold pt-10 text-2xl">
                                    LAPORAN PENERIMAAN DAN PENGELUARAN ZAKAT 1446 H
                                </p>
                                <p className="font-semibold text-xl">
                                    MASJID MAKMUR BABAKAN
                                </p>
                            </caption>
                            <thead>
                                <tr className="bg-emerald-100">
                                    <th className="border border-gray-300" rowSpan={2}>#</th>
                                    <th className="border border-gray-300" rowSpan={2}>Keterangan</th>
                                    <th className="border border-gray-300" colSpan={2}>Zakat Fitrah</th>
                                    <th className="border border-gray-300" rowSpan={2}>Zakat Mal</th>
                                    <th className="border border-gray-300" rowSpan={2}>Infak</th>
                                </tr>
                                <tr className="bg-emerald-100">
                                    <th className="border border-gray-300">Beras</th>
                                    <th className="border border-gray-300">Uang</th>
                                </tr>
                                <tr className="bg-red-50">
                                    <td className="border border-gray-300 font-bold" colSpan={6}>
                                        <p className="px-1">
                                            Pengumpulan (Masuk)
                                        </p>
                                    </td>
                                </tr>
                            </thead>
                            <tbody className="">
                                {/* pengumpulan */}
                                <tr className="even:bg-blue-50">
                                    <SumRT01 />
                                </tr>
                                <tr className="even:bg-blue-50">
                                    <SumRT02 />
                                </tr>
                                <tr className="even:bg-blue-50">
                                    <SumRT03 />
                                </tr>
                                <tr className="even:bg-blue-50">
                                    <SumRT04 />
                                </tr>
                                <tr className="even:bg-blue-50">
                                    <SumRT05 />
                                </tr>
                                <tr className="even:bg-blue-50">
                                    <SumRT06 />
                                </tr>
                                {/* jumlah dari pengumpulan */}
                                    <SumZI />
                                
                                {/* penyaluran */}
                            </tbody>
                            <thead>
                                <tr className="bg-green-50">
                                    <td className="border border-gray-300 font-bold" colSpan={6}>
                                        <p className="px-1">
                                            Penyaluran (Keluar)
                                        </p>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="even:bg-blue-50">
                                    <td className="border border-gray-300">
                                        <p className="px-1">
                                            1
                                        </p>
                                    </td>
                                    <td className="border border-gray-300 font-semibold" colSpan={5}>Dusun
                                </td>
                                
                                </tr>
                                <DusunRT01 />
                                <DusunRT02 />
                                <DusunRT03 />
                                <DusunRT04 />
                                <DusunRT05 />
                                <DusunRT06 />
                                <LuarDusun />
                                <AmalUsaha />
                                <PengajuanProposal />
                                <AktivisMasjid />
                                <Amil/>
                                <PengeluaranInfak />
                                {/* Jumlah dari distibusi */}
                            </tbody>
                            <tfoot>
                                <Total />
                            </tfoot>
                        </table>
                        <div className="flex grid-cols-2 w-full px-2 pt-10">
                            <div className="w-full justify-center text-center">
                                <p>Ketua Lazismu</p>
                                <p className="pt-20">Danu Mashuri</p>
                                <div>
                                    {/* <Separator /> */}
                                </div>
                            </div>
                            <div className="w-full justify-center text-center">
                                <p>Sekretaris</p>
                                <p className="pt-20">Sabingu</p>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </Card>
        {/* </div> */}
        </>
    )
}