// This is a copy file - imports commented out due to missing modules
// import { ChartAreaInteractive } from "@/components/layouts/kurban/dashboard/chart-area-interactive"
// import { Card, CardHeader, CardTitle } from "@/components/ui/card"
// import { Host } from "@/lib/host"
// import { DataTableModel2 } from "@/components/layouts/kurban/data-table/model2"
// import { columnsDashboardAktivitas, DashboardDataAktivitas } from "@/components/layouts/kurban/dashboard/columns/aktivitas"
// import { columnsDashboardDistribusiRT, DashboardDataDistribusiRT } from "@/components/layouts/kurban/dashboard/columns/rt"
// import { columnsDashboardDistribusiLuar, DashboardDataDistribusiLuar } from "@/components/layouts/kurban/dashboard/columns/luar"
// import { columnsDashboardDistribusiProposal, DashboardDataDistribusiProposal } from "@/components/layouts/kurban/dashboard/columns/proposal"
// import { columnsDashboardDistribusiTambahan, DashboardDataDistribusiTambahan } from "@/components/layouts/kurban/dashboard/columns/tambahan"
// import { DashboardTabRTs } from "@/components/layouts/kurban/dashboard/tabs"
import SectionCards2 from "@/components/layouts/kurban/dashboard/section-cards-2"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardCarousel from "@/components/layouts/kurban/dashboard/carousel"

async function getDataAktivitas(): Promise<DashboardDataAktivitas[]> {
    const sampledata = await fetch(`${Host}/api/kurban/aktivitas`)
    const data = await sampledata.json()
    return data
}
type Waktu = {
    time: string
    total: number
}
async function getWaktu(): Promise<Waktu[]> {
    const sampledata = await fetch(`${Host}/api/kurban/dashboard/timeline`)
    const data = await sampledata.json()
    return data
}
async function getDataDRT01(): Promise<DashboardDataDistribusiRT[]> {
    const sampledata = await fetch(`${Host}/api/kurban/rt?rt=01`)
    const data = await sampledata.json()
    return data
}
async function getDataDRT02(): Promise<DashboardDataDistribusiRT[]> {
    const sampledata = await fetch(`${Host}/api/kurban/rt?rt=02`)
    const data = await sampledata.json()
    return data
}
async function getDataDRT03(): Promise<DashboardDataDistribusiRT[]> {
    const sampledata = await fetch(`${Host}/api/kurban/rt?rt=03`)
    const data = await sampledata.json()
    return data
}
async function getDataDRT04(): Promise<DashboardDataDistribusiRT[]> {
    const sampledata = await fetch(`${Host}/api/kurban/rt?rt=04`)
    const data = await sampledata.json()
    return data
}
async function getDataDRT05(): Promise<DashboardDataDistribusiRT[]> {
    const sampledata = await fetch(`${Host}/api/kurban/rt?rt=05`)
    const data = await sampledata.json()
    return data
}
async function getDataDRT06(): Promise<DashboardDataDistribusiRT[]> {
    const sampledata = await fetch(`${Host}/api/kurban/rt?rt=06`)
    const data = await sampledata.json()
    return data
}
async function getDataDLuar01(): Promise<DashboardDataDistribusiLuar[]> {
    const sampledata = await fetch(`${Host}/api/kurban/luar?rt=01`)
    const data = await sampledata.json()
    return data
}
async function getDataDLuar02(): Promise<DashboardDataDistribusiLuar[]> {
    const sampledata = await fetch(`${Host}/api/kurban/luar?rt=02`)
    const data = await sampledata.json()
    return data
}
async function getDataDLuar03(): Promise<DashboardDataDistribusiLuar[]> {
    const sampledata = await fetch(`${Host}/api/kurban/luar?rt=03`)
    const data = await sampledata.json()
    return data
}
async function getDataDLuar04(): Promise<DashboardDataDistribusiLuar[]> {
    const sampledata = await fetch(`${Host}/api/kurban/luar?rt=04`)
    const data = await sampledata.json()
    return data
}
async function getDataDLuar05(): Promise<DashboardDataDistribusiLuar[]> {
    const sampledata = await fetch(`${Host}/api/kurban/luar?rt=05`)
    const data = await sampledata.json()
    return data
}
async function getDataDLuar06(): Promise<DashboardDataDistribusiLuar[]> {
    const sampledata = await fetch(`${Host}/api/kurban/luar?rt=06`)
    const data = await sampledata.json()
    return data
}
async function getDataDProposal(): Promise<DashboardDataDistribusiProposal[]> {
    const sampledata = await fetch(`${Host}/api/kurban/proposal`)
    const data = await sampledata.json()
    return data
}
async function getDataDTambahan(): Promise<DashboardDataDistribusiTambahan[]> {
    const sampledata = await fetch(`${Host}/api/kurban/tambahan`)
    const data = await sampledata.json()
    return data
}
type TotalAda = {
    // jenis: 'Daging'|'Kepala'|'Kulit'
    total: number
}
async function getTotalDagingAda(): Promise<TotalAda[]> {
    const sampledata = await fetch(`${Host}/api/kurban/dashboard/total-ada?jenis=Daging`)
    const data = await sampledata.json()
    return data
}
async function getTotalKepalaAda(): Promise<TotalAda[]> {
    const sampledata = await fetch(`${Host}/api/kurban/dashboard/total-ada?jenis=Kepala`)
    const data = await sampledata.json()
    return data
}
async function getTotalKulitAda(): Promise<TotalAda[]> {
    const sampledata = await fetch(`${Host}/api/kurban/dashboard/total-ada?jenis=Kulit`)
    const data = await sampledata.json()
    return data
}
type Total = {
    total: number
}
async function getTotalTimbang(): Promise<Total[]> {
    const sampledata = await fetch(`${Host}/api/kurban/dashboard/total`)
    const data = await sampledata.json()
    return data
}
type Target = {
    target: string
}
async function getPerkiraan(): Promise<Target[]> {
    const sampledata = await fetch(`${Host}/api/kurban/dashboard/perkiraan`)
    const data = await sampledata.json()
    return data
}
async function getKurbanSapi() {
    const sampledata = await fetch(`${Host}/api/kurban/dashboard/kurban?hewan=Sapi`)
    const data = await sampledata.json()
    return data
}
async function getKurbanKambing() {
    const sampledata = await fetch(`${Host}/api/kurban/dashboard/kurban?hewan=Kambing`)
    const data = await sampledata.json()
    return data
}

export default async function Home() {
  const totalDagingAda = await getTotalDagingAda()
  const totalKepalaAda = await getTotalKepalaAda()
  const totalKulitAda = await getTotalKulitAda()
  const totalTimbang = await getTotalTimbang()
  const waktu = await getWaktu()
  const perkiraan = await getPerkiraan()
  const kurbanSapi = await getKurbanSapi()
  const kurbanKambing = await getKurbanKambing()
  const dataAktivitas = await getDataAktivitas()
  const dataDRT01 = await getDataDRT01()
  const dataDRT02 = await getDataDRT02()
  const dataDRT03 = await getDataDRT03()
  const dataDRT04 = await getDataDRT04()
  const dataDRT05 = await getDataDRT05()
  const dataDRT06 = await getDataDRT06()
  const dataDL01 = await getDataDLuar01()
  const dataDL02 = await getDataDLuar02()
  const dataDL03 = await getDataDLuar03()
  const dataDL04 = await getDataDLuar04()
  const dataDL05 = await getDataDLuar05()
  const dataDL06 = await getDataDLuar06()
  const dataDProposal = await getDataDProposal()
  const dataDTambahan = await getDataDTambahan()
  
  return (
    <main>
      <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex min-h-svh w-full items-center justify-center p-2 md:p-4">
              <div className="w-full">
                  <Tabs defaultValue="all" className="w-full flex-col justify-start gap-4">
                      <div className="flex items-center justify-between pl-6">
                          <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 flex **:data-[slot=badge]:font-bold">
                              <TabsTrigger value="all">Semua</TabsTrigger>
                              <TabsTrigger value="slide">Slide</TabsTrigger>
                          </TabsList>
                      </div>
                      <TabsContent value="all">
                          <div className="flex flex-col gap-4">
                              <SectionCards2 dagingAda={totalDagingAda} kepalaAda={totalKepalaAda} kulitAda={totalKulitAda} target={perkiraan} totaltimbang={totalTimbang} kurbansapi={kurbanSapi} kurbankambing={kurbanKambing} />
                              <div className="px-4">
                                  <ChartAreaInteractive datawaktu={waktu} />
                              </div>
                              <Card className="px-4 mx-4">
                                  <DataTableModel2 columns={columnsDashboardAktivitas} data={dataAktivitas} title="Aktivitas Kurban" showfooter={true} />
                              </Card>
                              <Card className="px-4 mx-4">
                                  <DashboardTabRTs columns={columnsDashboardDistribusiRT} data01={dataDRT01} data02={dataDRT02} data03={dataDRT03} data04={dataDRT04} data05={dataDRT05} data06={dataDRT06}
                                          columnsl={columnsDashboardDistribusiLuar} datal01={dataDL01} datal02={dataDL02} datal03={dataDL03} datal04={dataDL04} datal05={dataDL05} datal06={dataDL06}
                                          />
                              </Card>
                              <Card className="px-4 mx-4">
                                  <CardHeader>
                                      <CardTitle>Distribusi Keluar (dari Masjid)</CardTitle>
                                  </CardHeader>
                                  <Card className="px-4">
                                      <DataTableModel2 columns={columnsDashboardDistribusiProposal} data={dataDProposal} title="Proposal" showfooter={true} />
                                  </Card>
                                  <Card className="px-4">
                                      <DataTableModel2 columns={columnsDashboardDistribusiTambahan} data={dataDTambahan} title="Tambahan" showfooter={true} />
                                  </Card>
                              </Card>
                          </div>
                      </TabsContent>
                      <TabsContent value="slide">
                          <DashboardCarousel 
                              totalDagingAda={totalDagingAda} totalKepalaAda={totalKepalaAda} totalKulitAda={totalKulitAda} perkiraan={perkiraan} totalTimbang={totalTimbang} kurbanSapi={kurbanSapi} kurbanKambing={kurbanKambing}
                              waktu={waktu} dataAktivitas={dataAktivitas}
                              dataDRT01={dataDRT01} dataDRT02={dataDRT02} dataDRT03={dataDRT03} dataDRT04={dataDRT04} dataDRT05={dataDRT05} dataDRT06={dataDRT06}
                              dataDL01={dataDL01} dataDL02={dataDL02} dataDL03={dataDL03} dataDL04={dataDL04} dataDL05={dataDL05} dataDL06={dataDL06}
                              dataDProposal={dataDProposal} dataDTambahan={dataDTambahan}
                              />
                      </TabsContent>
                  </Tabs>
              </div>
          </div>
      </div>
    </main>
  );
}
