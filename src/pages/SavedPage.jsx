import { useState, useEffect } from "react"
import { toast } from "sonner"
import { listFavorites, addToFavorite, removeFavorite } from "../services/user.config"
import MotoSearch from "../components/MotoSearch"
import MotoList from "../components/MotoList"

const SavedPage = () => {
    const [motos, setMotos] = useState([])
    const [favorites, setFavorites] = useState(null)
    const [types, setTypes] = useState(["All"])
    const [search, setSearch] = useState("")
    const [activeType, setActiveType] = useState("All")

    useEffect(() => {
        listFavorites()
            .then((res) => {
                const data = res.data
                setMotos(data)
                setFavorites(new Set(data.map((m) => m._id)))
                const unique = [...new Set(data.map((m) => m.type))].sort()
                setTypes(["All", ...unique])
            })
            .catch(console.error)
    }, [])

    const handleToggleFavorite = (motoId, modelName) => {
        const isFavorited = favorites?.has(motoId)
        const action = isFavorited ? removeFavorite : addToFavorite
        action(motoId)
            .then(() => {
                setFavorites((prev) => {
                    const next = new Set(prev)
                    isFavorited ? next.delete(motoId) : next.add(motoId)
                    return next
                })
                if (isFavorited) {
                    setMotos((prev) => prev.filter((m) => m._id !== motoId))
                    toast(`${modelName} removed from saved`)
                } else {
                    toast(`${modelName} saved`)
                }
            })
            .catch(() => toast.error("Could not update saved"))
    }

    const filtered = motos.filter((m) => {
        const matchesType = activeType === "All" || m.type === activeType
        const matchesSearch =
            !search ||
            m.brandName.toLowerCase().includes(search.toLowerCase()) ||
            m.modelName.toLowerCase().includes(search.toLowerCase())
        return matchesType && matchesSearch
    })

    return (
        <div className="px-4 md:px-16 lg:px-32 pt-6">
            <div className="mb-6">
                <h1 className="text-xl font-bold">Saved</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {motos.length} {motos.length === 1 ? "bike" : "bikes"}
                </p>
            </div>

            <MotoSearch
                search={search}
                onSearchChange={setSearch}
                types={types}
                activeType={activeType}
                onTypeChange={setActiveType}
            />

            {filtered.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {motos.length === 0 ? "No saved bikes yet." : "No results."}
                </p>
            ) : (
                <MotoList
                    motos={filtered}
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                />
            )}
        </div>
    )
}

export default SavedPage
