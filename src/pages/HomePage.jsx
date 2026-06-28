import { useState, useEffect, useContext } from "react"
import { toast } from "sonner"
import { listAllMoto } from "../services/moto.config"
import { addToFavorite, removeFavorite, myProfile } from "../services/user.config"
import { AuthContext } from "../context/auth.context"
import MotoSearch from "../components/MotoSearch"
import MotoList from "../components/MotoList"

const HomePage = () => {
    const { isLoggedIn } = useContext(AuthContext)
    const [motos, setMotos] = useState([])
    const [types, setTypes] = useState(["All"])
    const [search, setSearch] = useState("")
    const [activeType, setActiveType] = useState("All")
    const [favorites, setFavorites] = useState(null)

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

    useEffect(() => {
        if (!isLoggedIn) return
        myProfile()
            .then((res) => setFavorites(new Set(res.data.favorites ?? [])))
            .catch((err) => console.error(err))
    }, [isLoggedIn])

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
                toast(isFavorited ? `${modelName} removed from favorites` : `${modelName} saved to favorites`)
            })
            .catch(() => toast.error("Could not update favorites"))
    }

    return (
        <div className="px-4 md:px-16 lg:px-32 pt-6">
            <div className="h-14 mb-4 flex items-center">
                {/* logo ici */}
            </div>

            <MotoSearch
                search={search}
                onSearchChange={setSearch}
                types={types}
                activeType={activeType}
                onTypeChange={setActiveType}
            />

            <MotoList
                motos={motos}
                favorites={favorites}
                onToggleFavorite={isLoggedIn ? handleToggleFavorite : null}
            />
        </div>
    )
}

export default HomePage
