import { Skeleton } from "@/components/ui/skeleton"

const UserRowSkeleton = () => (
    <div className="flex items-center gap-4 py-4">
        <Skeleton className="h-10 w-10 rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg shrink-0" />
    </div>
)

const FollowListPageSkeleton = () => (
    <>
        <div className="md:hidden flex items-center gap-3 px-4 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-5 w-24" />
        </div>
        <div className="px-4 md:px-16 lg:px-32 pb-12 divide-y divide-zinc-100 dark:divide-zinc-800">
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
        </div>
    </>
)

export default FollowListPageSkeleton
