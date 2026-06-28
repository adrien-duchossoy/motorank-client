import { useNavigate } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete01Icon } from "@hugeicons/core-free-icons"
import MotoImage from "../moto/MotoImage"

const GarageCard = ({ entry, onDelete }) => {
    const navigate = useNavigate()
    const moto = entry.motorcycleId

    if (!moto || typeof moto !== "object") return null

    return (
        <div
            onClick={() => navigate(`/moto/${moto.slug}`)}
            className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        >
            <div className={`relative aspect-[4/3] ${moto.picture ? "" : "bg-zinc-100 dark:bg-zinc-900"}`}>
                <MotoImage src={moto.picture} alt={`${moto.brandName} ${moto.modelName}`} />
            </div>
            <div className="p-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{moto.brandName}</p>
                <p className="text-base font-semibold leading-tight">{moto.modelName}</p>
            </div>
            {onDelete && (
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(entry._id) }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-500 hover:text-red-500 transition-colors"
                >
                    <HugeiconsIcon icon={Delete01Icon} size={16} />
                </button>
            )}
        </div>
    )
}

export default GarageCard
