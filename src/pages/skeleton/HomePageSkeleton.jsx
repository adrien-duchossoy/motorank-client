import { Skeleton } from "@/components/ui/skeleton"

const MotoCardSkeleton = () => (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <Skeleton className="aspect-[4/3] w-full rounded-none" />
        <div className="p-3 flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-3 w-full mt-1" />
        </div>
    </div>
)

const HomePageSkeleton = () => (
    <div className="px-4 md:px-16 lg:px-32 pt-6">
        <div className="h-14 mb-4" />
        <Skeleton className="h-10 w-full mb-6 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MotoCardSkeleton />
            <MotoCardSkeleton />
            <MotoCardSkeleton />
        </div>
    </div>
)

export default HomePageSkeleton
