import { Skeleton } from "@/components/ui/skeleton"

const MotoDetailPageSkeleton = () => (
    <div>
        {/* Hero image */}
        <Skeleton className="w-full aspect-[4/3] md:aspect-auto md:h-[70vh] rounded-none" />

        <div className="px-4 md:px-16 lg:px-32 pt-6 pb-12 space-y-8">
            {/* Header + specs */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-56" />
                    <Skeleton className="h-5 w-32 mt-1" />
                </div>
                <Skeleton className="h-24 w-48 rounded-xl" />
            </div>

            {/* Reviews */}
            <div className="flex flex-col gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
            </div>
        </div>
    </div>
)

export default MotoDetailPageSkeleton
