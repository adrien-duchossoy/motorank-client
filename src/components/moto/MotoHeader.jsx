import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon } from "@hugeicons/core-free-icons"

const MotoHeader = ({ moto }) => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{moto.brandName}</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                    {moto.type}
                </span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold">{moto.modelName}</h1>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <HugeiconsIcon
                            key={star}
                            icon={StarIcon}
                            size={16}
                            className={star <= Math.round(moto.averageRating) ? "text-orange-400" : "text-zinc-300 dark:text-zinc-600"}
                        />
                    ))}
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 ml-1">
                        {moto.averageRating?.toFixed(1)}
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        ({moto.ratingCount})
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MotoHeader
