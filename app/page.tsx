import { Dashboard } from "@/components/layouts/dashboard"

export default async function Home() {
    return (
        <main>
            <div className="@container/main flex flex-1 flex-col gap-2 w-full">
                {/* <div className="flex min-h-svh w-full items-center justify-center p-2 md:p-4"> */}
                <div className="flex min-h-svh w-full p-2 md:p-4">
                    <div className="w-full">
                        <Dashboard />
                    </div>
                </div>
            </div>
        </main>
    );
}
