import { useNavigate } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, FavouriteIcon } from "@hugeicons/core-free-icons"
import MotoImage from "./MotoImage"

const MotoHero = ({ moto, isFavorited, onToggleFavorite }) => {
    const navigate = useNavigate()

    return (
        <div className={`relative w-full aspect-[4/3] md:aspect-auto md:h-[70vh] ${moto.picture ? "" : "bg-zinc-100 dark:bg-zinc-900"}`}>
            <MotoImage src={moto.picture} alt={`${moto.brandName} ${moto.modelName}`} />
            <button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-900 transition-colors"
            >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            </button>
            {onToggleFavorite && (
                <button
                    onClick={onToggleFavorite}
                    className="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm transition-colors"
                >
                    <HugeiconsIcon
                        icon={FavouriteIcon}
                        size={20}
                        style={isFavorited ? { color: "#ef4444", fill: "#ef4444" } : { color: "#a1a1aa" }}
                    />
                </button>
            )}
        </div>
    )
}

export default MotoHero
