import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { listAllMoto } from "../services/moto.config"
import { Input } from "@/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, FavouriteIcon, StarIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

const HomePage = () => {
    const navigate = useNavigate()
    const [motos, setMotos] = useState([])
    const [types, setTypes] = useState(["All"])
    const [search, setSearch] = useState("")
    const [activeType, setActiveType] = useState("All")
    const [showScrollHint, setShowScrollHint] = useState(true)
    const pillsRef = useRef(null)

    const handlePillsScroll = () => {
        const el = pillsRef.current
        if (!el) return
        setShowScrollHint(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    }

    useEffect(() => {
        listAllMoto()
            .then((res) => {
                const unique = [...new Set(res.data.map((m) => m.type))].sort()
                setTypes(["All", ...unique])
            })
            .catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        const params = {}
        if (activeType !== "All") params.type = activeType
        if (search) params.search = search

        listAllMoto(params)
            .then((res) => setMotos(res.data))
            .catch((err) => console.error(err))
    }, [search, activeType])

    return (
        <div className="px-4 pt-6">
            <div className="h-14 mb-4 flex items-center">
                {/* logo ici */}
            </div>

            <div className="relative mb-4">
                <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground pointer-events-none">
                    <HugeiconsIcon icon={Search01Icon} size={18} />
                </span>
                <Input
                    className="pl-9"
                    placeholder="Search brand or model"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="relative mb-6">
                <div ref={pillsRef} onScroll={handlePillsScroll} className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                activeType === type
                                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white"
                                    : "bg-transparent text-zinc-600 border-zinc-300 hover:border-zinc-500 dark:text-zinc-400 dark:border-zinc-700"
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <div className={`md:hidden absolute right-0 inset-y-0 flex items-center pl-6 bg-gradient-to-l from-background to-transparent pointer-events-none transition-opacity ${showScrollHint ? "opacity-100" : "opacity-0"}`}>
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-zinc-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {motos.map((moto) => (
                    <div
                        key={moto._id}
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
                            <button
                                onClick={(e) => e.stopPropagation()}
                                className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-zinc-400 hover:text-red-500 transition-colors"
                            >
                                <HugeiconsIcon icon={FavouriteIcon} size={16} />
                            </button>
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
                ))}
            </div>
        </div>
    )
}

export default HomePage
