import { Skeleton } from "@/components/ui/skeleton"

const ProfilePageSkeleton = () => {
  return (
    <div className='bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 md:px-16 lg:px-32 py-8'>
      {/* Mobile */}
      <div className='flex flex-col items-center text-center gap-4 md:hidden'>
        <Skeleton className='h-16 w-16 rounded-full' />
        <div className='flex flex-col items-center gap-2'>
          <Skeleton className='h-5 w-32' /> {/* displayName */}
          <Skeleton className='h-4 w-20' /> {/* @handle */}
        </div>
        <div className='flex gap-8'>
          <Skeleton className='h-10 w-12' />
          <Skeleton className='h-10 w-12' />
          <Skeleton className='h-10 w-12' />
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:flex items-start gap-6">
        <Skeleton className="h-16 w-16 rounded-full shrink-0" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex flex-col gap-3 ml-8">
          <div className="flex gap-8">
            <Skeleton className="h-10 w-12" />
            <Skeleton className="h-10 w-12" />
            <Skeleton className="h-10 w-12" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePageSkeleton