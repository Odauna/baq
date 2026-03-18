import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonMobileSalur() {
    return (
        <div className="flex grid-cols-5 items-center space-x-4">
            <Skeleton className="h-6 w-8 rounded-md" />
            <Separator orientation="vertical" />
            <Skeleton className="h-6 w-8 rounded-md" />
            <Separator orientation="vertical" />
            <Skeleton className="h-6 w-8 rounded-md" />
            <Separator orientation="vertical" />
            <Skeleton className="h-6 w-8 rounded-md" />
        </div>
    )
}