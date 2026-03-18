import { Skeleton } from "@/components/ui/skeleton";
import { Ellipsis, Loader } from "lucide-react";

export default function LoadingHome() {
    return (
        <main>
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="h-screen w-screen py-4 px-4 ">
                    <Skeleton className="w-full h-full rounded-lg flex flex-col flex-1 items-center justify-center">
                        <div className="flex items-center justify-center">
                            <Loader className="animate-spin direction-reverse" size={100} />
                            <Loader className="animate-spin" size={200} />
                            <Loader className="animate-spin direction-reverse" size={100} />
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-3xl">Sedang memuat</p>
                            <Ellipsis className="animate-pulse" size={40} />
                        </div>
                    </Skeleton>
                </div>
            </div>
        </main>
    )
}