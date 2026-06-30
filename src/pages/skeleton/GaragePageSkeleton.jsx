import { Skeleton } from "@/components/ui/skeleton"

const GarageCardSkeleton = () => (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <Skeleton className="aspect-[4/3] w-full rounded-none" />
        <div className="p-3 flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-28" />
        </div>
    </div>
)

const GaragePageSkeleton = () => (
    <div className="px-4 md:px-16 lg:px-32 pt-8 pb-12">
        <div className="mb-6 flex flex-col gap-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-16" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <GarageCardSkeleton />
            <GarageCardSkeleton />
            <GarageCardSkeleton />
            <GarageCardSkeleton />
        </div>
    </div>
)

export default GaragePageSkeleton
