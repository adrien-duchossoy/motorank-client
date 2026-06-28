import { useNavigate } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { FavouriteIcon, StarIcon } from "@hugeicons/core-free-icons"

const MotoCard = ({ moto, isFavorited, onToggleFavorite }) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/moto/${moto.slug}`)}
            className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        >
            <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900">
                {moto.picture && (
                    <img
                        src={moto.picture}
                        alt={`${moto.brandName} ${moto.modelName}`}
                        className="w-full h-full object-cover"
                    />
                )}
                <span className="absolute top-2 left-2 text-xs font-medium px-2 py-0.5 rounded bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                    {moto.type}
                </span>
                {onToggleFavorite && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(moto._id, moto.modelName) }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm transition-colors"
                    >
                        <HugeiconsIcon
                            icon={FavouriteIcon}
                            size={16}
                            style={isFavorited ? { color: "#ef4444", fill: "#ef4444" } : { color: "#a1a1aa" }}
                        />
                    </button>
                )}
            </div>

            <div className="p-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{moto.brandName}</p>
                <p className="text-xl font-semibold leading-tight mb-2">{moto.modelName}</p>
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-2">
                    <div className="flex items-center gap-1">
                        <HugeiconsIcon icon={StarIcon} size={14} className="text-orange-400" />
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {moto.averageRating?.toFixed(1) ?? "—"}
                        </span>
                        <span>({moto.ratingCount ?? 0})</span>
                    </div>
                    <span>{moto.productionYear} · {moto.displacement}cc</span>
                </div>
            </div>
        </div>
    )
}

export default MotoCard
