import { Skeleton } from "@/components/ui/skeleton"

const EventCardSkeleton = () => (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-full shrink-0" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-16 w-full rounded-lg" />
        <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
            </div>
        </div>
    </div>
)

const FeedPageSkeleton = () => (
    <div className="px-4 md:px-26 lg:px-32 pt-6">
        <Skeleton className="h-7 w-16 mb-6" />
        <ul className="space-y-4">
            <li><EventCardSkeleton /></li>
            <li><EventCardSkeleton /></li>
            <li><EventCardSkeleton /></li>
        </ul>
    </div>
)

export default FeedPageSkeleton
