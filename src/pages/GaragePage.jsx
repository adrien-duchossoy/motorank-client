import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { toast } from "sonner"
import { myGarage, deleteFromMyGarage } from "../services/garage.config"
import { getPublicProfile, getPublicGarage } from "../services/user.config"
import GarageCard from "../components/profile/GarageCard"
import GaragePageSkeleton from "./skeleton/GaragePageSkeleton"

const GaragePage = () => {
    const { accountId } = useParams()
    const isOwn = !accountId

    const [profile, setProfile] = useState(null)
    const [garage, setGarage] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetches = isOwn
            ? [myGarage()]
            : [getPublicProfile(accountId), getPublicGarage(accountId)]

        Promise.all(fetches)
            .then(([first, second]) => {
                if (isOwn) {
                    setGarage(first.data)
                } else {
                    setProfile(first.data)
                    setGarage(second.data)
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [accountId])

    const handleDelete = (entryId) => {
        deleteFromMyGarage(entryId)
            .then(() => setGarage((prev) => prev.filter((e) => e._id !== entryId)))
            .catch(() => toast.error("Could not remove from garage"))
    }

    if (loading) return <GaragePageSkeleton />

    const displayName = profile?.displayName || profile?.handle
    const title = isOwn ? "My Garage" : `${displayName}'s Garage`

    return (
        <div className="px-4 md:px-16 lg:px-32 pt-8 pb-12">
            <div className="mb-6">
                {!isOwn && (
                    <Link
                        to={`/user/${accountId}`}
                        className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                    >
                        ← {displayName}
                    </Link>
                )}
                <h1 className="text-xl font-bold mt-1">{title}</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {garage.length} {garage.length === 1 ? "bike" : "bikes"}
                </p>
            </div>

            {garage.length === 0 ? (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {isOwn ? "No bikes in your garage yet. Find a moto and add it!" : "No bikes yet."}
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {garage.map((entry) => (
                        <GarageCard
                            key={entry._id}
                            entry={entry}
                            onDelete={isOwn ? handleDelete : undefined}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default GaragePage
