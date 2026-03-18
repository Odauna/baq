import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AppSidenav } from "@/components/layouts/app-sidenav";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { Toaster } from "@/components/ui/sonner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getUser, verifySession } from "@/lib/dal";
import SessionProvider from "@/lib/session/provider";

// import { BreadcrumbSidenav } from "@/components/layouts/breadcumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zakat Makmur",
  description: "Aplikasi Pengawasan dan Pendataan Kegiatan Kurban",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await verifySession()
  const userStr = await getUser()
  const user = userStr ? JSON.parse(userStr) : {}
  return (
    // <html lang="en">
    //   <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    <>
      <SidebarProvider>
        <SessionProvider user={user}>
          <AppSidenav />
          <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                      <Separator orientation="vertical" className="mr-2 h-4" />
                      <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/zakat">
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage></BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                  </div>
              </header>
              {children}
          </SidebarInset>
        </SessionProvider>
      </SidebarProvider>
        {/* <Toaster richColors /> */}
    </>
    //   </body>
    // </html>
  );
}
