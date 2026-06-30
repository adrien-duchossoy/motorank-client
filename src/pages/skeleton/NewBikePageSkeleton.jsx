import { Skeleton } from "@/components/ui/skeleton"

const NewBikePageSkeleton = () => (
    <div className="min-h-screen pb-32 pt-10 px-4">
        <div className="max-w-lg mx-auto">
            <Skeleton className="h-8 w-40 mb-6" />

            <div className="space-y-5">
                <div className="flex justify-center">
                    <Skeleton className="w-40 h-28 rounded-xl" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Skeleton className="h-8 w-28 rounded-md" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="space-y-1.5">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Skeleton className="h-10 w-20 rounded-md" />
                    <Skeleton className="h-10 w-24 rounded-md" />
                </div>
            </div>
        </div>
    </div>
)

export default NewBikePageSkeleton
